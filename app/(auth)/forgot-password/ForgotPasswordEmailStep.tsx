import { Button } from "@/components/ui/Button";
import {
  ForgotPasswordHeader,
  ForgotPasswordError,
} from "./ForgotPasswordCommon";
import { Input } from "@/components/ui/Input";

export function ForgotPasswordEmailStep({
  email,
  setEmail,
  error,
  isLoading,
  onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  error: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <>
      <ForgotPasswordHeader
        title="Forgot password?"
        subtitle="No worries, we'll send you reset instructions"
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
        aria-label="Forgot password form"
      >
        <div>
          <label className="block text-sm font-medium text-lime-100 mb-2">
            Email address
            <Input
              type="email"
              required
              value={email}
              onChange={(value) => setEmail(value)}
              placeholder="Enter your email address"
              className="w-full mt-1 text-lime-900 bg-white/90 border border-lime-400 focus:border-lime-500 focus:ring-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
              aria-required="true"
              aria-label="Email address"
            />
          </label>
          <p className="mt-1 text-base text-lime-200">
            Enter the email address associated with your account
          </p>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-lime-700 hover:bg-lime-800 text-white font-semibold py-3 rounded-lg focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 transition-colors motion-safe:transition-all"
          aria-label="Send reset code"
        >
          {isLoading ? "Sending..." : "Send reset code"}
        </Button>
      </form>
    </>
  );
}
