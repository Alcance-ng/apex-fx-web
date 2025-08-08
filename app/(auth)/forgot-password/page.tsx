"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/Card";
import { ForgotPasswordEmailStep } from "./ForgotPasswordEmailStep";
import { ForgotPasswordOtpStep } from "./ForgotPasswordOtpStep";
import { ForgotPasswordPasswordStep } from "./ForgotPasswordPasswordStep";
import { ForgotPasswordSuccessStep } from "./ForgotPasswordSuccessStep";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-green-900/80 via-emerald-900/80 to-lime-900/60 shadow-lg border border-white/10 backdrop-blur-md">
          <div className="p-8 text-center">
            <ForgotPasswordSuccessStep onBackToLogin={handleBackToLogin} />
          </div>
        </Card>
      </div>
    );
  }

  // Password Reset Step
  if (currentStep === "password") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-green-900/80 via-emerald-900/80 to-lime-900/60 shadow-lg border border-white/10 backdrop-blur-md">
          <div className="p-8">
            <ForgotPasswordPasswordStep
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              error={error}
              isLoading={isLoading}
              onSubmit={handlePasswordSubmit}
              onBack={goBackToOtp}
            />
          </div>
        </Card>
      </div>
    );
  }

  // OTP Verification Step
  if (currentStep === "otp") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-green-900/80 via-emerald-900/80 to-lime-900/60 shadow-lg border border-white/10 backdrop-blur-md">
          <div className="p-8">
            <ForgotPasswordOtpStep
              email={email}
              otp={otp}
              setOtp={setOtp}
              error={error}
              isLoading={isLoading}
              isResending={isResending}
              timeLeft={timeLeft}
              onSubmit={handleOtpSubmit}
              onResend={handleResendOtp}
              onBack={goBackToEmail}
            />
          </div>
        </Card>
      </div>
    );
  }

  // Email Input Step (Default)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-green-900/80 via-emerald-900/80 to-lime-900/60 shadow-lg border border-white/10 backdrop-blur-md">
        <div className="p-8">
          <ForgotPasswordEmailStep
            email={email}
            setEmail={setEmail}
            error={error}
            isLoading={isLoading}
            onSubmit={handleEmailSubmit}
          />
          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-base text-lime-300 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors"
              aria-label="Back to login"
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
              Back to login
            </Link>
          </div>
          {/* Help Text */}
          <div className="mt-8 p-4 bg-lime-900/80 rounded-lg border border-lime-400">
            <h3 className="text-base font-medium text-white mb-2">
              Still having trouble?
            </h3>
            <p className="text-base text-lime-100">
              Contact our support team at{" "}
              <a
                href="mailto:support@apexfx.com"
                className="text-lime-300 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors"
                aria-label="Contact support"
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
