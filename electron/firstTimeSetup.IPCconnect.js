const { ipcMain } = require('electron')
const fs = require('fs')
const path = require('path'); 

//Check if the user is sign in for first time
ipcMain.on('check-first-time-user', async (event) => {

    function checkFiles() {
        
        function checkFileExistance(file) {

            try {
                const data = fs.existsSync(file, 'utf8')
                console.log(data)
                return data
            } catch (err) {
                console.error(err)
                return false
            }        
        }

        function formatPath(file) {
            return path.join(__dirname, "..", file);
        }

        const hangmanWordsDB = formatPath('DB_HangmanWords.json')
        
        const usersDB = formatPath('DB_Users.json')
        
        if (checkFileExistance(hangmanWordsDB) && checkFileExistance(usersDB)) {
            return false
        } else {
            return true
        }
    }

    const response = checkFiles()
    console.log(response)

    event.reply('check-first-time-user-reply', response)
})