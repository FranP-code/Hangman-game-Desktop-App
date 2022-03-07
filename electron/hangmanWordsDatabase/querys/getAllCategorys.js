const {initializeAndGetConnection} = require('../databaseConnection.js')

async function getAllCategorys(language) {

    console.log(language)

    const db = await initializeAndGetConnection()

    console.log('language', language)
    console.log(`hangmanWords.${language}`)

    const data = db
        .get(`hangmanWords.${language}`)
        .value()

    console.log('data', data)
        
    // const categoriesList = Object.getOwnPropertyNames(data)
    let categoriesList = Object.entries(data)
    categoriesList = categoriesList.map(categorie => {return {text: categorie[0], image: categorie[1].icon}})

    return categoriesList
}

module.exports = getAllCategorys