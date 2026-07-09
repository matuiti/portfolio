(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    console.log('button-ripple-effect initialized');
    // リップルボタン：クリック座標から円の半径をボタン四隅までの最大距離で算出し、
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
    });
  });
})();
