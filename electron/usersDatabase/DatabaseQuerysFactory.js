const addUser = require('./querys/addUser.js')
const getUsersById = require('./querys/getUsersById.js')
const getAllUsers = require('./querys/getAllUsers.js')
const modifyUser = require('./querys/modifyUser.js')
const removeUser = require('./querys/removeUser.js')
const searchForAdminRefferCode = require('./querys/searchForAdminRefferCode.js')
const checkIfUserAndPasswordExists = require('./querys/checkIfUserAndPasswordExists.js')

const DatabaseQuerysFactory = () => {

    return {
        addUser,
        getUsersById,
        getAllUsers,
        modifyUser,
        removeUser,
        searchForAdminRefferCode,
        checkIfUserAndPasswordExists
    }
}

module.exports = DatabaseQuerysFactory