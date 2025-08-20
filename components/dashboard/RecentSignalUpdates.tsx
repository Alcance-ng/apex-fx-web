import React, { useState, useEffect } from "react";
import { SignalIcon } from "@/components/admin/super-dash/SignalIcon";

// Signal shape coming from the backend (we'll use dummy data for now)
export interface SignalItem {
  planCode?: string;
  timeFrame?: string; // e.g. "2025-08-18 09:00 UTC"
  instructions?: string;
  fileUrlBefore?: string;
  fileUrlAfter?: string;
  createdAt: string;
  updatedAt?: string;
}

const dummySignals: SignalItem[] = [
  {
    planCode: "PLN_9p12feduriejtk3",
    timeFrame: "2025-08-18 09:00 UTC",
    instructions: "Buy EURUSD at 1.0800, TP 1.0850, SL 1.0750",
    fileUrlBefore: "https://example.com/before.png",
    // fileUrlAfter: "https://example.com/after.png", // after will appear later
    createdAt: "2025-08-18T09:00:00.000Z",
    updatedAt: undefined,
  },
  {
    planCode: "PLN_9p12feduriejtk4",
    timeFrame: "2025-08-19 12:30 UTC",
    instructions: "Sell GBPJPY at 148.00, TP 147.00, SL 149.00",
    fileUrlBefore: "https://example.com/before2.png",
    fileUrlAfter: "https://example.com/after2.png",
    createdAt: "2025-08-19T12:30:00.000Z",
    updatedAt: "2025-08-19T18:00:00.000Z",
  },
];

export function RecentSignalUpdates() {
  // Prepare entries: each signal yields a "before" entry, and an "after" entry only if fileUrlAfter exists
  const entries: Array<{
    key: string;
    kind: "before" | "after";
    img?: string;
    instructions?: string;
    timeFrame?: string;
    timestamp: string;
  }> = [];

  for (const s of dummySignals) {
    // before entry
    if (s.fileUrlBefore) {
      entries.push({
        key: `${s.planCode || "signal"}-${s.createdAt}-before`,
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
        key: `${s.planCode || "signal"}-${s.updatedAt || s.createdAt}-after`,
        kind: "after",
        img: s.fileUrlAfter,
        instructions: s.instructions,
        timeFrame: s.timeFrame,
        timestamp: s.updatedAt || s.createdAt,
      });
    }
  }
  const [selected, setSelected] = useState<null | { img?: string; instructions?: string; timeFrame?: string; timestamp: string; kind: string }>(null);

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

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow border border-white/10">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-medium text-white">Recent Signal Updates</h2>
        <p className="text-sm text-lime-200">Latest before/after signal images, instructions and timestamps</p>
      </div>
      <div className="p-6">
        {entries.length === 0 ? (
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
                    <img src={e.img} alt={`${e.kind} image`} className="w-full h-full object-cover" />
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
                <img src={selected.img} alt="Signal image" className="w-full h-80 object-contain bg-slate-900 rounded" />
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
