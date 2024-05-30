import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { io } from 'socket.io-client';

import {
  EXPRESS_PORT,
  MODULE_NOT_FOUND_ERROR_MESSAGE,
} from '../../electron/constants';

const URL = `http://localhost:${EXPRESS_PORT}`;

const socket = io(URL, {
  query: {
    deviceId: 'electron-service',
  },
});

const SocketManagerContext = createContext(null);
const onConnect = () => console.log('Connected to Socket.IO server');

const SocketManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [socketError, setSocketError] = useState(null);
  const dispatchSocketMessage = useCallback(
    (
      channel: string,
      message: string,
      clientDeviceId: string,
      ...rest: any[]
    ) => {
      socket.emit(channel, {
        clientDeviceId,
        message,
        ...(rest.length && { settings: rest }),
      });
    },
    [socket]
  );
  const checkIfServiceExists = useCallback(
    async (deviceId: string) => {
      const deviseIsConnected = await (
        window as any
      ).electronAPI.checkServiceExistence(deviceId);
      return !!deviseIsConnected;
    },
    [socket]
  );

  useEffect(() => {
    socket.connect();
    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onSocketError = (err: any) => setSocketError(err[0]?.errMessage);

    socket.on(MODULE_NOT_FOUND_ERROR_MESSAGE, onSocketError);
    return () => {
      socket.off(MODULE_NOT_FOUND_ERROR_MESSAGE, onSocketError);
    };
  }, [socketError]);

  const contextValue = useMemo(
    () => ({
      checkIfServiceExists,
      dispatchSocketMessage,
      socketError,
      setSocketError
    }),
    [socketError]
  );

  return (
    <SocketManagerContext.Provider value={contextValue}>
      {children}
    </SocketManagerContext.Provider>
  );
};

const useSocketManager = () => {
  const context = useContext(SocketManagerContext);
  if (!context) {
    throw new Error(
      'useSocketManagerContext must be used within an SocketManagerProvider'
    );
  }
  return context;
};

export default useSocketManager;
export { SocketManagerProvider };
