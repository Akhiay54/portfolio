"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectCardProps } from "@/Types/types";
import { ChevronUp, Code, ExternalLink, Globe, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useRef, useState } from "react";

const ProjectCard = ({ project }: ProjectCardProps) => {
  const firstImage = project.images?.[0];
  const [showAllTags, setShowAllTags] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const maxVisibleTags = 5;
  const hasMoreTags = project.tools.length > maxVisibleTags;
  const visibleTools = showAllTags
    ? project.tools
    : project.tools.slice(0, maxVisibleTags);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Helper function to check if project is less than a month old
  const isNewProject = (dateString: string) => {
    if (!dateString) return false;

    try {
      const projectDate = new Date(dateString);
      const currentDate = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);

      return projectDate >= oneMonthAgo && projectDate <= currentDate;
    } catch {
      return false;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative h-full"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 199, 250, 0.1), transparent 40%)`,
        }}
      />

      <Card className="relative flex flex-col h-full justify-between border border-white/10 bg-[#050505]/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:border-brand/50 hover:shadow-brand/10">
        <div className="flex-1">
          <div className="relative overflow-hidden aspect-video">
            {project.videos?.[0] ? (
              <video
                src={project.videos[0]}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
            ) : firstImage ? (
              <Image
                src={firstImage}
                width={800}
                height={450}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                <span className="text-slate-600">{project.name}</span>
              </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/10 to-transparent" />

            {isNewProject(project.date) && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-brand to-brand-strong text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse z-10 border border-white/10">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[10px] font-bold tracking-wider">
                  NEW
                </span>
              </div>
            )}
          </div>

          <CardHeader className="p-6 pb-2">
            <Link
              href={`/projects/${project.id}`}
              className="group/title inline-block"
            >
              <CardTitle className="text-2xl font-bold text-white group-hover/title:text-brand transition-colors flex items-center gap-2 tracking-tight">
                {project.name}
                <ExternalLink className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover/title:opacity-100 group-hover/title:translate-y-0 group-hover/title:translate-x-0 transition-all text-brand" />
              </CardTitle>
            </Link>
          </CardHeader>

          <CardContent className="px-6">
            <p className="text-slate-400 line-clamp-2 text-sm mb-6 leading-relaxed font-medium italic">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {visibleTools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-[11px] font-bold bg-white/5 border border-white/10 text-slate-400 rounded-lg hover:bg-brand/10 hover:border-brand/30 hover:text-brand transition-all duration-300"
                >
                  {tool}
                </span>
              ))}
              {hasMoreTags && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllTags(!showAllTags);
                  }}
                  aria-expanded={showAllTags}
                  aria-label={
                    showAllTags
                      ? "Show fewer technologies"
                      : `Show ${project.tools.length - maxVisibleTags} more technologies`
                  }
                  className="flex items-center gap-1 text-brand hover:text-brand-soft text-[11px] font-semibold transition-colors pl-1 uppercase tracking-widest"
                >
                  {showAllTags ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    `+${project.tools.length - maxVisibleTags}`
                  )}
                </button>
              )}
            </div>
          </CardContent>
        </div>

        <CardFooter className="p-6 pt-2 flex gap-4">
          {project.demo ? (
            <Button
              asChild
              className="flex-1 w-full h-11 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-brand text-white hover:border-brand shadow-xl hover:shadow-brand/20"
            >
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-4 h-4" />
                Live Demo
              </Link>
            </Button>
          ) : (
            <Button
              disabled
              className="flex-1 w-full h-11 rounded-xl text-xs font-bold uppercase tracking-widest bg-white/2 text-slate-600 border-none"
            >
              <Globe className="w-4 h-4" />
              Live Demo
            </Button>
          )}
          {project.code ? (
            <Button
              asChild
              className="flex-1 w-full h-11 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 bg-white/5 hover:bg-brand-deep text-white hover:border-brand-strong shadow-xl hover:shadow-brand-strong/20"
            >
              <Link
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code className="w-4 h-4" />
                Source
              </Link>
            </Button>
          ) : (
            <Button
              disabled
              className="flex-1 w-full h-11 rounded-xl text-xs font-bold uppercase tracking-widest bg-white/2 text-slate-600 border-none"
            >
              <Code className="w-4 h-4" />
              Source
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
