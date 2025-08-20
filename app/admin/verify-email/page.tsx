"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function AdminVerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") ?? "";

  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!email) {
      router.push("/admin/register");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [email, router]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit verification code");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      // TODO: Replace with actual API call
      console.log("Admin verification attempt:", {
        email,
        code: verificationCode,
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess("Email verified successfully! Redirecting to admin login...");
      setTimeout(() => {
        router.push("/admin/login?verified=true");
      }, 2000);
    } catch {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (timeLeft > 0) return;
    setIsResending(true);
    setError("");
    setSuccess("");
    try {
      // TODO: Replace with actual API call
      console.log("Resending admin verification code to:", email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("Verification code sent! Check your email.");
      setTimeLeft(60);
    } catch {
      setError("Failed to resend verification code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Verify Email | Apex FX</title>
        <meta
          name="description"
          content="Enter the 6-digit code sent to your email to verify your Apex FX admin account."
        />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-4">
        <Card className="w-full max-w-md bg-white/95 shadow-lg">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <Link
                href="/admin"
                className="text-2xl font-bold text-lime-700 mb-6 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded"
              >
                Apex FX Admin
              </Link>
              <div className="w-16 h-16 bg-lime-100 rounded-full mx-auto mb-4 flex items-center justify-center">
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Verify your admin email
              </h1>
              <p className="text-base text-gray-700">
                We&apos;ve sent a 6-digit verification code to
              </p>
              <p className="text-base text-gray-900 font-medium">{email}</p>
            </div>
            {/* Success/Error Message */}
            <div aria-live="polite" aria-atomic="true">
              {success && (
                <div
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                  role="status"
                >
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
              )}
              {error && (
                <div
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                  role="alert"
                >
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}
            </div>
            {/* Verification Form */}
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <Input
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(value) => {
                    const numbersOnly = value.replace(/\D/g, "").slice(0, 6);
                    setVerificationCode(numbersOnly);
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
                disabled={isLoading || verificationCode.length !== 6}
                className="w-full"
              >
                {isLoading ? "Verifying..." : "Verify Email"}
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
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="w-full"
                >
                  {isResending ? "Sending..." : "Resend Code"}
                </Button>
              )}
            </div>
            {/* Back to Registration */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Wrong email address?{" "}
                <Link
                  href="/admin/register"
                  className="font-medium text-lime-700 hover:text-lime-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 rounded"
                >
                  Go back to registration
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
