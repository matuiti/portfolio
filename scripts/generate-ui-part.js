// scripts/generate-ui-part.js
import fs from 'fs';
import path from 'path';

// コマンドライン引数から取得
const args = process.argv.slice(2);
const categoryArg = args.find(arg => arg.startsWith('--category='));
const nameArg = args.find(arg => arg.startsWith('--name='));

if (!categoryArg || !nameArg) {
  console.error('Usage: npm run generate:ui -- --category=button --name=button03');
  process.exit(1);
}

const category = categoryArg.split('=')[1];
const name = nameArg.split('=')[1];

// プロジェクトルートからの相対パス（process.cwd() を使用）
const basePath = path.join(process.cwd(), 'public', 'gallery-parts', 'ui', category, name);

// ディレクトリ作成
if (fs.existsSync(basePath)) {
  console.error(`Error: ${basePath} already exists`);
  process.exit(1);
}

fs.mkdirSync(basePath, { recursive: true });

// テンプレートファイル作成
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
    <!-- UIパーツの内容 -->
    <p>${name} - Coming Soon</p>
  </div>
  <script src="script.js"></script>
</body>
</html>`,

  'style.scss': `// ${name} のスタイル
@use '../../common/css/variables';
@use '../../common/css/mixins';

.${name} {
  // Mobile First (375px)
  padding: 1rem;

  // Tablet (768px)
  @media (min-width: 768px) {
    padding: 2rem;
  }

  // Desktop (1200px)
  @media (min-width: 1200px) {
    padding: 3rem;
  }
}`,

  'script.js': `// ${name} のスクリプト
(function() {
  'use strict';

  // DOM読み込み完了後に実行
  document.addEventListener('DOMContentLoaded', function() {
    const element = document.querySelector('.${name}');
    
    if (!element) return;

    // 初期化処理
    init();

    function init() {
      console.log('${name} initialized');
      // ここに初期化ロジックを追加
    }
  });
})();`
};

// ファイル書き込み
Object.entries(templates).forEach(([filename, content]) => {
  const filepath = path.join(basePath, filename);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✓ Created: ${filepath}`);
});

console.log(`\n✨ Successfully generated ${name} in ${category} category`);
console.log(`\nNext steps:`);
console.log(`1. Edit files in: ${basePath}`);
console.log(`2. Compile SCSS: npm run compile:scss:ui`);
console.log(`3. Add metadata to: src/data/gallery/ui-parts.ts`);