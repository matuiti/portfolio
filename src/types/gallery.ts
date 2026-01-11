// 仮置き
export interface UIPart {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  path: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  technologies: string[];
}