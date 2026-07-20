import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiny Tools — Free Online Utilities",
  description:
    "Quick, private tools for writing, numbers, passwords, and code. Grammar checker, calculator, word counter, password generator, JSON formatter, and more. Nothing to install, nothing uploaded.",
  keywords: [
    "online tools",
    "grammar checker",
    "word counter",
    "character counter",
    "password generator",
    "JSON formatter",
    "percentage calculator",
    "case converter",
    "free tools",
    "writing tools",
  ],
  openGraph: {
    title: "Tiny Tools — Free Online Utilities",
    description:
      "Quick, private tools for writing, numbers, passwords, and code. Nothing to install, nothing uploaded.",
    type: "website",
  },
  authors: [{ name: "Alexander Williams" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}