import Link from "next/link";

interface DashboardUser {
  firstName?: string;
  name?: string;
}

export function DashboardHeader({
  user,
}: {
  user: DashboardUser;
}) {
  const getFirstName = () => {
    if (user.firstName) return user.firstName;
    if (user.name) return user.name.split(" ")[0];
    return "User";
  };
  const greeting = `Welcome back, ${getFirstName()}!`;

  return (
    <header className="relative z-10 bg-gradient-to-b from-green-900/80 via-emerald-900/80 to-lime-900/60 border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="rounded-xl backdrop-blur-md bg-white/10 shadow flex flex-wrap items-center justify-between px-6 py-6">
          <span
            className="text-base sm:text-lg md:text-xl font-semibold text-white drop-shadow"
            id="dashboard-greeting"
          >
            {greeting}
          </span>
          <div className="relative flex items-center">
            <Link href="/user/profile">
              <span className="w-9 h-9 bg-lime-700/80 rounded-full flex items-center justify-center shadow-lg border border-lime-400 cursor-pointer">
                <span className="text-lime-100 text-lg font-bold">
                  {getFirstName().charAt(0).toUpperCase()}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
