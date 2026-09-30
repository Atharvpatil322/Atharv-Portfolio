import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LoadNoticeToast } from "@/components/LoadNoticeToast";
import { Toaster } from "@/components/ui/sonner";
import SmoothCursorFollower from "@/components/SmoothCursorFollower";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans-funky",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono-funky",
  subsets: ["latin"],
});

export const viewport = { themeColor: "#07070b" };

export const metadata: Metadata = {
  title: "Atharv — Developer Portfolio",
  description:
    "AI Engineer and full-stack developer — RAG pipelines, GPU orchestration, system design, and products that quietly work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
        <SmoothCursorFollower />
        <LoadNoticeToast />
        <Toaster />
      </body>
    </html>
  );
}
