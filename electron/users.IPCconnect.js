const { ipcMain } = require('electron')
const DatabaseQuerysFactory = require('./usersDatabase/DatabaseQuerysFactory.js')
const databaseQuerys = DatabaseQuerysFactory()

function inputsValidation(arg) {
    
    if (arg.password.length < 6) {
        return {
            status: "error",
            message: "Password too short"
        }
    }
    
    if (arg.password !== arg.confirmPassword) {
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



ipcMain.on('users-add-user', async (event, arg) => {
    
    async function addUser() {

        arg = JSON.parse(arg)
        console.log(arg)

        /**
         * arg = {
         *  name: username
         *  password: password
         *  confirmPassword: password
         *  adminReferredCode: adminReferredCode
         * }
        */

        // Check that inputs are valid
        const responseInputsValidation = inputsValidation(arg)
        if (responseInputsValidation.status === "error") {
            return { status: "error", message: "Inputs not valids"}
        }

        // Search for reffer code on database
        const authorization = await databaseQuerys.searchForAdminRefferCode(arg.adminReferredCode)
        if (authorization.status !== 'success') {   
            return { status: "error", message: "Admin reffer code not valid"}
        }

        // Encrypt user data
        const bcrypt = require('bcrypt');
        const Cryptr = require('cryptr');
        const { v4: uuidv4 } = require('uuid');

        const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
        const userData = {}

        userData.username = arg.name
        userData.password = await bcrypt.hash(arg.password, parseInt(process.env.BYCRYPT_SALT_ROUNDS))
        userData.adminRefferCode = cryptr.encrypt(uuidv4())
        userData.refferedByUser = {id: authorization.user.id}

        // Add data to database
        const responseAddUser = await databaseQuerys.addUser(userData)

        return responseAddUser
    }

    const data = await addUser()

    event.reply('users-add-user-reply', data)
})

ipcMain.on('users-login', async (event, arg) => {
    
    async function login() {

        /**
         * arg = {
         *  username: username
         *  password: password
         * }
        */

        arg = JSON.parse(arg)
        console.log(arg)

        // Check credentials on DB
        const response = await databaseQuerys.checkIfUserAndPasswordExists(arg.username, arg.password)
        
        if (response.status === "error") {
            return response
        }

        // Generate Access Token for logged user

        const jwt = require('jsonwebtoken')
        const accessToken = jwt.sign({user: response.data}, process.env.JWT_SECRET_KEY)

        response.accessToken = accessToken
        
        return response
    }

    const response = await login()

    event.reply('users-login-reply', response)
    
})