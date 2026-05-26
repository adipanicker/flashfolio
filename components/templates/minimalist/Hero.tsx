"use client";

import { motion } from "framer-motion";

const accentMap: Record<
  string,
  { text: string; border: string; bg: string; hex: string }
> = {
  indigo: {
    text: "text-indigo-400",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
    hex: "#818cf8",
  },
  emerald: {
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    hex: "#34d399",
  },
  orange: {
    text: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    hex: "#fb923c",
  },
  cyan: {
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    hex: "#22d3ee",
  },
  pink: {
    text: "text-pink-400",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    hex: "#f472b6",
  },
};

export default function Hero({ data }: { data: any }) {
  const accent = accentMap[data.accent] || accentMap.indigo;
  const nameParts = data.name?.split(" ") || ["Your", "Name"];
  const marqueeItems = Array(12).fill((data.role || "Your Role").toUpperCase());

  return (
    <section className="px-6 md:px-16 lg:px-24 pt-20 pb-0 flex flex-col items-center text-center">
      {/* Glow behind everything */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-[0.07] pointer-events-none"
        style={{ background: accent.hex }}
      />

      {/* Photo — centered above name */}
      {data.avatar && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          <img
            src={data.avatar}
            alt={data.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-[#222]"
          />
          {/* Subtle glow under photo */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-4 blur-xl opacity-40 rounded-full"
            style={{ background: accent.hex }}
          />
        </motion.div>
      )}

      {/* Name — centered, staggered */}
      <div className="mb-6 overflow-hidden relative">
        {nameParts.map((part: string, i: number) => (
          <motion.div
            key={i}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h1 className="text-[clamp(56px,11vw,128px)] font-extrabold leading-[0.88] tracking-tighter text-white">
              {part}
            </h1>
          </motion.div>
        ))}
      </div>

      {/* Tagline */}
      {data.tagline && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-zinc-400 text-base md:text-lg font-light mb-8 max-w-lg"
        >
          {data.tagline}
        </motion.p>
      )}

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-12"
      >
        <div
          className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border ${accent.border} ${accent.bg} ${accent.text}`}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: accent.hex }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: accent.hex }}
            />
          </span>
          Open to work
        </div>

        {data.location && (
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {data.location}
          </div>
        )}

        {data.currentlyBuilding && (
          <div className="text-xs text-zinc-500">
            ⚡ {data.currentlyBuilding}
          </div>
        )}
      </motion.div>

      {/* Marquee — full width */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="w-screen overflow-hidden border-t border-b border-[#161616] py-3"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-10 whitespace-nowrap"
        >
          {marqueeItems.map((item, i) => (
            <span key={i} className="flex items-center gap-4 flex-shrink-0">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-zinc-700">
                {item}
              </span>
              <span
                style={{ color: accent.hex }}
                className="text-xs opacity-60"
              >
                ◆
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
