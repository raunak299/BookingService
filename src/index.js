const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");

const apiRoutes = require("./router");
const db = require("./models");

const startAndSetupServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
    console.log(`server start at ${PORT}`);
  });
};

startAndSetupServer();
