const { Menu, BrowserWindow } = require('electron');

// 顶部菜单自定义修改
let template = [
  {
    label: '人脸采集',
    submenu: [
      {
        label: 'JSON文件导入',
        accelerator:`ctrl+n`, // 快捷键设置
        click:()=>{
          let win = new BrowserWindow({
              width:500,
              height:500,
              webPreferences:{ nodeIntegration:true}
          })
          win.loadFile('yellow.html')
          win.on('closed',()=>{
              win = {};
          })
        }
      },
      {label: '人脸识别信息采集'}
    ]
  },
  {
    label: '人脸检测',
    submenu: [
      {label: '多人检测'},
      {label: '单人检测'}
    ]
  }
];

let menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);