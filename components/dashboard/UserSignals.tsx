import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { SignalIcon } from "@/components/admin/super-dash/SignalIcon";
import { signOut } from "next-auth/react";
import { MagnifyingGlassIcon, FunnelIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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
  if (res.status === 401) {
    console.log("401 Unauthorized - Signing out user");
    await signOut({ callbackUrl: "/login" });
    throw new Error("Unauthorized");
  }
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
  if (res.status === 401) {
    console.log("401 Unauthorized - Signing out user");
    await signOut({ callbackUrl: "/login" });
    throw new Error("Unauthorized");
  }
  if (!res.ok) throw new Error("Failed to fetch signal updates");
  return res.json();
}

export function UserSignals() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  // Fetch user info to get planCode
  const { data: userData } = useSWR<UserMeResponse>(
    token && BASE_URL ? [`${BASE_URL}/users/me`, token] : null,
    ([url, token]: [string, string]) => fetchUserMe(url, token)
  );

  // Fetch signal updates using planCode
  const { data: updatesData, error: updatesError, isLoading: updatesLoading } = useSWR<SignalUpdatesResponse>(
    userData?.planCode && token && BASE_URL ? [`${BASE_URL}/signal/${userData.planCode}/updates`, token] : null,
    ([url, token]: [string, string]) => fetchSignalUpdates(url, token)
  );

  // Search, filter, and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "before" | "after">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "type">("newest");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Prepare a flattened list similar to transactions (we'll show before entries first, then after entries when present)
  const allItems = useMemo(() => {
    const signals = updatesData || [];
    const items: Array<{
      id: string;
      label: string;
      img?: string;
      instructions?: string;
      timestamp: string;
      kind: "before" | "after";
    }> = [];

    for (const s of signals) {
      if (s.fileUrlBefore) {
        items.push({
          id: `${s.signalPlanId}-before-${s.createdAt}`,
          label: `Before — ${s.timeFrame}`,
          img: s.fileUrlBefore,
          instructions: s.instructions,
          timestamp: s.createdAt,
          kind: "before",
        });
      }
      if (s.fileUrlAfter) {
        items.push({
          id: `${s.signalPlanId}-after-${s.updatedAt || s.createdAt}`,
          label: `After — ${s.timeFrame}`,
          img: s.fileUrlAfter,
          instructions: s.instructions,
          timestamp: s.updatedAt || s.createdAt,
          kind: "after",
        });
      }
    }

    // Sort items
    return items.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case "oldest":
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case "type":
          if (a.kind === b.kind) {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          }
          return a.kind === "before" ? -1 : 1;
        default:
          return 0;
      }
    });
  }, [updatesData, sortBy]);

  // Filter and search items
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Search filter
      const matchesSearch = debouncedSearchTerm === "" ||
        item.instructions?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        item.timestamp.includes(debouncedSearchTerm);

      // Type filter
      const matchesType = filterType === "all" || item.kind === filterType;

      return matchesSearch && matchesType;
    });
  }, [allItems, debouncedSearchTerm, filterType]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = filteredItems.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

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

      {/* Search and Filter Controls */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lime-400" />
            <input
              type="text"
              placeholder="Search signals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
            />
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Type Filter */}
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lime-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as "all" | "before" | "after")}
                className="pl-10 pr-8 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent appearance-none"
              >
                <option value="all" className="bg-slate-800">All Signals</option>
                <option value="before" className="bg-slate-800">Before Images</option>
                <option value="after" className="bg-slate-800">After Images</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "type")}
                className="pl-3 pr-8 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent appearance-none"
              >
                <option value="newest" className="bg-slate-800">Newest First</option>
                <option value="oldest" className="bg-slate-800">Oldest First</option>
                <option value="type" className="bg-slate-800">By Type</option>
              </select>
            </div>

            {/* Items Per Page */}
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="pl-3 pr-8 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent appearance-none"
              >
                <option value={5} className="bg-slate-800">5 per page</option>
                <option value={10} className="bg-slate-800">10 per page</option>
                <option value={25} className="bg-slate-800">25 per page</option>
                <option value={50} className="bg-slate-800">50 per page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-lime-200">
          <div>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} signals
          </div>
          {debouncedSearchTerm && (
            <div className="mt-1 sm:mt-0">
              Search: &quot;{debouncedSearchTerm}&quot;
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {updatesLoading ? (
          <div className="text-white">Loading signals...</div>
        ) : updatesError ? (
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
                      <Image src={it.img} alt={it.label} width={40} height={40} className="w-full h-full object-cover" />
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-lime-200">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-1">
                {/* First Page */}
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-lime-200 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm"
                  aria-label="First page"
                >
                  First
                </button>

                {/* Previous Page */}
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white/5 border border-white/20 text-lime-200 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-lime-400"
                  aria-label="Previous page"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 7) {
                      pageNum = i + 1;
                    } else if (currentPage <= 4) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      pageNum = totalPages - 6 + i;
                    } else {
                      pageNum = currentPage - 3 + i;
                    }

                    if (pageNum > totalPages || pageNum < 1) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-lime-400 min-w-[40px] ${
                          currentPage === pageNum
                            ? "bg-lime-600 text-white"
                            : "bg-white/5 border border-white/20 text-lime-200 hover:bg-white/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page */}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white/5 border border-white/20 text-lime-200 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-lime-400"
                  aria-label="Next page"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>

                {/* Last Page */}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-lime-200 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm"
                  aria-label="Last page"
                >
                  Last
                </button>
              </div>
            </div>

            {/* Go to Page Input */}
            {totalPages > 10 && (
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-lime-200">Go to page:</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }}
                  className="w-16 px-2 py-1 bg-white/5 border border-white/20 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const page = parseInt((e.target as HTMLInputElement).value);
                      if (page >= 1 && page <= totalPages) {
                        setCurrentPage(page);
                      }
                    }
                  }}
                />
                <span className="text-sm text-lime-200">of {totalPages}</span>
              </div>
            )}
          </div>
        )}
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
                <Image src={selected.img} alt="Signal image" width={800} height={600} className="w-full h-[40vh] md:h-96 max-h-[70vh] object-contain bg-slate-900 rounded" />
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
