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
        <div className="absolute top-0 right-0 w-56 h-72 bg-gradient-to-br from-white via-transparent to-transparent opacity-35 blur-3xl pointer-events-none"></div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}