"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepOne from "@/components/onboarding/StepOne";
import StepTwo from "@/components/onboarding/StepTwo";
import StepThree from "@/components/onboarding/StepThree";
import StepFour from "@/components/onboarding/StepFour";
import DashboardPage from "../dashboard/page";

export type UserType = "developer" | "designer" | "professional";

export type OnboardingData = {
  userType: UserType | null;
  username: string;
  template: string;
  data: {
    name: string;
    role: string;
    tagline: string;
    currentlyBuilding: string;
    accent: string;
    bio: string;
    avatar: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
    resumeUrl: string;
    skills: { category: string; name: string }[];
    projects: {
      title: string;
      description: string;
      image: string;
      liveUrl: string;
      githubUrl: string;
      featured: boolean;
    }[];
    experience: {
      company: string;
      role: string;
      period: string;
      description: string;
    }[];
  };
};

const INITIAL_DATA: OnboardingData = {
  userType: null,
  username: "",
  template: "minimalist",
  data: {
    name: "",
    role: "",
    tagline: "",
    currentlyBuilding: "",
    accent: "indigo",
    bio: "",
    avatar: "",
    location: "",
    email: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
    resumeUrl: "",
    skills: [],
    projects: [],
    experience: [],
  },
};
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [onboardingData, setOnboardingData] =
    useState<OnboardingData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);

  const updateData = (updates: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleFinish = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(onboardingData),
      });
      const data = await res.json();
      console.log("response status:", res.status);
      console.log("response data:", data);
      if (res.ok) {
        router.push("/dashboard");
      } else {
        console.error("Portfolio creation failed:", data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark flex flex-col">
      {/* Top progress bar */}
      <div className="w-full h-0.5 bg-dark-3">
        <div
          className="h-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-dark-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
            F
          </div>
          <span className="text-white font-medium text-sm">FlashFolio</span>
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium transition-all ${
                s === step
                  ? "bg-linear-to-br from-indigo-500 to-purple-500 text-white"
                  : s < step
                    ? "bg-[#1a1a2e] text-indigo-400 border border-indigo-500/30"
                    : "bg-[#111] text-[#444] border border-[#222]"
              }`}
            >
              {s < step ? "✓" : s}
            </div>
          ))}
        </div>
        <div className="text-xs text-[#555]">Step {step} of 4</div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {step === 1 && (
          <StepOne
            data={onboardingData}
            onUpdate={updateData}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <StepTwo
            data={onboardingData}
            onUpdate={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <StepThree
            data={onboardingData}
            onUpdate={updateData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 4 && (
          <StepFour
            data={onboardingData}
            onUpdate={updateData}
            onBack={prevStep}
            onFinish={handleFinish}
            submitting={submitting}
          />
        )}
      </div>
    </main>
  );
}
