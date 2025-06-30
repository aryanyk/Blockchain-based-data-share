"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function Revoke() {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");

  const revoke = async () => {
    try {
      await API.post(`/revoke/${id}`);
      setMsg("✅ Consent revoked successfully");
    } catch {
      setMsg("❌ Failed to revoke consent");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Revoke Consent</h2>
      <input
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
        placeholder="Consent ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button
        onClick={revoke}
        className="bg-red-600 hover:bg-red-700 mt-4 px-4 py-2 rounded text-white font-semibold"
      >
        Revoke
      </button>
      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}
