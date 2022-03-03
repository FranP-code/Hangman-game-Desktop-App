import {getAuth, sendPasswordResetEmail } from 'firebase/auth'


const ResetPasswordFirebase = async (email) => {

    
    try {
        const auth = getAuth()
        const response = await sendPasswordResetEmail(auth, email)

        return {
            sucess: true,
            message: `Recovery email send!`
        }

    }  catch(error) {

        return {
            sucess: false,
            message: `There's been an error sending the email...`
        }
    }
}

export default ResetPasswordFirebase
