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

function sendToPython() {
  const input = {value: 12};
  var python = require('child_process').spawn('python', ['src/py/hello.py', input.value]);
  python.stdout.on('data', function (data) {
    console.log("Python response: ", data.toString('utf8'));
    // result.textContent = data.toString('utf8');
  });
 
  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
 
  python.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#6e767c',
    resizable: false, //禁止改变主窗口尺寸
    icon: path.join(__dirname, 'public/source/logo.png'), // 图标
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.webContents.openDevTools(); // 开发者模式
  } else {
    mainWindow.loadFile(path.join(__dirname, 'build/index.html')); // 
  }
  
  // require('./menu.js'); // 顶部菜单自定义修改
  // runPyFile();
  sendToPython();
  mainWindow.setMenu(null); // 隐藏默认菜单

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