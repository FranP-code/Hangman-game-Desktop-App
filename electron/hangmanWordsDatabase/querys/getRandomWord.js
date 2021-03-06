const {initializeAndGetConnection} = require('../databaseConnection.js')
const getRandomCategory = require('./getRandomCategory.js')

async function getRandomWord(language, category = false) {
    
    if (!category) {
        category = await getRandomCategory(language)
    }
    
    const db = await initializeAndGetConnection()

    const words = db
        .get(`hangmanWords.${language}.${category}.words`)
        .value()

    const randomNumber = Math.trunc(

        Math.random() * (words.length - 0) + 0
    )

    return words[randomNumber]
}

module.exports = getRandomWord