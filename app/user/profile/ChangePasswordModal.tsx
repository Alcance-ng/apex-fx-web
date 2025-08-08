import { useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Extend session type to include accessToken
interface SessionWithToken {
  accessToken?: string;
  user?: { accessToken?: string };
}

export default function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: session } = useSession();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const s = session as SessionWithToken;
      const token = s?.accessToken || s?.user?.accessToken;
      if (!token) {
        setError("You are not authenticated. Please log in again.");
        setIsLoading(false);
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          data.message || "Failed to change password. Please try again."
        );
        setIsLoading(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch {
      setError("Failed to change password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative border border-lime-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lime-700 hover:text-lime-900 text-xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-lime-900 mb-4">
          Change Password
        </h2>
        {success ? (
          <div className="text-center text-lime-700 font-semibold py-8">
            Password changed successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-lime-800 mb-1">
                Old Password
              </label>
              <Input
                type="password"
                value={oldPassword}
                onChange={setOldPassword}
                placeholder="Enter old password"
                className="w-full border border-lime-200 focus:border-lime-500 focus:ring-lime-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lime-800 mb-1">
                New Password
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={setNewPassword}
                placeholder="Enter new password"
                className="w-full border border-lime-200 focus:border-lime-500 focus:ring-lime-500"
                required
              />
              <p className="text-xs text-lime-700 mt-1">
                Must be at least 8 characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-lime-800 mb-1">
                Confirm New Password
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm new password"
                className="w-full border border-lime-200 focus:border-lime-500 focus:ring-lime-500"
                required
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full bg-lime-700 hover:bg-lime-800 text-white font-semibold py-2 rounded-lg focus-visible:ring-2 focus-visible:ring-lime-500"
              disabled={isLoading}
            >
              {isLoading ? "Changing..." : "Change Password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
