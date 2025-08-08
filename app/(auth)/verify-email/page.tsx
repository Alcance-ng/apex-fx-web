"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import Head from "next/head";
import { apiClient } from "@/lib/api";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams ? searchParams.get("email") || "" : "";

  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds cooldown for resend

  useEffect(() => {
    if (!email) {
      router.push("/register");
      return;
    }

    // Start countdown timer
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
      const payload = {
        email,
        code: verificationCode,
      };
      console.log("Verify payload:", payload);
      const response = await apiClient.verifyEmail(payload);
      console.log("Verify response:", response);
      if (response?.error) {
        setError(
          response?.message || "Invalid verification code. Please try again."
        );
        return;
      }
      setSuccess("Email verified successfully! Redirecting to login...");

      setTimeout(() => {
        router.push("/login?verified=true");
      }, 2000);
    } catch (err) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(
        errorObj?.response?.data?.message ||
          "Invalid verification code. Please try again."
      );
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
      const payload = {
        name: "", // Name not needed for resend, backend should ignore
        email,
        password: "", // Password not needed for resend, backend should ignore
      };
      console.log("Resend payload:", payload);
      const response = await apiClient.registerUser(payload);
      console.log("Resend response:", response);
      if (response?.error) {
        setError(
          response?.message ||
            "Failed to resend verification code. Please try again."
        );
        return;
      }
      setSuccess("Verification code sent! Check your email.");
      setTimeLeft(60); // Reset timer
      // Start new countdown
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(
        errorObj?.response?.data?.message ||
          "Failed to resend verification code. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <Head>
        <title>Verify Email | Apex FX</title>
        <meta
          name="description"
          content="Enter the 6-digit code sent to your email to verify your Apex FX account."
        />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-green-900/80 via-emerald-900/80 to-lime-900/60 shadow-lg border border-white/10 backdrop-blur-md">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <Link
                href="/"
                className="text-2xl font-bold text-lime-200 mb-6 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors"
                aria-label="Go to Apex FX homepage"
              >
                Apex FX
              </Link>
              <div className="w-16 h-16 bg-lime-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-lime-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 drop-shadow">
                Verify your email
              </h1>
              <p className="text-base text-lime-100">
                We&apos;ve sent a 6-digit verification code to
              </p>
              <p className="text-base text-lime-200 font-medium">{email}</p>
            </div>

            {/* Success Message */}
            <div aria-live="polite" aria-atomic="true">
              {success && (
                <div
                  className="mb-6 p-4 bg-green-900/80 border border-green-400 rounded-lg shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
                  role="status"
                >
                  <p className="text-green-200 text-sm">{success}</p>
                </div>
              )}
              {/* Error Message */}
              {error && (
                <div
                  className="mb-6 p-4 bg-red-900/80 border border-red-400 rounded-lg shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  role="alert"
                >
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Verification Form */}
            <form
              onSubmit={handleVerify}
              className="space-y-6"
              aria-label="Email verification form"
            >
              <div>
                <label className="block text-sm font-medium text-lime-100 mb-2">
                  Verification Code
                </label>
                <Input
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(value) => {
                    // Only allow numbers and limit to 6 digits
                    const numbersOnly = value.replace(/\D/g, "").slice(0, 6);
                    setVerificationCode(numbersOnly);
                    setError("");
                  }}
                  placeholder="Enter 6-digit code"
                  className="w-full text-center text-2xl tracking-widest text-lime-900 bg-white/90 border border-lime-400 focus:border-lime-500 focus:ring-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                  aria-required="true"
                  aria-label="Verification code"
                />
                <p className="mt-1 text-xs text-lime-200 text-center">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                className="w-full bg-lime-700 hover:bg-lime-800 focus-visible:ring-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 text-white font-semibold py-3 rounded-lg transition-colors motion-safe:transition-all"
                aria-label="Verify Email"
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            {/* Resend Code */}
            <div className="mt-6 text-center">
              <p className="text-sm text-lime-100 mb-3">
                Didn&apos;t receive the code?
              </p>

              {timeLeft > 0 ? (
                <p className="text-sm text-lime-200">
                  You can request a new code in {timeLeft} seconds
                </p>
              ) : null}
              {timeLeft === 0 && (
                <Button
                  variant="outline"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="w-full border-lime-700 text-lime-200 hover:bg-lime-900/30 focus-visible:ring-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 motion-safe:transition-all"
                  aria-label="Resend verification code"
                >
                  {isResending ? "Sending..." : "Resend Code"}
                </Button>
              )}
            </div>

            {/* Back to Registration */}
            <div className="mt-6 text-center">
              <p className="text-sm text-lime-100">
                Wrong email address?{" "}
                <Link
                  href="/register"
                  className="font-medium text-lime-300 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors"
                  aria-label="Go back to registration"
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
