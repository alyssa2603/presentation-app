import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  customerName: string;
  setCustomerName: (name: string) => void;
  currentOrder: any;
  setCurrentOrder: (order: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [customerName, setCustomerName] = useState<string>('');
  const [currentOrder, setCurrentOrder] = useState<any>(null);

  return (
    <AppContext.Provider value={{
      customerName,
      setCustomerName,
      currentOrder,
      setCurrentOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};