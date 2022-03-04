const DatabaseQuerysFactory = require('./DatabaseQuerysFactory.js')

const databaseQuerys = DatabaseQuerysFactory()

databaseQuerys.addWord('dog', "english", "animals")

databaseQuerys.getAllWords()

databaseQuerys.getAllWordsFromLanguage('spanish')

databaseQuerys.getAllWordsFromCategory('english', 'animals')

databaseQuerys.modifySpecificWord('english', 'animals', 'CeT', 'CAT')

databaseQuerys.deleteSpecificWord('english', 'animals', 'koala')