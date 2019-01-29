This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Verify installation

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Note: Your app is NOT ready to be deployed! We still need to setup Electron

# Create Electron application

## First add Electron package (note: development only)
```
yarn add -D electron
```

## Create a electron.js file

Minimal implementation

```
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
}
app.on('ready', () => createWindow())
```

## Edit package.json

```
  "main": "electron.js",
  "scripts": {
    "start": "BROWSER=none react-scripts start & sleep 5 && NODE_ENV=DEV electron .",
    "electron": "react-scripts build; electron .",
```

In the project directory, you can run:
### `yarn dev`

Runs the app in the development mode.<br>
This will also start the Electron Application

### `yarn electron`

Runs the app in the production mode.<br>
This will also start the Electron Application

# Add React Dev Tools

## electron-devtools-installer
```
yarn add -D electron-devtools-installer
```

## Edit a electron.js file

```
    window.loadURL('http://localhost:3000/')
    window.webContents.openDevTools()
    // Install React Dev Tools
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
    installExtension(REACT_DEVELOPER_TOOLS).catch(console.log)
  } else {
```


In the project directory, you can run:
### `yarn dev`

# Add Electron packager
```
yarn add -D electron-packager
```

## package.json

```
    "package-mac": "react-scripts build; electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",
    "package-win": "react-scripts build; electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/windows/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"ShoppingList\"",
    "package-linux": "react-scripts build; electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/linux/icon.png --prune=true --out=release-builds"

```

```
  "homepage": "./",
```
## Add icons

Add icons under `asserts/icons`

# Build production application

## yarn package-*

`yarn package-mac`
`yarn package-linux`
`yarn package-win`
