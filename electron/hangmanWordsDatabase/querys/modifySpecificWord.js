const {initializeAndGetConnection} = require('../databaseConnection.js')

async function modifySpecificWord(language, category, word, newWord) {
    word = word.toLowerCase()
    newWord = newWord.toLowerCase()
    const db = await initializeAndGetConnection()

    const array = db.get(`hangmanWords.${language}.${category}.words`).value()

    if (array.includes(word) && !array.includes(newWord)) {
        console.log(word)
        
        const position = array.indexOf(word)

        array.splice(position, 1)
        array.push(newWord)
        
        db
        .get(`hangmanWords.${language}.${category}.words`)
        .set(array)
        .write()

        return {
            status: 'success'
        }
    }
    
    return {
        status: 'error'
    }
}

module.exports = modifySpecificWord