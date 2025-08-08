import { Button } from "@/components/ui/Button";
import {
  ForgotPasswordHeader,
  ForgotPasswordError,
} from "./ForgotPasswordCommon";
import { Input } from "@/components/ui/Input";

export function ForgotPasswordOtpStep({
  email,
  otp,
  setOtp,
  error,
  isLoading,
  isResending,
  timeLeft,
  onSubmit,
  onResend,
  onBack,
}: {
  email: string;
  otp: string;
  setOtp: (v: string) => void;
  error: string;
  isLoading: boolean;
  isResending: boolean;
  timeLeft: number;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  onBack: () => void;
}) {
  return (
    <>
      <ForgotPasswordHeader
        title="Enter verification code"
        subtitle={"We've sent a 6-digit code to"}
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
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        }
      />
      <p className="text-base text-lime-200 font-medium text-center mb-4">
        {email}
      </p>
      <ForgotPasswordError error={error} />
      <form
        onSubmit={onSubmit}
        className="space-y-6"
        aria-label="OTP verification form"
      >
        <div>
          <label className="block text-sm font-medium text-lime-100 mb-2">
            Verification Code
            <Input
              type="text"
              required
              value={otp}
              onChange={(value) => setOtp(value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter 6-digit code"
              className="w-full text-center text-2xl tracking-widest text-lime-900 bg-white/90 border border-lime-400 focus:border-lime-500 focus:ring-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
              aria-required="true"
              aria-label="Verification code"
            />
          </label>
          <p className="mt-1 text-base text-lime-200 text-center">
            Enter the 6-digit code sent to your email
          </p>
        </div>
        <Button
          type="submit"
          disabled={isLoading || otp.length !== 6}
          className="w-full bg-lime-700 hover:bg-lime-800 text-white font-semibold py-3 rounded-lg focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 transition-colors motion-safe:transition-all"
          aria-label="Verify code"
        >
          {isLoading ? "Verifying..." : "Verify code"}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-base text-lime-100 mb-3">
          Didn&#39;t receive the code?
        </p>
        {timeLeft > 0 ? (
          <p className="text-base text-lime-200">
            You can request a new code in {timeLeft} seconds
          </p>
        ) : null}
        {timeLeft === 0 && (
          <Button
            variant="outline"
            onClick={onResend}
            disabled={isResending}
            className="w-full border-lime-700 text-lime-200 hover:bg-lime-900/30 focus-visible:ring-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 motion-safe:transition-all"
            aria-label="Resend code"
          >
            {isResending ? "Sending..." : "Resend code"}
          </Button>
        )}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center text-base text-lime-300 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors"
          aria-label="Wrong email address?"
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
          Wrong email address?
        </button>
      </div>
    </>
  );
}
