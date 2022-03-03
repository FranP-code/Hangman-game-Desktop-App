import { firestore } from "../../../../../../Firebase/Firebase_Config"
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const SignIn = async (data, setMessage) => {
    
    const auth = getAuth()
    const email = data[0]
    const password = data[1]

    try {

        const response = await signInWithEmailAndPassword(auth, email, password)

    } catch (error) {
        setMessage('User or Password wrong')
    }
}

export default SignIn
