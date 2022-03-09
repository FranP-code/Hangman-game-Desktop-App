const {initializeAndGetConnection} = require('../databaseConnection.js')

async function checkIfUserAndPasswordExists(username, password) {
    
    const db = await initializeAndGetConnection()

    console.log(username)

    const user = db
        .get('users')
        .find({username: username})
        .value()

    if (!user) {
        return {
            status: "error",
            message: "User don't found"
        }
    }

    const bcrypt = require('bcrypt');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return {
            status: "error",
            message: "Password don't match"
        }
    }

    return {
        status: "success",
        message: "User logged",
        data: user
    }
}

module.exports = checkIfUserAndPasswordExists