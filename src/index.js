const Express = require("express");
const RequestHandler = require("./handlers/todos");
const cors = require("cors");

const { initializeDB } = require("./db");
const {
  displayServerRunningMessage,
  displayDBInitializedMessage,
} = require("./utils/prompt");

const appPort = 3000;
const App = Express();

App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));

App.use(cors());
App.use("/api/v1", RequestHandler);

App.listen(appPort, () => {
  displayServerRunningMessage(appPort);
  initializeDB().then(displayDBInitializedMessage);
});
