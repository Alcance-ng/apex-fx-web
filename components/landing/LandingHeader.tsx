import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="px-4 py-6 bg-gradient-to-b from-green-900/80 via-emerald-900/80 to-lime-900/60 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-white text-2xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 rounded"
          aria-label="Apex FX home"
        >
          Apex FX
        </Link>
        <div className="space-x-4">
          <Link
            href="/login"
            className="text-white hover:text-green-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900 rounded"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
