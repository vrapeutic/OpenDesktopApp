require('dotenv').config();
import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron';
import * as path from 'path';
import * as nodePath from 'node:path';

import store from './store';
import serverStarterService from './services/serverStarterService';
import * as fs from 'fs';
import * as os from 'os';
import { REPORT_FILE_SAVE_PATH } from './constants';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const checkServiceExistence = (event: IpcMainInvokeEvent, args: string[]) => {
  const deviceId = args[0];
  return serverStarterService.discoverer?.checkServiceExistence(deviceId);
};
const checkNetworkConnection = () => {
  return serverStarterService.discoverer?.checkNetworkConnection();
};

const handleStoreGetPassword = (event: IpcMainInvokeEvent, args: any[]) => {
  const key = args[0];
  return store.getPassword(key);
};

const handleStoreSetPassword = (event: IpcMainInvokeEvent, args: any[]) => {
  const key = args[0];
  const password = args[1];

  return store.setPassword(key, password);
};

const handleStoreDeletePassword = (event: IpcMainInvokeEvent, args: any[]) => {
  const key = args[0];
  return store.deletePassword(key);
};

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    icon: path.resolve(__dirname, '../public/favicon.ico'),
  });

  mainWindow.maximize();

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (process.env.appEnv === 'dev' || process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  //
  ipcMain.handle('store:getPassword', handleStoreGetPassword);
  ipcMain.handle('store:setPassword', handleStoreSetPassword);
  ipcMain.handle('store:deletePassword', handleStoreDeletePassword);

  ipcMain.handle('checkServiceExistence', checkServiceExistence);
  ipcMain.handle('checkNetworkConnection', checkNetworkConnection);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.whenReady().then(() => serverStarterService.startNSD());

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

ipcMain.handle('get-report-dir', () => {
  const homeDir = os.homedir();
  const dirUrl = nodePath.join(homeDir, REPORT_FILE_SAVE_PATH);
  if (!fs.existsSync(dirUrl)) {
    fs.mkdirSync(dirUrl, { recursive: true });
  }
  return dirUrl;
});

ipcMain.handle('list-files', async (event, directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, data) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(data);
      }
    });
  });
});

ipcMain.handle('read-file', async (event, filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(data);
      }
    });
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
