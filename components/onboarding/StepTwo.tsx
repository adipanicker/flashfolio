"use client";

import { useState, useEffect } from "react";
import { OnboardingData } from "@/app/onboarding/page";

const RESERVED = [
  "login",
  "register",
  "dashboard",
  "onboarding",
  "about",
  "api",
  "admin",
  "help",
  "home",
  "index",
  "settings",
  "portfolio",
  "null",
  "undefined",
  "username",
];

export default function StepTwo({
  data,
  onUpdate,
  onNext,
  onBack,
}: {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [username, setUsername] = useState(data.username);

  useEffect(() => {
    if (!username || username.length < 3) {
      setAvailable(null);
      return;
    }
    if (RESERVED.includes(username.toLowerCase())) {
      setAvailable(false);
      return;
    }

    const timer = setTimeout(async () => {
      setChecking(true);
      try {
        const res = await fetch(
          `/api/portfolio/check-username?username=${username}`,
        );
        const data = await res.json();
        setAvailable(data.available);
      } catch {
        setAvailable(null);
      } finally {
        setChecking(false);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [username]);

  const handleChange = (val: string) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setUsername(clean);
    onUpdate({ username: clean });
  };

  const canContinue = available === true && username.length >= 3;

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-medium text-white mb-2 text-center">
        Claim your link
      </h2>
      <p className="text-[#555] text-sm text-center mb-8">
        This will be your permanent portfolio URL
      </p>

      <div className="mb-6">
        <div className="flex items-center bg-[#111] border border-[#222] rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-colors">
          <span className="text-[#444] text-sm px-4 py-3 border-r border-[#222] whitespace-nowrap">
            flashfolio.vercel.app/
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="yourname"
            className="flex-1 bg-transparent text-white text-sm px-4 py-3 outline-none placeholder:text-[#333]"
          />
          <div className="px-3">
            {checking && <span className="text-xs text-[#555]">...</span>}
            {!checking && available === true && (
              <span className="text-xs text-green-400">✅</span>
            )}
            {!checking && available === false && (
              <span className="text-xs text-red-400">❌</span>
            )}
          </div>
        </div>
        <p className="text-xs text-[#444] mt-2 px-1">
          Lowercase letters, numbers and hyphens only. Min 3 characters.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-[#111] border border-[#222] text-[#888] text-sm py-2.5 rounded-lg hover:bg-[#161616] transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="flex-1 bg-linear-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
