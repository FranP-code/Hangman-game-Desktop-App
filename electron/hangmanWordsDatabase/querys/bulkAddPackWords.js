const { initializeAndGetConnection } = require("../databaseConnection")

async function bulkAddPackWords(packWords) {
    const db = await initializeAndGetConnection(packWords)

    // try {
    //     const response = await db.setState(packWords)
    //     console.log(response)

        return {
            status: "success",
            message: "Database initializated with word pack"
    //     }
    // } catch (error) {
    //     return {
    //         status: "error",
    //         message: error
    //     }
    }
}

module.exports = bulkAddPackWords