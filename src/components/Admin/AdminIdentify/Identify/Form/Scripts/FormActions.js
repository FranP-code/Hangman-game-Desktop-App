import SignIn from "../Firebase Querys/Sign In"
import ValidateRegister from "./ValidateRegister"

const FormActions = async (e, data, option, setLoading, setMessage) => {
    
    e.preventDefault()

    if (option === 'login') {
        await SignIn(data, setMessage)
        setLoading(false)
    }

    if (option === 'register') {
        
        await ValidateRegister(data, setMessage)
        setLoading(false)
    }
}

export default FormActions
