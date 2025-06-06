const path = require("path");
const { parse } = require("csv-parse");
const fs = require("fs");

const planets = require("./planets_mongo");

function habitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
async function getAllPlanets() {
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}
async function savePlanets(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planets ${err}`);
  }
}

function loadPlanetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (habitablePlanet(data)) {
          savePlanets(data);
        }
      })
      .on("err", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const totalPlanetsCount = (await getAllPlanets()).length;
        console.log(`${totalPlanetsCount} Habitable planets found !`);
        resolve();
      });
  });
}
module.exports = {
  getAllPlanets,
  loadPlanetData,
};
