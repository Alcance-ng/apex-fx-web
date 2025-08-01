export function LandingHeader() {
  return (
    <header className="px-4 py-6 bg-gradient-to-b from-green-900/80 via-emerald-900/80 to-lime-900/60 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">Apex FX</div>
        <div className="space-x-4">
          <a
            href="/login"
            className="text-white hover:text-green-200 transition-colors"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}
