import { Button } from "@/components/ui/Button";
import { ForgotPasswordHeader } from "./ForgotPasswordCommon";

export function ForgotPasswordSuccessStep({
  onBackToLogin,
}: {
  onBackToLogin: () => void;
}) {
  return (
    <>
      <ForgotPasswordHeader
        title="Password reset successful!"
        subtitle="Your password has been successfully reset. You can now sign in with your new password."
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        }
      />
      <Button
        onClick={onBackToLogin}
        className="w-full bg-lime-700 hover:bg-lime-800 text-white font-semibold py-3 rounded-lg focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 mt-8 transition-colors motion-safe:transition-all"
        aria-label="Back to login"
      >
        Back to login
      </Button>
    </>
  );
}
