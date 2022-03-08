const { ipcMain } = require('electron')
const DatabaseQuerysFactory = require('./usersDatabase/DatabaseQuerysFactory.js')
const databaseQuerys = DatabaseQuerysFactory()

function inputsValidation(args) {
    
    if (args.password.length < 6) {
        return {
            status: "error",
            message: "Password too short"
        }
    }
    
    if (args.password !== args.confirmPassword) {
        return {
            status: "error",
            mesage: "Passwords don't match"
        }
    }

    return {
        status: "success"
    }

    //I know, it's too little validation, but, if you break the app for change the required of HTML elements, it's your problem...
}

ipcMain.on('users-add-user', async (event, args) => {

    async function addUser() {

        args = JSON.parse(args)
        console.log(args)

        /**
         * args = {
         *  name: username
         *  password: password
         *  confirmPassword: password
         *  adminReferredCode: adminReferredCode
         * }
        */

        // Check that inputs are valid
        const responseInputsValidation = inputsValidation(args)
        if (responseInputsValidation.status === "error") {
            return { status: "error", message: "Inputs not valids"}
        }

        // Search for reffer code on database
        const authorization = await databaseQuerys.searchForAdminRefferCode(args.adminReferredCode)
        if (authorization.status !== 'success') {   
            return { status: "error", message: "Admin reffer code not valid"}
        }

        // Encrypt user data
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        
        async function hashData(data) {
            console.log(data)
            return await bcrypt.hash(data, saltRounds)
        }

        const { v4: uuidv4 } = require('uuid');
        const userData = {}

        userData.name = await hashData(args.name)
        userData.password = await hashData(args.password)
        userData.adminRefferCode = uuidv4()
        userData.refferedByUser = {id: authorization.user.id}

        // Add data to database
        const responseAddUser = await databaseQuerys.addUser(userData)

        return responseAddUser
    }

    const data = await addUser()

    event.reply('users-add-user-reply', data)
})