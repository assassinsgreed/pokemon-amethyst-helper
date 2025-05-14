import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon Amethyst Helper",
  description: "A web based utility designed to support people playing the Pokemon Amethyst Romhack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable @next/next/no-css-tags */}
        <link rel="stylesheet" href="./styles/globals.css" />
        <link rel="stylesheet" href="./styles/pokedex/pokedex-tile.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="centered title">Pokemon Amethyst Helper</div>
        {children}
        <div className="centered footer">Copyright duck_caper 2025</div>
      </body>
    </html>
  );
}
