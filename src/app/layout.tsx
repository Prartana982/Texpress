import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CategoryProvider } from "@/context/CategoryContext";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Texpress | Latest Tech Updates",
  description: "Your daily source for tech news and updates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f0f0f0] text-black min-h-screen flex flex-col`}
      >
        <CategoryProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-12">
            {children}
          </main>
        </CategoryProvider>
        <footer className="border-t-4 border-black bg-white py-8">
          <div className="container mx-auto px-4 text-center font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Texpress News // Built for the future
          </div>
        </footer>
      </body>
    </html>
  );
}
