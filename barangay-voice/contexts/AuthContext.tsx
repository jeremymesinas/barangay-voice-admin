import React, { createContext, useContext, useState } from 'react';
import { router } from 'expo-router';

type Barangay = {
  id: string;
  name: string;
  city: string;
};

type User = {
  id: string;
  email?: string;
  first_name?: string;
  // first_name?: string;
  last_name?: string;
  barangay_id?: string;
  barangay?: Barangay;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUserBarangay: (barangay: Barangay) => void; // Add this to the context type
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    router.replace('/home');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    router.replace('/LogIn');
  };

  // Add this function to update barangay info
  const updateUserBarangay = (barangay: Barangay) => {
    if (user) {
      setUser({
        ...user,
        barangay,
        barangay_id: barangay.id
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout,
      updateUserBarangay // Make sure to include it in the provider value
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};