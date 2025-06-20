const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('api', {
    sendLoginSuccess: () => ipcRenderer.send('login-success'),
    redirecionar: (destino) => ipcRenderer.send('redirecionar', destino)
})