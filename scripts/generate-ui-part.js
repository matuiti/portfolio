import fs from 'fs';
import path from 'path';
import { exec } from 'child_process'; // ブラウザ起動用に追加

// --- 設定 ---
const METADATA_PATH = path.join(process.cwd(), 'src/data/gallery/ui-parts.ts');
const PUBLIC_BASE_PATH = path.join(process.cwd(), 'public', 'gallery-parts', 'ui');

// --- 引数取得 ---
const args = process.argv.slice(2);
const category = args.find(arg => arg.startsWith('--category='))?.split('=')[1];
const name = args.find(arg => arg.startsWith('--name='))?.split('=')[1];

if (!category || !name) {
  console.error('❌ Usage: npm run new -- --category=button --name=button03');
  process.exit(1);
}

const targetDir = path.join(PUBLIC_BASE_PATH, category, name);
if (fs.existsSync(targetDir)) {
  console.error(`❌ Error: ${targetDir} already exists`);
  process.exit(1);
}

// --- メタデータ生成 ---
const newItem = `  {
    id: "${name}",
    category: "${category}",
    title: "${name}",
    description: "",
    difficulty: "basic",
    tags: ["Vanilla JS", "SCSS"],
    features: ["特徴１", "特徴２"],
    techStack: ["HTML", "SCSS", "JavaScript"],
    path: "/gallery-parts/ui/${category}/${name}/index.html",
    code: {
      html: \`\`,
      css: \`\`,
      js: \`\`,
    },
  },`;

try {
  // 1. ディレクトリ作成
  fs.mkdirSync(targetDir, { recursive: true });

  // 2. テンプレートファイル生成
  const templates = {
    'index.html': `<!DOCTYPE html>\n<html lang="ja">\n<head>\n  <meta charset="UTF-8">\n  <title>${name}</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <div class="${name}">\n    <p>${name} - Coming Soon</p>\n  </div>\n  <script src="script.js"></script>\n</body>\n</html>`,
    'style.scss': `@use '../../../common/css/index';\n\n.${name} {\n  padding: 1rem;\n}`,
    'script.js': `(function() {\n  'use strict';\n  console.log('${name} initialized');\n})();`
  };

  Object.entries(templates).forEach(([file, content]) => {
    fs.writeFileSync(path.join(targetDir, file), content);
    console.log(`✅ Created: ${file}`);
  });

  // 3. ui-parts.ts の更新
  const currentMetadata = fs.readFileSync(METADATA_PATH, 'utf8');
  const updatedMetadata = currentMetadata.replace(
    /(export const UI_PARTS: UIPart\[\] = \[)/,
    `$1\n${newItem}`
  );
  fs.writeFileSync(METADATA_PATH, updatedMetadata);

  console.log(`\n✨ Successfully generated "${name}"!`);
  console.log(`📂 Path: ${targetDir}`);

  // --- 4. ブラウザを自動で開く ---
  const workbenchUrl = 'http://localhost:3000/workbench';
  const startCommand = process.platform === 'darwin' ? 'open' :
    process.platform === 'win32' ? 'start' : 'xdg-open';

  exec(`${startCommand} ${workbenchUrl}`, (err) => {
    if (err) {
      console.warn(`⚠️ Could not open browser automatically: ${err.message}`);
    } else {
      console.log(`🚀 Opening Workbench: ${workbenchUrl}`);
    }
  });

} catch (err) {
  console.error(`❌ Error: ${err.message}`);
}