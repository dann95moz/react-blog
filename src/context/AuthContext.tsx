import React, { createContext, useContext, useState } from 'react';
import { googleLogout } from '@react-oauth/google';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (response: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const login = (response: any) => {
    setIsAuthenticated(true);
    setUser(response.profileObj);
  };

  const logout = () => {
    googleLogout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
