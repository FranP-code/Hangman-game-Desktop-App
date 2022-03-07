const { ipcMain } = require('electron')
const DatabaseQuerysFactory = require('./hangmanWordsDatabase/DatabaseQuerysFactory.js')
const databaseQuerys = DatabaseQuerysFactory()

//Send random word

ipcMain.on('hangman-words-get-random-word', async (event, args) => {
  
  args = JSON.parse(args)

  const data = await databaseQuerys.getRandomWord( args.language )

  event.reply('hangman-words-get-random-word-reply', data)
})

//Send all categories

ipcMain.on('hangman-words-get-all-categories', async (event, args) => {

  args = JSON.parse(args)

  const data = await databaseQuerys.getAllCategorys( args.language )
  console.log('categories data', data)

  event.reply('hangman-words-get-all-categories-reply', data)
})

//Send all languages

ipcMain.on('hangman-words-get-all-languages', async (event, args) => {

  args = JSON.parse(args)

  const data = await databaseQuerys.getAllLanguages()

  event.reply('hangman-words-get-all-languages-reply', data)
})