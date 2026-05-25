import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  register: (token: string, userData: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  walletAddress: string | null;
  connectWallet: () => Promise<string | null>;
  disconnectWallet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProfile = async (currentToken: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token invalid or expired
        localStorage.removeItem('flemlabs_token');
        setToken(null);
        setUser(null);
      }
    } catch (err) {
      console.error('Fetch profile error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('flemlabs_token');
    if (storedToken) {
      setToken(storedToken);
      fetchProfile(storedToken);
    } else {
      setIsLoading(false);
    }

    const storedWallet = localStorage.getItem('flemlabs_wallet');
    if (storedWallet) {
      setWalletAddress(storedWallet);
    }
  }, []);

  const connectWallet = async (): Promise<string | null> => {
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts[0]) {
          localStorage.setItem('flemlabs_wallet', accounts[0]);
          setWalletAddress(accounts[0]);
          return accounts[0];
        }
      } catch (err) {
        console.warn('Metamask connection failed, using sandbox mode.', err);
      }
    }
    
    // Web3 Sandbox Simulator fallback
    const mockAddress = '0x' + Array.from({ length: 40 }, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
    localStorage.setItem('flemlabs_wallet', mockAddress);
    setWalletAddress(mockAddress);
    return mockAddress;
  };

  const disconnectWallet = () => {
    localStorage.removeItem('flemlabs_wallet');
    setWalletAddress(null);
  };

  const login = (jwtToken: string, userData: User) => {
    localStorage.setItem('flemlabs_token', jwtToken);
    setToken(jwtToken);
    setUser(userData);
  };

  const register = (jwtToken: string, userData: User) => {
    localStorage.setItem('flemlabs_token', jwtToken);
    setToken(jwtToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('flemlabs_token');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    const activeToken = token || localStorage.getItem('flemlabs_token');
    if (activeToken) {
      await fetchProfile(activeToken);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      refreshUser,
      walletAddress,
      connectWallet,
      disconnectWallet
    }}>
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
