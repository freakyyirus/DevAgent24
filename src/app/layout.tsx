import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "DevAgent24 — Enterprise Agentic AI Platform",
  description:
    "The complete platform for developer mastery — TDD coding challenges, AI voice interviews, and blockchain-verified certificates. Real code execution across 8 languages.",
  keywords: [
    "developer",
    "interview prep",
    "TDD",
    "AI",
    "coding challenges",
    "blockchain certificates",
    "DevAgent24",
  ],
  openGraph: {
    title: "DevAgent24 — Enterprise Agentic AI Platform",
    description: "AI-powered developer mastery with TDD, voice interviews, and blockchain credentials",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="particles-bg" aria-hidden="true" />
        {children}
        <Analytics />
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#161616",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f5f5f5",
              fontFamily: "var(--font-body)",
            },
          }}
        />
      </body>
    </html>
  );
}
