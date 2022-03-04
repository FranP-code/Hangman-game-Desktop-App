const {initializeAndGetConnection} = require('../databaseConnection.js')
const { v4: uuidv4 } = require('uuid');

async function addUser(obj) {

    const db = await initializeAndGetConnection()
    
    const documentId = uuidv4()
    obj.id = documentId

    const users = db
        .get('users')
        .push(obj)
        .write()
    
    const user = db
        .get('users')
        .find({id: documentId})
        .value()

    return user
}

module.exports = addUser