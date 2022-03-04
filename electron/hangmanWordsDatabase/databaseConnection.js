const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

let db

async function createConnection() {
    const adapter = new FileSync("hangmanWords.json")

    db = low(adapter)
    db.defaults({hangmanWords: {english: {}, spanish: {}}}).write()
}

async function initializeAndGetConnection() {
    await createConnection()

    return await db
}

module.exports = {initializeAndGetConnection}