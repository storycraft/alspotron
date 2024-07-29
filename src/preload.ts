/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'node:fs';

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { getFonts } from 'font-list';
import { hmc } from 'hmc-win32';

import { isWin32 } from '../utils/is';

contextBridge.exposeInMainWorld('fs', fs);
contextBridge.exposeInMainWorld('getFont', getFonts);
contextBridge.exposeInMainWorld('ipcRenderer', {
  on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on(channel, listener),
  once: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.once(channel, listener),
  send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, args),
  removeListener: (channel: string, listener: (...args: any[]) => void) => ipcRenderer.removeListener(channel, listener),
  removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  invoke: async (channel: string, ...args: any[]): Promise<any> => ipcRenderer.invoke(channel, ...args),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  sendSync: (channel: string, ...args: any[]): any => ipcRenderer.sendSync(channel, ...args),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  sendToHost: (channel: string, ...args: any[]) => ipcRenderer.sendToHost(channel, ...args),
});
contextBridge.exposeInMainWorld('isWindows', isWin32());
contextBridge.exposeInMainWorld('systemRoot', process.env.SystemRoot);
contextBridge.exposeInMainWorld('hmc', hmc);
