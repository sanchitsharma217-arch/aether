import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { StoreLayout } from "@/components/store/StoreLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AETHER · Universal Exchange — Anti-Amazon Canonical Platform",
  description:
    "High-contrast universal commerce. Zero pay-to-play placement, single canonical SKUs, verified durability forensics, and consolidated 4PL dispatch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-[#0A0A0C] font-sans selection:bg-[#0A0A0C] selection:text-white"
      >
        <StoreLayout>{children}</StoreLayout>
      </body>
    </html>
  );
}
