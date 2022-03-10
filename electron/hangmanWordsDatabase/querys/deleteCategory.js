const {initializeAndGetConnection} = require('../databaseConnection.js')

async function deleteCategory(language, category) {
    const db = await initializeAndGetConnection()

    try {  
        const dbState = await db.getState()
        console.log(dbState)

        delete dbState.hangmanWords[language][category]
        console.log(dbState)

        const a = await db.write(dbState)
        console.log(a)

        return {
            status: 'success',
            message: 'Category deleted'
        }
    
    } catch(error) {
        return {
            status: "error",
            message: error
        }
    }
}

module.exports = deleteCategory