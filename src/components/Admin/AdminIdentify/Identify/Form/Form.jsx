import React, {useState} from 'react'
import Loading from '../../../../Game/components/Loading/Loading'
import AditionalText from './AditionalText/AditionalText'
import MessageContainer from './MessageContainer'
import FormActions from './Scripts/FormActions'

const Form = () => {

    const [option, setOption] = useState('login')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [adminReferredCode, setAdminReferredCode] = useState('')

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    const clearStates = () => {

        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setAdminReferredCode('')
        setMessage(false)
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

                            FormActions(e, [email, password], option, setLoading, setMessage)
                            clearStates()
                        }}
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} 
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
                            FormActions(e, [name, email, password, confirmPassword, adminReferredCode], option, setLoading, setMessage)
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
                            type="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} 
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

export default Form
