export default function MinimalistTemplate({
  data,
  username,
}: {
  data: any;
  username: string;
}) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="max-w-2xl mx-auto px-6 pt-20 pb-16">
        <div className="flex items-start justify-between gap-8 mb-10">
          <div className="flex-1">
            {data.avatar && (
              <img
                src={data.avatar}
                alt={data.name}
                className="w-16 h-16 rounded-full object-cover mb-6"
              />
            )}
            <h1 className="text-4xl font-medium text-gray-900 mb-2">
              {data.name}
            </h1>
            <p className="text-lg text-gray-500 mb-4">{data.role}</p>
            <p className="text-gray-600 leading-relaxed max-w-lg">{data.bio}</p>
          </div>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4 flex-wrap">
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {data.email}
            </a>
          )}
          {data.location && (
            <span className="text-sm text-gray-400">{data.location}</span>
          )}
          {data.github && (
            <a
              href={`https://github.com/${data.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              GitHub →
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
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              LinkedIn →
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
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Website →
            </a>
          )}
          {data.resumeUrl && (
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-gray-900 text-white px-4 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
            >
              Download Resume
            </a>
          )}
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-gray-100" />
      </div>

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="max-w-2xl mx-auto px-6 py-12">
          <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-6">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string) => (
              <span
                key={skill}
                className="text-sm text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="max-w-2xl mx-auto px-6 py-12">
          <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-6">
            Projects
          </h2>
          <div className="flex flex-col gap-6">
            {data.projects.map((project: any, i: number) => (
              <div
                key={i}
                className="group border-l-2 border-gray-100 pl-5 hover:border-gray-900 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-medium text-gray-900">
                    {project.title}
                  </h3>
                  <div className="flex gap-3 shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        Live →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-6 py-12 border-t border-gray-100">
        <p className="text-xs text-gray-300 text-center">
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
