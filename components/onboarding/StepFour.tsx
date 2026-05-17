import { OnboardingData } from "@/app/onboarding/page";

const templates = [
  {
    id: "minimalist",
    name: "Minimalist",
    desc: "Clean, white space heavy. For devs and designers.",
    bg: "bg-white",
    preview: (
      <div className="p-4 w-full">
        <div className="text-black text-sm font-medium">Your Name</div>
        <div className="text-gray-400 text-xs mb-3">Your Role</div>
        <div className="h-1 bg-gray-100 rounded mb-2 w-full" />
        <div className="h-1 bg-gray-100 rounded mb-2 w-3/4" />
        <div className="h-1 bg-gray-100 rounded w-1/2" />
      </div>
    ),
  },
  {
    id: "terminal",
    name: "Terminal",
    desc: "Dark, code-editor style. For backend devs and engineers.",
    bg: "bg-[#0d1117]",
    preview: (
      <div className="p-4 font-mono text-xs w-full">
        <div className="text-green-400 mb-1">~/portfolio $</div>
        <div className="text-purple-300 mb-1">const dev = {"{"}</div>
        <div className="text-blue-300 mb-1">
          &nbsp;&nbsp;name: <span className="text-yellow-300">"You"</span>
        </div>
        <div className="text-purple-300">{"}"}</div>
      </div>
    ),
  },
  {
    id: "executive",
    name: "Executive",
    desc: "Professional, corporate. For PMs, HRs and non-devs.",
    bg: "bg-[#f8f7f4]",
    preview: (
      <div className="p-4 text-center w-full">
        <div className="w-8 h-8 rounded-full bg-gray-300 mx-auto mb-2" />
        <div className="text-gray-800 text-xs font-medium">Your Name</div>
        <div className="text-gray-400 text-[10px]">Your Role</div>
      </div>
    ),
  },
];

export default function StepFour({
  data,
  onUpdate,
  onBack,
  onFinish,
  submitting,
}: {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onBack: () => void;
  onFinish: () => void;
  submitting: boolean;
}) {
  return (
    <div className="w-full max-w-xl">
      <h2 className="text-2xl font-medium text-white mb-2 text-center">
        Pick your template
      </h2>
      <p className="text-[#555] text-sm text-center mb-8">
        You can change this anytime from your dashboard.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onUpdate({ template: t.id })}
            className={`bg-[#111] border rounded-xl overflow-hidden text-left transition-all duration-200 hover:scale-105 ${
              data.template === t.id
                ? "border-indigo-500/60 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                : "border-[#1f1f1f] hover:border-[#333]"
            }`}
          >
            <div className={`h-28 flex items-center justify-center ${t.bg}`}>
              {t.preview}
            </div>
            <div className="p-3 border-t border-[#1f1f1f]">
              <div
                className={`text-xs font-medium mb-0.5 ${
                  data.template === t.id ? "text-indigo-300" : "text-white"
                }`}
              >
                {t.name}
              </div>
              <div className="text-[10px] text-[#555]">{t.desc}</div>
            </div>
            {data.template === t.id && (
              <div className="px-3 pb-3">
                <div className="text-[10px] text-indigo-400 font-medium">
                  ✓ Selected
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4 mb-6">
        <p className="text-xs text-[#555] mb-3 uppercase tracking-wide">
          Your portfolio summary
        </p>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-xs text-[#555]">URL</span>
            <span className="text-xs text-indigo-300">
              {process.env.NEXT_PUBLIC_BASE_URL}/{data.username}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-[#555]">Name</span>
            <span className="text-xs text-white">{data.data.name || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-[#555]">Template</span>
            <span className="text-xs text-white capitalize">
              {data.template}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-[#555]">Projects</span>
            <span className="text-xs text-white">
              {data.data.projects.length} added
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-[#555]">Skills</span>
            <span className="text-xs text-white">
              {data.data.skills.length} added
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-[#111] border border-[#222] text-[#888] text-sm py-2.5 rounded-lg hover:bg-[#161616] transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onFinish}
          disabled={submitting}
          className="flex-1 bg-linear-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? "Creating..." : "🚀 Launch my portfolio"}
        </button>
      </div>
    </div>
  );
}
