import { Button } from "@/components/ui/Button";

interface SuperAdminHeaderProps {
  user: { firstName?: string; name?: string; role?: string };
  onLogout: () => void;
}

export function SuperAdminHeader({ user, onLogout }: SuperAdminHeaderProps) {
  return (
    <header className="bg-[#2a0f1a]/80 backdrop-blur-md border-b border-red-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-200">
              Super Admin Dashboard
            </h1>
            <p className="text-red-300">
              System-wide administration and monitoring
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-red-200">
              {user.firstName || user.name} ({user.role})
            </span>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="border-red-500/40 text-red-200 hover:bg-red-700/30 focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Logout
            </Button>
            <div
              className="w-10 h-10 bg-red-700/60 border border-red-900 rounded-full flex items-center justify-center"
              aria-label="User initials"
            >
              <span className="text-white font-bold">
                {(user.firstName || user.name || "SA")
                  .substring(0, 2)
                  .toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
