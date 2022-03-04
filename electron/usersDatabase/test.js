const DatabaseQuerysFactory = require('./DatabaseQuerysFactory')

const databaseQuerys = DatabaseQuerysFactory()

// databaseQuerys.addUser({
//     user: "admin456",
//     password: "passwordSec1235"
// })

// databaseQuerys.getUsersById([
//     'fb3ae2e7-c7ae-4a52-b7e9-0f90ed28d5ac',
//     'b23fb6b8-95fa-4850-8ac1-890ce9365c6c',
//     'f32d1d62-8190-4c7a-976a-24ba6a30d926',
//     '8158c8d5-afbe-4c13-b08c-4731f8cd7472'
// ])

// databaseQuerys.getAllUsers()

// databaseQuerys.modifyUser("lalala", {
//     user: "new username",
//     password: "new password",
//     id: "6875daf4-e5ba-483b-a2bc-18bf48f92464"
// })

// const removeAll = async () => {

//     const users = await databaseQuerys.getAllUsers()
    
//     users.forEach(user => {
        
//         databaseQuerys.removeUser(user.id)
//     });
// }

// removeAll()