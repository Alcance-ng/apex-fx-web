"use client";

import { useAdminAuth, useAdminSignOut } from "@/hooks/useAdminNextAuth";
import { useRouter } from "next/navigation";
import { SuperAdminHeader } from "@/components/admin/super-dash/SuperAdminHeader";
import { SuperAdminStats } from "@/components/admin/super-dash/SuperAdminStats";
import { SuperAdminCriticalActions } from "@/components/admin/super-dash/SuperAdminCriticalActions";
import { SuperAdminActivityLog } from "@/components/admin/super-dash/SuperAdminActivityLog";
import { SuperAdminFinancialOverview } from "@/components/admin/super-dash/SuperAdminFinancialOverview";
import { SuperAdminSystemAlerts } from "@/components/admin/super-dash/SuperAdminSystemAlerts";

export default function SuperAdminDashboardPage() {
  const { session, status, isSuperAdmin } = useAdminAuth();
  const adminSignOut = useAdminSignOut();
  const router = useRouter();

  // Redirect if not authenticated or not super admin
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#170a0e] via-[#2a0f1a] to-[#3b0f24] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-red-200">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session || !isSuperAdmin) {
    router.push("/admin/login");
    return null;
  }

  const handleLogout = async () => {
    await adminSignOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170a0e] via-[#2a0f1a] to-[#3b0f24] text-white">
      {/* Super Admin Header */}
      <SuperAdminHeader user={session.user} onLogout={handleLogout} />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* System Overview (Glassy Stat Cards) */}
        <SuperAdminStats />
        {/* Critical Actions */}
        <SuperAdminCriticalActions />
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SuperAdminActivityLog />
          <SuperAdminFinancialOverview />
        </div>
        {/* System Alerts */}
        <SuperAdminSystemAlerts />
      </main>
    </div>
  );
}
