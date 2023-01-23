const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 600,
  });
  // mainWindow.loadFile('./public/index.html');
  // console.log(isDev);

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000/');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
  }

  mainWindow.webContents.openDevTools();
  require('../components/menu.js'); // 顶部菜单自定义修改

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin'){
    app.quit();
  }
})
app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
})

ipcMain.on('openRender', (event, avg) => {
  let renderWindow = null;
  const {width, height} = avg
  renderWindow = new BrowserWindow({
      width,
      height,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
      }
  })
  renderWindow.webContents.loadURL('http://localhost:3000/Recognition')
})