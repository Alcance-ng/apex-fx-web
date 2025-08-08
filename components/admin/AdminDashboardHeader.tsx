import { Button } from "@/components/ui/Button";

interface AdminDashboardHeaderProps {
  user: { firstName?: string; name?: string; role?: string };
  onLogout: () => void;
}

export function AdminDashboardHeader({
  user,
  onLogout,
}: AdminDashboardHeaderProps) {
  return (
    <header className="bg-[#2d1847]/80 backdrop-blur-md shadow-sm border-b border-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-purple-200">
              Admin Dashboard
            </h1>
            <p className="text-sm text-purple-300">
              Manage users, courses, and analytics
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-purple-300">
              {user.firstName || user.name} ({user.role})
            </span>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
            >
              Logout
            </Button>
            <div className="w-8 h-8 bg-purple-600/80 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-medium">
                {(user.firstName || user.name || "A").charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
