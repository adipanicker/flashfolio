"use client";

import { motion } from "framer-motion";

export default function Footer({ data }: { data: any }) {
  const currentYear = new Date().getFullYear();

  // Extract the first letter of the name for the logo, default to 'N'
  const initial = data?.name ? data.name.charAt(0).toUpperCase() : "N";

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="px-6 md:px-16 lg:px-24 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0a0a0a]"
    >
      {/* Brand / Copyright */}
      <div className="flex items-center gap-4">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#111] border border-[#222] text-xs font-bold text-white tracking-widest"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        >
          {initial}
        </div>
        <p className="text-sm text-zinc-500">
          © {currentYear} {data?.name || "Your Name"}. All rights reserved.
        </p>
      </div>

      {/* Optional: Build details or additional links */}
      <div className="flex items-center gap-4 text-sm text-zinc-600">
        <p>
          Built with{" "}
          <span className="text-zinc-400 hover:text-white transition-colors cursor-pointer">
            Next.js
          </span>{" "}
          &{" "}
          <span className="text-zinc-400 hover:text-white transition-colors cursor-pointer">
            Tailwind
          </span>
        </p>
      </div>
    </motion.footer>
  );
}
