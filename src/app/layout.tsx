import type { Metadata } from "next";
import { Geist, Geist_Mono, Averia_Serif_Libre } from "next/font/google";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const averiaSerifLibre = Averia_Serif_Libre({
  weight: ["400", "700"],
  variable: "--font-averia-serif-libre",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swastik Bose — Design Portfolio",
  description: "Senior Product Designer, Design Engineer, Vibe Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${averiaSerifLibre.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
