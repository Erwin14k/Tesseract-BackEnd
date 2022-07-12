const Express = require("express");
const { getDBHandler } = require("../db");

const RequestHandler = Express.Router();

RequestHandler.get("/to-dos", async (request, response) => {
  try {
    const dbHandler = await getDBHandler();

    const todos = await dbHandler.all("SELECT * FROM ToDos");
    await dbHandler.close();

    if (!todos || !todos.length) {
      return response.status(404).send({ message: "To Dos Not Found" }).end();
    }

    response.send({ todos });
  } catch (error) {
    response.status(500).send({
      error: `Something went wrong when trying to get the to dos list:`,
      errorInfo: error.message,
    });
  }
});

RequestHandler.post("/to-dos", async (request, response) => {
  try {
    const { title, description, isDone: is_done } = request.body;

    const dbHandler = await getDBHandler();
    //Obtain the actual date, to apply in the ToDo Creation.
    var today = new Date();
    var date = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
    var time= new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

    const newTodo = await dbHandler.run(`
        INSERT INTO ToDos (title, description, is_done,date_of_creation,date_of_update)
        VALUES (
            '${title}',
            '${description}',
            ${is_done},
            '${time}',
            ''
        )
    `);

    await dbHandler.close();

    response.send({ newTodo: { title, description, is_done, ...newTodo } });
  } catch (error) {
    response.status(500).send({
      error: `Something went wrong when trying to create a new ToDo:`,
      errorInfo: error.message,
    });
  }
});

RequestHandler.patch("/to-dos/:id", async (request, response) => {
  try {
    const todoId = request.params.id;
    const dbHandler = await getDBHandler();
    const { title, description, isDone: is_done } = request.body;

    const todoToUpdate = await dbHandler.get(
      "SELECT * FROM ToDos WHERE id = ?",
      todoId
    );
    var today = new Date();
    var date = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
    var time= new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

    await dbHandler.run(
      `UPDATE ToDos SET title = ?, description = ?, is_done = ?,date_of_update=?
        WHERE id = ?`,
      title || todoToUpdate.title,
      description || todoToUpdate.description,
      is_done !== undefined ? is_done : todoToUpdate.is_done,
      time,
      todoId
    );

    const updatedTodo = await dbHandler.get(
      "SELECT * FROM ToDos WHERE id = ?",
      todoId
    );

    await dbHandler.close();

    response.send({ updatedTodo });
  } catch (error) {
    response.status(500).send({
      error: `Something went wrong when trying to update the ToDo:`,
      errorInfo: error.message,
    });
  }
});

RequestHandler.delete("/to-dos/:id", async (request, response) => {
  try {
    const todoId = request.params.id;
    const dbHandler = await getDBHandler();

    const deletedTodo = await dbHandler.run(
      "DELETE FROM ToDos WHERE id = ?",
      todoId
    );

    await dbHandler.close();

    response.send({ todoRemoved: { ...deletedTodo } });
  } catch (error) {
    console.log("HERE");
    response.status(500).send({
      error: `Something went wrong when trying to delete a ToDo:`,
      errorInfo: error.message,
    });
  }
});

module.exports = RequestHandler;
