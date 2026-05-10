const steps = [
  {
    num: "1",
    title: "Sign up",
    desc: "GitHub OAuth for devs or email for everyone else. Done in seconds.",
  },
  {
    num: "2",
    title: "Fill your details",
    desc: "GitHub auto-fills your profile. Add projects, skills, social links.",
  },
  {
    num: "3",
    title: "Pick a template",
    desc: "Three templates built for devs, creatives and professionals.",
  },
  {
    num: "4",
    title: "Share your link",
    desc: "Get flashfolio.vercel.app/you instantly. Share on LinkedIn, anywhere.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-8 py-16 border-t border-[#1a1a1a]">
      <p className="text-indigo-400 text-xs font-medium uppercase tracking-widest mb-3">
        How it works
      </p>
      <h2 className="text-2xl font-medium text-white mb-2">
        Four steps to your portfolio
      </h2>
      <p className="text-[#555] text-sm mb-10">
        No design skills or coding required.
      </p>

      <div className="grid grid-cols-4 gap-4">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-[#111] border border-[#1f1f1f] rounded-xl p-5"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium mb-4">
              {step.num}
            </div>
            <div className="text-white text-sm font-medium mb-2">
              {step.title}
            </div>
            <div className="text-[#555] text-xs leading-relaxed">
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
