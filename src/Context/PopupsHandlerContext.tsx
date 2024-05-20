import React, {
  useMemo,
  useState,
  createContext,
  useCallback,
  useContext,
} from 'react';

interface HeadsetContextType {
  popupFunctions: Record<string, (...args: any[]) => void>;
  addFunction: (name: string, func: (...args: any[]) => void) => void;
}

const PopupsHandlerContext = createContext<HeadsetContextType | null>(null);

const PopupsHandlerProvider= ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [popupFunctions, setPopupFunctions] = useState<
    Record<string, (...args: any[]) => void>
  >({});

  const addFunction = useCallback(
    (name: string, func: (...args: any[]) => void) => {
      setPopupFunctions((prev) => ({
        ...prev,
        [name]: func,
      }));
    },
    []
  );

  const contextValue = useMemo(
    () => ({ popupFunctions, addFunction }),
    [popupFunctions, addFunction]
  );

  return (
    <PopupsHandlerContext.Provider value={contextValue}>
      {children}
    </PopupsHandlerContext.Provider>
  );
};

const usePopupsHandler = () => {
  const context = useContext(PopupsHandlerContext);
  if (!context) {
    throw new Error(
      'usePopupsHandler must be used within a PopupsHandlerProvider'
    );
  }
  return context;
};

export default usePopupsHandler;
export { PopupsHandlerProvider };
