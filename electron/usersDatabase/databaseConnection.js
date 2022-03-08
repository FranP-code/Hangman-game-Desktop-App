const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

let db

async function createConnection() {

    const adapter = new FileSync("DB_Users.json")
    
    db = await low(adapter)
    db.defaults({users: []}).write()
}

async function initializeAndGetConnection() {
    await createConnection()

    return await db
}
module.exports = {initializeAndGetConnection}