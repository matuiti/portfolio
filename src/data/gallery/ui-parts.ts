// src/data/gallery/ui-parts.ts
import { UIPart } from "@/types/gallery/ui-part";

export const UI_PARTS: UIPart[] = [
  {
    id: "btn-001",
    category: "button",
    title: "Magnetic Animated Button",
    description:
      "マウスホバーに合わせて吸い付くような動き（マグネティック効果）を実装したモダンなボタンです。",
    difficulty: "advanced",
    tags: ["React", "Framer Motion"],
    features: ["マグネティック効果", "光沢アニメーション"],
    techStack: ["React", "Framer Motion", "Tailwind CSS"],
    path: "/previews/buttons/magnetic",
    code: {
      html: `<button class="magnetic">Hover Me</button>`,
      css: `.magnetic { transition: transform 0.2s ease-out; }`,
      js: `// Framer Motion logic here...`,
    },
  },
  {
    id: "card-001",
    category: "card",
    title: "Glassmorphism Card",
    description:
      "背景のぼかしを効果的に使用した、透過感のあるデザインコンポーネントです。",
    difficulty: "expert",
    tags: ["CSS", "Design"],
    features: ["Backdrop Blur", "Glass Border"],
    techStack: ["Tailwind CSS"],
    path: "/previews/cards/glass",
    code: {
      html: `<div class="glass">Content</div>`,
      css: `.glass { backdrop-filter: blur(12px); }`,
      js: "",
    },
  },
  {
    id: "nav-001",
    category: "navigation",
    title: "Simple Sticky Header",
    description: "スクロール時に上部に固定されるシンプルなヘッダーです。",
    difficulty: "basic",
    tags: ["Layout"],
    features: ["Sticky Positioning", "Z-index management"],
    techStack: ["HTML", "CSS"],
    path: "/previews/nav/sticky",
    code: {
      html: "<header>Header</header>",
      css: "header { position: sticky; top: 0; }",
      js: "",
    },
  },
  {
    id: "form-001",
    category: "form",
    title: "Floating Input Field",
    description:
      "入力時にラベルが上部にスライドする、ユーザビリティの高いフォーム部品です。",
    difficulty: "basic",
    tags: ["Form", "UX"],
    features: ["Smooth Transition", "Zero-JS logic"],
    techStack: ["CSS", "HTML"],
    path: "/previews/form/floating",
    code: {
      html: "<div class='field'><input id='n' placeholder=' '><label>Name</label></div>",
      css: "input:placeholder-shown + label { transform: translateY(0); }",
      js: "",
    },
  },
  {
    id: "load-001",
    category: "loading",
    title: "Skeleton Loader",
    description:
      "コンテンツの読み込み中に表示する、滑らかなシマーアニメーション付きのスケルトンです。",
    difficulty: "advanced",
    tags: ["UX", "Animation"],
    features: ["Shimmer Effect", "Flexible Size"],
    techStack: ["Tailwind CSS"],
    path: "/previews/loading/skeleton",
    code: {
      html: "<div class='skeleton animate-pulse'></div>",
      css: ".skeleton { background: #eee; height: 200px; }",
      js: "",
    },
  },
];
