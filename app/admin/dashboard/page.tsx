"use client";

import { useAdminAuth, useAdminSignOut } from "@/hooks/useAdminNextAuth";
import { useRouter } from "next/navigation";
import { AdminDashboardHeader } from "@/components/admin/AdminDashboardHeader";
import { AdminDashboardStats } from "@/components/admin/AdminDashboardStats";
import { AdminDashboardQuickActions } from "@/components/admin/AdminDashboardQuickActions";
import { AdminDashboardRecentUsers } from "@/components/admin/AdminDashboardRecentUsers";
import { AdminDashboardRecentTransactions } from "@/components/admin/AdminDashboardRecentTransactions";
import { AdminLoadingSpinner } from "@/components/admin/AdminLoadingSpinner";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useAdminTransactions } from "@/hooks/useAdminTransactions";
import { useAdminPlans } from "@/hooks/useAdminPlans";

export default function AdminDashboardPage() {
  const { session, status, isAdmin } = useAdminAuth();
  const adminSignOut = useAdminSignOut();
  const router = useRouter();

  // Fetch users and analytics
  const token = session?.accessToken;
  const {
    users,
    analytics,
    isLoading: isUsersLoading,
    error: usersError,
  } = useAdminUsers(token);
  const {
    totalAmount,
    isLoading: isTxLoading,
    error: txError,
    transactions,
  } = useAdminTransactions(token);
  const {
    plans,
    totalActiveSubscriptions,
    isLoading: isPlansLoading,
    error: plansError,
  } = useAdminPlans(token);

  const isLoading =
    status === "loading" || isUsersLoading || isTxLoading || isPlansLoading;
  const error = usersError || txError || plansError;

  const handleLogout = async () => {
    await adminSignOut();
    router.push("/admin/login");
  };

  if (status === "loading" || isLoading) {
    return <AdminLoadingSpinner text="Loading dashboard..." />;
  }

  if (status === "unauthenticated" || !session || !isAdmin) {
    router.push("/admin/login");
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1333] via-[#2d1847] to-[#3c1e5c] text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Error loading dashboard</h2>
          <p className="mb-4">{error.message}</p>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded focus-visible:ring-2 focus-visible:ring-purple-400"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1847] to-[#3c1e5c] text-white">
      {/* Admin Header */}
      <AdminDashboardHeader user={session.user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Stats */}
        <AdminDashboardStats
          totalUsers={analytics?.totalUsers || 0}
          newUsersThisMonth={analytics?.newUsers?.thisMonth || 0}
          totalRevenue={totalAmount || 0}
          activeSubscriptions={totalActiveSubscriptions}
          totalPlans={plans?.length || 0}
        />
        {/* Quick Actions */}
        <AdminDashboardQuickActions />
        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminDashboardRecentUsers users={users} />
          <AdminDashboardRecentTransactions transactions={transactions} />
        </div>
      </main>
    </div>
  );
}
