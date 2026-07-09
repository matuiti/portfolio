import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

// --- 定数設定---
const CONFIG = {
  PATHS: {
    METADATA: path.join(process.cwd(), 'src/data/gallery-parts.ts'),
    PUBLIC_BASE: path.join(process.cwd(), 'public', 'gallery-parts', 'ui'),
  },
  URL: {
    WORKBENCH: 'http://localhost:3000/workbench',
  },
  REGEXP: {
    // 挿入位置を特定する正規表現
    INSERT_POINT: /(export const UI_PARTS: GalleryUIPart\[\] = \[)/,
    // 入力バリデーション（英数字、ハイフン、アンダースコア）
    SAFE_PATTERN: /^[a-zA-Z0-9-_]+$/,
  }
};

// --- 引数取得 ---
const args = process.argv.slice(2);
const category = args.find(arg => arg.startsWith('--category='))?.split('=')[1];
const inputId = args.find(arg => arg.startsWith('--id='))?.split('=')[1];
const id = `${category}-${inputId}`;

// --- エラー処理 ---
if (!category || !id) {
  console.error('Usage: npm run new -- --category=button --id=button03');
  process.exit(1);
}
if (!CONFIG.REGEXP.SAFE_PATTERN.test(category) || !CONFIG.REGEXP.SAFE_PATTERN.test(id)) {
  console.error('Error: Category and Id must be alphanumeric, hyphen, or underscore.');
  process.exit(1);
}
const targetDir = path.join(CONFIG.PATHS.PUBLIC_BASE, category, id);
if (fs.existsSync(targetDir)) {// 重複チェック (ディレクトリ)
  console.error(`Error: Directory already exists at ${targetDir}`);
  process.exit(1);
}

// --- 正常系 ---

const prefixClassName = `p-${id}`;// 作品用プレフィックスを付与したクラス名
// --- メタデータ生成 ---
const newItem = `  {
    id: "${id}",
    category: "${category}",
    title: "",
    description: "",
    tags: ["JavaScript", "SCSS", "HTML"],
    url: "/gallery-parts/ui/${category}/${id}/index.html",
    code: {
      html: \`\`,
      css: \`\`,
      js: \`\`,
    },
  },`;

try {
  // gallery-parts.ts の更新と重複チェック
  const currentMetadata = fs.readFileSync(CONFIG.PATHS.METADATA, 'utf8');
  // IDが既に登録されていないかチェック
  if (currentMetadata.includes(`id: "${id}"`)) {
    console.error(`Error: ID "${id}" is already registered in gallery-parts.ts`);
    process.exit(1);
  }
  // 指定位置にデータを挿入
  const updatedMetadata = currentMetadata.replace(
    CONFIG.REGEXP.INSERT_POINT,
    `$1\n${newItem}`
  );
  // 書き込み
  fs.writeFileSync(CONFIG.PATHS.METADATA, updatedMetadata);
  console.log(`Updated: gallery-parts.ts`);

  // ディレクトリ作成
  fs.mkdirSync(targetDir, { recursive: true });

  // テンプレートファイル生成
  const templates = {
    'index.html': `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${id}</title>
  <link rel="stylesheet" href="style.css">
  <style>body{padding:1em;background-color:#d1d5db;}</style>
</head>
<body>
  <div class="${prefixClassName}">
    <p>${id} - Coming Soon</p>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
    'style.scss': `@use '../../../common/css/index';
`,
    'script.js': `(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    console.log('${id} initialized');
  });
})();`
  };
  // 書き込み
  Object.entries(templates).forEach(([file, content]) => {
    fs.writeFileSync(path.join(targetDir, file), content);
    console.log(`Created: ${file}`);
  });

  console.log(`\nSuccessfully generated "${id}"!`);
  console.log(`Path: ${targetDir}`);
  console.log(`Class id: .${prefixClassName}`);

  // --- ブラウザを自動で開く ---
  // OSを判定し最適なコマンドを定義
  const startCommand = process.platform === 'darwin' ? 'open' :
    process.platform === 'win32' ? 'start' : 'xdg-open';
  exec(`${startCommand} ${CONFIG.URL.WORKBENCH}`, (err) => {
    if (err) {
      console.warn(`Could not open browser automatically: ${err.message}`);
    } else {
      console.log(`Opening Workbench: ${CONFIG.URL.WORKBENCH}`);
    }
  });

} catch (err) {
  console.error(`Error: ${err.message}`);
}