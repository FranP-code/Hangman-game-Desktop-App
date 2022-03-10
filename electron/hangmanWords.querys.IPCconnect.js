const { ipcMain } = require('electron')
const DatabaseQuerysFactory = require('./hangmanWordsDatabase/DatabaseQuerysFactory.js')
const databaseQuerys = DatabaseQuerysFactory()

ipcMain.on('hangman-words-querys-get-languages', async (event) => {
    const languages = await databaseQuerys.getAllLanguages()

    event.reply('hangman-words-querys-get-languages-reply', languages)
})

ipcMain.on('hangman-words-querys-get-categories', async (event, arg) => {
    const categories = await databaseQuerys.getAllCategorys(arg)

    event.reply('hangman-words-querys-get-categories-reply', categories)
})

ipcMain.on('hangman-words-querys-add-words-array', async (event, arg) => {
    
    arg = JSON.parse(arg)
    /**
     * arg: {
     *  userData: {
     *     accessToken: "string"
     *  }
     *  language: string,
     *  category: string,
     *  words: [word, word, word, ...]
     * }
    */

    //Check user token
    const checkToken = require('./checkToken.js')
    const checkTokenResponse = await checkToken(arg.userData.accessToken)

    if (checkTokenResponse.status === "error") {

        return checkTokenResponse
    }

    //For each word, send a 'Add word' query
    for (let i = 0; i < arg.words.length; i++) {
        const response = await databaseQuerys.addWord(arg.words[i], arg.language, arg.category)
    
        if (response.status === 'error') {

            return response
        }
    }

    event.reply('hangman-words-querys-add-words-array-reply', {
        status: "success",
        message: "All words added to database",
        words: arg.words
    })
})

ipcMain.on('hangman-words-querys-add-category', async (event, arg) => {
    arg = JSON.parse(arg)
    console.log(arg)

    /**
     * arg: {
     *  language: string,
     *  category: string,
     *  firstWord: string
     *  userData: {
     *    accessToken: string
     *  }
     * }
    */

    //Check user token
    const checkToken = require('./checkToken.js')
    const checkTokenResponse = await checkToken(arg.userData.accessToken)

    if (checkTokenResponse.status === "error") {

        return checkTokenResponse
    }

    //Execute add category query
    const response = await databaseQuerys.addCategory(arg.language, arg.category, arg.firstWord)

    event.reply('hangman-words-querys-add-category-reply', response)
})