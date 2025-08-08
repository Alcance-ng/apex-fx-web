import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex FX - Premium Trading Signals & Education",
  description:
    "Get premium forex trading signals, comprehensive courses, and join our exclusive trading community",
  openGraph: {
    title: "Apex FX - Premium Trading Signals & Education",
    description:
      "Join thousands of successful traders with our premium forex signals, comprehensive courses, and exclusive community access.",
    images: [
      {
        url: "/trade.jpg",
        width: 1200,
        height: 630,
        alt: "A diverse group of traders analyzing forex charts on multiple screens in a bright, accessible workspace.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex FX - Premium Trading Signals & Education",
    description:
      "Get premium forex trading signals, comprehensive courses, and join our exclusive community at Apex FX.",
    images: [
      {
        url: "/trade.jpg",
        alt: "A diverse group of traders analyzing forex charts on multiple screens in a bright, accessible workspace.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to content link for keyboard users */}
        <a
          href="#main-content"
          className="absolute -top-10 left-4 z-50 bg-white text-black px-4 py-2 rounded shadow focus:top-4 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-green-900"
        >
          Skip to main content
        </a>
        <main id="main-content" role="main">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
