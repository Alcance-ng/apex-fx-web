"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { authManager as adminAuthManager } from "../lib/auth";
import { apiClient as adminApiClient } from "../lib/api";
import type { User, AuthState } from "../lib/types";

interface AdminAuthContextType extends AuthState {
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

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(
    adminAuthManager.getAuthState()
  );

  useEffect(() => {
    // Check for existing admin auth on mount
    refreshAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      adminAuthManager.setLoading(true);
      setAuthState(adminAuthManager.getAuthState());

      const response = await adminApiClient.login({
        email,
        password,
      });

      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data as {
          user: User;
          token: string;
          refreshToken: string;
        };

        adminAuthManager.setAuthToken(token);
        adminAuthManager.setRefreshToken(refreshToken);
        adminAuthManager.setUser(user);

        setAuthState(adminAuthManager.getAuthState());
      } else {
        throw new Error(response.message || "Admin login failed");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      throw error;
    } finally {
      adminAuthManager.setLoading(false);
      setAuthState(adminAuthManager.getAuthState());
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      adminAuthManager.setLoading(true);
      setAuthState(adminAuthManager.getAuthState());

      const response = await adminApiClient.register({
        ...userData,
      });

      if (response.success && response.data) {
        const { user, token, refreshToken } = response.data as {
          user: User;
          token: string;
          refreshToken: string;
        };

        adminAuthManager.setAuthToken(token);
        adminAuthManager.setRefreshToken(refreshToken);
        adminAuthManager.setUser(user);

        setAuthState(adminAuthManager.getAuthState());
      } else {
        throw new Error(response.message || "Admin registration failed");
      }
    } catch (error) {
      console.error("Admin registration error:", error);
      throw error;
    } finally {
      adminAuthManager.setLoading(false);
      setAuthState(adminAuthManager.getAuthState());
    }
  };

  const logout = async () => {
    try {
      await adminApiClient.logout();
    } catch (error) {
      console.error("Admin logout error:", error);
    } finally {
      adminAuthManager.clearAuth();
      setAuthState(adminAuthManager.getAuthState());
    }
  };

  const refreshAuth = async () => {
    const token = adminAuthManager.getAuthToken();
    if (!token) {
      return;
    }

    try {
      adminAuthManager.setLoading(true);
      setAuthState(adminAuthManager.getAuthState());

      const response = await adminApiClient.getProfile();

      if (response.success && response.data) {
        const user = response.data as User;
        adminAuthManager.setUser(user);
        setAuthState(adminAuthManager.getAuthState());
      } else {
        adminAuthManager.clearAuth();
        setAuthState(adminAuthManager.getAuthState());
      }
    } catch (error) {
      console.error("Admin auth refresh error:", error);
      adminAuthManager.clearAuth();
      setAuthState(adminAuthManager.getAuthState());
    } finally {
      adminAuthManager.setLoading(false);
      setAuthState(adminAuthManager.getAuthState());
    }
  };

  const value = {
    ...authState,
    login,
    register,
    logout,
    refreshAuth,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
