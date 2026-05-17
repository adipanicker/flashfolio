export default function ExecutiveTemplate({
  data,
  username,
}: {
  data: any;
  username: string;
}) {
  return (
    <main className="min-h-screen bg-[#fafaf9]">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          {data.avatar ? (
            <img
              src={data.avatar}
              alt={data.name}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-5 border-4 border-white shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-5 flex items-center justify-center text-3xl text-gray-400 border-4 border-white shadow-sm">
              {data.name?.[0] || "?"}
            </div>
          )}
          <h1 className="text-3xl font-medium text-gray-900 mb-2">
            {data.name}
          </h1>
          <p className="text-gray-500 text-lg mb-4">{data.role}</p>

          {data.location && (
            <p className="text-sm text-gray-400 mb-6">{data.location}</p>
          )}

          {/* Social links */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                Contact me
              </a>
            )}
            {data.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                Download Resume
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
                className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                LinkedIn
              </a>
            )}
            {data.github && (
              <a
                href={`https://github.com/${data.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                GitHub
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
                className="text-sm border border-gray-200 text-gray-600 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-10">
        {/* About */}
        {data.bio && (
          <section>
            <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              About
            </h2>
            <p className="text-gray-600 leading-relaxed">{data.bio}</p>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="text-sm text-gray-700 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section>
            <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              {data.userType === "professional" ? "Work" : "Projects"}
            </h2>
            <div className="flex flex-col gap-4">
              {data.projects.map((project: any, i: number) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-base font-medium text-gray-900">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 shrink-0">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full hover:bg-gray-50 transition-colors"
                        >
                          View →
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 border border-gray-200 px-2.5 py-1 rounded-full hover:bg-gray-50 transition-colors"
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center">
        <p className="text-xs text-gray-300">
          Built with{" "}
          <a
            href="/"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            FlashFolio
          </a>
        </p>
      </footer>
    </main>
  );
}
