import { projectsData } from "@/../utils/Data/projects-data";
import ProjectCard from "@/components/sections/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Android apps, Kotlin Multiplatform experiments, and open-source work by Akhilesh Yadav.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Akhilesh Yadav",
    description:
      "Android apps, Kotlin Multiplatform experiments, and open-source work by Akhilesh Yadav.",
    url: "/projects",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Akhilesh Yadav — Android Engineer",
      },
    ],
  },
};

const ProjectsPage = () => {
  return (
    <section id="projects" className="relative min-h-screen  overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-strong/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col gap-16 items-center container mx-auto py-24 px-4 sm:px-8 relative z-10">
        <div className="max-w-3xl text-center flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold text-white tracking-tighter">
            The Digital{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-strong">
              Vault
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium italic">
            A comprehensive archive of Android apps, Kotlin Multiplatform
            experiments, and open-source work built with production-grade
            precision.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {projectsData.map((project) => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
