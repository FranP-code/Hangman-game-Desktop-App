import React, {useState} from 'react'
import Loading from '../../../../Game/components/Loading/Loading'
import AditionalText from './AditionalText/AditionalText'
import MessageContainer from './MessageContainer'
import { toast } from 'react-toastify';
import {withRouter} from 'react-router'

const { ipcRenderer } = window.require('electron')

const Form = ({setUserData, history}) => {

    const [option, setOption] = useState('login')

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [adminReferredCode, setAdminReferredCode] = useState('')

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    const clearStates = () => {

        setPassword('')
        setConfirmPassword('')
        setAdminReferredCode('')
        setMessage(false)
    }

    function loginUser(e) {
        e.preventDefault()

        const ipcArgs = JSON.stringify({
            username: name,
            password
        })

        ipcRenderer.send('users-login', ipcArgs)

        ipcRenderer.once('users-login-reply', (event, arg) => {
            
            console.log(arg)
            
            toast[arg.status](arg.message, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            setUserData(arg)
            setLoading(false)

            setTimeout(() => {
                history.push('/admin-place')
            }, 3000);
        })
    }

    function registerUser(e) {

        e.preventDefault()

        const ipcArgs = JSON.stringify({
            name,
            password,
            confirmPassword,
            adminReferredCode
        })
    
        ipcRenderer.send('users-add-user', ipcArgs)

        ipcRenderer.once('users-add-user-reply', (event, arg) => {
            
            console.log(arg)
            setLoading(false)

            toast[arg.status](arg.message, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        })
    }

    return (
        <div className="form-container">
            {
                message ?
                    <MessageContainer message={message} />
                : null
            }
            <nav className="options-container">
                <div
                    className={option === 'login' ? "active option" : 'option'}
                    onClick={() => {
                        setOption('login')
                        clearStates()
                    }}
                >

                    LOGIN
                </div>
                
                <div
                    className={option === 'register' ? "active option" : 'option'}
                    onClick={() => {
                        setOption('register')
                        clearStates()
                    }}
                >
                    REGISTER
                </div>
            </nav>
            {
                option === 'login' ?

                    <form
                        onSubmit={(e) => {
                            setLoading(true)
                            loginUser(e)
                            // FormActions(e, [email, password], option, setLoading, setMessage)
                            clearStates()
                        }}
                    >
                        <input
                            type="text"
                            placeholder="User"
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name} 
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} 
                        />
                        <input type="submit" value="Login"/>
                    </form>

                : null
            }
            {
                option === 'register' ?

                    <form
                        onSubmit={(e) => {
                            registerUser(e)
                            clearStates()
                            setLoading(true)
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password} 
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}    
                            value={confirmPassword} 
                        />
                        <input
                            type="password"
                            placeholder="Admin Referred Code"
                            required
                            onChange={(e) => {setAdminReferredCode(e.target.value)}}
                            value={adminReferredCode} 
                        />
                        <input type="submit" value="Register" />
                    </form>
                    
                : null
            }
            {
                loading ?
                    <Loading />
                : null
            }
            <AditionalText text={`Don't remember your password?`} link={'/password-recovery'}/>
            <AditionalText text={'Admin place demo look'} link={'/admin-place/demo'}/>

        </div>
    )
}

export default withRouter(Form)