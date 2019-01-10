const { app, BrowserWindow } = require('electron')

let window
const createWindow = () => {


  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'
  window = new BrowserWindow({
    width: 800, height: 600, webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    }
  })
  window.loadURL('http://localhost:3000/')
  window.webContents.openDevTools()
  window.on('closed', () => {
    window = null
  })
}
app.on('ready', () => createWindow())