import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

// --- 定数設定---
const CONFIG = {
  PATHS: {
    METADATA: path.join(process.cwd(), 'src/app/gallery/data/ui-parts.ts'),
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
const name = args.find(arg => arg.startsWith('--name='))?.split('=')[1];

// --- エラー処理 ---
if (!category || !name) {
  console.error('Usage: npm run new -- --category=button --name=button03 --difficulty=advanced');
  process.exit(1);
}
if (!CONFIG.REGEXP.SAFE_PATTERN.test(category) || !CONFIG.REGEXP.SAFE_PATTERN.test(name)) {
  console.error('Error: Category and Name must be alphanumeric, hyphen, or underscore.');
  process.exit(1);
}
const targetDir = path.join(CONFIG.PATHS.PUBLIC_BASE, category, name);
if (fs.existsSync(targetDir)) {// 重複チェック (ディレクトリ)
  console.error(`Error: Directory already exists at ${targetDir}`);
  process.exit(1);
}

// --- 正常系 ---

const prefixClassName = `p-${name}`;// 作品用プレフィックスを付与したクラス名
// --- メタデータ生成 ---
const newItem = `  {
    id: "${name}",
    category: "${category}",
    title: "${name}",
    description: "",
    tags: ["Vanilla JS", "SCSS"],
    url: "/gallery-parts/ui/${category}/${name}/index.html",
    code: {
      html: \`\`,
      css: \`\`,
      js: \`\`,
    },
  },`;

try {
  // ui-parts.ts の更新と重複チェック
  const currentMetadata = fs.readFileSync(CONFIG.PATHS.METADATA, 'utf8');
  // IDが既に登録されていないかチェック
  if (currentMetadata.includes(`id: "${name}"`)) {
    console.error(`Error: ID "${name}" is already registered in ui-parts.ts`);
    process.exit(1);
  }
  // 指定位置にデータを挿入
  const updatedMetadata = currentMetadata.replace(
    CONFIG.REGEXP.INSERT_POINT,
    `$1\n${newItem}`
  );
  // 書き込み
  fs.writeFileSync(CONFIG.PATHS.METADATA, updatedMetadata);
  console.log(`Updated: ui-parts.ts`);

  // ディレクトリ作成
  fs.mkdirSync(targetDir, { recursive: true });

  // テンプレートファイル生成
  const templates = {
    'index.html': `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}</title>
  <link rel="stylesheet" href="style.css">
  <style>body {display: flex;align-content: center;justify-content: center;}</style>
</head>
<body>
  <div class="${prefixClassName}">
    <p>${name} - Coming Soon</p>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
    'style.scss': `@use '../../../common/css/index';

// プレフィックス p- を付与したクラス
.${prefixClassName} {
  padding: 1rem;
  }
  // BEM記法例: .${prefixClassName}__inner { ... }
`,
    'script.js': `(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    console.log('${name} initialized');
  });
})();`
  };
  // 書き込み
  Object.entries(templates).forEach(([file, content]) => {
    fs.writeFileSync(path.join(targetDir, file), content);
    console.log(`Created: ${file}`);
  });

  console.log(`\nSuccessfully generated "${name}"!`);
  console.log(`Path: ${targetDir}`);
  console.log(`Class name: .${prefixClassName}`);

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