import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChainConsent – Verifiable Fintech Data Sharing",
  description: "NFT-based user consent platform on blockchain",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-white`}>
        <Navbar />
        <main className="min-h-screen px-4 md:px-20 py-10">{children}</main>
      </body>
    </html>
  );
}
