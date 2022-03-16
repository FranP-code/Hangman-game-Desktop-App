const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

let db

async function createConnection(initialData) {
    const adapter = new FileSync("DB_HangmanWords.json")

    db = low(adapter)

    if (!initialData) {
        db.defaults({hangmanWords: {}}).write()
    } else {
        db.defaults(initialData).write()
    }
}

async function initializeAndGetConnection(initialData) {
    await createConnection(initialData)

    return await db
}

module.exports = {initializeAndGetConnection}

/**
 * For some reason the stupid database decided to begin installed in the root of the project.
 * I have been 2 days struggling with this fucking problem. 
 */