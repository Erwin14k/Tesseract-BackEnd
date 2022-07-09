const Express = require("express");
const RequestHandler=Express.Router();

RequestHandler.get("/to-dos", async(request, response)=>{
    try {
        
    } catch (error) {
        response.status(500).send({
            error:'Something went wrong when trying to get the To_Dos List',
            description:error.message,
        });

        
    }
});


RequestHandler.post("/to-dos", async(request, response)=>{
    try {
        
    } catch (error) {
        response.status(500).send({
            error:'Something went wrong when trying to create a new To_Do',
            description:error.message,
        });

        
    }
});

RequestHandler.patch("/to-dos", async(request, response)=>{
    try {
        
    } catch (error) {
        response.status(500).send({
            error:'Something went wrong when trying to update a To_Do',
            description:error.message,
        });

        
    }
});


RequestHandler.delete("/to-dos", async(request, response)=>{
    try {
        
    } catch (error) {
        response.status(500).send({
            error:'Something went wrong when trying to delete a To_Do',
            description:error.message,
        });

        
    }
});


module.exports=RequestHandler;