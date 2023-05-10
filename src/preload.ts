// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from "electron";

// pass all env variables to the renderer process
contextBridge.exposeInMainWorld("envVars", {
    ...process.env,
});
