import React, { createContext, useContext, useState } from 'react';
import { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Fake sign-in: accept any email/password
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser({ id: 'demo-user', email });
    setLoading(false);
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    // Fake sign-up: accept any email/password
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser({ id: 'demo-user', email });
    setLoading(false);
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);