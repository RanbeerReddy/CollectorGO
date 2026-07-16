import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/react-query";
import ProtectedLayout from "@/components/ProtectedLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CollectorGO Admin",
  description: "CollectorGO Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 min-h-screen flex flex-col text-slate-900`}
      >
        <Providers>
          <ProtectedLayout>
            {children}
          </ProtectedLayout>
        </Providers>
      </body>
    </html>
  );
}
