const {initializeAndGetConnection} = require('../databaseConnection.js')

async function addWord(word, language, category) {
    word = word.toLowerCase()
    const db = await initializeAndGetConnection()

    const searchWordOnDatabase = db
        .get(`hangmanWords.${language}.${category}.words`)
        .value()
        .includes(word)
    
    if (!searchWordOnDatabase) {
        db
        .get(`hangmanWords.${language}.${category}.words`)
        .push(word)
        .write()
        return {
            status: 'success'
        }
    } else {
        console.error('word already on database')
        return {
            status: 'error'
        }
    }
}

module.exports = addWord