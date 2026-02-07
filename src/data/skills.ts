// src/data/skills.ts
import { SkillCategory } from "@/types/skill";

export const ALL_SKILLS: SkillCategory[] = [
  {
    id: "frontend",
    title: "Front-end",
    skills: [
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React / Next.js", level: 85 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    id: "design-tool",
    title: "Design & Tools",
    skills: [
      { name: "Figma", level: 80 },
      { name: "Adobe XD / PS", level: 70 },
      { name: "Git / GitHub", level: 85 },
      { name: "VS Code", level: 95 },
      { name: "Docker", level: 60 },
    ],
  },
  {
    id: "other",
    title: "Other Skills",
    skills: [
      { name: "Sass (SCSS)", level: 90 },
      { name: "GSAP / anime.js", level: 75 },
      { name: "WordPress", level: 80 },
      { name: "Web API", level: 75 },
      { name: "Accessibility", level: 85 },
    ],
  },
];
