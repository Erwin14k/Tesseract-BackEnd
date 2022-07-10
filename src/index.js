const Express = require("express");
const CorsMiddleWare=require("cors");
const{initializeDB}=require("./lib/db");
const RequestHandler = require("./lib/Handlers/ToDos");
const API = Express();
const appPort = 3000;
const {
    displayServerRunningMessage,
    displayDBInitializedMessage,
} = require("./utils/prompt");
API.use(Express.json());
API.use(Express.urlencoded({extended:false}));

//For security reasons we need to add Cors Middleware.
API.use(CorsMiddleWare());
API.use("/api/v1",RequestHandler);

API.listen(appPort, () => {
    displayServerRunningMessage(appPort);
    initializeDB().then(displayDBInitializedMessage);
});