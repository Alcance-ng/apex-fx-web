"use client";

import { useSession, signIn, signOut } from "next-auth/react";

// Custom hooks that use the admin auth endpoint
export function useAdminSession() {
  return useSession();
}

export function useAdminSignIn() {
  return (credentials: { email: string; password: string }) => {
    return signIn("credentials", {
      ...credentials,
      redirect: false,
    });
  };
}

export function useAdminSignOut() {
  return () => signOut({ redirect: false });
}

// Helper function to check if user has admin privileges
export function useAdminAuth() {
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";
  const isSuperAdmin = session?.user?.role === "SUPER_ADMIN";
  const hasAdminAccess = isAdmin || isSuperAdmin;

  return {
    session,
    status,
    isAdmin,
    isSuperAdmin,
    hasAdminAccess,
    user: session?.user,
  };
}
