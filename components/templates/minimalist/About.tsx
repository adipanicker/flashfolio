"use client";

import { motion } from "framer-motion";

const accentMap: Record<string, { hex: string }> = {
  indigo: { hex: "#818cf8" },
  emerald: { hex: "#34d399" },
  orange: { hex: "#fb923c" },
  cyan: { hex: "#22d3ee" },
  pink: { hex: "#f472b6" },
};

export default function About({ data }: { data: any }) {
  const accent = accentMap[data.accent] || accentMap.indigo;

  if (!data.bio) return null;

  // Split bio into paragraphs by double newline or single newline
  const paragraphs = data.bio
    .split(/\n\n|\n/)
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0);

  return (
    <section className="px-6 md:px-16 lg:px-24 pt-24 pb-8 md:pt-32 md:pb-8">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-14"
      >
        <span className="text-sm font-semibold tracking-[0.25em] text-zinc-500 uppercase">
          About
        </span>
        <div className="flex-1 h-px bg-[#2a2a2a]" />
      </motion.div>

      {/* Bio paragraphs — with text glow */}
      {paragraphs.map((para: string, i: number) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: i * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed mb-6 last:mb-0"
          style={{
            textShadow: `0 0 40px ${accent.hex}15`,
          }}
        >
          {para}
        </motion.p>
      ))}
    </section>
  );
}
