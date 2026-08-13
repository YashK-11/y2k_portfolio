export interface Technology {
  name: string;
  tags: string[];
}

export const technologies: Technology[] = [
  { name: "Python", tags: ["Automation", "Machine Learning", "Scripting"] },
  { name: "TypeScript", tags: ["Application Logic", "Type Safety"] },
  { name: "C++", tags: ["Data Structures", "Performance"] },
  { name: "React", tags: ["Interfaces", "Component Systems"] },
  { name: "Next.js", tags: ["Full-Stack Apps", "Server Rendering"] },
  { name: "FastAPI", tags: ["APIs", "Backend Services"] },
  { name: "MySQL", tags: ["Relational Data", "Query Design"] },
  { name: "Docker", tags: ["Environments", "Deployment"] },
  { name: "AWS", tags: ["Infrastructure", "Hosting"] },
  { name: "Machine Learning", tags: ["Modeling", "Data Pipelines"] },
];
