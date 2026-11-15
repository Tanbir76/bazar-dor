import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "./component/Navber";
import { Toaster } from "react-hot-toast";
import Marquee from "react-fast-marquee";
import Marque from "./component/Marque";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BazarDor",
  description: "বাজার দর app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navber />
        <Marque />
        <main className="bg-[#f1f6f2]">
        {children}

        </main>
        
          <Marquee />
        <Toaster />
        </body>
    </html>
  );
}
