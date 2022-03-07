const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

let db

async function createConnection() {
    const adapter = new FileSync("DB_HangmanWords.json")

    db = low(adapter)
    db.defaults({hangmanWords: {english: {}, spanish: {}}}).write()
}

async function initializeAndGetConnection() {
    await createConnection()

    return await db
}

module.exports = {initializeAndGetConnection}

/**
 * For some reason the stupid database decided to begin installed in the root of the project.
 * I have been 2 days struggling with this fucking problem. 
 */