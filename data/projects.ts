export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  year: string;
  technologies: string[];
  image: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "ocr-intelligence",
    number: "01",
    title: "OCR Intelligence",
    description:
      "A machine learning pipeline that validates names extracted from scanned identity documents — combining optical character recognition with fuzzy text matching to catch errors before they reach production.",
    year: "2024",
    technologies: ["Python", "PaddleOCR", "TF-IDF", "Scikit-learn"],
    image: "/projects/ocr-intelligence.svg",
    github: "https://github.com/yashkuberkhanna",
    featured: true,
  },
  {
    id: "system-monitor",
    number: "02",
    title: "Systems Monitor",
    description:
      "A lightweight backend service for tracking infrastructure health in real time, built for clarity under pressure — the kind of tool you reach for at 3am.",
    year: "2024",
    technologies: ["FastAPI", "MySQL", "Docker", "AWS"],
    image: "/projects/systems-monitor.svg",
    github: "https://github.com/yashkuberkhanna",
  },
  {
    id: "commerce-engine",
    number: "03",
    title: "Commerce Engine",
    description:
      "A full-stack storefront with a custom recommendation layer, designed to feel instant even on constrained connections.",
    year: "2023",
    technologies: ["React", "Next.js", "TypeScript", "MySQL"],
    image: "/projects/commerce-engine.svg",
    github: "https://github.com/yashkuberkhanna",
  },
  {
    id: "campus-network",
    number: "04",
    title: "Campus Network",
    description:
      "A student-built platform connecting CS majors across campus for project collaboration, study groups, and code review.",
    year: "2023",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    image: "/projects/campus-network.svg",
    github: "https://github.com/yashkuberkhanna",
  },
];
