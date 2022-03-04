const {initializeAndGetConnection} = require('../databaseConnection')

async function modifyUser(id, newDoc) {
    
    const db = await initializeAndGetConnection()

    try {
        db.get('users')
            .find({id: id})
            .assign(newDoc)
            .write()

    } catch (error) {
        console.log(error)
    }
}

module.exports = modifyUser