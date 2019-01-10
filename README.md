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
```

## Edit package.json

```
  "main": "electron.js",
  "scripts": {
    "dev": "BROWSER=none react-scripts start & sleep 5 && electron .",
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
```


```
yarn add -D electron-packager
```

```
    "package-mac": "react-scripts build; electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",
    "package-win": "react-scripts build; electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/windows/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"ShoppingList\"",
    "package-linux": "react-scripts build; electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/linux/icon.png --prune=true --out=release-builds"

```

```
  "homepage": "./",
```










## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
