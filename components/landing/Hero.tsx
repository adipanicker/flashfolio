import Link from "next/link";

export default function Hero() {
  return (
    <section className="grid grid-cols-2 gap-16 px-8 py-20 items-center min-h-[500px]">
      {/* Left */}
      <div className="flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 bg-[#1a1a2e] border border-indigo-500/30 text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full w-fit">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          Now in beta — build yours free
        </div>

        <h1 className="text-5xl font-medium text-white leading-tight">
          Your portfolio.
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Live in 60 seconds.
          </span>
        </h1>

        <p className="text-[#888] text-base leading-relaxed">
          Fill a form. Pick a template. Get a shareable link.
          <br />
          No code. No design skills. Just you.
        </p>

        <div className="flex items-center gap-4 mt-2">
          <Link
            href="/login"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Create your portfolio
          </Link>
          <Link
            href="#templates"
            className="text-sm text-[#888] hover:text-white transition-colors"
          >
            See templates →
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex">
            {["A", "S", "R", "M"].map((letter, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-white text-xs font-medium -ml-1.5 first:ml-0"
                style={{
                  background: ["#6366f1", "#a855f7", "#ec4899", "#f59e0b"][i],
                }}
              >
                {letter}
              </div>
            ))}
          </div>
          <span className="text-xs text-[#555]">
            Join 200+ people who already have their portfolio live
          </span>
        </div>
      </div>

      {/* Right — Portfolio Preview */}
      <div className="flex flex-col gap-3">
        <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
          {/* Browser bar */}
          <div className="bg-[#161616] px-4 py-2.5 flex items-center gap-3 border-b border-[#1f1f1f]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-[#1a1a1a] rounded px-3 py-1 text-[10px] text-[#444] text-center">
              flashfolio.vercel.app/aditya
            </div>
          </div>

          {/* Portfolio content */}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                A
              </div>
              <div>
                <div className="text-white text-sm font-medium">
                  Aditya Panicker
                </div>
                <div className="text-[#666] text-xs">Full Stack Developer</div>
              </div>
            </div>
            <p className="text-[#555] text-xs leading-relaxed mb-4">
              Building products that solve real problems. React, Node.js,
              PostgreSQL.
            </p>
            <div className="flex gap-2 flex-wrap mb-4">
              {["React", "Node.js", "PostgreSQL", "C++"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-indigo-300 bg-[#1a1a2e] border border-indigo-500/30 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {[
                "LifeQuest — Gamified productivity app with AI",
                "FlashFolio — Portfolio generator",
              ].map((p) => (
                <div
                  key={p}
                  className="bg-[#161616] border border-[#222] rounded-lg px-3 py-2"
                >
                  <div className="text-white text-xs">{p.split("—")[0]}</div>
                  <div className="text-[#555] text-[10px]">
                    {p.split("—")[1]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Template tabs */}
        <div className="flex gap-2">
          {["Minimalist", "Terminal", "Executive"].map((t, i) => (
            <div
              key={t}
              className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                i === 0
                  ? "border-indigo-500/50 text-indigo-300 bg-[#1a1a2e]"
                  : "border-[#222] text-[#555]"
              }`}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
