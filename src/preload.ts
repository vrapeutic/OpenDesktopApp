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
});

contextBridge.exposeInMainWorld('electron', {
  commands: async (command: string) =>
    ipcRenderer.invoke('commands', command),
},
);
