
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";
import { CartProvider } from "@/context/CartContext";
import SessionProviderWrapper from "@/context/SessionProviderWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Super Cloths",
  description: "Developed by pranaybitstudio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  pt-20`}
      >
        <SessionProviderWrapper>
         <CartProvider>
           <Header />
          {children}
            <Footer />
         </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
