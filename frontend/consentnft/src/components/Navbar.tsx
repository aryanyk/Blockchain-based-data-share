"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-zinc-900/70 backdrop-blur-md border-b border-zinc-800 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold text-white">ChainConsent</h1>
      <div className="space-x-4">
        <Link href="/" className="hover:text-purple-400">Home</Link>
        <Link href="/dashboard" className="hover:text-purple-400">Dashboard</Link>
      </div>
    </nav>
  );
}
