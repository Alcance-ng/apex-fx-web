"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { SignalIcon } from "@/components/admin/super-dash/SignalIcon";

// Signal shape coming from the backend
export interface SignalItem {
  id: string;
  signalPlanId: string;
  timeFrame: string;
  instructions: string;
  fileUrlBefore: string | null;
  fileUrlAfter: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserMeResponse {
  planCode: string;
  // other user fields
}

type SignalUpdatesResponse = SignalItem[];

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

async function fetchUserMe(url: string, token: string): Promise<UserMeResponse> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch user info");
  return res.json();
}

async function fetchSignalUpdates(url: string, token: string): Promise<SignalUpdatesResponse> {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch signal updates");
  return res.json();
}

export function RecentSignalUpdates() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  // Fetch user info to get planCode
  const { data: userData, error: userError, isLoading: userLoading } = useSWR<UserMeResponse>(
    token && BASE_URL ? [`${BASE_URL}/users/me`, token] : null,
    ([url, token]: [string, string]) => fetchUserMe(url, token)
  );

  // Fetch signal updates using planCode
  const { data: updatesData, error: updatesError, isLoading: updatesLoading } = useSWR<SignalUpdatesResponse>(
    userData?.planCode && token && BASE_URL ? [`${BASE_URL}/signal/${userData.planCode}/updates`, token] : null,
    ([url, token]: [string, string]) => fetchSignalUpdates(url, token)
  );

  const signals = updatesData || [];

  // Prepare entries: each signal yields a "before" entry, and an "after" entry only if fileUrlAfter exists
  const entries: Array<{
    key: string;
    kind: "before" | "after";
    img?: string;
    instructions?: string;
    timeFrame?: string;
    timestamp: string;
  }> = [];

  for (const s of signals) {
    // before entry
    if (s.fileUrlBefore) {
      entries.push({
        key: `${s.signalPlanId}-${s.createdAt}-before`,
        kind: "before",
        img: s.fileUrlBefore,
        instructions: s.instructions,
        timeFrame: s.timeFrame,
        timestamp: s.createdAt,
      });
    }
    // after entry (shows when fileUrlAfter is present)
    if (s.fileUrlAfter) {
      entries.push({
        key: `${s.signalPlanId}-${s.updatedAt}-after`,
        kind: "after",
        img: s.fileUrlAfter,
        instructions: s.instructions,
        timeFrame: s.timeFrame,
        timestamp: s.updatedAt,
      });
    }
  }
  const [selected, setSelected] = useState<null | { img?: string; instructions?: string; timeFrame?: string; timestamp: string; kind: string }>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openPreview = (entry: { img?: string; instructions?: string; timeFrame?: string; timestamp: string; kind: string }) => {
    setSelected(entry);
  };

  const closePreview = () => setSelected(null);

  const handleImageError = (imageUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imageUrl));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow border border-white/10">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-medium text-white">Recent Signal Updates</h2>
        <p className="text-sm text-lime-200">Latest before/after signal images, instructions and timestamps</p>
      </div>
      <div className="p-6">
        {userLoading || updatesLoading ? (
          <div className="text-white">Loading signal updates...</div>
        ) : userError || updatesError ? (
          <div className="text-red-400">Failed to load signal updates.</div>
        ) : entries.length === 0 ? (
          <div className="text-white">No signals available.</div>
        ) : (
          <ul className="space-y-4" role="list">
            {entries.slice(0, 6).map((e) => (
              <li key={e.key} className="flex items-start">
                <button
                  type="button"
                  onClick={() => openPreview({ img: e.img, instructions: e.instructions, timeFrame: e.timeFrame, timestamp: e.timestamp, kind: e.kind })}
                  className="w-14 h-14 rounded-md overflow-hidden mr-4 bg-slate-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-lime-400"
                >
                  {e.img ? (
                    imageErrors.has(e.img) ? (
                      <img src={e.img} alt={`${e.kind} image`} className="w-full h-full object-cover" onError={() => handleImageError(e.img!)} />
                    ) : (
                      <Image 
                        src={e.img} 
                        alt={`${e.kind} image`} 
                        width={56} 
                        height={56} 
                        className="w-full h-full object-cover" 
                        unoptimized
                        onError={() => handleImageError(e.img!)}
                      />
                    )
                  ) : (
                    <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center">
                      <SignalIcon className="h-5 w-5" />
                    </div>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white truncate">
                      {e.kind === "before" ? "Before" : "After"} — {e.timeFrame}
                    </p>
                    <p className="text-xs text-lime-200 ml-4">{new Date(e.timestamp).toLocaleString()}</p>
                  </div>
                  {e.instructions ? (
                    <p className="text-xs text-lime-100 mt-1 truncate">{e.instructions}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 text-right">
          <a href="/user/signals" className="text-sm text-lime-200 hover:underline">
            View all
          </a>
        </div>
      </div>

      {/* Preview modal */}
      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closePreview}
        >
          <div
            className="bg-white/5 rounded-lg overflow-hidden max-w-3xl w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-2">
              <button
                onClick={closePreview}
                className="text-lime-200 bg-transparent hover:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>

            <div className="px-6 pb-6">
              {selected.img ? (
                imageErrors.has(selected.img) ? (
                  <div className="w-full h-[40vh] md:h-96 max-h-[70vh] bg-slate-900 rounded overflow-hidden flex items-center justify-center">
                    <img src={selected.img} alt="Signal image" className="max-w-full max-h-full object-contain" onError={() => handleImageError(selected.img!)} />
                  </div>
                ) : (
                  <div className="relative w-full h-[40vh] md:h-96 max-h-[70vh] bg-slate-900 rounded overflow-hidden">
                    <Image 
                      src={selected.img} 
                      alt="Signal image" 
                      fill 
                      className="object-contain" 
                      unoptimized
                      onError={() => handleImageError(selected.img!)}
                    />
                  </div>
                )
              ) : (
                <div className="w-full h-80 bg-slate-900 rounded flex items-center justify-center">
                  <SignalIcon className="h-16 w-16" />
                </div>
              )}

              <div className="mt-4 text-white">
                <p className="font-semibold">{selected.kind === "before" ? "Before" : "After"} — {selected.timeFrame}</p>
                <p className="text-sm text-lime-200 mt-1">{new Date(selected.timestamp).toLocaleString()}</p>
                {selected.instructions ? <p className="mt-3 text-sm text-lime-100">{selected.instructions}</p> : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
