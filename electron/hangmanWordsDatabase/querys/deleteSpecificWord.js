const {initializeAndGetConnection} = require('../databaseConnection')

async function deleteSpecificWord(language, category, word) {
    word = word.toLowerCase()
    const db = await initializeAndGetConnection()

    const array = db.get(`hangmanWords.${language}.${category}`).value()

    if (array.includes(word)) {
        
        const position = array.indexOf(word)

        array.splice(position, 1)

        db
        .get(`hangmanWords.${language}.${category}`)
        .set(array)
        .write()

        return {
            status: "success"
        }
    }

    return {
        status: "error"
    }
}

module.exports = deleteSpecificWord