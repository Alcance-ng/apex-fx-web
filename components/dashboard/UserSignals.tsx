import React, { useState, useEffect } from "react";
import { SignalIcon } from "@/components/admin/super-dash/SignalIcon";

export interface SignalItem {
  planCode?: string;
  timeFrame?: string;
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
    createdAt: "2025-08-18T09:00:00.000Z",
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

export function UserSignals() {
  const [isLoading] = useState(false);
  const [error] = useState<null | Error>(null);

  // Prepare a flattened list similar to transactions (we'll show before entries first, then after entries when present)
  const items: Array<{
    id: string;
    label: string;
    img?: string;
    instructions?: string;
    timestamp: string;
    kind: "before" | "after";
  }> = [];

  for (const s of dummySignals) {
    if (s.fileUrlBefore) {
      items.push({
        id: `${s.planCode}-before-${s.createdAt}`,
        label: `Before — ${s.timeFrame}`,
        img: s.fileUrlBefore,
        instructions: s.instructions,
        timestamp: s.createdAt,
        kind: "before",
      });
    }
    if (s.fileUrlAfter) {
      items.push({
        id: `${s.planCode}-after-${s.updatedAt || s.createdAt}`,
        label: `After — ${s.timeFrame}`,
        img: s.fileUrlAfter,
        instructions: s.instructions,
        timestamp: s.updatedAt || s.createdAt,
        kind: "after",
      });
    }
  }

  const [selected, setSelected] = useState<null | (typeof items)[0]>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow border border-white/10">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-medium text-white">Signals</h2>
        <p className="text-sm text-lime-200">All your trading signals and updates</p>
      </div>
      <div className="p-6">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : error ? (
          <div className="text-red-400">Failed to load signals</div>
        ) : (
          <ul className="space-y-4" role="list">
            {items.length === 0 ? (
              <li className="text-white">No signals found.</li>
            ) : (
              items.map((it) => (
                <li
                  key={it.id}
                  className="flex items-center focus-within:ring-2 focus-within:ring-lime-500 rounded-lg outline-none"
                >
                  <button
                    type="button"
                    onClick={() => setSelected(it)}
                    className="w-10 h-10 rounded-md overflow-hidden mr-3 bg-slate-800 flex items-center justify-center focus:outline-none"
                  >
                    {it.img ? (
                      <img src={it.img} alt={it.label} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                        <SignalIcon className="h-4 w-4" />
                      </div>
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white leading-tight">{it.label}</p>
                    <p className="text-xs text-lime-200">{new Date(it.timestamp).toLocaleString()}</p>
                    {it.instructions ? <p className="text-xs text-lime-100 mt-1 truncate">{it.instructions}</p> : null}
                  </div>
                </li>
              ))
            )}
          </ul>
        )}

        <div className="mt-4 text-right">
          <a href="/user/signals" className="text-sm text-lime-200 hover:underline">
            Refresh
          </a>
        </div>
      </div>

      {/* Preview modal */}
      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelected(null)}
        >
          <div className="bg-white/5 rounded-lg overflow-hidden max-w-3xl w-full shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end p-2">
              <button onClick={() => setSelected(null)} className="text-lime-200 bg-transparent hover:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-lime-400" aria-label="Close preview">✕</button>
            </div>

            <div className="px-6 pb-6">
              {selected.img ? (
                <img src={selected.img} alt="Signal image" className="w-full h-[40vh] md:h-96 max-h-[70vh] object-contain bg-slate-900 rounded" />
              ) : (
                <div className="w-full h-[40vh] md:h-96 max-h-[70vh] bg-slate-900 rounded flex items-center justify-center">
                  <SignalIcon className="h-16 w-16" />
                </div>
              )}

              <div className="mt-4 text-white">
                <p className="font-semibold">{selected.label}</p>
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
