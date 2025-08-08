"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if already authenticated
  if (status === "authenticated" && session?.user) {
    const role = session.user.role;
    if (role === "SUPER_ADMIN") {
      router.push("/super-admin/dashboard");
    } else if (role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
    return null;
  }

  const handleChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!agreedToTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      // Register the user directly with the backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/register`,
        {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }
      );

      if (response.data?.success) {
        // Registration successful, now sign them in
        const signInResult = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (signInResult?.error) {
          setError(
            "Registration successful, but login failed. Please try logging in manually."
          );
          router.push("/login");
        } else if (signInResult?.ok) {
          // Give NextAuth time to update the session
          window.location.reload();
        }
      } else {
        setError(
          response.data?.message || "Registration failed. Please try again."
        );
      }
    } catch (err: unknown) {
      let errorMessage = "Registration failed. Please try again.";

      if (err && typeof err === "object" && "response" in err) {
        const response = (err as { response?: { data?: { message?: string } } })
          .response;
        errorMessage = response?.data?.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-emerald-900 to-lime-900 p-4"
      role="main"
      aria-labelledby="register-title"
    >
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
            <h1
              id="register-title"
              className="text-3xl font-bold text-white mb-2 drop-shadow"
            >
              Create your account
            </h1>
            <p className="text-lime-100">
              Join thousands of successful traders
            </p>
          </div>

          {/* Error Message */}
          <div aria-live="polite" aria-atomic="true">
            {error && (
              <div
                className="mb-6 p-4 bg-red-900/80 border border-red-400 rounded-lg shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                role="alert"
              >
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Registration Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-label="Registration form"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-lime-100 mb-2">
                  First name
                  <Input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                    placeholder="First name"
                    className="w-full mt-1 text-lime-900 bg-white/90 border border-lime-400 focus:border-lime-500 focus:ring-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                    aria-required="true"
                    aria-label="First name"
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-lime-100 mb-2">
                  Last name
                  <Input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                    placeholder="Last name"
                    className="w-full mt-1 text-lime-900 bg-white/90 border border-lime-400 focus:border-lime-500 focus:ring-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                    aria-required="true"
                    aria-label="Last name"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-lime-100 mb-2">
                Email address
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="Enter your email"
                  className="w-full mt-1 text-lime-900 bg-white/90 border border-lime-400 focus:border-lime-500 focus:ring-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                  aria-required="true"
                  aria-label="Email address"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-lime-100 mb-2">
                Password
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange("password")}
                    placeholder="Create a password"
                    className="w-full mt-1 text-lime-900 bg-white/90 border border-lime-400 focus:border-lime-500 focus:ring-lime-500 pr-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                    aria-required="true"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 bg-transparent text-lime-400 hover:text-lime-200 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    tabIndex={0}
                  >
                    {showPassword ? (
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
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    placeholder="Confirm your password"
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

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="h-4 w-4 text-lime-400 focus:ring-lime-400 border-lime-400 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
                  aria-required="true"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-lime-100">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-lime-300 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-lime-300 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-lime-700 hover:bg-lime-800 focus-visible:ring-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 text-white font-semibold py-3 rounded-lg transition-colors motion-safe:transition-all"
              aria-label="Create account"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-base text-lime-100">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-lime-300 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors"
                aria-label="Sign in"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
