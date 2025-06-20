const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
let mainWindow

async function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })
    await mainWindow.loadFile(path.join(__dirname, './view/index.html'))
    server = require('./db/databaseServer')
    
}

ipcMain.on('login-success', () =>{
    if (mainWindow) {
        mainWindow.loadFile(path.join(__dirname, './view/telaNotas.html'))
    }
})

ipcMain.on('abrir-cadastro', () =>{
    if (mainWindow){
        mainWindow.loadFile(path.join(__dirname, './view/cadastro.html'))
    }
})


app.whenReady().then(createMainWindow)


ipcMain.on('fechar', () =>{
    app.quit()
})

app.on('window-all-closed', () =>{
    if (process.platform !== 'darwin') app.quit()
})