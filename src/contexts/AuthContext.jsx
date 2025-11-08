import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create a provider component
export function AuthProvider({ children }) {
  // State to store user info (null if not logged in)
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount (simple persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem('smartbuyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function (mock example)
  function login(userData) {
    setUser(userData);
    localStorage.setItem('smartbuyUser', JSON.stringify(userData));
  }

  // Logout function
  function logout() {
    setUser(null);
    localStorage.removeItem('smartbuyUser');
  }

  // Context value to be provided
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Custom hook for consuming the context easily
export function useAuth() {
  return useContext(AuthContext);
}

