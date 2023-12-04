require('dotenv').config();
import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron';
import * as path from 'path';
import store from './store';
import { execSync } from 'child_process';
import Adb from '@devicefarmer/adbkit';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const client = Adb.createClient();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const handleStoreGetPassword = (event: IpcMainInvokeEvent, args: any[]) => {
  const key = args[0];
  return store.getPassword(key);
};

const handleStoreSetPassword = (event: IpcMainInvokeEvent, args: any[]) => {
  const key = args[0];
  const password = args[1];

  return store.setPassword(key, password);
};
let mainWindow;
const createWindow = (): void => {
  // Create the browser window.
    mainWindow = new BrowserWindow({
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation:true

    },
    icon: path.resolve(__dirname, '../public/favicon.ico'),
  });

  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (process.env.appEnv === 'dev') {
    mainWindow.webContents.openDevTools();
  }

  //
  ipcMain.handle('store:getPassword', handleStoreGetPassword);
  ipcMain.handle('store:setPassword', handleStoreSetPassword);
  ipcMain.handle('commands', async (_, args) => {
    // console.log('running cli',_, args)
    let result;
    if (args) {
      result = execSync(args).toString()
    }
    console.log(result);
    return result
  }
  )};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


app.whenReady().then(async () => {
  const devices = await client.listDevices();
  console.log(devices);
  
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
