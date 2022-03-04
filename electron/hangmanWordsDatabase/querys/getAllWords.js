const {initializeAndGetConnection} = require('../databaseConnection')

async function getAllWords() {
    const db = await initializeAndGetConnection()

    const data = db
        .get(`hangmanWords`)
        .value()

    console.log(data)

    return data
}

module.exports = getAllWords