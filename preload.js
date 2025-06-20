const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('api', {
    sendLoginSuccess: () => ipcRenderer.send('login-success'),
    abrirCadastro: () => ipcRenderer.send('abrir-cadastro')
})