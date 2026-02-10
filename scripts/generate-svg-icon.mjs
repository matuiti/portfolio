import fs from 'fs';
import path from 'path';

// --- 設定 ---
const CONFIG = {
  PATHS: {
    ICONS_BASE: path.join(process.cwd(), 'src', 'components', 'ui', 'Icons'),
    HUB_INDEX: path.join(process.cwd(), 'src', 'components', 'ui', 'Icons', 'index.ts'),
  },
  REGEXP: {
    SAFE_PATTERN: /^[A-Z][a-zA-Z0-9]+$/, // 大文字開始のパスカルケースを強制
  }
};

const args = process.argv.slice(2);
const name = args.find(arg => arg.startsWith('--name='))?.split('=')[1];

if (!name || !CONFIG.REGEXP.SAFE_PATTERN.test(name)) {
  console.error('❌ Usage: node scripts/generate-svg-icon.mjs --name=IconArrowRight');
  console.error('⚠️ Name must be PascalCase (e.g., IconArrow).');
  process.exit(1);
}

const targetDir = path.join(CONFIG.PATHS.ICONS_BASE, name);
const indexPath = path.join(targetDir, 'index.tsx');

// --- 1. ディレクトリ作成 ---
if (fs.existsSync(targetDir)) {
  console.error(`❌ Error: Icon "${name}" already exists.`);
  process.exit(1);
}
fs.mkdirSync(targetDir, { recursive: true });

// --- 2. テンプレート作成 (規約準拠) ---
const template = `import { tv, type VariantProps } from "tailwind-variants";
import React from "react";

const iconStyles = tv({
  base: "inline-block shrink-0 transition-all duration-300",
  variants: {
    color: {
      primary: "text-blue-600",
      neutral: "text-slate-600",
      white: "text-white",
    },
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-10 h-10",
    },
  },
  defaultVariants: {
    color: "neutral",
    size: "md",
  },
});

export type ${name}Props = React.SVGProps<SVGSVGElement> & VariantProps<typeof iconStyles>;

export const ${name} = ({ color, size, className, ...props }: ${name}Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={iconStyles({ color, size, className })}
      {...props}
    >
      {/* TODO: Figmaからコピーしたパスをここに貼り付け、fill="currentColor" を付与してください */}
      <path d="" fill="currentColor" />
    </svg>
  );
};
`;

fs.writeFileSync(indexPath, template);
console.log(`✅ Created: ${name}/index.tsx`);

// --- 3. ハブファイル (index.ts) への自動登録 ---
const exportLine = `export * from "./${name}";\n`;
fs.appendFileSync(CONFIG.PATHS.HUB_INDEX, exportLine);
console.log(`✅ Registered: Export added to Icons/index.ts`);

console.log(`\n✨ Successfully generated "${name}"!`);