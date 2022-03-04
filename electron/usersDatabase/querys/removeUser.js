const {initializeAndGetConnection} = require('../databaseConnection')

async function removeUser(id) {
    const db = await initializeAndGetConnection()

    try {
        db.get('users')
        .remove({id: id})
        .write()
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = removeUser