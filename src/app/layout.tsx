import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "DevAgent 2.0 — Enterprise-Grade Agentic AI Platform",
  description:
    "The World's First Agentic AI Platform for Developer Mastery — From TDD to Blockchain Credentials. Real code execution, multi-language support, AI-powered interviews, and verifiable certificates.",
  keywords: [
    "developer",
    "interview prep",
    "TDD",
    "AI",
    "coding challenges",
    "blockchain certificates",
  ],
  openGraph: {
    title: "DevAgent 2.0 — Enterprise Agentic AI Platform",
    description: "AI-powered developer mastery platform with TDD, voice interviews, and blockchain credentials",
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="particles-bg" aria-hidden="true" />
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(20, 20, 40, 0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f0f0ff",
            },
          }}
        />
      </body>
    </html>
  );
}
