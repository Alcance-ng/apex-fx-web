import { Button } from "@/components/ui/Button";
import {
  ForgotPasswordHeader,
  ForgotPasswordError,
} from "./ForgotPasswordCommon";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export function ForgotPasswordPasswordStep({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  isLoading,
  onSubmit,
  onBack,
}: {
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  error: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <ForgotPasswordHeader
        title="Set new password"
        subtitle="Enter your new password below"
        icon={
          <svg
            className="w-8 h-8 text-lime-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
            />
          </svg>
        }
      />
      <ForgotPasswordError error={error} />
      <form
        onSubmit={onSubmit}
        className="space-y-6"
        aria-label="Set new password form"
      >
        <div>
          <label className="block text-sm font-medium text-lime-100 mb-2">
            New password
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={setNewPassword}
                placeholder="Enter new password"
                className="w-full mt-1 text-lime-900 bg-white/90 border border-lime-400 focus:border-lime-500 focus:ring-lime-500 pr-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                aria-required="true"
                aria-label="New password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 bg-transparent text-lime-400 hover:text-lime-200 transition-colors"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
                tabIndex={0}
              >
                {showNewPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4.293 4.293a1 1 0 011.414 0l10 10a1 1 0 01-1.414 1.414l-1.337-1.337A8.003 8.003 0 012 10c1.333-2.667 4.667-6 8-6a7.963 7.963 0 015.657 2.343l-1.414 1.414A5.978 5.978 0 0010 4c-2.667 0-5.333 2.667-6.667 5.333a6.003 6.003 0 001.96 2.293l-1.337-1.337a1 1 0 010-1.414z" />
                    <path d="M10 8a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 4c-3.333 0-6.667 3.333-8 6 1.333 2.667 4.667 6 8 6s6.667-3.333 8-6c-1.333-2.667-4.667-6-8-6zm0 10a4 4 0 110-8 4 4 0 010 8zm0-6a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                )}
              </button>
            </div>
          </label>
          <p className="mt-1 text-base text-lime-200">
            Must be at least 8 characters long
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-lime-100 mb-2">
            Confirm password
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm new password"
                className="w-full mt-1 text-lime-900 bg-white/90 border border-lime-400 focus:border-lime-500 focus:ring-lime-500 pr-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                aria-required="true"
                aria-label="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 bg-transparent text-lime-400 hover:text-lime-200 transition-colors"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                tabIndex={0}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4.293 4.293a1 1 0 011.414 0l10 10a1 1 0 01-1.414 1.414l-1.337-1.337A8.003 8.003 0 012 10c1.333-2.667 4.667-6 8-6a7.963 7.963 0 015.657 2.343l-1.414 1.414A5.978 5.978 0 0010 4c-2.667 0-5.333 2.667-6.667 5.333a6.003 6.003 0 001.96 2.293l-1.337-1.337a1 1 0 010-1.414z" />
                    <path d="M10 8a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 4c-3.333 0-6.667 3.333-8 6 1.333 2.667 4.667 6 8 6s6.667-3.333 8-6c-1.333-2.667-4.667-6-8-6zm0 10a4 4 0 110-8 4 4 0 010 8zm0-6a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                )}
              </button>
            </div>
          </label>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-lime-700 hover:bg-lime-800 text-white font-semibold py-3 rounded-lg focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 transition-colors motion-safe:transition-all"
          aria-label="Reset password"
        >
          {isLoading ? "Resetting password..." : "Reset password"}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center text-base text-lime-300 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors"
          aria-label="Back to verification"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to verification
        </button>
      </div>
    </>
  );
}
