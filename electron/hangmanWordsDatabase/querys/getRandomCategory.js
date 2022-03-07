const {initializeAndGetConnection} = require('../databaseConnection.js')

async function getRandomCategory(language) {

    const db = await initializeAndGetConnection()

    console.log('language', language)
    console.log(`hangmanWords.${language}`)

    const data = db
        .get(`hangmanWords.${language}`)
        .value()

    console.log('data', data)
        
    const categoriesList = Object.getOwnPropertyNames(data)
    console.log('categoriesList', categoriesList)

    const randomNumber = Math.trunc(

        Math.random() * (categoriesList.length - 0) + 0
    )

    console.log(categoriesList[randomNumber])

    return categoriesList[randomNumber]
}

module.exports = getRandomCategory