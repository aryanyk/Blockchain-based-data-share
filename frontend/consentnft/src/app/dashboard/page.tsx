"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    title: "Mint Consent",
    description: "Create a new NFT-based consent agreement.",
    href: "/dashboard/mint",
    icon: "🪙",
  },
  {
    title: "Revoke Consent",
    description: "Burn a consent NFT to stop data access.",
    href: "/dashboard/revoke",
    icon: "🔥",
  },
  {
    title: "Validate Consent",
    description: "Verify if a third party can access data.",
    href: "/dashboard/validate",
    icon: "🔍",
  },
  {
    title: "Get Protected Data",
    description: "Try to fetch mock data (e.g., account balance).",
    href: "/dashboard/get-balance",
    icon: "🔐",
  },
];

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Your ChainConsent Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={f.href}>
              <div className="bg-zinc-900/60 hover:bg-zinc-800 transition rounded-2xl p-6 shadow-md border border-zinc-700 hover:scale-[1.02] hover:shadow-xl cursor-pointer">
                <div className="text-3xl mb-2">{f.icon}</div>
                <h2 className="text-xl font-semibold">{f.title}</h2>
                <p className="text-zinc-400">{f.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
