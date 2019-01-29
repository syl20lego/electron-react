const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

let window
const createWindow = () => {

  if (process.env.NODE_ENV === 'DEV') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'
    window = new BrowserWindow({
      width: 800, height: 600, webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      }
    })
    window.loadURL('http://localhost:3000/')
    window.webContents.openDevTools()
    // Install React Dev Tools
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
    installExtension(REACT_DEVELOPER_TOOLS).catch(console.log)
  } else {
    window = new BrowserWindow({
      width: 800, height: 600, webPreferences: {
        nodeIntegration: false,
      }
    })
    window.loadURL(url.format({
      pathname: path.join(__dirname, 'build', 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }
  window.on('closed', () => {
    window = null
  })
}
app.on('ready', () => createWindow())
