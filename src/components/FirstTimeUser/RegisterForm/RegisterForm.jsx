import React, { useContext, useRef, useState } from 'react'
import UserDataContext from '../../../contexts/UserDataContext'
import Toast from '../Toast/Toast'
const { ipcRenderer } = window.require('electron')

const RegisterForm = ({user, setUser}) => {
    
    const context = useContext(UserDataContext)

    const usernameInput = useRef('')
    const passwordInput = useRef('')
    const confirmPasswordInput = useRef('')


    function submitForm(e) {
        e.preventDefault()

        const username = usernameInput.current.value
        const password = passwordInput.current.value
        const confirmPassword = confirmPasswordInput.current.value

        //Inputs checks
        if (username === '') {
            Toast('error', "Username don't placed")
            return
        }

        if (password === '') {
            Toast('error', "Password don't placed")
            return
        }

        if (password.length < 6) {
            Toast('error', "Password too short")
            return
        }

        if (confirmPassword === '') {
            Toast('error', "Confirm password don't placed")
            return
        }

        if (password !== confirmPassword) {
            Toast('error', "Password and confirm password don't match")
            return
        }

        const ipcArgs = JSON.stringify({
            username,
            password,
            confirmPassword
        })

        ipcRenderer.send('users-add-user', ipcArgs)

        ipcRenderer.once('users-add-user-reply', (event, arg) => {
            
            const ipArgs = JSON.stringify({username, password})
            
            ipcRenderer.send('users-login', ipArgs)

            ipcRenderer.once('users-login-reply', (event, arg) => {

                console.log(arg)

                Toast(arg.status, arg.message)

                setUser(arg.data)

                if (arg.status === 'success') {
                
                    context.setUserData(arg)
                }
            })
        })
    }
    return (
        <>
            {
                !user ?
                    <form onSubmit={e => submitForm(e)}>
                        <input type="text" placeholder='Username' ref={usernameInput}/>
                        <input type="password" placeholder='Password' ref={passwordInput}/>
                        <input type="password" placeholder='Confirm Password' ref={confirmPasswordInput}/>
                        <input type="submit" value="Register" />
                    </form>
                : 
                    <div>
                        <h2 className='title-two' style={{color: "#43ff3c"}}>User created!</h2>
                        <h4 className='title-four sub-title'>You can continue...</h4>
                    </div>
            }
        </>
    )
}

export default RegisterForm