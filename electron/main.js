const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')


// Hot Reload with Electron

if (process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, "../node_modules", ".bin", "electron")
  })
}

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  // Make window take 100% of the screen
  win.maximize()

  // Apply menu bar
  const mainMenu = Menu.buildFromTemplate(templateMenu)
  Menu.setApplicationMenu(mainMenu)
}

// Initialize menu bar
const templateMenu = []

// Set production menu bar
if (process.env.NODE_ENV !== "production") {
  templateMenu.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Show/Hide Chrome Dev Tools",
        accelerator: "F12",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      },
      {
        role: "reload",
      }
    ]
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//Project inizialization credits: https://medium.com/folkdevelopers/the-ultimate-guide-to-electron-with-react-8df8d73f4c97

ipcMain.on('hangman-words-database-query', async (event, args) => {

  const DatabaseQuerysFactory = require('./hangmanWordsDatabase/DatabaseQuerysFactory.js')
  const databaseQuerys = DatabaseQuerysFactory()
  
  args = JSON.parse(args)
  console.log(args)
  
  let data
    
  switch (args.query) {
    case "getRandomWord":
      console.log('getRandomWord')

      data = await databaseQuerys.getRandomWord( args.language )
      break;
  
    default:
      break;
  }

  console.log(data)

  event.reply('hangman-words-database-query-reply', data)
})