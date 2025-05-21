"use client";

import { Geist, Geist_Mono } from "next/font/google";
import {HeroUIProvider} from "@heroui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: "var(--background)" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeroUIProvider>
          <div className="centered title">Pokemon Amethyst Helper</div>
          {children}
          <div className="centered footer">Copyright duck_caper 2025</div>
        </HeroUIProvider>
      </body>
    </html>
  );
}
