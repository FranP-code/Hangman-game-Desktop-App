import React, {useState} from 'react'
import { withRouter } from 'react-router'
import ResetPasswordFirebase from './Firebase Querys/ResetPasswordFirebase'
import Loading from '../../../../Loading/Loading'
import Messages from '../../../../Messages/Messages'

const PasswordRecovery = (props) => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState(false)

    const recoveryPassword = async (e) => {

        setLoading(true)
        setData(false)

        e.preventDefault()

        if (email === '') {

            setData({
                sucess: false,
                message: `Please, give your email for reset your password`
            })

            setLoading(false)
            return
        }

        const response = await ResetPasswordFirebase(email)

        setData(response)
        setEmail('')
        setLoading(false)
    }
    
    return (
        <>
            {
                loading ?
                    <Loading />
                : null
            }
            <header>
                <h1>Password Recovery</h1>
                <button
                    className="redirect-button"
                    onClick={() => props.history.push('/identify')}
                >
                    Back to identify
                </button>
            </header>

            <div className="form-container">
            {
                data ?
                    <Messages data={data}/>
                : null
            }
                <form
                    onSubmit={(e) => recoveryPassword(e)}
                >
                    <input
                        type="email"
                        placeholder="Your email"
                        onChange={(e) => setEmail(e.target.value)}   
                        value={email} 
                    />
                    <input type="submit" value="Send recovery email" />
                </form>
            </div>
        </>
    )
}

export default withRouter(PasswordRecovery)
