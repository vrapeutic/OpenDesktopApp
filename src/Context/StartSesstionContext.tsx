import React, { createContext, ReactNode, useContext, useState } from 'react';

interface StartSessionContextProps {
  module: string;
  setModule: React.Dispatch<React.SetStateAction<string>>;
  sessionId: string;
  setSessionId: React.Dispatch<React.SetStateAction<string>>;
  startSession: string;
  setStartSession: React.Dispatch<React.SetStateAction<string>>;
  headsetid: string;
  setheadsetid: React.Dispatch<React.SetStateAction<string>>;
  headsetKey: string;
  setHeadsetKey:React.Dispatch<React.SetStateAction<string>>;
}

const StartSessionContext = createContext<StartSessionContextProps | undefined>(undefined);

interface StartSessionProviderProps {
  children: ReactNode;
}

const StartSessionProvider: React.FC<StartSessionProviderProps> = ({ children }) => {
  const [module, setModule] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [startSession,setStartSession]=useState('');
  const [headsetid,setheadsetid]=useState('');
  const [headsetKey,setHeadsetKey]=useState('');
  const value: StartSessionContextProps = {
    module,
    setModule,
    sessionId,
    setSessionId,
    startSession,
    setStartSession,
    headsetid,
    setheadsetid,
    headsetKey,
    setHeadsetKey,
   
  };

  return (
    <StartSessionContext.Provider value={value}>{children}</StartSessionContext.Provider>
  );
};

const useStartSessionContext = () => {
  const context = useContext(StartSessionContext);
  if (!context) {
    throw new Error('useStartSessionContext must be used within a StartSessionProvider');
  }
  return context;
};

export { StartSessionProvider, useStartSessionContext };
