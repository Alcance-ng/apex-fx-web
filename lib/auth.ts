import { STORAGE_KEYS } from "./constants";
import type { User, AuthState } from "./types";

export class AuthManager {
  private static instance: AuthManager;
  private authState: AuthState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
  };

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  // Get current auth state
  getAuthState(): AuthState {
    return this.authState;
  }

  // Set auth token
  setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }
  }

  // Get auth token
  getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    }
    return null;
  }

  // Set refresh token
  setRefreshToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    }
  }

  // Get refresh token
  getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
    return null;
  }

  // Set user data
  setUser(user: User): void {
    this.authState = {
      ...this.authState,
      user,
      isAuthenticated: true,
    };
  }

  // Clear auth data
  clearAuth(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    }

    this.authState = {
      user: null,
      isLoading: false,
      isAuthenticated: false,
    };
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.authState.isAuthenticated && !!this.getAuthToken();
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    return this.authState.user?.role === role;
  }

  // Check if user is admin or super admin
  isAdmin(): boolean {
    return this.hasRole("ADMIN") || this.hasRole("SUPER_ADMIN");
  }

  // Check if user is super admin
  isSuperAdmin(): boolean {
    return this.hasRole("SUPER_ADMIN");
  }

  // Set loading state
  setLoading(isLoading: boolean): void {
    this.authState = {
      ...this.authState,
      isLoading,
    };
  }
}

export const authManager = AuthManager.getInstance();

// Route protection utilities
export const protectedRoutes = {
  user: [
    "/dashboard",
    "/profile",
    "/subscriptions",
    "/courses",
    "/transactions",
    "/notifications",
  ],
  admin: [
    "/admin/dashboard",
    "/admin/courses",
    "/admin/users",
    "/admin/analytics",
  ],
  superAdmin: [
    "/super-admin/dashboard",
    "/super-admin/admins",
    "/super-admin/logs",
    "/super-admin/settings",
  ],
};

export function canAccessRoute(pathname: string, userRole?: string): boolean {
  // Public routes (auth pages, landing, etc.)
  const publicRoutes = [
    "/",
    "/landing",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
  ];
  if (publicRoutes.includes(pathname)) {
    return true;
  }

  // Check if route requires authentication
  const isUserRoute = protectedRoutes.user.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = protectedRoutes.admin.some((route) =>
    pathname.startsWith(route)
  );
  const isSuperAdminRoute = protectedRoutes.superAdmin.some((route) =>
    pathname.startsWith(route)
  );

  if (!userRole) {
    return false; // No user role means not authenticated
  }

  // Super admin can access everything
  if (userRole === "SUPER_ADMIN") {
    return true;
  }

  // Admin can access admin and user routes
  if (userRole === "ADMIN") {
    return isUserRoute || isAdminRoute;
  }

  // Regular user can only access user routes
  if (userRole === "USER") {
    return isUserRoute;
  }

  // Check if trying to access super admin route without permission
  if (isSuperAdminRoute && userRole !== "SUPER_ADMIN") {
    return false;
  }

  return false;
}
