// src/types/site.ts
export type SiteConfig = {
  name: string;
  url: string;
  description: string;
  author: string;
  links: {
    github: string;
    twitter?: string;
  };
}
