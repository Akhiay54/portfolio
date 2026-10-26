import type { MetadataRoute } from "next";
import { projectsData } from "@/../utils/Data/projects-data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projectsData.map((project) => ({
    url: `${siteUrl}/projects/${project.id}`,
    lastModified: project.date ? new Date(project.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    ...projectPages,
  ];
}
