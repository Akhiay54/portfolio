interface Project {
  id: number;
  name: string;
  tools: string[];
  role: string;
  description: string;
  code: string;
  demo: string;
  date: string;
  images: string[];
  videos?: string[];
}

export interface ProjectCardProps {
  project: Project;
}
