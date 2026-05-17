export default function TerminalTemplate({
  data,
  username,
}: {
  data: any;
  username: string;
}) {
  const prompt = <span className="text-green-400">~/portfolio</span>;

  return (
    <main className="min-h-screen bg-[#0d1117] font-mono text-sm">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="text-green-400 mb-1">{prompt} $ whoami</div>
          <div className="flex items-center gap-4 mt-4">
            {data.avatar && (
              <img
                src={data.avatar}
                alt={data.name}
                className="w-14 h-14 rounded-full object-cover border border-[#30363d]"
              />
            )}
            <div>
              <div className="text-white text-xl font-medium">{data.name}</div>
              <div className="text-green-400 text-sm">{data.role}</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        {data.bio && (
          <div className="mb-10">
            <div className="text-green-400 mb-2">{prompt} $ cat about.txt</div>
            <div className="text-[#8b949e] leading-relaxed pl-4 border-l border-[#30363d]">
              {data.bio}
            </div>
          </div>
        )}

        {/* Location + Contact */}
        <div className="mb-10">
          <div className="text-green-400 mb-2">{prompt} $ cat contact.json</div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <div className="text-purple-300">{"{"}</div>
            {data.email && (
              <div className="pl-4">
                <span className="text-blue-300">"email"</span>
                <span className="text-white">: </span>
                <a
                  href={`mailto:${data.email}`}
                  className="text-yellow-300 hover:underline"
                >
                  "{data.email}"
                </a>
                <span className="text-white">,</span>
              </div>
            )}
            {data.location && (
              <div className="pl-4">
                <span className="text-blue-300">"location"</span>
                <span className="text-white">: </span>
                <span className="text-yellow-300">"{data.location}"</span>
                <span className="text-white">,</span>
              </div>
            )}
            {data.github && (
              <div className="pl-4">
                <span className="text-blue-300">"github"</span>
                <span className="text-white">: </span>
                <a
                  href={`https://github.com/${data.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 hover:underline"
                >
                  "github.com/{data.github}"
                </a>
                <span className="text-white">,</span>
              </div>
            )}
            {data.linkedin && (
              <div className="pl-4">
                <span className="text-blue-300">"linkedin"</span>
                <span className="text-white">: </span>
                <a
                  href={
                    data.linkedin.startsWith("http")
                      ? data.linkedin
                      : `https://${data.linkedin}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 hover:underline"
                >
                  "{data.linkedin}"
                </a>
              </div>
            )}
            <div className="text-purple-300">{"}"}</div>
          </div>
        </div>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <div className="mb-10">
            <div className="text-green-400 mb-2">{prompt} $ cat skills.js</div>
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
              <div className="text-purple-300">
                const <span className="text-blue-300">skills</span> = [
              </div>
              <div className="pl-4 flex flex-wrap gap-2 my-2">
                {data.skills.map((skill: string, i: number) => (
                  <span key={skill} className="text-yellow-300">
                    "{skill}"{i < data.skills.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
              <div className="text-purple-300">]</div>
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <div className="mb-10">
            <div className="text-green-400 mb-2">{prompt} $ ls projects/</div>
            <div className="flex flex-col gap-4">
              {data.projects.map((project: any, i: number) => (
                <div
                  key={i}
                  className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 hover:border-green-400/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">
                      {project.title}
                    </span>
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-green-400 hover:underline"
                        >
                          live →
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:underline"
                        >
                          github →
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-[#8b949e] text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resume */}
        {data.resumeUrl && (
          <div className="mb-10">
            <div className="text-green-400 mb-2">
              {prompt} $ open resume.pdf
            </div>
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-400 border border-green-400/30 px-4 py-2 rounded-lg hover:bg-green-400/10 transition-colors"
            >
              📄 Download Resume
            </a>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-[#30363d] pt-8">
          <div className="text-green-400 mb-1">
            {prompt} $ echo "thanks for visiting"
          </div>
          <div className="text-[#8b949e]">thanks for visiting</div>
          <div className="text-[#8b949e] mt-4 text-xs">
            Built with{" "}
            <a href="/" className="text-green-400 hover:underline">
              FlashFolio
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
