async function checkToken(accessToken) {


    //Check if Access Token exists
    if (!accessToken) {
        return {
            status: "error",
            message: "Access Token not provided"
        }
    }

    //Check if Access Token is valid
    const jwt = require('jsonwebtoken')

    try {
        
        jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
    
        return {
            status: "success",
            message: "Access token valid"
        }
    } catch (error) {
        console.log(error)
        return {
            status: "error",
            message: "Access token not valid"
        }
    }
}

module.exports = checkToken