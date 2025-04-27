const { query } = require("express");
const launchesDatabase = require("./launch_mongo");
const planets = require("./planets_mongo");
const axios = require("axios");

const launches = new Map();

let DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("september 20, 2030"),
  target: "Kepler-442 b",
  customers: ["NASA", "GTA"],
  upcoming: true,
  success: true,
};
saveLaunch(launch);
launches.set(launch.flightNumber, launch);
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  console.log("loading launch data");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  if (response.status !== 200) {
    console.log("problem occured in launching data !");
    throw new Error("launch data download failed !");
  }
  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };
    await saveLaunch(launch);
  }
}
async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  //  console.log('firstLaunch')
  if (firstLaunch) {
    console.log("launch data loaded already !");
  } else {
    await populateLaunches();
  }
}
async function findLaunch(filter) {
  return launchesDatabase.findOne(filter);
}
async function existsLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");
  // descending order

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
}
async function getAllLaunch(skip, limit) {
  return await launchesDatabase
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}
async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planet found !");
  }
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ["NASA"],
    upcoming: true,
    success: true,
  });
  await saveLaunch(newLaunch);
  console.log(newLaunch);
}

async function saveLaunch(launch) {
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

// async function abortLaunchById(launchId) {
//   const aborted = await launchesDatabase.updateOne(
//     {
//       flightNumber: launchId,
//     },
//     {
//       upcoming: false,
//       success: false,
//     }
//   );
//   return aborted.modifiedCount === 1;
// }

async function abortLaunchById(launchId) {
  const launch = await Launch.findOne({ flightNumber: launchId });

  if (!launch) {
    console.log("Launch not found for ID:", launchId);
    return false;
  }

  launch.upcoming = false; // Set to false or handle the abort logic
  try {
    await launch.save();
    console.log("Launch aborted successfully");
    return true;
  } catch (error) {
    console.error("Error aborting the launch:", error);
    return false;
  }
}

module.exports = {
  loadLaunchData,
  getAllLaunch,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
};
