import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { io } from 'socket.io-client';

import { EXPRESS_PORT } from '../../electron/constants';

const URL = `http://localhost:${EXPRESS_PORT}`;

const socket = io(URL, {
  query: {
    serviceName: 'electron-service',
  },
});

const SocketManagerContext = createContext(null);

const SocketManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatchSocketMessage = useCallback(
    (channel: string, message: string, ...rest: any[]) => {
      socket.emit(channel, { message, ...(rest.length && { settings: rest }) });
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

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      checkIfServiceExists,
      dispatchSocketMessage,
    }),
    [socket]
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
