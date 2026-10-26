import { projectsData } from "@/../utils/Data/projects-data";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Code,
  Globe,
  User,
  ShieldCheck,
  Cpu,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: String(project.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === parseInt(id));
  if (!project) return {};

  // Project covers are SVG, which most social scrapers refuse to render, so
  // sharing falls back to the PNG site card.
  const shareImage = {
    url: "/og-cover.jpg",
    width: 1200,
    height: 630,
    alt: `${project.name} — Akhilesh Yadav`,
  };

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.name} | Akhilesh Yadav`,
      description: project.description,
      url: `/projects/${project.id}`,
      type: "article",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Akhilesh Yadav`,
      description: project.description,
      images: [shareImage.url],
    },
  };
}

const formatDate = (value?: string) => {
  if (!value) return "2024";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const ProjectDetails = async ({ params }: Props) => {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === parseInt(id));

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen  text-white py-12 px-4 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white hover:text-brand transition-colors mb-8 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#050505] shadow-2xl mb-12">
          <div className="absolute inset-0 z-0">
            <Image
              src={project.images[0]}
              alt={project.name}
              fill
              className="object-cover opacity-20 blur-sm scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 p-8 lg:p-16 flex flex-col lg:flex-row gap-12 items-center">
            {/* Project Banner Image */}
            <div className="w-full lg:w-1/2 aspect-video relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src={project.images[0]}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {/* Project Header Info */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="secondary"
                  className="bg-brand/10 text-brand hover:bg-black border-brand/20 px-3 py-1 font-bold tracking-wider"
                >
                  {formatDate(project.date)}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-brand-deep/20 text-brand-soft hover:bg-black border-brand-strong/30 px-3 py-1 font-bold tracking-wider"
                >
                  {project.role}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-300 to-slate-500">
                {project.name}
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-medium italic">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-4">
                {project.demo && (
                  <Button
                    asChild
                    className="bg-brand hover:bg-brand-strong text-brand-deep px-8 py-6 text-lg rounded-xl shadow-lg shadow-brand/20 transition-all hover:scale-105 active:scale-95 flex gap-2 font-bold uppercase tracking-widest"
                  >
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="w-5 h-5" />
                      Live Preview
                    </Link>
                  </Button>
                )}
                {project.code && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/10 bg-white/5 hover:bg-brand-deep/20 hover:text-brand hover:border-brand/30 text-white px-8 py-6 text-lg rounded-xl transition-all hover:scale-105 active:scale-95 flex gap-2 font-bold uppercase tracking-widest"
                  >
                    <Link
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Code className="w-5 h-5" />
                      View Source
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 flex flex-col gap-16">
            {/* Highlights */}
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center border border-brand/20">
                  <ShieldCheck className="w-6 h-6 text-brand shadow-[0_0_15px_rgba(168,199,250,0.5)]" />
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  Project Highlights
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-4">
                {project.highlights?.map((highlight, index) => (
                  <li
                    key={index}
                    className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-brand/[0.03] hover:border-brand/20 transition-all duration-300 flex gap-4"
                  >
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-brand shadow-[0_0_10px_rgba(127,169,242,0.8)] shrink-0 group-hover:scale-125 transition-transform" />
                    <p className="text-slate-300 text-lg leading-relaxed font-medium">
                      {highlight}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Gallery */}
            {project.images && project.images.length > 1 && (
              <section className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-strong/10 flex items-center justify-center border border-brand-strong/20">
                    <Calendar className="w-6 h-6 text-brand" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">
                    Visual Showcase
                  </h2>
                </div>
                <Carousel className="w-full">
                  <CarouselContent>
                    {project.images.slice(1).map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group bg-[#050505]">
                          <Image
                            src={image}
                            alt={`${project.name} Screenshot ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 shadow-2xl opacity-80 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-brand/20 border-brand/30 hover:bg-brand text-white transition-all backdrop-blur-md" />
                  <CarouselNext className="right-4 bg-brand/20 border-brand/30 hover:bg-brand text-white transition-all backdrop-blur-md" />
                </Carousel>
              </section>
            )}
          </div>

          {/* Sidebar (Right) */}
          <aside className="flex flex-col gap-8">
            {/* Tech Stack Card */}
            <Card className="bg-[#050505]/20 border-white/10 rounded-3xl overflow-hidden sticky top-24 shadow-2xl">
              <CardContent className="p-8 flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-brand" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Technologies
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-4 py-1.5 bg-white/5 border-white/10 text-slate-300 rounded-full hover:border-brand/50 hover:bg-brand/10 hover:text-white transition-all cursor-default font-semibold text-[11px] uppercase tracking-wider"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-strong/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-brand" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Project Details
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Role</span>
                      <span className="text-slate-300 font-bold uppercase tracking-widest text-[10px] bg-white/5 px-2 py-1 rounded-md">
                        {project.role}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">
                        Completed
                      </span>
                      <span className="text-slate-300 font-bold">
                        {formatDate(project.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    asChild
                    className="w-full bg-brand/10 border border-brand/20 hover:bg-brand hover:text-brand-deep py-6 rounded-xl text-brand font-bold uppercase tracking-widest text-xs transition-all duration-300 group flex gap-2 overflow-hidden relative"
                  >
                    <Link href="/#contact">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand to-brand-strong opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-2 w-full">
                        Discuss This Project
                      </span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Similar Projects */}
        <div className="mt-32 pt-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl lg:text-4xl font-semibold text-white tracking-tighter">
                Explore More Work
              </h2>
              <p className="text-slate-400 text-lg font-medium">
                Explore more Android work and open-source projects.
              </p>
            </div>
            <Link
              href="/#projects"
              className="text-brand font-semibold uppercase tracking-[0.2em] text-sm hover:text-brand-soft transition-colors flex items-center gap-2 group"
            >
              View Full Archive{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
          <FeaturedProjects excludeId={project.id} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
