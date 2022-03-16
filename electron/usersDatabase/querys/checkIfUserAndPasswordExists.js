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

    delete user.password

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);

    console.log(user.adminRefferCode)

    user.adminRefferCode = cryptr.decrypt(user.adminRefferCode)

    console.log(user.adminRefferCode)

    return {
        status: "success",
        message: "User logged",
        data: user
    }
}

module.exports = checkIfUserAndPasswordExists