"use client";

import React, { useState } from "react";
import { Session } from "next-auth";
import { Button } from "@/components/ui/Button";
import axios from "axios";
import { APP_CONFIG } from "@/lib/constants";
import { SignalPlan } from "@/hooks/useSignalPlans";

interface CreateSignalUpdateProps {
  session: Session;
  plans: SignalPlan[];
  isPlansLoading: boolean;
  onCancel: () => void;
}

export default function CreateSignalUpdate({ session, plans, isPlansLoading, onCancel }: CreateSignalUpdateProps) {
  // Form state
  const [planCode, setPlanCode] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [instructions, setInstructions] = useState("");
  const [fileUrlBefore, setFileUrlBefore] = useState<string | null>(null);
  const [fileBefore, setFileBefore] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Automatic upload function
  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary not configured");
      }
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", uploadPreset);
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const resp = await axios.post(url, form, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percentCompleted);
        },
      });
      if (!resp || !resp.data) throw new Error("Upload failed");
      setFileUrlBefore(resp.data.secure_url);
      setSuccess("Image uploaded successfully");
    } catch (e) {
      setError(String((e as Error).message || "Upload failed"));
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileBeforeChange = (f: File | null) => {
    if (!f) {
      setFileBefore(null);
      setUploadProgress(0);
      return;
    }
    if (!f.type || !f.type.startsWith("image/")) {
      setFileBefore(null);
      setError("Only image files are allowed.");
      setUploadProgress(0);
      return;
    }
    setError(null);
    setFileBefore(f);
    setUploadProgress(0);
    // Automatically start upload
    uploadFile(f);
  };

  return (
    <div className="bg-[#2d1847]/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-purple-900">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          setError(null);

          try {
            // Image is automatically uploaded when selected
            const payload = {
              planCode,
              timeFrame,
              instructions,
              fileUrlBefore: fileUrlBefore || undefined,
            } as Record<string, unknown>;

            // Post using fetch
            const resp = await fetch(`${APP_CONFIG.api.baseUrl}/signal/updates`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
              },
              body: JSON.stringify(payload),
            });

            if (resp.ok) {
              // Success for 200-299 status codes (including 201 Created)
              setSuccess("Signal created successfully");
              // clear form
              setPlanCode("");
              setTimeFrame("");
              setInstructions("");
              setFileUrlBefore(null);
              setFileBefore(null);
              setUploadProgress(0);
            } else {
              // Handle error responses
              const json = await resp.json();
              setError(json.message || `Failed to create signal (${resp.status})`);
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
              value={planCode}
              onChange={(e) => {
                const selectedCode = e.target.value;
                setPlanCode(selectedCode);
              }}
              required
              className="w-full px-3 py-2 rounded-lg bg-[#2d1847]/60 border-2 border-purple-400 text-purple-200 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none pr-10 font-semibold shadow-md group-hover:border-purple-300 group-hover:bg-[#2d1847]/80 transition-colors"
              style={{ cursor: 'pointer' }}
              aria-label="Select a plan"
            >
              <option value="">Select a plan</option>
              {plans.map((p) => (
                <option key={p.id} value={p.plan_code}>
                  {p.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 text-lg">
              ▼
            </span>
          </div>
          {isPlansLoading && <p className="text-sm text-purple-300">Loading plans...</p>}
        </div>

        <div>
          <label className="block text-sm text-purple-300 mb-1">Time Frame</label>
          <select
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg bg-[#2d1847]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Select time frame"
          >
            <option value="">Select time frame</option>
            <option value="30MINS">30 Minutes</option>
            <option value="1HOUR">1 Hour</option>
            <option value="4HOURS">4 Hours</option>
            <option value="1DAY">1 Day</option>
            <option value="1WEEK">1 Week</option>
          </select>
          <p className="text-xs text-purple-300 mt-1">Select the time frame for the signal.</p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-purple-300 mb-1">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            className="w-full h-32 px-3 py-2 rounded-lg bg-[#2d1847]/60 border border-purple-900 text-white placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Buy EURUSD at 1.0800, TP 1.0850, SL 1.0750"
          />
        </div>

        <div>
          <label className="block text-sm text-purple-300 mb-1">
            File (Before) {isUploading && <span className="text-purple-400">- Uploading... {uploadProgress}%</span>}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileBeforeChange(e.target.files?.[0] ?? null)}
            disabled={isUploading}
            className="w-full text-sm text-white bg-[#2d1847]/40 border border-purple-700 rounded-md px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="w-full mt-2">
              <div className="bg-[#2d1847]/60 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-purple-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-purple-300 mt-1 text-center">
                {uploadProgress}% uploaded
              </p>
            </div>
          )}

          <p className="text-xs text-purple-300 mt-1">
            {fileBefore ? `Selected: ${fileBefore.name}` : "Optional: select an image to upload automatically"}
          </p>
        </div>

        {/* Image Preview */}
        {fileUrlBefore && (
          <div className="md:col-span-2">
            <label className="block text-sm text-purple-300 mb-2">Uploaded Image Preview</label>
            <div className="relative inline-block">
              <div className="relative w-64 h-48 rounded-lg border border-purple-700 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fileUrlBefore}
                  alt="Uploaded signal image"
                  className="w-full h-full object-cover rounded-lg"
                  onError={() => {
                    console.error('Failed to load image:', fileUrlBefore);
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setFileUrlBefore(null);
                  setFileBefore(null);
                  setSuccess(null);
                  setUploadProgress(0);
                }}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                title="Remove image"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="md:col-span-2 flex items-center justify-between">
          <div className="flex-1">
            {error && <p className="text-sm text-yellow-300">{error}</p>}
            {success && <p className="text-sm text-green-300">{success}</p>}
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Signal"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
