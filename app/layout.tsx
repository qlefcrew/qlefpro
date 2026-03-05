import type { Metadata, Viewport } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "MusicForge — Distribute. Split. Grow.",
    template: "%s | MusicForge",
  },
  description:
    "The all-in-one SaaS platform for independent musicians. Upload tracks, manage royalty splits transparently, and grow your audience with real-time analytics.",
  keywords: [
    "music distribution",
    "royalty splits",
    "independent musician",
    "SaaS",
    "streaming analytics",
    "MusicForge",
  ],
  authors: [{ name: "QLEF" }],
  openGraph: {
    title: "MusicForge — Distribute. Split. Grow.",
    description:
      "The all-in-one SaaS platform for independent musicians.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#7C3AED",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#7C3AED",
          colorBackground: "#0f1117",
          colorText: "#f0f2f5",
          colorInputBackground: "#1a1d2e",
          colorInputText: "#f0f2f5",
          borderRadius: "0.75rem",
        },
      }}
    >
      <html lang="en" className="dark" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
