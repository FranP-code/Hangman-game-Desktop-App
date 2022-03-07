const {initializeAndGetConnection} = require('../databaseConnection.js')

async function getAllLanguages() {
    const db = await initializeAndGetConnection()

    const data = db
        .get('hangmanWords')
        .value()
    
    return Object.getOwnPropertyNames(data)
}

module.exports = getAllLanguages