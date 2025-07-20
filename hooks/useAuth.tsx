"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { authManager } from "../lib/auth";
import { apiClient } from "../lib/api";
import type { User, AuthState } from "../lib/types";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(
    authManager.getAuthState()
  );

  // Update local state when auth manager state changes
  useEffect(() => {
    // Check for existing auth on mount
    refreshAuth();

    // You could implement an event system here if needed
    // For now, we'll poll periodically or update manually
  }, []);

  const login = async (email: string, password: string) => {
    try {
      authManager.setLoading(true);
      setAuthState(authManager.getAuthState());

      const response = await apiClient.login({ email, password });

      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data as {
          user: User;
          token: string;
          refreshToken: string;
        };

        authManager.setAuthToken(token);
        authManager.setRefreshToken(refreshToken);
        authManager.setUser(user);

        setAuthState(authManager.getAuthState());
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      authManager.setLoading(false);
      setAuthState(authManager.getAuthState());
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      authManager.setLoading(true);
      setAuthState(authManager.getAuthState());

      const response = await apiClient.register(userData);

      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data as {
          user: User;
          token: string;
          refreshToken: string;
        };

        authManager.setAuthToken(token);
        authManager.setRefreshToken(refreshToken);
        authManager.setUser(user);

        setAuthState(authManager.getAuthState());
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      authManager.setLoading(false);
      setAuthState(authManager.getAuthState());
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with logout even if API call fails
    } finally {
      authManager.clearAuth();
      setAuthState(authManager.getAuthState());
    }
  };

  const refreshAuth = async () => {
    const token = authManager.getAuthToken();
    if (!token) {
      return;
    }

    try {
      authManager.setLoading(true);
      setAuthState(authManager.getAuthState());

      const response = await apiClient.getProfile();

      if (response.success && response.data) {
        const user = response.data as User;
        authManager.setUser(user);
        setAuthState(authManager.getAuthState());
      } else {
        // Token might be invalid, clear auth
        authManager.clearAuth();
        setAuthState(authManager.getAuthState());
      }
    } catch (error) {
      console.error("Auth refresh error:", error);
      authManager.clearAuth();
      setAuthState(authManager.getAuthState());
    } finally {
      authManager.setLoading(false);
      setAuthState(authManager.getAuthState());
    }
  };

  const value = {
    ...authState,
    login,
    register,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
