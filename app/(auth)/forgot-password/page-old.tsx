"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

type ResetStep = "email" | "otp" | "password" | "success";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: Replace with actual API call
      console.log("Password reset request for:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Handle successful request
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
        <Card className="w-full max-w-md">
          <div className="p-8 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Check your email
            </h1>

            <p className="text-gray-600 mb-2">
              We&apos;ve sent a password reset link to:
            </p>
            <p className="text-gray-900 font-medium mb-6">{email}</p>

            <p className="text-sm text-gray-500 mb-8">
              Didn&apos;t receive the email? Check your spam folder or try again
              in a few minutes.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => setSuccess(false)}
                variant="outline"
                className="w-full"
              >
                Try another email
              </Button>

              <Button onClick={handleBackToLogin} className="w-full">
                Back to login
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 mb-6 block"
            >
              Apex FX
            </Link>
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Forgot password?
            </h1>
            <p className="text-gray-600">
              No worries, we&apos;ll send you reset instructions
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Reset Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  setError("");
                }}
                placeholder="Enter your email address"
                className="w-full"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the email address associated with your account
              </p>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Sending..." : "Send reset instructions"}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to login
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Still having trouble?
            </h3>
            <p className="text-xs text-gray-600">
              Contact our support team at{" "}
              <a
                href="mailto:support@apexfx.com"
                className="text-blue-600 hover:text-blue-500"
              >
                support@apexfx.com
              </a>{" "}
              for additional help with your account.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
