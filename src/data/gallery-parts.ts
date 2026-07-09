import { GalleryUIPart } from '@/types/gallery';

export const UI_PARTS: GalleryUIPart[] = [
  {
    id: 'card-3d-tilt',
    title: '3Dチルト・ホバーカード',
    category: 'card',
    description:
      'マウスのホバー位置に合わせてカードが立体的に傾く、視差（パララックス）エフェクトカードです。requestAnimationFrameによる滑らかな追従と、glare（光沢）表現、prefers-reduced-motionへの配慮まで含めた実装です。',
    tags: ['CSS 3D', 'Pointer Events', 'requestAnimationFrame', 'Performance'],
    url: '/gallery-parts/ui/card/card-3d-tilt/index.html',
    code: {
      html: `<div class="tilt-card-wrapper">
  <div class="tilt-card" data-tilt>
    <div class="tilt-card__glare" aria-hidden="true"></div>

    <div class="tilt-card__content">
      <span class="tilt-card__badge">NEW</span>
      <h3 class="tilt-card__title">3D Interactive Card</h3>
      <p class="tilt-card__desc">
        Move your mouse over this card to see the 3D depth effect in real-time.
      </p>

      <div class="tilt-card__footer">
        <span class="tilt-card__icon" aria-hidden="true">&#10022;</span>
        <span class="tilt-card__hint">Hover me</span>
      </div>
    </div>
  </div>
</div>`,
      css: `// ---------------------------------------------
// 3D Tilt Hover Card
// ---------------------------------------------
$card-w: 320px;
$card-h: 200px;
$radius: 18px;
$bg-start: #1a1a2e;
$bg-end: #262640;
$accent: #7dd3fc;

.tilt-card-wrapper {
  display: inline-block;
  perspective: 1200px;
}

.tilt-card {
  position: relative;
  width: $card-w;
  height: $card-h;
  border-radius: $radius;
  background: linear-gradient(135deg, $bg-start, $bg-end);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
  cursor: pointer;

  // JS が transform / box-shadow を都度上書きするため、
  // トランジションは "戻る瞬間" のみ JS 側で有効化する
  transition: box-shadow 0.35s ease;

  &::before {
    // 縁のハイライト
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.25),
      rgba(255, 255, 255, 0)
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}

.tilt-card__glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    circle at var(--glare-x, 50%) var(--glare-y, 50%),
    rgba(255, 255, 255, 0.25),
    transparent 60%
  );
  opacity: var(--glare-opacity, 0);
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.tilt-card__content {
  position: relative;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  color: #fff;
  transform: translateZ(20px);
}

.tilt-card__badge {
  align-self: flex-start;
  padding: 2px 10px;
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: 999px;
  color: #0f172a;
  background: $accent;
  transform: translateZ(15px);
}

.tilt-card__title {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 700;
  transform: translateZ(35px);
}

.tilt-card__desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #94a3b8;
  transform: translateZ(25px);
}

.tilt-card__footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: $accent;
  transform: translateZ(30px);

  .tilt-card__icon {
    font-size: 14px;
  }
}

// マウス操作を持たない / モーション低減を希望する環境への配慮
@media (prefers-reduced-motion: reduce) {
  .tilt-card {
    transition: none;
  }
}`,
      js: `// 3D チルトカード：requestAnimationFrame でマウス座標を毎フレーム線形補間し、
// なめらかな追従と自然な戻りアニメーションを両立させる実装。
(function () {
  const MAX_TILT = 12; // deg
  const EASE = 0.15; // 追従の滑らかさ（0〜1）
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    if (prefersReducedMotion) return; // モーション低減環境ではエフェクトを無効化

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;
    let isHovering = false;

    const bounds = () => card.getBoundingClientRect();

    const updatePointer = (clientX, clientY) => {
      const rect = bounds();
      const px = (clientX - rect.left) / rect.width; // 0〜1
      const py = (clientY - rect.top) / rect.height; // 0〜1

      targetY = (px - 0.5) * MAX_TILT * 2; // rotateY
      targetX = (0.5 - py) * MAX_TILT * 2; // rotateX

      card.style.setProperty('--glare-x', (px * 100) + '%');
      card.style.setProperty('--glare-y', (py * 100) + '%');
      card.style.setProperty('--glare-opacity', '1');
    };

    const render = () => {
      currentX += (targetX - currentX) * EASE;
      currentY += (targetY - currentY) * EASE;

      card.style.transform =
        'rotateX(' + currentX.toFixed(2) + 'deg) rotateY(' + currentY.toFixed(2) + 'deg)';

      const shadowX = -currentY * 1.5;
      const shadowY = currentX * 1.5;
      card.style.boxShadow =
        shadowX + 'px ' + shadowY + 'px 40px rgba(0, 0, 0, 0.45)';

      if (
        isHovering ||
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    };

    const start = () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    card.addEventListener('pointermove', (e) => {
      isHovering = true;
      updatePointer(e.clientX, e.clientY);
      start();
    });

    card.addEventListener('pointerleave', () => {
      isHovering = false;
      targetX = 0;
      targetY = 0;
      card.style.setProperty('--glare-opacity', '0');
      start();
    });
  });
})();`,
    },
  },
  {
    id: 'button-ripple-effect',
    title: 'マテリアル風リップルボタン',
    category: 'button',
    description:
      'クリックした座標から同心円状に波紋（リップル）が広がるボタンです。クリック座標から対角線の長さを算出して波紋サイズを決定し、連打時にも要素が正しく後片付けされる実装になっています。キーボード操作・focus-visible にも対応。',
    tags: ['Vanilla JS', 'CSS Animation', 'Accessibility'],
    url: '/gallery-parts/ui/button/button-ripple-effect/index.html',
    code: {
      html: `<button type="button" class="ripple-btn">
  <span class="ripple-btn__label">Click Me</span>
</button>`,
      css: `// ---------------------------------------------
// Material-style Ripple Button
// ---------------------------------------------
$btn-bg: #2563eb;
$btn-bg-hover: #1d4ed8;
$btn-bg-active: #1e40af;
$ripple-color: rgba(255, 255, 255, 0.55);

.ripple-btn {
  position: relative;
  isolation: isolate; // リップルをボタンの角丸内に確実に閉じ込める
  overflow: hidden;
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background-color: $btn-bg;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease,
    box-shadow 0.2s ease;

  &:hover {
    background-color: $btn-bg-hover;
  }

  &:active {
    background-color: $btn-bg-active;
    transform: scale(0.98);
  }

  // マウス利用者にはフォーカスリングを出さず、キーボード利用者には明示する
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__label {
    position: relative;
    z-index: 1;
  }
}

.ripple-btn__ripple {
  position: absolute;
  border-radius: 50%;
  background-color: $ripple-color;
  transform: scale(0);
  animation: ripple-expand 0.6s ease-out forwards;
  pointer-events: none;
}

@keyframes ripple-expand {
  to {
    transform: scale(1);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ripple-btn__ripple {
    animation: none;
    display: none;
  }
}`,
      js: `// リップルボタン：クリック座標から円の半径をボタン四隅までの最大距離で算出し、
// アニメーション終了後は確実に DOM から除去してメモリリークを防ぐ。
document.querySelectorAll('.ripple-btn').forEach((button) => {
  const createRipple = (x, y) => {
    if (button.disabled) return;

    const rect = button.getBoundingClientRect();

    // ボタン内の4隅とクリック位置との最大距離 = 波紋が確実に覆うべき半径
    const distances = [
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y),
    ];
    const radius = Math.max(...distances);
    const size = radius * 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-btn__ripple';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = (x - radius) + 'px';
    ripple.style.top = (y - radius) + 'px';

    button.appendChild(ripple);

    // アニメーション完了後にのみ要素を除去（連打しても他のripple には影響しない）
    ripple.addEventListener(
      'animationend',
      () => ripple.remove(),
      { once: true }
    );
  };

  // マウス／タッチクリック：クリック座標からリップルを発生させる
  button.addEventListener('click', (e) => {
    const rect = button.getBoundingClientRect();
    // キーボード操作（Enter/Space）由来のクリックは clientX/Y が 0 になるため中央から発生させる
    const isKeyboardTriggered = e.clientX === 0 && e.clientY === 0 && e.detail === 0;
    const x = isKeyboardTriggered ? rect.width / 2 : e.clientX - rect.left;
    const y = isKeyboardTriggered ? rect.height / 2 : e.clientY - rect.top;
    createRipple(x, y);
  });
});`,
    },
  },
  {
    id: 'modal-accessible',
    title: 'A11y完全準拠モーダル',
    category: 'modal',
    description:
      'WAI-ARIA Authoring Practicesに準拠したダイアログです。背景スクロールの固定（スクロールバー分のガタつき補正付き）、Escキーでのクローズ、Tabキーによるフォーカストラップ、開閉時のフォーカス管理までを実装しています。',
    tags: ['Accessibility', 'WAI-ARIA', 'Focus Trap', 'Keyboard Navigation'],
    url: '/gallery-parts/ui/modal/modal-accessible/index.html',
    code: {
      html: `<button type="button" id="open-modal-btn" class="btn">モーダルを開く</button>

<div
  id="accessible-modal"
  class="modal-overlay"
  aria-hidden="true"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <div class="modal-content" role="document">
    <button type="button" class="modal-close-icon" data-modal-close aria-label="閉じる">
      &times;
    </button>

    <h2 id="modal-title">アクセシブル・モーダル</h2>
    <p id="modal-desc">
      このモーダルは Esc キーで閉じられ、Tab キーによるフォーカス移動も
      モーダル内部に閉じ込められます（フォーカストラップ）。
    </p>

    <div class="modal-actions">
      <button type="button" class="btn btn--ghost" data-modal-close>キャンセル</button>
      <button type="button" class="btn" data-modal-close>OK</button>
    </div>
  </div>
</div>`,
      css: `// ---------------------------------------------
// Fully Accessible Modal (WAI-ARIA)
// ---------------------------------------------
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: #2563eb;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }
  &:focus-visible {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
  }

  &--ghost {
    color: #334155;
    background: #e2e8f0;

    &:hover {
      background: #cbd5e1;
    }
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.55);
  z-index: 1000;

  // 表示/非表示は opacity + visibility で管理し、
  // 非表示時はレイアウトからも操作対象からも外す
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease;

  &[aria-hidden='false'] {
    opacity: 1;
    visibility: visible;

    .modal-content {
      transform: translateY(0) scale(1);
    }
  }
}

.modal-content {
  position: relative;
  width: min(90vw, 440px);
  padding: 32px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  transform: translateY(12px) scale(0.97);
  transition: transform 0.25s ease;

  h2 {
    margin: 0 0 12px;
    font-size: 19px;
    color: #0f172a;
  }
  p {
    margin: 0 0 24px;
    font-size: 14px;
    line-height: 1.7;
    color: #64748b;
  }
}

.modal-close-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  color: #94a3b8;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: #f1f5f9;
    color: #334155;
  }
  &:focus-visible {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
  }
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

// モーダル表示中は背景をスクロール不可にする。
// scrollbar-gutter 非対応ブラウザ向けに padding-right は JS で動的補正する。
body.modal-open {
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .modal-overlay,
  .modal-content {
    transition: none;
  }
}`,
      js: `// アクセシブルモーダル：WAI-ARIA Authoring Practices に準拠したフォーカス管理を実装。
// - 開いた瞬間: 直前のフォーカス位置を保存し、モーダル内の先頭要素へフォーカス移動
// - 開いている間: Tab / Shift+Tab をモーダル内でループさせる（フォーカストラップ）
// - Esc / 背景クリック / close ボタン: いずれもモーダルを閉じ、元の位置へフォーカスを返す
(function () {
  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const modal = document.getElementById('accessible-modal');
  const openBtn = document.getElementById('open-modal-btn');
  const content = modal.querySelector('.modal-content');

  let lastFocusedElement = null;

  const getFocusableElements = () =>
    Array.from(content.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetParent !== null // 非表示要素を除外
    );

  const lockScroll = () => {
    // スクロールバーが消えることによるレイアウトのガタつきを補正
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = scrollbarWidth + 'px';
    document.body.classList.add('modal-open');
  };

  const unlockScroll = () => {
    document.body.style.paddingRight = '';
    document.body.classList.remove('modal-open');
  };

  const openModal = () => {
    lastFocusedElement = document.activeElement;

    modal.setAttribute('aria-hidden', 'false');
    lockScroll();

    const focusable = getFocusableElements();
    (focusable[1] || focusable[0] || content).focus();

    document.addEventListener('keydown', onKeydown);
  };

  const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
    unlockScroll();
    document.removeEventListener('keydown', onKeydown);

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  openBtn.addEventListener('click', openModal);

  // 背景クリックで閉じる（コンテンツ内クリックは伝播しないため誤爆しない）
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // 閉じるボタン群（アイコン／キャンセル／OK）
  modal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });
})();`,
    },
  },
];
