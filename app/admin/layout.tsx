"use client";

import { AdminAuthProvider } from "./providers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
