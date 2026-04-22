import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'VENDOR' | 'ADMIN';
  brandName?: string;
  isVerified?: boolean;
}

interface AuthSession {
  token: string;
  user: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (session: AuthSession) => void;
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'techspark-auth-session';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const storedSession = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedSession) {
      setSession(JSON.parse(storedSession) as AuthSession);
    }
  }, []);

  useEffect(() => {
    if (session) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [session]);

  // Default guest session for open access
  const defaultSession: AuthSession = {
    token: 'bypass-auth-token',
    user: {
      id: 'demo-user-123',
      name: 'System Operator',
      email: 'operator@techspark.com',
      role: 'ADMIN'
    }
  };

  const value: AuthContextValue = {
    user: session?.user ?? defaultSession.user,
    token: session?.token ?? defaultSession.token,
    isAuthenticated: true, // Always true to bypass login screens
    login: (nextSession) => setSession(nextSession),
    logout: () => setSession(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}