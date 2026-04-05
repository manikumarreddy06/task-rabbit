import React, { createContext, useContext, useState, ReactNode } from 'react';
import { USER_PROFILE } from '../constants/mockData';

type UserType = 'customer' | 'tasker';

interface AppContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  user: typeof USER_PROFILE.customer | typeof USER_PROFILE.tasker;
  isTaskerOnline: boolean;
  setIsTaskerOnline: (online: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>('customer');
  const [isTaskerOnline, setIsTaskerOnline] = useState(true);

  const user = userType === 'customer' ? USER_PROFILE.customer : USER_PROFILE.tasker;

  return (
    <AppContext.Provider
      value={{
        userType,
        setUserType,
        user,
        isTaskerOnline,
        setIsTaskerOnline,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
