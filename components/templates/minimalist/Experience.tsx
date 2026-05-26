"use client";

import { motion } from "framer-motion";

const accentMap: Record<string, { hex: string; text: string }> = {
  indigo: { hex: "#818cf8", text: "text-indigo-400" },
  emerald: { hex: "#34d399", text: "text-emerald-400" },
  orange: { hex: "#fb923c", text: "text-orange-400" },
  cyan: { hex: "#22d3ee", text: "text-cyan-400" },
  pink: { hex: "#f472b6", text: "text-pink-400" },
};

export default function Experience({ data }: { data: any }) {
  const accent = accentMap[data.accent] || accentMap.indigo;

  if (!data.experience?.length) return null;

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
          Experience
        </span>
        <div className="flex-1 h-px bg-[#2a2a2a]" />
      </motion.div>

      {/* Timeline */}
      <div className="flex flex-col">
        {data.experience.map((exp: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ x: 4 }}
            className="flex gap-8 py-8 border-b border-[#161616] last:border-none group cursor-default"
          >
            {/* Period — left column */}
            <div className="w-32 flex-shrink-0 pt-1">
              <span className="text-xs text-zinc-600 tracking-wide">
                {exp.period}
              </span>
            </div>

            {/* Content — right column */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3
                  className="text-base font-semibold text-white group-hover:text-zinc-200 transition-colors"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {exp.company}
                </h3>
              </div>
              <p className={`text-sm font-medium mb-3 ${accent.text}`}>
                {exp.role}
              </p>
              {exp.description && (
                <p className="text-sm text-zinc-500 leading-relaxed max-w-lg">
                  {exp.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
