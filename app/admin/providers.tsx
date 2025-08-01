"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider basePath="/api/admin-auth">{children}</SessionProvider>
  );
}
