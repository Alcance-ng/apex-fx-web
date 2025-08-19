
"use client";

import React, { useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminNextAuth";
import { useAdminPlans, SubscriptionPlan } from "@/hooks/useAdminPlans";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function AdminSuperDashSignalsPage() {

  const { session, status, isSuperAdmin } = useAdminAuth();
  const router = useRouter();

  // Form state
  const [planCode, setPlanCode] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const { plans, isLoading: isPlansLoading } = useAdminPlans(session?.accessToken);
  const [timeFrame, setTimeFrame] = useState("");
  const [instructions, setInstructions] = useState("");
  const [fileUrlBefore, setFileUrlBefore] = useState("");
  const [fileUrlAfter, setFileUrlAfter] = useState("");
  const [fileBefore, setFileBefore] = useState<File | null>(null);
  const [fileAfter, setFileAfter] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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


  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170a0e] via-[#2a0f1a] to-[#3b0f24] text-white">
      <header className="bg-[#2a0f1a]/80 backdrop-blur-md border-b border-red-900">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-200">Signals</h1>
            <p className="text-red-300">This is the Super Admin Signals page.</p>
          </div>
          <Button
            onClick={handleBack}
            variant="outline"
            size="sm"
            className="border-red-500/40 text-red-200 hover:bg-red-700/30 focus-visible:ring-2 focus-visible:ring-red-400"
          >
            Back
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-[#2a0f1a]/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-red-900">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubmitting(true);
              setError(null);
              // If files are provided, upload to Cloudinary first
              const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
              const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

              const uploadFile = async (f: File | null) => {
                if (!f) return null;
                if (!cloudName || !uploadPreset) {
                  throw new Error("Cloudinary not configured");
                }
                const form = new FormData();
                form.append("file", f);
                form.append("upload_preset", uploadPreset);
                const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
                  method: "POST",
                  body: form,
                });
                if (!res.ok) throw new Error("Upload failed");
                const j = await res.json();
                return j.secure_url as string;
              };

              try {
                if (fileBefore) {
                  const url = await uploadFile(fileBefore);
                  setFileUrlBefore(url || "");
                }
                if (fileAfter) {
                  const url = await uploadFile(fileAfter);
                  setFileUrlAfter(url || "");
                }

                // Convert local datetime-local value to an ISO UTC string
                let timeFrameIso: string | undefined = undefined;
                if (timeFrame) {
                  const dt = new Date(timeFrame);
                  if (isNaN(dt.getTime())) {
                    throw new Error("Invalid time frame");
                  }
                  timeFrameIso = dt.toISOString();
                }

                const payload = {
                  planCode,
                  timeFrame: timeFrameIso,
                  instructions,
                  fileUrlBefore: fileUrlBefore || undefined,
                  fileUrlAfter: fileUrlAfter || undefined,
                } as Record<string, unknown>;

                const res = await fetch("/api/super/signals", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });
                const json = await res.json();
                if (!res.ok || !json.success) {
                  setError(json.message || "Failed to create signal");
                } else {
                  setSuccess("Signal created successfully");
                  // clear form
                  setPlanCode("");
                  setSelectedPlanId(null);
                  setTimeFrame("");
                  setInstructions("");
                  setFileUrlBefore("");
                  setFileUrlAfter("");
                  setFileBefore(null);
                  setFileAfter(null);
                }
              } catch (e) {
                setError(String((e as Error).message || "Network error"));
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm text-red-300 mb-1">Plan</label>
              <div
                className="relative group cursor-pointer"
                tabIndex={0}
                onClick={e => {
                  // Focus the select when the wrapper is clicked
                  const select = (e.currentTarget.querySelector('select') as HTMLSelectElement);
                  if (select) select.focus();
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    const select = (e.currentTarget.querySelector('select') as HTMLSelectElement);
                    if (select) select.focus();
                  }
                }}
              >
                <select
                  value={selectedPlanId ?? ""}
                  onChange={(e) => {
                    const id = e.target.value ? Number(e.target.value) : null;
                    setSelectedPlanId(id);
                    const plan = plans.find((p: SubscriptionPlan) => p.id === id);
                    if (plan) {
                      // create a code: PLN_{id}_{slugifiedName}
                      const slug = String(plan.name)
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "_")
                        .replace(/^_|_$/g, "");
                      setPlanCode(`PLN_${plan.id}_${slug}`);
                    } else {
                      setPlanCode("");
                    }
                  }}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-[#2a0f1a]/60 border-2 border-yellow-400 text-yellow-200 placeholder:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none pr-10 font-semibold shadow-md group-hover:border-yellow-300 group-hover:bg-[#3b0f24]/80 transition-colors"
                  style={{ cursor: 'pointer' }}
                  aria-label="Select a plan"
                >
                  <option value="">Select a plan</option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-yellow-300 text-lg">
                  ▼
                </span>
              </div>
              {isPlansLoading && <p className="text-sm text-red-300">Loading plans...</p>}
            </div>

            <div>
              <label className="block text-sm text-red-300 mb-1">Time Frame</label>
              <input
                type="datetime-local"
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-[#2a0f1a]/60 border border-red-900 text-white placeholder:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Select date and time"
              />
              <p className="text-xs text-red-300 mt-1">Select local date & time — we will send it in UTC to the backend.</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-red-300 mb-1">Instructions</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
                className="w-full h-32 px-3 py-2 rounded-lg bg-[#2a0f1a]/60 border border-red-900 text-white placeholder:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Buy EURUSD at 1.0800, TP 1.0850, SL 1.0750"
              />
            </div>

            <div>
              <label className="block text-sm text-red-300 mb-1">File (Before)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFileBefore(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-white"
              />
              <p className="text-xs text-red-300 mt-1">Optional: upload a before image</p>
            </div>

            <div>
              <label className="block text-sm text-red-300 mb-1">File (After)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFileAfter(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-white"
              />
              <p className="text-xs text-red-300 mt-1">Optional: upload an after image</p>
            </div>

            <div className="md:col-span-2 flex items-center justify-between">
              <div className="flex-1">
                {error && <p className="text-sm text-yellow-300">{error}</p>}
                {success && <p className="text-sm text-green-300">{success}</p>}
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Signal"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
