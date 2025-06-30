"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function Mint() {
  const [form, setForm] = useState({ what: "", who: "", valid_until: "" });
  const [response, setResponse] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await API.post("/mint", {
        ...form,
        valid_until: parseInt(form.valid_until),
      });
      setResponse(`✅ Consent ID: ${res.data.consentId}`);
    } catch {
      setResponse("❌ Error minting consent");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Mint New Consent</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
          placeholder="What data (e.g., balance only)"
          value={form.what}
          onChange={(e) => setForm({ ...form, what: e.target.value })}
        />
        <input
          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
          placeholder="Who can access (e.g., LendingApp)"
          value={form.who}
          onChange={(e) => setForm({ ...form, who: e.target.value })}
        />
        <input
          className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
          placeholder="Valid until (timestamp)"
          value={form.valid_until}
          onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
        />
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-semibold">
          Mint Consent
        </button>
      </form>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
}
