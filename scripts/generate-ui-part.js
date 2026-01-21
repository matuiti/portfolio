import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

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

// --- 重複チェック (ディレクトリ) ---
if (fs.existsSync(targetDir)) {
  console.error(`❌ Error: Directory already exists at ${targetDir}`);
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
  // 1. ui-parts.ts の更新と重複チェック
  const currentMetadata = fs.readFileSync(METADATA_PATH, 'utf8');

  // IDが既に登録されていないかチェック
  if (currentMetadata.includes(`id: "${name}"`)) {
    console.error(`❌ Error: ID "${name}" is already registered in ui-parts.ts`);
    process.exit(1);
  }

  const updatedMetadata = currentMetadata.replace(
    /(export const UI_PARTS: UIPart\[\] = \[)/,
    `$1\n${newItem}`
  );
  fs.writeFileSync(METADATA_PATH, updatedMetadata);
  console.log(`✅ Updated: ui-parts.ts`);

  // 2. ディレクトリ作成
  fs.mkdirSync(targetDir, { recursive: true });

  // 3. テンプレートファイル生成 (Viewport設定を追加)
  const templates = {
    'index.html': `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="${name}">
    <p>${name} - Coming Soon</p>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
    'style.scss': `@use '../../../common/css/index';

.${name} {
  padding: 1rem;
  // ここにスタイルを記述
}`,
    'script.js': `(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', () => {
    console.log('${name} initialized');
  });
})();`
  };

  Object.entries(templates).forEach(([file, content]) => {
    fs.writeFileSync(path.join(targetDir, file), content);
    console.log(`✅ Created: ${file}`);
  });

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