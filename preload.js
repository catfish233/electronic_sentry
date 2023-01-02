const { contextBridge, ipcRenderer } = require('electron');

// 将 Electron 的 process.versions 对象暴露给渲染器。
contextBridge.exposeInMainWorld('versions', {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	ping: () => ipcRenderer.invoke('ping'),
})