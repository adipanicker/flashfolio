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

const socialLinks = (data: any) =>
  [
    {
      label: "Email",
      value: data.email,
      href: `mailto:${data.email}`,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 7 10-7" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: data.github,
      href: `https://github.com/${data.github}`,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: data.linkedin,
      href: data.linkedin?.startsWith("http")
        ? data.linkedin
        : `https://${data.linkedin}`,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "Website",
      value: data.website,
      href: data.website?.startsWith("http")
        ? data.website
        : `https://${data.website}`,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      value: data.twitter,
      href: `https://twitter.com/${data.twitter}`,
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
  ].filter((link) => link.value);

export default function Contact({ data }: { data: any }) {
  const accent = accentMap[data.accent] || accentMap.indigo;
  const links = socialLinks(data);

  const hasContact = links.length > 0 || data.resumeUrl;

  if (!hasContact) return null;

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
          Contact
        </span>
        <div className="flex-1 h-px bg-[#2a2a2a]" />
      </motion.div>

      {/* CTA heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white mb-4"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        Let's work together.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-zinc-500 text-base mb-12 max-w-md"
      >
        Open to full-time roles, freelance projects and interesting
        collaborations.
      </motion.p>

      {/* Social links grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ scale: 1.04, borderColor: accent.hex }}
            className="flex items-center gap-2.5 text-sm text-zinc-400 bg-[#111] border border-[#222] px-4 py-2.5 rounded-xl hover:text-white transition-colors"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            <span style={{ color: accent.hex }}>{link.icon}</span>
            {link.label}
          </motion.a>
        ))}
      </motion.div>

      {/* Resume download */}
      {data.resumeUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a
            href={data.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm font-semibold text-black bg-white px-6 py-3 rounded-xl hover:bg-zinc-200 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </motion.div>
      )}
    </section>
  );
}
