"use client";

import { useState } from "react";
import { OnboardingData } from "@/app/onboarding/page";

const SKILL_CATEGORIES = ["Frontend", "Backend", "Tools", "Design", "Other"];

const ACCENT_OPTIONS = [
  { value: "indigo", label: "Indigo", color: "#6366f1" },
  { value: "emerald", label: "Emerald", color: "#10b981" },
  { value: "orange", label: "Orange", color: "#f97316" },
  { value: "cyan", label: "Cyan", color: "#06b6d4" },
  { value: "pink", label: "Pink", color: "#ec4899" },
];

export default function StepThree({
  data,
  onUpdate,
  onNext,
  onBack,
}: {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [skillInput, setSkillInput] = useState("");
  const [skillCategory, setSkillCategory] = useState("Frontend");
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const updateField = (field: string, value: any) => {
    onUpdate({ data: { ...data.data, [field]: value } });
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "resume",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    type === "avatar" ? setUploadingAvatar(true) : setUploadingResume(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) {
        setUploadError(result.message || "Upload failed");
        return;
      }
      updateField(type === "avatar" ? "avatar" : "resumeUrl", result.url);
    } catch {
      setUploadError("Upload failed. Try again.");
    } finally {
      type === "avatar" ? setUploadingAvatar(false) : setUploadingResume(false);
    }
  };

  const handleProjectImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "project");
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (res.ok) updateProject(index, "image", result.url);
    } catch {
      console.error("Upload failed");
    }
  };

  const fetchFromGitHub = async () => {
    if (!data.data.github) return;
    setFetching(true);
    setFetchError("");
    try {
      const res = await fetch(
        `https://api.github.com/users/${data.data.github}`,
      );
      if (!res.ok) throw new Error("User not found");
      const profile = await res.json();
      const reposRes = await fetch(
        `https://api.github.com/users/${data.data.github}/repos?sort=stars&per_page=3`,
      );
      const repos = await reposRes.json();
      onUpdate({
        data: {
          ...data.data,
          name: profile.name || data.data.name,
          bio: profile.bio || data.data.bio,
          avatar: profile.avatar_url || data.data.avatar,
          location: profile.location || data.data.location,
          website: profile.blog || data.data.website,
          projects: repos.slice(0, 3).map((r: any) => ({
            title: r.name,
            description: r.description || "",
            image: "",
            liveUrl: r.homepage || "",
            githubUrl: r.html_url,
            featured: false,
          })),
        },
      });
    } catch {
      setFetchError("GitHub user not found.");
    } finally {
      setFetching(false);
    }
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    const exists = data.data.skills.some(
      (s) => s.name.toLowerCase() === skillInput.trim().toLowerCase(),
    );
    if (exists) return;
    onUpdate({
      data: {
        ...data.data,
        skills: [
          ...data.data.skills,
          { category: skillCategory, name: skillInput.trim() },
        ],
      },
    });
    setSkillInput("");
  };

  const removeSkill = (index: number) => {
    onUpdate({
      data: {
        ...data.data,
        skills: data.data.skills.filter((_, i) => i !== index),
      },
    });
  };

  const addProject = () => {
    if (data.data.projects.length >= 3) return;
    onUpdate({
      data: {
        ...data.data,
        projects: [
          ...data.data.projects,
          {
            title: "",
            description: "",
            image: "",
            liveUrl: "",
            githubUrl: "",
            featured: false,
          },
        ],
      },
    });
  };

  const updateProject = (index: number, field: string, value: any) => {
    const updated = data.data.projects.map((p, i) =>
      i === index ? { ...p, [field]: value } : p,
    );
    onUpdate({ data: { ...data.data, projects: updated } });
  };

  const removeProject = (index: number) => {
    onUpdate({
      data: {
        ...data.data,
        projects: data.data.projects.filter((_, i) => i !== index),
      },
    });
  };

  const addExperience = () => {
    if (data.data.experience.length >= 4) return;
    onUpdate({
      data: {
        ...data.data,
        experience: [
          ...data.data.experience,
          { company: "", role: "", period: "", description: "" },
        ],
      },
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = data.data.experience.map((e, i) =>
      i === index ? { ...e, [field]: value } : e,
    );
    onUpdate({ data: { ...data.data, experience: updated } });
  };

  const removeExperience = (index: number) => {
    onUpdate({
      data: {
        ...data.data,
        experience: data.data.experience.filter((_, i) => i !== index),
      },
    });
  };

  const canContinue = data.data.name.trim().length > 0;

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-2xl font-medium text-white mb-2 text-center">
        Tell us about yourself
      </h2>
      <p className="text-[#555] text-sm text-center mb-8">
        {data.userType === "developer"
          ? "Enter your GitHub username to auto-fill."
          : "Fill in your details below."}
      </p>

      <div className="space-y-5">
        {/* GitHub fetch */}
        {data.userType === "developer" && (
          <div>
            <label className="block text-xs text-[#666] mb-1.5">
              GitHub username{" "}
              <span className="text-indigo-400">(auto-fills everything)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={data.data.github}
                onChange={(e) => updateField("github", e.target.value)}
                placeholder="adipanicker"
                className="flex-1 bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
              />
              <button
                onClick={fetchFromGitHub}
                disabled={fetching || !data.data.github}
                className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm px-4 py-2.5 rounded-lg hover:bg-indigo-500/30 transition-colors disabled:opacity-40"
              >
                {fetching ? "..." : "↓ Fetch"}
              </button>
            </div>
            {fetchError && (
              <p className="text-red-400 text-xs mt-1">{fetchError}</p>
            )}
            {data.data.avatar && (
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={data.data.avatar}
                  alt="avatar"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs text-green-400">
                  Profile fetched ✓
                </span>
              </div>
            )}
          </div>
        )}

        {/* Avatar upload */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">
            Profile photo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl border border-[#222] overflow-hidden flex-shrink-0 flex items-center justify-center bg-[#161616]">
              {data.data.avatar ? (
                <img
                  src={data.data.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl text-[#333]">👤</span>
              )}
            </div>
            <label className="flex-1 flex items-center gap-3 border border-dashed border-[#222] rounded-lg px-4 py-3 cursor-pointer hover:border-indigo-500/30 transition-colors">
              <span className="text-sm text-[#555]">
                {uploadingAvatar
                  ? "Uploading..."
                  : data.data.avatar
                    ? "Change photo"
                    : "Upload photo"}
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => handleFileUpload(e, "avatar")}
                disabled={uploadingAvatar}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">
            Full name *
          </label>
          <input
            type="text"
            value={data.data.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Aditya Panicker"
            className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">
            Job title / Role
          </label>
          <input
            type="text"
            value={data.data.role}
            onChange={(e) => updateField("role", e.target.value)}
            placeholder="Full Stack Developer"
            className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
          />
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">
            Tagline <span className="text-[#444]">(one punchy line)</span>
          </label>
          <input
            type="text"
            value={data.data.tagline}
            onChange={(e) => updateField("tagline", e.target.value)}
            placeholder="I build products that feel effortless."
            className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
          />
        </div>

        {/* Currently building */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">
            Currently building <span className="text-[#444]">(optional)</span>
          </label>
          <input
            type="text"
            value={data.data.currentlyBuilding}
            onChange={(e) => updateField("currentlyBuilding", e.target.value)}
            placeholder="Building FlashFolio — AI portfolio generator"
            className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">
            Bio{" "}
            <span className="text-[#444]">
              (write 2 short paragraphs about yourself)
            </span>
          </label>
          <textarea
            value={data.data.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder={
              "Para 1: Who you are, where you're from, your background.\n\nPara 2: What you care about, what drives you, what you're looking for."
            }
            rows={5}
            className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333] resize-none"
          />
        </div>

        {/* Location + Email */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[#666] mb-1.5">Location</label>
            <input
              type="text"
              value={data.data.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Kerala, India"
              className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#666] mb-1.5">Email</label>
            <input
              type="email"
              value={data.data.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
            />
          </div>
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[#666] mb-1.5">
              LinkedIn URL
            </label>
            <input
              type="text"
              value={data.data.linkedin}
              onChange={(e) => updateField("linkedin", e.target.value)}
              placeholder="linkedin.com/in/aditya"
              className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#666] mb-1.5">Website</label>
            <input
              type="text"
              value={data.data.website}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="adityapanicker.com"
              className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
            />
          </div>
        </div>

        {/* Accent color */}
        <div>
          <label className="block text-xs text-[#666] mb-3">Accent color</label>
          <div className="flex gap-3">
            {ACCENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateField("accent", opt.value)}
                className={`flex flex-col items-center gap-1.5 transition-all`}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    data.data.accent === opt.value
                      ? "border-white scale-110"
                      : "border-transparent"
                  }`}
                  style={{ background: opt.color }}
                />
                <span className="text-[10px] text-[#555]">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-xs text-[#666] mb-2">Skills</label>
          <div className="flex gap-2 mb-3">
            <select
              value={skillCategory}
              onChange={(e) => setSkillCategory(e.target.value)}
              className="bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50"
            >
              {SKILL_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="React, Figma, Enscape..."
              className="flex-1 bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
            />
            <button
              onClick={addSkill}
              className="bg-[#111] border border-[#222] text-[#888] text-sm px-4 py-2.5 rounded-lg hover:border-indigo-500/30 hover:text-indigo-300 transition-colors"
            >
              + Add
            </button>
          </div>

          {data.data.skills.length > 0 && (
            <div className="flex flex-col gap-2">
              {SKILL_CATEGORIES.filter((cat) =>
                data.data.skills.some((s) => s.category === cat),
              ).map((cat) => (
                <div key={cat}>
                  <span className="text-[10px] text-[#444] uppercase tracking-wide">
                    {cat}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {data.data.skills
                      .filter((s) => s.category === cat)
                      .map((skill, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 text-xs text-indigo-300 bg-[#1a1a2e] border border-indigo-500/30 px-2.5 py-1 rounded-full"
                        >
                          {skill.name}
                          <button
                            onClick={() =>
                              removeSkill(data.data.skills.indexOf(skill))
                            }
                            className="text-indigo-400 hover:text-red-400 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Experience */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[#666]">
              Experience <span className="text-[#444]">(max 4)</span>
            </label>
            {data.data.experience.length < 4 && (
              <button
                onClick={addExperience}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                + Add experience
              </button>
            )}
          </div>
          {data.data.experience.length === 0 && (
            <button
              onClick={addExperience}
              className="w-full border border-dashed border-[#222] text-[#444] text-sm py-4 rounded-lg hover:border-indigo-500/30 hover:text-indigo-400 transition-colors"
            >
              + Add work experience
            </button>
          )}
          <div className="space-y-3">
            {data.data.experience.map((exp, i) => (
              <div
                key={i}
                className="bg-[#111] border border-[#222] rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#555]">
                    Experience {i + 1}
                  </span>
                  <button
                    onClick={() => removeExperience(i)}
                    className="text-[#444] hover:text-red-400 text-sm"
                  >
                    ×
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(i, "company", e.target.value)
                    }
                    placeholder="Company name"
                    className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
                  />
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) =>
                      updateExperience(i, "role", e.target.value)
                    }
                    placeholder="Your role"
                    className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
                  />
                </div>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) =>
                    updateExperience(i, "period", e.target.value)
                  }
                  placeholder="Jan 2023 — Present"
                  className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
                />
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(i, "description", e.target.value)
                  }
                  placeholder="Key responsibilities and achievements..."
                  rows={2}
                  className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333] resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-[#666]">
              Projects <span className="text-[#444]">(max 3)</span>
            </label>
            {data.data.projects.length < 3 && (
              <button
                onClick={addProject}
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                + Add project
              </button>
            )}
          </div>
          {data.data.projects.length === 0 && (
            <button
              onClick={addProject}
              className="w-full border border-dashed border-[#222] text-[#444] text-sm py-4 rounded-lg hover:border-indigo-500/30 hover:text-indigo-400 transition-colors"
            >
              + Add your first project
            </button>
          )}
          <div className="space-y-3">
            {data.data.projects.map((project, i) => (
              <div
                key={i}
                className="bg-[#111] border border-[#222] rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#555]">Project {i + 1}</span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={project.featured}
                        onChange={(e) =>
                          updateProject(i, "featured", e.target.checked)
                        }
                        className="accent-indigo-500"
                      />
                      <span className="text-xs text-[#555]">Feature this</span>
                    </label>
                    <button
                      onClick={() => removeProject(i)}
                      className="text-[#444] hover:text-red-400 text-sm"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(i, "title", e.target.value)}
                  placeholder="Project name"
                  className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
                />
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(i, "description", e.target.value)
                  }
                  placeholder="What does this project do?"
                  rows={2}
                  className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333] resize-none"
                />

                {/* Project image upload */}
                <div>
                  {project.image ? (
                    <div className="flex items-center gap-3 bg-[#161616] border border-green-500/30 rounded-lg px-3 py-2">
                      <img
                        src={project.image}
                        alt="preview"
                        className="w-8 h-8 rounded object-cover"
                      />
                      <span className="text-xs text-green-400 flex-1">
                        Screenshot uploaded
                      </span>
                      <button
                        onClick={() => updateProject(i, "image", "")}
                        className="text-xs text-[#444] hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center gap-2 border border-dashed border-[#222] rounded-lg px-3 py-2.5 cursor-pointer hover:border-indigo-500/30 transition-colors">
                      <span className="text-xs text-[#555]">
                        📸 Upload screenshot (optional)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleProjectImageUpload(e, i)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={project.liveUrl}
                    onChange={(e) =>
                      updateProject(i, "liveUrl", e.target.value)
                    }
                    placeholder="Live URL"
                    className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
                  />
                  <input
                    type="text"
                    value={project.githubUrl}
                    onChange={(e) =>
                      updateProject(i, "githubUrl", e.target.value)
                    }
                    placeholder="GitHub URL"
                    className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">
            Resume / CV <span className="text-[#444]">(PDF only)</span>
          </label>
          {data.data.resumeUrl ? (
            <div className="flex items-center gap-3 bg-[#111] border border-green-500/30 rounded-lg px-4 py-3">
              <span className="text-green-400 text-sm">✓</span>
              <span className="text-green-400 text-sm flex-1">
                Resume uploaded
              </span>
              <a
                href={data.data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300"
              >
                View →
              </a>
              <button
                onClick={() => updateField("resumeUrl", "")}
                className="text-xs text-[#444] hover:text-red-400"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-3 border border-dashed border-[#222] rounded-lg px-4 py-4 cursor-pointer hover:border-indigo-500/30 transition-colors">
              <span className="text-xl">📄</span>
              <div>
                <span className="text-sm text-[#555] block">
                  {uploadingResume
                    ? "Uploading..."
                    : "Click to upload your resume"}
                </span>
                <span className="text-xs text-[#333]">PDF only · Max 5MB</span>
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, "resume")}
                disabled={uploadingResume}
                className="hidden"
              />
            </label>
          )}
        </div>

        {uploadError && <p className="text-red-400 text-xs">{uploadError}</p>}
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={onBack}
          className="flex-1 bg-[#111] border border-[#222] text-[#888] text-sm py-2.5 rounded-lg hover:bg-[#161616] transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
