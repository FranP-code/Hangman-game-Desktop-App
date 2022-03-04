const {initializeAndGetConnection} = require('../databaseConnection.js')

async function getAllUsers() {

    const db = await initializeAndGetConnection()

    const data = db
        .get('users')
        .value()
    
    console.log(data)
    return data
}

module.exports = getAllUsers