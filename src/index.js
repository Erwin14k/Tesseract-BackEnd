const Express = require("express");
const{initializeDB}=require("./lib/db");
const API = Express();




API.listen(3000,() =>{
    console.log("API IS RUNNING");
    initializeDB().then(()=> {
        console.log("READYYYY")
    });
});