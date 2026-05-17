import { OnboardingData, UserType } from "@/app/onboarding/page";

const userTypes = [
  {
    type: "developer" as UserType,
    icon: "👨‍💻",
    title: "Developer",
    desc: "Software engineer, full stack dev, backend or frontend. GitHub auto-fills your profile.",
  },
  {
    type: "designer" as UserType,
    icon: "🎨",
    title: "Designer / Creative",
    desc: "UI/UX designer, graphic designer, illustrator, content creator.",
  },
  {
    type: "professional" as UserType,
    icon: "💼",
    title: "Professional",
    desc: "HR, product manager, marketer, consultant or anyone else.",
  },
];

export default function StepOne({
  data,
  onUpdate,
  onNext,
}: {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}) {
  const handleSelect = (type: UserType) => {
    onUpdate({ userType: type });
  };

  return (
    <div className="w-full max-w-lg">
      <h2 className="text-2xl font-medium text-white mb-2 text-center">
        What best describes you?
      </h2>
      <p className="text-[#555] text-sm text-center mb-8">
        We'll customize your portfolio form based on your answer.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {userTypes.map((ut) => (
          <button
            key={ut.type}
            onClick={() => handleSelect(ut.type)}
            className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
              data.userType === ut.type
                ? "border-indigo-500/50 bg-[#1a1a2e]"
                : "border-[#222] bg-[#111] hover:border-[#333]"
            }`}
          >
            <span className="text-2xl">{ut.icon}</span>
            <div>
              <div
                className={`text-sm font-medium ${
                  data.userType === ut.type ? "text-indigo-300" : "text-white"
                }`}
              >
                {ut.title}
              </div>
              <div className="text-xs text-[#555] mt-0.5">{ut.desc}</div>
            </div>
            {data.userType === ut.type && (
              <div className="ml-auto w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!data.userType}
        className="w-full bg-linear-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30"
      >
        Continue →
      </button>
    </div>
  );
}
