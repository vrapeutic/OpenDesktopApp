import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AdminContextProps {
  adminBoolean: boolean;
  setAdminBoolean: React.Dispatch<React.SetStateAction<boolean>>;
  otp: string; // New state for OTP
  setOtp: React.Dispatch<React.SetStateAction<string>>; // Function to set OTP
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [adminBoolean, setAdminBoolean] = useState(false);
  const [otp, setOtp] = useState(''); // Initial state for OTP

  const value: AdminContextProps = {
    adminBoolean,
    setAdminBoolean,
    otp,
    setOtp,
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
