import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AdminContextProps {
  adminBoolean: boolean;
  setAdminBoolean: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [adminBoolean, setAdminBoolean] = useState(false);

  const value: AdminContextProps = {
    adminBoolean,
    setAdminBoolean,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};

export { AdminProvider, useAdminContext };
