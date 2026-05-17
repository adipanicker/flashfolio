"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-[#1f1f1f] relative">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
          F
        </div>
        <span className="font-semibold text-sm bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
          FlashFolio
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="#templates" className="text-sm text-[#888]">
          Templates
        </Link>
        <Link href="#how-it-works" className="text-sm text-[#888]">
          How it works
        </Link>

        {session ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium hover:opacity-90 transition-opacity"
            >
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                initials
              )}
            </button>

            {dropdownOpen && (
              <>
                {/* Overlay to close on outside click */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                {/* Dropdown */}
                <div className="absolute right-0 top-10 z-20 w-48 bg-[#111] border border-[#222] rounded-xl overflow-hidden shadow-xl">
                  <div className="px-4 py-3 border-b border-[#1f1f1f]">
                    <p className="text-white text-xs font-medium truncate">
                      {session.user?.name}
                    </p>
                    <p className="text-[#555] text-xs truncate mt-0.5">
                      {session.user?.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#888] hover:text-white hover:bg-dark-3 transition-colors"
                    >
                      <span>⚡</span> My Portfolio
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-dark-3 transition-colors"
                    >
                      <span>→</span> Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium bg-white text-black px-4 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get started
          </Link>
        )}
      </div>
    </nav>
  );
}
