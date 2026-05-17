"use client";

import { useState } from "react";
import { OnboardingData } from "@/app/onboarding/page";

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
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadError, setUploadError] = useState("");

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

      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.message || "Upload failed");
        return;
      }

      updateField(type === "avatar" ? "avatar" : "resumeUrl", data.url);
    } catch {
      setUploadError("Upload failed. Try again.");
    } finally {
      type === "avatar" ? setUploadingAvatar(false) : setUploadingResume(false);
    }
  };

  const updateField = (field: string, value: string) => {
    onUpdate({ data: { ...data.data, [field]: value } });
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    if (data.data.skills.includes(skillInput.trim())) return;
    onUpdate({
      data: { ...data.data, skills: [...data.data.skills, skillInput.trim()] },
    });
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    onUpdate({
      data: {
        ...data.data,
        skills: data.data.skills.filter((s) => s !== skill),
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
          { title: "", description: "", liveUrl: "", githubUrl: "" },
        ],
      },
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
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
            liveUrl: r.homepage || "",
            githubUrl: r.html_url,
          })),
        },
      });
    } catch (err) {
      setFetchError("GitHub user not found. Check the username.");
    } finally {
      setFetching(false);
    }
  };

  const canContinue = data.data.name.trim().length > 0;

  return (
    <div className="w-full max-w-xl">
      <h2 className="text-2xl font-medium text-white mb-2 text-center">
        Tell us about yourself
      </h2>
      <p className="text-[#555] text-sm text-center mb-8">
        {data.userType === "developer"
          ? "Enter your GitHub username to auto-fill your profile."
          : "Fill in your details below."}
      </p>

      <div className="space-y-5">
        {/* GitHub auto-fill — devs only */}
        {data.userType === "developer" && (
          <div>
            <label className="block text-xs text-[#666] mb-1.5">
              GitHub username
              <span className="text-indigo-400 ml-1">
                (auto-fills everything)
              </span>
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
                  Profile fetched successfully ✓
                </span>
              </div>
            )}
          </div>
        )}

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

        {/* Job role */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">
            Job title / Role
          </label>
          <input
            type="text"
            value={data.data.role}
            onChange={(e) => updateField("role", e.target.value)}
            placeholder="Full Stack Developer, UI/UX Designer, Marketing Manager..."
            className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">Bio</label>
          <textarea
            value={data.data.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Full stack developer passionate about building products that solve real problems."
            rows={3}
            className="w-full bg-[#111] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333] resize-none"
          />
        </div>

        {/* Profile photo */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">
            Profile photo
            {data.userType === "developer" && (
              <span className="text-[#444] ml-1">
                (auto-filled from GitHub or upload your own)
              </span>
            )}
          </label>

          <div className="flex items-center gap-4">
            {/* Preview */}
            <div className="w-14 h-14 rounded-full border border-[#222] overflow-hidden shrink-0 flex items-center justify-center bg-[#161616]">
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

            {/* Upload */}
            <label className="flex-1 flex items-center gap-3 border border-dashed border-[#222] rounded-lg px-4 py-3 cursor-pointer hover:border-indigo-500/30 hover:bg-[#111] transition-colors">
              <span className="text-sm text-[#555]">
                {uploadingAvatar
                  ? "Uploading..."
                  : data.data.avatar
                    ? "Change photo"
                    : "Upload photo"}
              </span>
              <span className="text-xs text-[#333]">JPG, PNG · Max 5MB</span>
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

        {/* Social links */}
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

        {/* Resume upload */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">
            Resume / CV
            <span className="text-[#444] ml-1">(PDF only, max 5MB)</span>
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
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                View →
              </a>
              <button
                onClick={() => updateField("resumeUrl", "")}
                className="text-xs text-[#444] hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-3 border border-dashed border-[#222] rounded-lg px-4 py-4 cursor-pointer hover:border-indigo-500/30 hover:bg-[#111] transition-colors">
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

        {/* Skills */}
        <div>
          <label className="block text-xs text-[#666] mb-1.5">Skills</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="React, Node.js, Figma..."
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
            <div className="flex flex-wrap gap-2">
              {data.data.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 text-xs text-indigo-300 bg-[#1a1a2e] border border-indigo-500/30 px-2.5 py-1 rounded-full"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-indigo-400 hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
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
                  <button
                    onClick={() => removeProject(i)}
                    className="text-[#444] hover:text-red-400 transition-colors text-sm"
                  >
                    ×
                  </button>
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
      </div>

      {/* Navigation */}
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
          className="flex-1 bg-linear-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
