const {open} = require("sqlite");
const sqlite3 = require("sqlite3");

async function getDBHandler(){
    try {
        const dbHandler = await open({
            filename:"database.sqlite",
            driver: sqlite3.Database,
        });
        if(!dbHandler) throw new TypeError(`DB Handler expected, got ${dbHandler}`);
        return dbHandler;
        
    } catch (error) {
        console.error("An error ocurred trying to get the DBHandler: ", error.message);
        
    }
}

async function initializeDB(){
    try {
        const dbHandler = await getDBHandler();
        await dbHandler.exec(`
            CREATE TABLE IF NOT EXISTS ToDos (
                id INTEGER PRIMARY KEY,
                title TEXT,
                description TEXT,
                is_done INTEGER DEFAULT 0
            )
        
        `);
        await dbHandler.close();
    } catch (error) {
        console.error("An error ocurred trying to initialize the DataBase: ", error.message);
    }
}


module.exports ={initializeDB,getDBHandler}
