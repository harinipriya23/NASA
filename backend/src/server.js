const http = require("http");
require("dotenv").config();
const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanetData } = require("./models/planets_models");
const { loadLaunchData } = require("./models/launch_models");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`server in ${PORT}`);
  });
}
startServer();
