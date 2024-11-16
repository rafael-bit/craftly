import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Craftly",
  description: "Program to build yours components with ease",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased relative`}
      >
        <div className="absolute top-0 -left-2 w-[60%] h-[600px] bg-gradient-to-br from-blue-400 via-transparent to-transparent opacity-50 blur-[120px] pointer-events-none"></div>
        <Header />
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}