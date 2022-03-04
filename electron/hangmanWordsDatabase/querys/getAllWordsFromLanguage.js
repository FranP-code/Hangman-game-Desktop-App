const {initializeAndGetConnection} = require('../databaseConnection.js')

async function getAllWordsFromLanguage(language) {
    const db = await initializeAndGetConnection()

    const data = db
        .get(`hangmanWords.${language}`)
        .value()

    console.log(data)

    return data
}

module.exports = getAllWordsFromLanguage