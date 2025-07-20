import Link from "next/link";

export function LandingFooter() {
  return (
    <footer
      className="px-4 py-12 border-t border-white/10 bg-gradient-to-b from-green-900/80 via-emerald-900/80 to-lime-900/60"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div className="text-white text-2xl font-bold mb-2 md:mb-0">
            Apex FX
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Apex FX. All rights reserved.
          </p>
        </div>
        <nav aria-label="Footer Navigation" className="mb-4 md:mb-0">
          <ul className="flex flex-wrap justify-center gap-6 text-base">
            <li>
              <Link
                href="/"
                className="text-gray-200 hover:text-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors focus-visible:bg-lime-900/40"
                tabIndex={0}
                aria-label="Go to Home page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-200 hover:text-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors focus-visible:bg-lime-900/40"
                tabIndex={0}
                aria-label="Learn more About us"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="text-gray-200 hover:text-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors focus-visible:bg-lime-900/40"
                tabIndex={0}
                aria-label="View Pricing plans"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-200 hover:text-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors focus-visible:bg-lime-900/40"
                tabIndex={0}
                aria-label="Contact us"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-gray-200 hover:text-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors focus-visible:bg-lime-900/40"
                tabIndex={0}
                aria-label="Read our Privacy Policy"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className="flex gap-4 justify-center"
          aria-label="Social Media Links"
        >
          <a
            href="https://twitter.com"
            aria-label="Twitter (opens in new tab)"
            className="text-gray-300 hover:text-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors focus-visible:bg-lime-900/40"
            tabIndex={0}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.29 20c7.547 0 11.675-6.155 11.675-11.495 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.19 8.19 0 01-2.357.637A4.118 4.118 0 0021.448 4.1a8.224 8.224 0 01-2.605.977A4.107 4.107 0 0015.448 3c-2.266 0-4.104 1.822-4.104 4.07 0 .32.036.634.105.934C7.728 7.87 4.1 6.13 1.671 3.149a4.025 4.025 0 00-.555 2.048c0 1.413.725 2.662 1.825 3.392A4.093 4.093 0 01.8 7.15v.051c0 1.974 1.417 3.627 3.292 4.004a4.1 4.1 0 01-1.853.07c.522 1.623 2.037 2.805 3.833 2.836A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
              />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            aria-label="Facebook (opens in new tab)"
            className="text-gray-300 hover:text-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors focus-visible:bg-lime-900/40"
            tabIndex={0}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75A4.5 4.5 0 0012.75 2.25h-1.5A4.5 4.5 0 006.75 6.75v1.5A4.5 4.5 0 002.25 12.75v1.5A4.5 4.5 0 006.75 17.25h1.5A4.5 4.5 0 0012.75 21.75h1.5A4.5 4.5 0 0017.25 17.25v-1.5A4.5 4.5 0 0021.75 12.75v-1.5A4.5 4.5 0 0017.25 6.75z"
              />
            </svg>
          </a>
          <a
            href="mailto:info@apexfx.com"
            aria-label="Email us"
            className="text-gray-300 hover:text-lime-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 rounded transition-colors focus-visible:bg-lime-900/40"
            tabIndex={0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.09 7.09a2.25 2.25 0 01-3.182 0l-7.09-7.09A2.25 2.25 0 012.25 6.993V6.75"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
