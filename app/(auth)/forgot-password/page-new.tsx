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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Step 1: Send email for reset
  const handleEmailSubmit = async (e: React.FormEvent) => {
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

      // Move to OTP step
      setCurrentStep("otp");
      setTimeLeft(60); // Start 60-second countdown for resend
    } catch {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: Replace with actual API call
      console.log("OTP verification:", { email, otp });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Move to password reset step
      setCurrentStep("password");
    } catch {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Set new password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: Replace with actual API call
      console.log("Password reset:", { email, otp, newPassword });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success step
      setCurrentStep("success");
    } catch {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (timeLeft > 0) return;

    setIsResending(true);
    setError("");

    try {
      // TODO: Replace with actual API call
      console.log("Resending OTP to:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTimeLeft(60); // Reset timer
    } catch {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const goBackToEmail = () => {
    setCurrentStep("email");
    setOtp("");
    setError("");
  };

  const goBackToOtp = () => {
    setCurrentStep("otp");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  // Success Step
  if (currentStep === "success") {
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
              Password reset successful!
            </h1>

            <p className="text-gray-600 mb-8">
              Your password has been successfully reset. You can now sign in
              with your new password.
            </p>

            <Button onClick={handleBackToLogin} className="w-full">
              Back to login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Password Reset Step
  if (currentStep === "password") {
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
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Set new password
              </h1>
              <p className="text-gray-600">Enter your new password below</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New password
                </label>
                <Input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(value) => {
                    setNewPassword(value);
                    setError("");
                  }}
                  placeholder="Enter new password"
                  className="w-full"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm password
                </label>
                <Input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(value) => {
                    setConfirmPassword(value);
                    setError("");
                  }}
                  placeholder="Confirm new password"
                  className="w-full"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Resetting password..." : "Reset password"}
              </Button>
            </form>

            {/* Back to OTP */}
            <div className="mt-6 text-center">
              <button
                onClick={goBackToOtp}
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
                Back to verification
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // OTP Verification Step
  if (currentStep === "otp") {
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Enter verification code
              </h1>
              <p className="text-gray-600">We&apos;ve sent a 6-digit code to</p>
              <p className="text-gray-900 font-medium">{email}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* OTP Form */}
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <Input
                  type="text"
                  required
                  value={otp}
                  onChange={(value) => {
                    // Only allow numbers and limit to 6 digits
                    const numbersOnly = value.replace(/\D/g, "").slice(0, 6);
                    setOtp(numbersOnly);
                    setError("");
                  }}
                  placeholder="Enter 6-digit code"
                  className="w-full text-center text-2xl tracking-widest"
                />
                <p className="mt-1 text-xs text-gray-500 text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full"
              >
                {isLoading ? "Verifying..." : "Verify code"}
              </Button>
            </form>

            {/* Resend Code */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Didn&apos;t receive the code?
              </p>

              {timeLeft > 0 ? (
                <p className="text-sm text-gray-500">
                  You can request a new code in {timeLeft} seconds
                </p>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="w-full"
                >
                  {isResending ? "Sending..." : "Resend code"}
                </Button>
              )}
            </div>

            {/* Back to Email */}
            <div className="mt-6 text-center">
              <button
                onClick={goBackToEmail}
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
                Wrong email address?
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Email Input Step (Default)
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
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
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
          <form onSubmit={handleEmailSubmit} className="space-y-6">
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
              {isLoading ? "Sending..." : "Send reset code"}
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
