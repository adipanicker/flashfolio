import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-8 py-16 border-t border-[#1a1a1a] bg-[#0d0d0d] text-center">
      <h2 className="text-3xl font-medium text-white mb-3">
        Claim your link now.
      </h2>
      <p className="text-[#555] text-sm mb-8">
        Free. No credit card. Live in 60 seconds.
      </p>
      <div className="flex items-center max-w-sm mx-auto">
        <div className="text-xs text-[#555] bg-[#161616] border border-[#222] px-3 py-2.5 rounded-l-lg whitespace-nowrap">
          flashfolio.vercel.app/
        </div>
        <input
          type="text"
          placeholder="yourname"
          className="flex-1 text-xs bg-[#161616] border-t border-b border-[#222] text-white px-3 py-2.5 outline-none"
        />
        <Link
          href="/login"
          className="text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2.5 rounded-r-lg whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Claim it free
        </Link>
      </div>
    </section>
  );
}
