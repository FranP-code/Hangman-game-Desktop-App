const {initializeAndGetConnection} = require('../databaseConnection')

async function addLanguage(language) {
    language = language.toLowerCase()

    const db = await initializeAndGetConnection()

    //Check if the language already exists
    const searchLanguageOnDatabase = db
        .get(`hangmanWords.${language}`)
        .value()

    if (!searchLanguageOnDatabase) {

        //Write language on database
        try {
            const dbState = await db.getState()

            dbState.hangmanWords[language] = {}

            db.write(dbState)
            
            return {
                status: 'success',
                message: 'Language added'
            }

        } catch (error) {
            return {
                status: "error",
                message: error
            }
        }

    } else {
        return {
            status: "error",
            message: "Language already exists on database"
        }
    }
}

module.exports = addLanguage