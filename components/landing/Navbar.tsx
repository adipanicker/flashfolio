import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-[#1f1f1f]">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
          F
        </div>
        <span className="font-semibold text-sm bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          FlashFolio
        </span>
      </div>
      <div className="flex items-center gap-6">
        <Link href="#templates" className="text-sm text-[#888]">
          Templates
        </Link>
        <Link href="#how-it-works" className="text-sm text-[#888]">
          How it works
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium bg-white text-black px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}
