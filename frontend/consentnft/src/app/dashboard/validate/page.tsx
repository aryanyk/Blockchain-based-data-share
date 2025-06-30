"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function Validate() {
  const [id, setId] = useState("");
  const [requester, setRequester] = useState("");
  const [msg, setMsg] = useState("");

  const validate = async () => {
    try {
      const res = await API.post("/validate", {
        id: parseInt(id),
        requester,
      });
      setMsg(res.data.valid ? "✅ Consent is valid" : "❌ Consent is invalid");
    } catch {
      setMsg("❌ Error validating consent");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Validate Consent</h2>
      <input
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
        placeholder="Consent ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded mt-4"
        placeholder="Requester name (e.g., LendingApp)"
        value={requester}
        onChange={(e) => setRequester(e.target.value)}
      />
      <button
        onClick={validate}
        className="bg-blue-600 hover:bg-blue-700 mt-4 px-4 py-2 rounded text-white font-semibold"
      >
        Validate
      </button>
      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}
