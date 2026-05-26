import { Syne } from "next/font/google";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";

const syne = Syne({ subsets: ["latin"] });

export default function MinimalistTemplate({
  data,
  username,
}: {
  data: any;
  username: string;
}) {
  // Handle backwards compat — old flat skills array
  const normalizedData = {
    ...data,
    accent: data.accent || "indigo",
    skills:
      Array.isArray(data.skills) && data.skills.length > 0
        ? typeof data.skills[0] === "string"
          ? data.skills.map((s: string) => ({ category: "Other", name: s }))
          : data.skills
        : [],
    projects: (data.projects || []).map((p: any) => ({
      ...p,
      image: p.image || "",
      featured: p.featured || false,
    })),
    experience: data.experience || [],
  };

  return (
    <div
      className={`${syne.className} min-h-screen bg-[#0a0a0a] overflow-x-hidden`}
    >
      <div className="max-w-6xl mx-auto">
        <Hero data={normalizedData} />
        <About data={normalizedData} />
        <Skills data={normalizedData} />
        <Experience data={normalizedData} />
        <Projects data={normalizedData} />
        <Contact data={normalizedData} />
        <Footer data={normalizedData} />
      </div>
    </div>
  );
}
