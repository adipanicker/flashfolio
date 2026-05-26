"use client";

import { motion } from "framer-motion";

const accentMap: Record<
  string,
  { hex: string; text: string; border: string; bg: string }
> = {
  indigo: {
    hex: "#818cf8",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/5",
  },
  emerald: {
    hex: "#34d399",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
  },
  orange: {
    hex: "#fb923c",
    text: "text-orange-400",
    border: "border-orange-500/20",
    bg: "bg-orange-500/5",
  },
  cyan: {
    hex: "#22d3ee",
    text: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
  },
  pink: {
    hex: "#f472b6",
    text: "text-pink-400",
    border: "border-pink-500/20",
    bg: "bg-pink-500/5",
  },
};

function BrowserMockup({
  image,
  title,
  accentHex,
}: {
  image: string;
  title: string;
  accentHex: string;
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-[#2a2a2a] shadow-2xl"
      style={{ boxShadow: `0 20px 60px ${accentHex}15, 0 0 0 1px #ffffff08` }}
    >
      {/* Browser chrome */}
      <div className="bg-[#1a1a1a] px-4 py-2.5 flex items-center gap-2 border-b border-[#2a2a2a]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-[#111] rounded px-3 py-1 mx-2">
          <span className="text-[9px] text-zinc-600 truncate">
            {title.toLowerCase().replace(" ", "")}.app
          </span>
        </div>
      </div>
      {/* Screenshot */}
      <div className="w-full h-48 md:h-56 overflow-hidden bg-[#111]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export default function Projects({ data }: { data: any }) {
  const accent = accentMap[data.accent] || accentMap.indigo;

  if (!data.projects?.length) return null;

  const featured = data.projects.find((p: any) => p.featured);
  const rest = data.projects.filter((p: any) => !p.featured);

  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 md:py-24">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-14"
      >
        <span className="text-sm font-semibold tracking-[0.25em] text-zinc-500 uppercase">
          Projects
        </span>
        <div className="flex-1 h-px bg-[#2a2a2a]" />
      </motion.div>

      {/* Featured project — split layout */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 group"
        >
          <div
            className={`relative rounded-2xl border ${accent.border} overflow-hidden transition-all duration-500 hover:border-opacity-60`}
            style={{
              background: `linear-gradient(135deg, #111 0%, #0d0d0d 100%)`,
              boxShadow: `0 0 0 1px #ffffff05, 0 30px 80px ${accent.hex}08`,
            }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left — content */}
              <div className="p-7 md:p-10 flex flex-col justify-between">
                <div>
                  <div
                    className={`text-xs font-bold tracking-[0.2em] uppercase mb-4 ${accent.text}`}
                  >
                    Featured Project
                  </div>

                  {/* Title with gradient */}
                  <h3
                    className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tighter bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    {featured.title}
                  </h3>

                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                    {featured.description}
                  </p>
                </div>

                {/* Links */}
                <div className="flex gap-3 flex-wrap">
                  {featured.liveUrl && (
                    <a
                      href={featured.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-semibold text-black bg-white px-5 py-2.5 rounded-lg hover:bg-zinc-200 transition-colors"
                    >
                      Live demo →
                    </a>
                  )}
                  {featured.githubUrl && (
                    <a
                      href={featured.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-sm font-medium ${accent.text} border ${accent.border} px-5 py-2.5 rounded-lg hover:bg-white/5 transition-colors`}
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>

              {/* Right — browser mockup or placeholder */}
              <div className="p-6 md:p-8 flex items-center justify-center border-t md:border-t-0 md:border-l border-[#1a1a1a]">
                {featured.image ? (
                  <BrowserMockup
                    image={featured.image}
                    title={featured.title}
                    accentHex={accent.hex}
                  />
                ) : (
                  <div
                    className="w-full rounded-xl border border-[#2a2a2a] h-48 flex flex-col items-center justify-center gap-3"
                    style={{
                      background: `linear-gradient(135deg, #111, #0d0d0d)`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{
                        background: `${accent.hex}15`,
                        color: accent.hex,
                      }}
                    >
                      ⚡
                    </div>
                    <span className="text-xs text-zinc-600">
                      No screenshot added
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Rest — editorial list */}
      <div className="flex flex-col">
        {rest.map((project: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ x: 4 }}
            className="flex items-start justify-between gap-6 py-8 border-b border-[#161616] last:border-none group cursor-default"
          >
            <div className="flex gap-6 flex-1">
              {/* Number */}
              <span className="text-xs text-zinc-700 font-bold tracking-widest pt-1.5 flex-shrink-0 w-6">
                {String(i + (featured ? 2 : 1)).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-lg font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors tracking-tight"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-lg mb-4">
                  {project.description}
                </p>

                {/* Small screenshot if exists */}
                {project.image && (
                  <div className="w-full max-w-xs h-28 rounded-lg overflow-hidden border border-[#1a1a1a] mb-2">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2 flex-shrink-0 pt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-400 border border-[#222] px-3 py-1.5 rounded-lg hover:text-white hover:border-zinc-500 transition-colors text-center"
                >
                  Live →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs ${accent.text} border ${accent.border} px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-center`}
                >
                  GitHub →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
