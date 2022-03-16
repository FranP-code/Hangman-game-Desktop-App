const bcrypt = require('bcrypt');
const getAllUsers = require('./getAllUsers.js')

async function searchForAdminRefferCode(submitedAdminRefferCode) {

    const users = await getAllUsers()

    console.log(users)

    if (users.length === 0) {
        return {
            status: "success",
            user: {
                id: "self"
            }
        }
    }

    if (!submitedAdminRefferCode) {
        return {
            status: "error",
            message: "Reffer code don't introduced"
        }
    }

    for (let i = 0; i < users.length; i++) {

        console.log(users[i])
        
        const match = await bcrypt.compare(submitedAdminRefferCode, users[i].adminRefferCode);

        if (match) {

            return {
                status: "success",
                user: users[i]
            }
        }
        
    }

    //In case don't find user with that reffer code...

    return {
        status: "error",
        message: "Reffer code don't found"
    }
}

module.exports = searchForAdminRefferCode