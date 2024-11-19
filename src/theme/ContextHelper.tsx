import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of your state
interface MyContextType {
    id: string | null; // Assuming id is a string; adjust as necessary
    email: string | null; // Assuming email is a string; adjust as necessary
    admin: boolean; // Assuming admin is a boolean
    is_center_admin:boolean
}

// Define the provider props
interface MyProviderProps {
  children: ReactNode;
}

// Create the context
export const MyContext = createContext<{
  state: MyContextType;
  setState: React.Dispatch<React.SetStateAction<MyContextType>>;
} | undefined>(undefined);

// Create a provider component
export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [state, setState] = useState<MyContextType>({
    id: null,
    email: null,
    admin: false,
    is_center_admin:false

  });

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};
