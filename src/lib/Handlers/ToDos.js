const Express = require("express");
const { getDBHandler } = require("../db");
const RequestHandler=Express.Router();

RequestHandler.get("/to-dos", async(request, response)=>{
    try {
        const dbHandler= await getDBHandler();
        // Get all ToDos
        const toDos=await dbHandler.all("SELECT * FROM ToDos");
        //Verify toDos
        if(!toDos || !toDos.length){
            return response.status(404).send({message:"To Dos Not Found"});
        }
        //Close DataBase Connection
        await dbHandler.close();
        // Return all the ToDos Found
        response.send({toDos});
    } catch (error) {
        response.status(500).send({
            error:'Something went wrong when trying to get the To_Dos List',
            description:error.message,
        });

        
    }
});


RequestHandler.post("/to-dos", async(request, response)=>{
    try {
        const{title,description,isDone:is_done}=request.body;
        const dbHandler= await getDBHandler();
        const newToDo=await dbHandler.run(`
            INSERT INTO ToDos(title,description,is_done)
            VALUES(
                '${title}',
                '${description}',
                ${is_done}
            )
        `);
        await dbHandler.close();
        response.send({ newTodo: { title, description, is_done, ...newToDo } });
        
    } catch (error) {
        response.status(500).send({
            error:'Something went wrong when trying to create a new To_Do',
            description:error.message,
        });

        
    }
});

RequestHandler.patch("/to-dos/:id", async (request, response) => {
    try {
        const toDoId = request.params.id;
        const dbHandler = await getDBHandler();
        const { title, description, isDone: is_done } = request.body;
        const toDoToUpdate = await dbHandler.get(
            "SELECT * FROM ToDos WHERE id = ?",
            toDoId
        );

        await dbHandler.run(
            `UPDATE ToDos SET title = ?, description = ?, is_done = ? 
            WHERE id = ?`,
            title || toDoToUpdate.title,
            description || toDoToUpdate.description,
            is_done !== undefined ? is_done : toDoToUpdate.is_done,
            toDoId
        );

        const updatedTodo = await dbHandler.get(
            "SELECT * FROM ToDos WHERE id = ?",
            toDoId
        );

        await dbHandler.close();

        response.send({ updatedTodo });
    } catch (error) {
        response.status(500).send({
        error: `Something went wrong when trying to update a To_Do:`,
        errorInfo: error.message,
        });
    }
});


RequestHandler.delete("/to-dos/:id", async(request, response)=>{
    try {
        const ToDoId=request.params.id;
        const dbHandler=await getDBHandler();

        const deletedToDo= await dbHandler.run(
        "DELETE FROM ToDos WHERE id =?",
        ToDoId
        );
        await dbHandler.close();
        response.send({toDoRemoved:{...deletedToDo}});
    } catch (error) {
        response.status(500).send({
            error:'Something went wrong when trying to delete a To_Do',
            description:error.message,
        });

        
    }
});


module.exports=RequestHandler;