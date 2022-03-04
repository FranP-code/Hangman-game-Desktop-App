const {initializeAndGetConnection} = require('../databaseConnection.js')

async function getUsersById(idsArray) {

    const db = await initializeAndGetConnection()

    const returnData = {}

    idsArray.forEach(id => {
        returnData[id] = db
            .get('users')
            .find({id: id})
            .value()    
    });

    console.log(returnData)

    return returnData
}

module.exports = getUsersById