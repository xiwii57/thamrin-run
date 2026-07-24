import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  weight: ["700", "800"],
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thamrin Run — Event Lari",
  description: "Daftar event lari Thamrin Run, terbuka untuk internal maupun umum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
    <body
    className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} antialiased`}
    >
    {children}
    </body>
    </html>
  );
}
