const {initializeAndGetConnection} = require('../databaseConnection.js')

async function getAllWordsFromCategory(language, category) {
    const db = await initializeAndGetConnection()

    const data = db
        .get(`hangmanWords.${language}.${category}`)
        .value()

    console.log(data)

    return data
}

module.exports = getAllWordsFromCategory