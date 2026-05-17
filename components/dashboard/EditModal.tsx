"use client";

import { useState } from "react";

export default function EditModal({
  portfolio,
  onSave,
  onClose,
}: {
  portfolio: any;
  onSave: (data: any) => void;
  onClose: () => void;
}) {
  const rawData =
    typeof portfolio.data === "string"
      ? JSON.parse(portfolio.data)
      : portfolio.data;

  const [formData, setFormData] = useState(rawData);
  const [saving, setSaving] = useState(false);
  const [skillInput, setSkillInput] = useState("");
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

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    if (formData.skills?.includes(skillInput.trim())) return;
    updateField("skills", [...(formData.skills || []), skillInput.trim()]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    updateField(
      "skills",
      formData.skills.filter((s: string) => s !== skill),
    );
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updated = formData.projects.map((p: any, i: number) =>
      i === index ? { ...p, [field]: value } : p,
    );
    updateField("projects", updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });
      if (res.ok) {
        onSave(formData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#111] border border-[#222] rounded-2xl w-full max-w-xl mx-4 my-8 overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
          <h2 className="text-base font-medium text-white">Edit portfolio</h2>
          <button
            onClick={onClose}
            className="text-[#555] hover:text-white transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[70vh] p-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs text-[#666] mb-1.5">
              Full name
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs text-[#666] mb-1.5">Bio</label>
            <textarea
              value={formData.bio || ""}
              onChange={(e) => updateField("bio", e.target.value)}
              rows={3}
              className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 resize-none"
            />
          </div>

          {/* Avatar upload in edit modal */}
          <div>
            <label className="block text-xs text-[#666] mb-1.5">
              Profile photo
            </label>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#222] overflow-hidden shrink-0 flex items-center justify-center bg-dark-3">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl text-[#333]">👤</span>
                )}
              </div>
              <label className="flex-1 flex items-center gap-2 border border-dashed border-[#222] rounded-lg px-3 py-2.5 cursor-pointer hover:border-indigo-500/30 transition-colors">
                <span className="text-xs text-[#555]">
                  {uploadingAvatar
                    ? "Uploading..."
                    : formData.avatar
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

          {/* Resume */}
          <div>
            <label className="block text-xs text-[#666] mb-1.5">
              Resume / CV
              <span className="text-[#444] ml-1">(PDF only, max 5MB)</span>
            </label>

            {formData.resumeUrl ? (
              <div className="flex items-center gap-3 bg-dark-3 border border-green-500/30 rounded-lg px-4 py-3">
                <span className="text-green-400 text-sm">✓</span>
                <span className="text-green-400 text-sm flex-1">
                  Resume uploaded
                </span>
                <a
                  href={formData.resumeUrl}
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
              <label className="flex items-center gap-3 border border-dashed border-[#222] rounded-lg px-4 py-4 cursor-pointer hover:border-indigo-500/30 hover:bg-[#161616] transition-colors">
                <span className="text-xl">📄</span>
                <div>
                  <span className="text-sm text-[#555] block">
                    {uploadingResume
                      ? "Uploading..."
                      : "Click to upload your resume"}
                  </span>
                  <span className="text-xs text-[#333]">
                    PDF only · Max 5MB
                  </span>
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

          {/* Location + Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#666] mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={formData.location || ""}
                onChange={(e) => updateField("location", e.target.value)}
                className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1.5">Email</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#666] mb-1.5">
                LinkedIn
              </label>
              <input
                type="text"
                value={formData.linkedin || ""}
                onChange={(e) => updateField("linkedin", e.target.value)}
                className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1.5">GitHub</label>
              <input
                type="text"
                value={formData.github || ""}
                onChange={(e) => updateField("github", e.target.value)}
                className="w-full bg-[#161616] border border-[#222] text-white text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-xs text-[#666] mb-1.5">Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add a skill..."
                className="flex-1 bg-[#161616] border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
              />
              <button
                onClick={addSkill}
                className="bg-[#161616] border border-[#222] text-[#888] text-sm px-3 py-2 rounded-lg hover:border-indigo-500/30 hover:text-indigo-300 transition-colors"
              >
                + Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills?.map((skill: string) => (
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
          </div>

          {/* Projects */}
          <div>
            <label className="block text-xs text-[#666] mb-2">Projects</label>
            <div className="space-y-3">
              {formData.projects?.map((project: any, i: number) => (
                <div
                  key={i}
                  className="bg-[#161616] border border-[#222] rounded-xl p-4 space-y-3"
                >
                  <div className="text-xs text-[#555]">Project {i + 1}</div>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(i, "title", e.target.value)}
                    placeholder="Project name"
                    className="w-full bg-dark-3 border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
                  />
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      updateProject(i, "description", e.target.value)
                    }
                    placeholder="Description"
                    rows={2}
                    className="w-full bg-dark-3 border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333] resize-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={project.liveUrl}
                      onChange={(e) =>
                        updateProject(i, "liveUrl", e.target.value)
                      }
                      placeholder="Live URL"
                      className="w-full bg-dark-3 border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
                    />
                    <input
                      type="text"
                      value={project.githubUrl}
                      onChange={(e) =>
                        updateProject(i, "githubUrl", e.target.value)
                      }
                      placeholder="GitHub URL"
                      className="w-full bg-dark-3 border border-[#222] text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder:text-[#333]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t border-[#1f1f1f]">
          <button
            onClick={onClose}
            className="flex-1 bg-[#161616] border border-[#222] text-[#888] text-sm py-2.5 rounded-lg hover:bg-dark-3 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-linear-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
