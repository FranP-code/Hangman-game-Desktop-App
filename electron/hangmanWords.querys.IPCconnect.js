const { ipcMain } = require('electron')
const DatabaseQuerysFactory = require('./hangmanWordsDatabase/DatabaseQuerysFactory.js')
const databaseQuerys = DatabaseQuerysFactory()

const checkToken = require('./checkToken.js')

//! Get languages
ipcMain.on('hangman-words-querys-get-languages', async (event) => {
    const languages = await databaseQuerys.getAllLanguages()

    event.reply('hangman-words-querys-get-languages-reply', languages)
})

//! Get categories
ipcMain.on('hangman-words-querys-get-categories', async (event, arg) => {
    console.log(arg)
    
    const categories = await databaseQuerys.getAllCategorys(arg)

    event.reply('hangman-words-querys-get-categories-reply', categories)
})

//! Add words
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

    async function addWords() {

        //Check user token
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

        return {
            status: "success",
            message: "All words added to database",
            words: arg.words
        }
    }

    const response = await addWords()

    event.reply('hangman-words-querys-add-words-array-reply', response)
})

//! Add category
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

    async function addCategory() {

        //Check user token
        const checkTokenResponse = await checkToken(arg.userData.accessToken)
        
        if (checkTokenResponse.status === "error") {
            return checkTokenResponse
        }

        //Execute add category query
        return await databaseQuerys.addCategory(arg.language, arg.category, arg.firstWord)

    }

    const response = await addCategory()
    event.reply('hangman-words-querys-add-category-reply', response)
})

//! Delete category
ipcMain.on('hangman-words-querys-delete-category', async (event, arg) => {
    arg = JSON.parse(arg)
    console.log(arg)

    /**
     * arg: {
     *  language: string,
     *  category: string,
     *  userData: {
     *    accessToken: string
     *  }
     * }
    */

    async function deleteCategory() {

        //Check user token
        const checkTokenResponse = await checkToken(arg.userData.accessToken)
    
        if (checkTokenResponse.status === "error") {
            return checkTokenResponse
        }

        //Execute delete category query
        return await databaseQuerys.deleteCategory(arg.language, arg.category)
    }

    const response = await deleteCategory()
    event.reply('hangman-words-querys-delete-category-reply', response)
})

//! Get all words from category
ipcMain.on('hangman-words-querys-get-all-words-from-category', async (event, arg) => {
    arg = JSON.parse(arg)
    console.log(arg)

    /**
     * language: string,
     * category: string
    */

    //Execute get all words from category query
    const response = await databaseQuerys.getAllWordsFromCategory(arg.language, arg.category)

    event.reply('hangman-words-querys-get-all-words-from-category-reply', response)
})

//! Delete words
ipcMain.on('hangman-words-querys-delete-word', async (event, arg) => {
    arg = JSON.parse(arg)
    console.log(arg)

    /**
     * arg: {
     *  language: string,
     *  category: string,
     *  word: string,
     *  userData: {
     *    accessToken: string
     *  }
     * }
    */
    
    async function deleteWord() {

        //Check user token
        const checkTokenResponse = await checkToken(arg.userData.accessToken)
        
        if (checkTokenResponse.status === "error") {
            return checkTokenResponse
        }

        //Execute delete word query

        return await databaseQuerys.deleteSpecificWord(arg.language, arg.category, arg.word)
    }

    const response = await deleteWord()

    event.reply('hangman-words-querys-delete-word-reply', response)
})

//! Edit word
ipcMain.on('hangman-words-querys-edit-word', async (event, arg) => {
    arg = JSON.parse(arg)
    console.log(arg)

    /**
     * language: string,
     * category: string,
     * oldWord: string,
     * newWord: string,
     * userData: {
     *  accessToken: string
     * }
    */

    async function editWord() {

        //Check user token
        const checkTokenResponse = await checkToken(arg.userData.accessToken)
        
        if (checkTokenResponse.status === "error") {
            return checkTokenResponse
        }

        //Execute modify specific word query
        return await databaseQuerys.modifySpecificWord(arg.language, arg.category, arg.oldWord, arg.newWord)
    }

    const response = await editWord()

    event.reply('hangman-words-querys-edit-word-reply', response)
})