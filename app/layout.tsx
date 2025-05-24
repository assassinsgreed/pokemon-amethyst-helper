"use client";

import { Geist, Geist_Mono } from "next/font/google";
import {HeroUIProvider, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
import { Logo } from "../assets/Logo"

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
    <html lang="en" className="dark" style={{ backgroundColor: "var(--background)" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeroUIProvider>
            <Navbar
              classNames={{
                item: [
                  "flex",
                  "relative",
                  "h-8",
                  "items-center",
                  "data-[active=true]:after:content-['']",
                  "data-[active=true]:after:absolute",
                  "data-[active=true]:after:bottom-0",
                  "data-[active=true]:after:left-0",
                  "data-[active=true]:after:right-0",
                  "data-[active=true]:after:h-[2px]",
                  "data-[active=true]:after:rounded-[2px]",
                  "data-[active=true]:after:bg-primary",
                  "data-[active=true]:text-blue-500"
                ],
              }}>
              <NavbarBrand>
                <Logo />
                <p className="font-bold text-inherit">Pokemon Amethyst Helper</p>
              </NavbarBrand>
              <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                  <Link href="/pokedex">
                    Pokedex
                  </Link>
                </NavbarItem>
              </NavbarContent>
            </Navbar>
          {children}
          <div className="centered footer">Copyright duck_caper 2025</div>
        </HeroUIProvider>
      </body>
    </html>
  );
}
