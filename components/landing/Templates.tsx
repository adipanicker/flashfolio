const templates = [
  {
    name: "Minimalist",
    desc: "Clean, white space heavy. For devs and designers.",
    bg: "bg-white",
    preview: (
      <div className="p-4 w-full">
        <div className="text-black text-sm font-medium">Sarah Chen</div>
        <div className="text-gray-400 text-xs mb-3">Product Designer</div>
        <div className="h-1 bg-gray-100 rounded mb-2 w-full" />
        <div className="h-1 bg-gray-100 rounded mb-2 w-3/4" />
        <div className="h-1 bg-gray-100 rounded w-1/2" />
      </div>
    ),
  },
  {
    name: "Terminal",
    desc: "Dark, code-editor style. For backend devs and engineers.",
    bg: "bg-[#0d1117]",
    preview: (
      <div className="p-4 font-mono text-xs w-full">
        <div className="text-green-400 mb-1">~/portfolio $</div>
        <div className="text-purple-300 mb-1">const dev = {"{"}</div>
        <div className="text-blue-300 mb-1">
          &nbsp;&nbsp;name: <span className="text-yellow-300">"Alex"</span>,
        </div>
        <div className="text-blue-300 mb-1">
          &nbsp;&nbsp;role: <span className="text-yellow-300">"Backend"</span>
        </div>
        <div className="text-purple-300">{"}"}</div>
      </div>
    ),
  },
  {
    name: "Executive",
    desc: "Professional, corporate. For PMs, HRs and non-devs.",
    bg: "bg-[#f8f7f4]",
    preview: (
      <div className="p-4 text-center w-full">
        <div className="w-8 h-8 rounded-full bg-gray-300 mx-auto mb-2" />
        <div className="text-gray-800 text-xs font-medium">Priya Sharma</div>
        <div className="text-gray-400 text-[10px]">Marketing Manager</div>
      </div>
    ),
  },
];

export default function Templates() {
  return (
    <section id="templates" className="px-8 py-16 border-t border-[#1a1a1a]">
      <p className="text-indigo-400 text-xs font-medium uppercase tracking-widest mb-3">
        Templates
      </p>
      <h2 className="text-2xl font-medium text-white mb-10">
        Three templates. One for everyone.
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {templates.map((t) => (
          <div
            key={t.name}
            className="bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden
            transition-all duration-300 ease-out
            hover:scale-105 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]
            cursor-pointer group"
          >
            <div className={`h-32 flex items-center justify-center ${t.bg}`}>
              {t.preview}
            </div>
            <div className="p-4 border-t border-[#1f1f1f]">
              <div className="text-white text-sm font-medium mb-1">
                {t.name}
              </div>
              <div className="text-[#555] text-xs">{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
