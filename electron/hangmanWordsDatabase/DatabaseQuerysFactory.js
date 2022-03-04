const addWord = require('./querys/addWord.js')
const getAllWords = require('./querys/getAllWords.js')
const getAllWordsFromLanguage = require('./querys/getAllWordsFromLanguage.js')
const getAllWordsFromCategory = require('./querys/getAllWordsFromCategory.js')
const modifySpecificWord = require('./querys/modifySpecificWord.js')
const deleteSpecificWord = require('./querys/deleteSpecificWord.js')

function DatabaseQuerysFactory() {

    return {
        addWord,
        getAllWords,
        getAllWordsFromLanguage,
        getAllWordsFromCategory,
        modifySpecificWord,
        deleteSpecificWord
    }
}

module.exports = DatabaseQuerysFactory