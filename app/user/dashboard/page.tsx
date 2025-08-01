"use client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardQuickActions } from "@/components/dashboard/DashboardQuickActions";
import { DashboardRecentActivity } from "@/components/dashboard/DashboardRecentActivity";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store";

export default function UserDashboardPage() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (
      status === "authenticated" &&
      session?.user &&
      session?.accessToken &&
      !user
    ) {
      // Restore Zustand user state from NextAuth session on refresh
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        accessToken: session.accessToken,
      });
    }
  }, [status, session, user, setUser, router]);
  if (status === "unauthenticated") {
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900">
      <div className="">
        <DashboardHeader />
      </div>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div>
          <DashboardStats />
        </div>
        <div>
          <DashboardQuickActions />
        </div>
        <div>
          <DashboardRecentActivity />
        </div>
      </main>
    </div>
  );
}
