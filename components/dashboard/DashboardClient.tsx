"use client";

import { useState } from "react";
import Link from "next/link";
import StatsRow from "@/components/dashboard/StatsRow";
import PortfolioPreview from "@/components/dashboard/PortfolioPreview";
import TemplateSelector from "@/components/dashboard/TemplateSelector";
import EditModal from "@/components/dashboard/EditModal";

export default function DashboardClient({
  portfolio,
  user,
}: {
  portfolio: any;
  user: { name: string; email: string; image: string };
}) {
  const [currentPortfolio, setCurrentPortfolio] = useState(portfolio);
  const [editOpen, setEditOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const liveUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${currentPortfolio.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTemplateChange = async (template: string) => {
    try {
      const res = await fetch("/api/portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template }),
      });
      if (res.ok) {
        setCurrentPortfolio({ ...currentPortfolio, template });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = (updatedData: any) => {
    setCurrentPortfolio({ ...currentPortfolio, data: updatedData });
    setEditOpen(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure? This will permanently delete your portfolio."))
      return;
    setDeleting(true);
    try {
      await fetch("/api/portfolio", { method: "DELETE" });
      window.location.href = "/onboarding";
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  };

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="min-h-screen bg-dark">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
            F
          </div>
          <span className="font-semibold text-sm bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
            FlashFolio
          </span>
        </div>
        <div className="flex items-center gap-3">
          {user.image ? (
            <img
              src={user.image}
              alt="avatar"
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
              {initials}
            </div>
          )}
          <Link
            href="/"
            className="text-xs text-[#555] hover:text-white transition-colors"
          >
            Home
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        {/* Welcome + live link */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-medium text-white mb-1">
              Welcome back, {user.name?.split(" ")[0]} 👋
            </h1>
            <p className="text-sm text-[#555]">
              Your portfolio is live and looking great.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#111] border border-[#222] rounded-lg px-3 py-2">
            <span className="text-xs text-indigo-400 truncate max-w-48">
              {liveUrl.replace(
                "http://localhost:3000",
                "flashfolio.vercel.app",
              )}
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-[#555] hover:text-white bg-dark-3 border border-[#222] px-2 py-1 rounded transition-colors whitespace-nowrap"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors whitespace-nowrap"
            >
              View →
            </a>
          </div>
        </div>

        {/* Stats */}
        <StatsRow portfolio={currentPortfolio} />

        {/* Portfolio preview */}
        <PortfolioPreview
          portfolio={currentPortfolio}
          liveUrl={liveUrl}
          onEdit={() => setEditOpen(true)}
        />

        {/* Template selector */}
        <TemplateSelector
          current={currentPortfolio.template}
          onChange={handleTemplateChange}
        />

        {/* Danger zone */}
        <div className="bg-[#0d0d0d] border border-red-500/20 rounded-xl px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-red-400 mb-1">
              Delete portfolio
            </h3>
            <p className="text-xs text-[#555]">
              Permanently removes your portfolio and frees up your username.
            </p>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <EditModal
          portfolio={currentPortfolio}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      )}
    </div>
  );
}
