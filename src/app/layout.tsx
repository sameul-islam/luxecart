import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { ShopProvider } from "./context/ShopContext";


export const metadata: Metadata = {
  title: "LUXECART-SHOPPING"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ShopProvider>
        <Navbar/>
        {children}
        <Footer/>
        </ShopProvider>
      </body>
    </html>
  );
}
