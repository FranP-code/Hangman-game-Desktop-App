const {initializeAndGetConnection} = require('../databaseConnection.js')
const { v4: uuidv4 } = require('uuid');

async function addUser(obj) {

    console.log(obj)

    const db = await initializeAndGetConnection()
    
    const documentId = uuidv4()
    obj.id = documentId

    const userWithTheSameUsername = db
        .get('users')
        .find({username: obj.username})
        .value()

    if (userWithTheSameUsername) {

        return {
            status: "error",
            message: "Username already introduced"
        }
    }

    db.get('users')
        .push(obj)
        .write()
    
    const user = db
        .get('users')
        .find({id: documentId})
        .value()

    return {
        status: "success",
        message: "User created",
        data: user
    }
}

module.exports = addUser