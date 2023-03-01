const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const { exec } = require('child_process');

let mainWindow;

// 调用python文件
const runPyFile = () => {
  exec('python src/py/hello.py', function(error, stdout, stderr){
    if(error){
      console.info(error);
    }
    console.log('exec: ' + stdout);
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#6e767c',
    // frame: false; // 无边框窗口设置
    icon: path.join(__dirname, '../source/logo.png'), // 图标
    // titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      // height: 60,
    }
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
  // runPyFile();

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