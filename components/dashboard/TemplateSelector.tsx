"use client";

const templates = [
  {
    id: "minimalist",
    name: "Minimalist",
    preview: (
      <div className="bg-white w-full h-full flex items-center justify-center p-3">
        <div>
          <div className="text-black text-xs font-medium">Your Name</div>
          <div className="text-gray-400 text-[9px]">Your Role</div>
        </div>
      </div>
    ),
  },
  {
    id: "terminal",
    name: "Terminal",
    preview: (
      <div className="bg-[#0d1117] w-full h-full flex items-center justify-center p-3 font-mono">
        <div className="text-green-400 text-[9px]">~/portfolio $</div>
      </div>
    ),
  },
  {
    id: "executive",
    name: "Executive",
    preview: (
      <div className="bg-[#f8f7f4] w-full h-full flex items-center justify-center p-3">
        <div className="text-center">
          <div className="w-6 h-6 rounded-full bg-gray-300 mx-auto mb-1" />
          <div className="text-gray-700 text-[9px]">Professional</div>
        </div>
      </div>
    ),
  },
];

export default function TemplateSelector({
  current,
  onChange,
}: {
  current: string;
  onChange: (template: string) => void;
}) {
  return (
    <div className="bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[#1f1f1f]">
        <span className="text-sm font-medium text-white">Change template</span>
        <span className="text-xs text-[#555] ml-2">
          applies instantly to your live portfolio
        </span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`border rounded-xl overflow-hidden text-left transition-all hover:scale-105 duration-200 ${
                current === t.id
                  ? "border-indigo-500/60"
                  : "border-[#1f1f1f] hover:border-[#333]"
              }`}
            >
              <div className="h-16 overflow-hidden">{t.preview}</div>
              <div
                className={`px-3 py-2 border-t border-[#1f1f1f] text-xs ${
                  current === t.id ? "text-indigo-300" : "text-[#555]"
                }`}
              >
                {t.name} {current === t.id && "✓"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
