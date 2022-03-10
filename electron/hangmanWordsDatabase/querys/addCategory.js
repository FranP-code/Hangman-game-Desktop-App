const {initializeAndGetConnection} = require('../databaseConnection.js')

async function addCategory(language, category, firstWord) {
    const db = await initializeAndGetConnection()

    const searchCategoryOnDatabase = db
        .get(`hangmanWords.${language}`)
        .value()

    if (!searchCategoryOnDatabase[category]) {

        try {  
            const dbState = await db.getState()
            console.log(dbState)

            dbState.hangmanWords[language][category] = {}
            dbState.hangmanWords[language][category].words = [firstWord]

            console.log(dbState)

            const a = await db.write(dbState)
            console.log(a)

            return {
                status: 'success',
                message: 'Category added'
            }
        
        } catch (error) {
            return {
                status: "error",
                message: error
            }
        }

    } else {
        return {
            status: 'error',
            message: 'Word already on database'
        }
    }
}

module.exports = addCategory