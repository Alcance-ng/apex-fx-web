"use client";

import React from "react";
import { useAdminAuth } from "@/hooks/useAdminNextAuth";
import { useSignalPlans } from "@/hooks/useSignalPlans";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import CreateSignalUpdate from "@/components/admin/signals/CreateSignalUpdate";
import SignalUpdateHistory from "@/components/admin/signals/SignalUpdateHistory";

export default function AdminSignalsPage() {

  const { session, status, isAdmin } = useAdminAuth();
  const router = useRouter();
  const { plans, isLoading: isPlansLoading } = useSignalPlans(session?.accessToken);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1847] to-[#3c1e5c] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-purple-200">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session || !isAdmin) {
    router.push("/admin/login");
    return null;
  }


  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1847] to-[#3c1e5c] text-white">
      <header className="bg-[#2d1847]/80 backdrop-blur-md border-b border-purple-900">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-purple-200">Signals</h1>
            <p className="text-purple-300">Create a broadcast signal.</p>
          </div>
          <Button
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="border-purple-500/40 text-purple-200 hover:bg-purple-700/30 focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            Back
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <CreateSignalUpdate
            session={session}
            plans={plans}
            isPlansLoading={isPlansLoading}
            onCancel={() => router.back()}
          />
          <SignalUpdateHistory limit={10} />
        </div>
      </main>
    </div>
  );
}
