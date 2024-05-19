import React,{ createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { io }  from 'socket.io-client';

import { EXPRESS_PORT } from '../../electron/constants';

const URL = `http://localhost:${EXPRESS_PORT}`;

const socket  = io(URL);

const SocketManagerContext = createContext(null)



 const SocketManagerProvider  = ({children}:{ children: React.ReactNode}) => {

  const emitMessage = useCallback((channel:string,message: string) => {
    socket.emit(channel, message)
  },[socket])

  const checkIfServiceExists = useCallback(async(deviceId: string) => {
    const deviseIsConnected = await (window as any).electronAPI.checkServiceExistence(deviceId)
 console.log('deviseIsConnected',!!deviseIsConnected);
  
    
    return  !!deviseIsConnected
  },[socket]);


  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    return () => {
      socket.disconnect()
    }
  }, [])


  const contextValue = useMemo(() => ({ 
    emitMessage,
    checkIfServiceExists
  }), [socket])


  return <SocketManagerContext.Provider value={contextValue}>{children}</SocketManagerContext.Provider>
}

const useSocketManager = () => {
  const context = useContext(SocketManagerContext);
  if (!context) {
    throw new Error('useSocketManagerContext must be used within an SocketManagerProvider');
  }
  return context;
};


export default  useSocketManager;
export  { SocketManagerProvider }
