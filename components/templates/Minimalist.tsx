export default function MinimalistTemplate({ data }: { data: any }) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* HERO */}
      <section className="pt-16 px-8 max-w-3xl mx-auto">
        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#1a1a1a] bg-[#111] flex items-center justify-center mb-8">
          {data.avatar ? (
            <img
              src={data.avatar}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl text-zinc-700">👤</span>
          )}
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-[-0.08em] leading-[0.88] mb-10">
          {data.name?.split(" ")[0]}
          <br />
          {data.name?.split(" ").slice(1).join(" ")}
        </h1>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-[#161616] py-3 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-marquee">
          {Array(10)
            .fill(data.role || "Full Stack Developer")
            .map((item, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-semibold shrink-0"
              >
                {item}
                <span className="text-indigo-500 mx-3">◆</span>
              </span>
            ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="px-8 pt-16 max-w-3xl mx-auto">
        <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-semibold mb-6">
          About
        </div>

        <p className="text-[15px] leading-8 text-zinc-400 font-light max-w-2xl">
          {data.bio}
        </p>
      </section>

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section className="px-8 pt-16 max-w-3xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-semibold mb-6">
            Skills
          </div>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string) => (
              <span
                key={skill}
                className="text-[11px] text-zinc-400 bg-[#161616] border border-[#262626] px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section className="px-8 pt-16 max-w-3xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-semibold mb-6">
            Experience
          </div>

          <div className="flex flex-col gap-3">
            {data.experience.map((exp: any, i: number) => (
              <div
                key={i}
                className="bg-[#111] border border-[#1c1c1c] rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="text-sm font-bold tracking-tight">
                    {exp.company}
                  </h3>

                  <span className="text-[10px] text-zinc-600 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <div className="text-[11px] text-indigo-400 mb-3">
                  {exp.role}
                </div>

                <p className="text-[12px] leading-6 text-zinc-500">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <section className="px-8 pt-16 max-w-3xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600 font-semibold mb-6">
            Projects
          </div>

          <div className="flex flex-col gap-3">
            {data.projects.map((project: any, i: number) => (
              <div
                key={i}
                className="bg-[#111] border border-[#1c1c1c] rounded-2xl p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-5 shadow-lg"
              >
                <div>
                  <div className="text-[10px] tracking-[0.12em] text-zinc-600 font-semibold mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <h3 className="text-lg font-bold tracking-tight mb-2">
                    {project.title}
                  </h3>

                  <p className="text-[12px] leading-6 text-zinc-500 max-w-md">
                    {project.description}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0 md:pt-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-md hover:bg-indigo-500/20 transition"
                    >
                      Live →
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-md hover:bg-indigo-500/20 transition"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section className="px-8 pt-16 max-w-3xl mx-auto">
        <div className="flex items-center justify-center flex-wrap gap-5">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="w-12 h-12 rounded-xl bg-[#111] border border-[#1c1c1c] flex items-center justify-center hover:border-indigo-500/30 transition"
            >
              ✉️
            </a>
          )}

          {data.github && (
            <a
              href={
                data.github.startsWith("http")
                  ? data.github
                  : `https://github.com/${data.github}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-[#111] border border-[#1c1c1c] flex items-center justify-center hover:border-indigo-500/30 transition"
            >
              💻
            </a>
          )}

          {data.linkedin && (
            <a
              href={
                data.linkedin.startsWith("http")
                  ? data.linkedin
                  : `https://${data.linkedin}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-[#111] border border-[#1c1c1c] flex items-center justify-center hover:border-indigo-500/30 transition"
            >
              🔗
            </a>
          )}

          {data.website && (
            <a
              href={
                data.website.startsWith("http")
                  ? data.website
                  : `https://${data.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl bg-[#111] border border-[#1c1c1c] flex items-center justify-center hover:border-indigo-500/30 transition"
            >
              🌐
            </a>
          )}
        </div>
      </section>

      {/* RESUME */}
      {data.resumeUrl && (
        <section className="px-8 py-16 text-center">
          <a
            href={data.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black text-sm font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
          >
            Download Resume
          </a>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-8 text-center text-[10px] uppercase tracking-[0.1em] text-zinc-800">
        Built with FlashFolio
      </footer>
    </main>
  );
}
