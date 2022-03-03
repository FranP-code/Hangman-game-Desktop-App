import React from 'react'
import BringAdminCode from '../Firebase Querys/BringAdminCode'
import RegisterNewUser from '../Firebase Querys/RegisterNewUser'
import MakeRandomString from './MakeRandomString'

const ValidateRegister = async (data, setMessage) => {
    
    const name = data[0]
    const email = data[1]
    const password = data[2]
    const confirmPassword = data[3]
    const adminRefferCode = data[4]

    if (password.length < 6) {

        setMessage('Password too short')
        return false
    }

    if (password !== confirmPassword) {
        
        setMessage('The Passwords not match')
        return false
    }

    const documents = await BringAdminCode()

    let adminRefferCodeIsValid = false

    documents.forEach(document => {
        
        if (adminRefferCode === document.refferCode) {
            
            adminRefferCodeIsValid = true

            const position = document.position
            const refferCode = MakeRandomString(30)
            RegisterNewUser(name, email, password, setMessage, position, refferCode)
        }
    });

    if (!adminRefferCodeIsValid) {
        setMessage('Admin Reffer Code not valid')
    }

}

export default ValidateRegister
