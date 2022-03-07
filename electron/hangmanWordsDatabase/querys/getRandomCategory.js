const {initializeAndGetConnection} = require('../databaseConnection.js')

async function getRandomCategory(language) {

    const db = await initializeAndGetConnection()

    const data = db
        .get(`hangmanWords.${language}`)
        .value()
        
    const categoriesList = Object.getOwnPropertyNames(data)

    const randomNumber = Math.trunc(

        Math.random() * (categoriesList.length - 0) + 0
    )

    return categoriesList[randomNumber]
}

module.exports = getRandomCategory