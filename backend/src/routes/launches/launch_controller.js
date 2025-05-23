const {
  getAllLaunch,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launch_models");
const { getPagination } = require("../../services/query");

async function httpGetAllLaunch(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunch(skip, limit);
  return res.status(200).json(launches);
}
async function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.target ||
    !launch.rocket
  ) {
    return res.status(404).json({
      error: "Missing required launch property !",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}
async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const existLaunch = await existsLaunchWithId(launchId);

  if (!existLaunch) {
    return res.status(400).json({
      error: "Launch not found",
    });
  }
  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "controller Launch not aborted",
    });
  }
  return res.status(200).json({
    ok: true,
  });
}
module.exports = {
  httpGetAllLaunch,
  httpAddNewLaunch,
  httpAbortLaunch,
};
