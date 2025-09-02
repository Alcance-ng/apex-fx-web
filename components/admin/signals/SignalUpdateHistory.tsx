"use client";

import React from "react";
import { useSignalHistory, SignalHistoryItem } from "@/hooks/useSignalHistory";
import { useAdminAuth } from "@/hooks/useAdminNextAuth";

interface SignalUpdateHistoryProps {
  limit?: number;
}

export default function SignalUpdateHistory({ limit = 10 }: SignalUpdateHistoryProps) {
  const { session } = useAdminAuth();
  const { signals, isLoading, error } = useSignalHistory(session?.accessToken, limit);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeFrameLabel = (timeFrame: string) => {
    const labels: Record<string, string> = {
      "30MINS": "30 Minutes",
      "1HOUR": "1 Hour",
      "4HOURS": "4 Hours",
      "1DAY": "1 Day",
      "1WEEK": "1 Week",
    };
    return labels[timeFrame] || timeFrame;
  };

  if (isLoading) {
    return (
      <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-purple-900">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-600 border-t-transparent"></div>
          <span className="ml-3 text-purple-200">Loading signal history...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-purple-900">
        <div className="text-center py-8">
          <p className="text-red-300">Failed to load signal history</p>
          <p className="text-sm text-purple-300 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (signals.length === 0) {
    return (
      <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-purple-900">
        <div className="text-center py-8">
          <p className="text-purple-300">No signal updates found</p>
          <p className="text-sm text-purple-400 mt-2">Create your first signal update above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-purple-900">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-purple-200">Signal Update History</h2>
        <p className="text-purple-300 mt-1">Recent signal broadcasts</p>
      </div>

      <div className="space-y-4">
        {signals.map((signal: SignalHistoryItem) => (
          <div
            key={signal.id}
            className="bg-[#1a1333]/60 rounded-lg p-6 border border-purple-700/50 hover:border-purple-600/70 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-purple-600/20 text-purple-200 rounded-full text-sm font-medium">
                    {signal.planCode}
                  </span>
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-200 rounded-full text-sm">
                    {getTimeFrameLabel(signal.timeFrame)}
                  </span>
                </div>
                <p className="text-white font-medium mb-2">{signal.instructions}</p>
                <p className="text-sm text-purple-300">
                  Created: {formatDate(signal.createdAt)}
                </p>
              </div>
            </div>

            {signal.fileUrlBefore && (
              <div className="mt-4">
                <div className="relative w-32 h-24 rounded-lg border border-purple-700 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={signal.fileUrlBefore}
                    alt="Signal chart"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Failed to load signal image:', signal.fileUrlBefore);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {signals.length >= limit && (
        <div className="text-center mt-6">
          <p className="text-sm text-purple-400">
            Showing last {limit} signal updates
          </p>
        </div>
      )}
    </div>
  );
}
