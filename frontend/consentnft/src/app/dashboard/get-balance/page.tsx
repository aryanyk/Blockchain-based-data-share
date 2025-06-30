"use client";

import { useState } from "react";
import API from "@/lib/api";

export default function GetBalance() {
  const [id, setId] = useState("");
  const [requester, setRequester] = useState("");
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const res = await API.post("/get_balance", {
        consent_id: parseInt(id),
        requester,
      });
      if (res.data.balance) setData(`💰 Balance: ${res.data.balance}`);
      else setData("❌ Access Denied");
    } catch {
      setData("❌ Error fetching data");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Access Protected Data</h2>
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
        onClick={fetchData}
        className="bg-green-600 hover:bg-green-700 mt-4 px-4 py-2 rounded text-white font-semibold"
      >
        Get Balance
      </button>
      {data && <p className="mt-4">{data}</p>}
    </div>
  );
}
