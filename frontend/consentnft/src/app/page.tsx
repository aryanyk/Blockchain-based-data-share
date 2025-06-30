import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center flex flex-col items-center justify-center gap-6 mt-10">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
        Take Back Control of Your Data.
      </h1>
      <p className="text-zinc-400 max-w-xl text-lg">
        ChainConsent turns your consent into a blockchain-backed NFT with enforceable rules. Secure, revocable, and transparent.
      </p>
      <Link href="/dashboard">
        <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl font-semibold text-white shadow-lg">
          Launch Dashboard
        </button>
      </Link>
    </div>
  );
}
