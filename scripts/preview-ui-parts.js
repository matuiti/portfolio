// scripts/preview-ui-parts.js
import fs from 'fs';
import path from 'path';

// コマンドライン引数から取得
const args = process.argv.slice(2);
const categoryArg = args.find(arg => arg.startsWith('--category='));
const nameArg = args.find(arg => arg.startsWith('--name='));

if (!categoryArg || !nameArg) {
  console.error('Usage: npm run preview:ui -- --category=button --name=button01');
  process.exit(1);
}

const category = categoryArg.split('=')[1];
const name = nameArg.split('=')[1];

// UIパーツのパス
const uiPartPath = path.join(process.cwd(), 'public', 'gallery-parts', 'ui', category, name);
const indexPath = path.join(uiPartPath, 'index.html');

// UIパーツが存在するかチェック
if (!fs.existsSync(indexPath)) {
  console.error(`Error: ${indexPath} does not exist`);
  console.error('Please create the UI part first using: npm run generate:ui');
  process.exit(1);
}

// プレビューHTMLの生成
const previewHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview: ${name}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      padding: 2rem;
    }

    .preview-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .preview-header {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .preview-header h1 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .preview-header p {
      color: #666;
      font-size: 0.875rem;
    }

    .preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .preview-item {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .preview-label {
      padding: 1rem;
      background: #333;
      color: white;
      font-weight: 600;
      text-align: center;
      font-size: 0.875rem;
    }

    .preview-frame-wrapper {
      position: relative;
      background: #fff;
      overflow: auto;
      display: grid;
      place-items: center;
    }

    .preview-frame {
      border: none;
      display: block;
      background: white;
    }

    /* Mobile (375px) */
    .preview-item.mobile .preview-frame-wrapper {
      height: 667px; /* iPhone SE height */
    }

    .preview-item.mobile .preview-frame {
      width: 375px;
      height: 667px;
    }

    /* Tablet (768px) */
    .preview-item.tablet .preview-frame-wrapper {
      height: 600px;
    }

    .preview-item.tablet .preview-frame {
      width: 768px;
      height: 1024px;
    }

    /* Desktop (1200px) */
    .preview-item.desktop .preview-frame-wrapper {
      height: 600px;
    }

    .preview-item.desktop .preview-frame {
      width: 1200px;
      height: 800px;
    }

    .preview-info {
      padding: 1rem;
      background: #f9f9f9;
      border-top: 1px solid #eee;
      font-size: 0.75rem;
      color: #666;
      text-align: center;
    }

    @media (max-width: 768px) {
      .preview-grid {
        grid-template-columns: 1fr;
      }
      
      body {
        padding: 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="preview-container">
    <div class="preview-header">
      <h1>${name} - 3サイズプレビュー</h1>
      <p>Category: ${category} | Path: ./gallery-parts/ui/${category}/${name}/</p>
    </div>

    <div class="preview-grid">
      <!-- Mobile Preview -->
      <div class="preview-item mobile">
        <div class="preview-label">📱 Mobile (375px)</div>
        <div class="preview-frame-wrapper">
          <iframe 
            class="preview-frame" 
            src="./gallery-parts/ui/${category}/${name}/index.html"
            title="Mobile Preview"
          ></iframe>
        </div>
        <div class="preview-info">375px × 667px</div>
      </div>

      <!-- Tablet Preview -->
      <div class="preview-item tablet">
        <div class="preview-label">📱 Tablet (768px)</div>
        <div class="preview-frame-wrapper">
          <iframe 
            class="preview-frame" 
            src="./gallery-parts/ui/${category}/${name}/index.html"
            title="Tablet Preview"
          ></iframe>
        </div>
        <div class="preview-info">768px × 1024px</div>
      </div>

      <!-- Desktop Preview -->
      <div class="preview-item desktop">
        <div class="preview-label">🖥️ Desktop (1200px)</div>
        <div class="preview-frame-wrapper">
          <iframe 
            class="preview-frame" 
            src="./gallery-parts/ui/${category}/${name}/index.html"
            title="Desktop Preview"
          ></iframe>
        </div>
        <div class="preview-info">1200px × 800px</div>
      </div>
    </div>
  </div>
</body>
</html>`;

// プレビューファイルの保存先
const previewPath = path.join(process.cwd(), 'public', '_preview.html');

// ファイル書き込み
fs.writeFileSync(previewPath, previewHTML, 'utf8');

console.log(`✨ Preview file generated successfully!`);
console.log(`\nOpen in browser: http://localhost:3000/_preview.html`);
console.log(`\nMake sure to run 'npm run dev' first.`);