"use client";

import { motion } from "framer-motion";

const accentMap: Record<
  string,
  { hex: string; text: string; border: string; bg: string }
> = {
  indigo: {
    hex: "#818cf8",
    text: "text-indigo-300",
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/5",
  },
  emerald: {
    hex: "#34d399",
    text: "text-emerald-300",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
  },
  orange: {
    hex: "#fb923c",
    text: "text-orange-300",
    border: "border-orange-500/20",
    bg: "bg-orange-500/5",
  },
  cyan: {
    hex: "#22d3ee",
    text: "text-cyan-300",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
  },
  pink: {
    hex: "#f472b6",
    text: "text-pink-300",
    border: "border-pink-500/20",
    bg: "bg-pink-500/5",
  },
};

const CATEGORY_ORDER = ["Frontend", "Backend", "Tools", "Design", "Other"];

export default function Skills({ data }: { data: any }) {
  const accent = accentMap[data.accent] || accentMap.indigo;

  if (!data.skills?.length) return null;

  // Group skills by category
  const grouped = CATEGORY_ORDER.reduce(
    (acc: Record<string, string[]>, cat) => {
      const items = data.skills
        .filter((s: any) => (typeof s === "string" ? true : s.category === cat))
        .map((s: any) => (typeof s === "string" ? s : s.name));
      if (items.length > 0) acc[cat] = items;
      return acc;
    },
    {},
  );

  const categories = Object.entries(grouped);

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
          Skills
        </span>
        <div className="flex-1 h-px bg-[#2a2a2a]" />
      </motion.div>

      {/* Categories */}
      <div className="flex flex-col gap-10">
        {categories.map(([category, skills], catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: catIndex * 0.1 }}
          >
            {/* Category name */}
            <p className="text-xs font-medium tracking-[0.15em] text-zinc-600 uppercase mb-4">
              {category}
            </p>

            {/* Skills pills */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, i: number) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: catIndex * 0.1 + i * 0.05,
                  }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: accent.hex,
                    color: accent.hex,
                  }}
                  className={`text-sm text-zinc-400 bg-[#111] border border-[#222] px-4 py-2 rounded-full cursor-default transition-colors`}
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
