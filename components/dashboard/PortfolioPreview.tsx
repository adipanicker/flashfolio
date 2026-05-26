const data_obj = (portfolio: any) => {
  if (typeof portfolio.data === "string") return JSON.parse(portfolio.data);
  return portfolio.data;
};

export default function PortfolioPreview({
  portfolio,
  liveUrl,
  onEdit,
}: {
  portfolio: any;
  liveUrl: string;
  onEdit: () => void;
}) {
  const data = data_obj(portfolio);

  return (
    <div className="bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f]">
        <span className="text-sm font-medium text-white">
          Portfolio preview
        </span>
        <button
          onClick={onEdit}
          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Edit details →
        </button>
      </div>

      <div className="p-4">
        {/* Mini browser */}
        <div
          className={`rounded-lg overflow-hidden border border-border-dark-3 mb-4 ${
            portfolio.template === "terminal"
              ? "bg-[#0d1117]"
              : portfolio.template === "executive"
                ? "bg-[#f8f7f4]"
                : "bg-white"
          }`}
        >
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border-dark-3 bg-[#161616]">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <div className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 bg-border-dark-3 rounded px-2 py-0.5 text-[9px] text-[#444] text-center truncate">
              {liveUrl.replace(
                "http://localhost:3000",
                "flashfolio.vercel.app",
              )}
            </div>
          </div>

          {/* Portfolio content based on template */}
          {portfolio.template === "terminal" ? (
            <div className="p-4 font-mono">
              <div className="text-green-400 text-xs mb-1">~/portfolio $</div>
              <div className="text-purple-300 text-xs mb-1">
                const dev = {"{"}
              </div>
              <div className="text-blue-300 text-xs mb-1">
                &nbsp;&nbsp;name:{" "}
                <span className="text-yellow-300">"{data.name}"</span>,
              </div>
              <div className="text-blue-300 text-xs mb-1">
                &nbsp;&nbsp;role:{" "}
                <span className="text-yellow-300">
                  "{data.role || "Developer"}"
                </span>
              </div>
              <div className="text-purple-300 text-xs">{"}"}</div>
            </div>
          ) : portfolio.template === "executive" ? (
            <div className="p-4 text-center">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mx-auto mb-2 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center text-gray-500 text-xs font-medium">
                  {data.name?.[0] || "?"}
                </div>
              )}
              <div className="text-gray-800 text-sm font-medium">
                {data.name}
              </div>
              <div className="text-gray-400 text-xs">{data.role}</div>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                {data.avatar ? (
                  <img
                    src={data.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-medium">
                    {data.name?.[0] || "?"}
                  </div>
                )}
                <div>
                  <div className="text-gray-900 text-xs font-medium">
                    {data.name}
                  </div>
                  <div className="text-gray-400 text-[10px]">{data.role}</div>
                </div>
              </div>
              <div className="flex gap-1 flex-wrap mb-3">
                {data.skills?.slice(0, 4).map((s: any, i: number) => (
                  <span key={i} className="...">
                    {typeof s === "string" ? s : s.name}
                  </span>
                ))}
              </div>
              {data.projects?.slice(0, 2).map((p: any, i: number) => (
                <div key={i} className="bg-gray-50 rounded px-2 py-1.5 mb-1.5">
                  <div className="text-[10px] font-medium text-gray-800">
                    {p.title}
                  </div>
                  <div className="text-[9px] text-gray-400 truncate">
                    {p.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="flex-1 bg-linear-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Edit portfolio
          </button>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#161616] border border-[#222] text-[#888] text-sm py-2.5 rounded-lg hover:bg-border-dark-3 transition-colors text-center"
          >
            View live →
          </a>
        </div>
      </div>
    </div>
  );
}
