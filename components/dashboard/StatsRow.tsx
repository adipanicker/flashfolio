export default function StatsRow({ portfolio }: { portfolio: any }) {
  const lastUpdated = new Date(portfolio.updatedAt);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24),
  );

  const lastUpdatedText =
    diffDays === 0
      ? "Today"
      : diffDays === 1
        ? "Yesterday"
        : `${diffDays} days ago`;

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4">
        <p className="text-xs text-[#555] uppercase tracking-wide mb-2">
          Total views
        </p>
        <p className="text-2xl font-medium text-indigo-400">
          {portfolio.viewCount}
        </p>
        <p className="text-xs text-[#444] mt-1">people visited</p>
      </div>
      <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4">
        <p className="text-xs text-[#555] uppercase tracking-wide mb-2">
          Template
        </p>
        <p className="text-base font-medium text-white capitalize mt-1">
          {portfolio.template}
        </p>
        <p className="text-xs text-[#444] mt-1">currently active</p>
      </div>
      <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-4">
        <p className="text-xs text-[#555] uppercase tracking-wide mb-2">
          Last updated
        </p>
        <p className="text-base font-medium text-white mt-1">
          {lastUpdatedText}
        </p>
        <p className="text-xs text-[#444] mt-1">
          {lastUpdated.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
