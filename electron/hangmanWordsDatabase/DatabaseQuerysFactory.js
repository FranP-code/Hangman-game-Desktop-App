const addWord = require('./querys/addWord.js')
const getAllWords = require('./querys/getAllWords.js')
const getAllWordsFromLanguage = require('./querys/getAllWordsFromLanguage.js')
const getAllWordsFromCategory = require('./querys/getAllWordsFromCategory.js')
const modifySpecificWord = require('./querys/modifySpecificWord.js')
const deleteSpecificWord = require('./querys/deleteSpecificWord.js')
const getRandomCategory = require('./querys/getRandomCategory.js')
const getRandomWord = require('./querys/getRandomWord.js')
const getAllCategorys = require('./querys/getAllCategorys.js')
const getAllLanguages = require('./querys/getAllLanguages.js')
const addCategory = require('./querys/addCategory.js')
const deleteCategory = require('./querys/deleteCategory.js')
const bulkAddPackWords = require('./querys/bulkAddPackWords.js')
const addLanguage = require('./querys/addLanguage.js')

function DatabaseQuerysFactory() {

    return {
        addWord,
        getAllWords,
        getAllWordsFromLanguage,
        getAllWordsFromCategory,
        modifySpecificWord,
        deleteSpecificWord,
        getRandomCategory,
        getRandomWord,
        getAllCategorys,
        getAllLanguages,
        addCategory,
        deleteCategory,
        bulkAddPackWords,
        addLanguage
    }
}

module.exports = DatabaseQuerysFactory