// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

// pass all env variables to the renderer process
contextBridge.exposeInMainWorld('envVars', {
  ...process.env,
});

contextBridge.exposeInMainWorld('electronAPI', {
  getPassword: (key: string) => ipcRenderer.invoke('store:getPassword', [key]),
  setPassword: (key: string, password: string) =>
    ipcRenderer.invoke('store:setPassword', [key, password]),
  deletePassword: (key: string) =>
    ipcRenderer.invoke('store:deletePassword', [key]),

  checkServiceExistence: (deviceId: string) =>
    ipcRenderer.invoke('checkServiceExistence', [deviceId]),
  checkNetworkConnection: () => ipcRenderer.invoke('checkNetworkConnection'),
});
