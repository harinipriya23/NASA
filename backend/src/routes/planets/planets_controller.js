const { getAllPlanets } = require("../../models/planets_models");

async function httpGetAllPlanets(req, res) {
  const planets = await getAllPlanets();
  return res.status(200).json(planets);
}

module.exports = {
  httpGetAllPlanets,
};
