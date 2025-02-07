import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
  userType: 'farmer' | 'consumer';
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string, userType: 'farmer' | 'consumer') => Promise<void>;
  signUp: (email: string, password: string, userType: 'farmer' | 'consumer') => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string, userType: 'farmer' | 'consumer') => {
    // In a real app, you would validate credentials with a backend
    setUser({ email, userType });
  };

  const signUp = async (email: string, password: string, userType: 'farmer' | 'consumer') => {
    // In a real app, you would create a new user in the backend
    setUser({ email, userType });
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};