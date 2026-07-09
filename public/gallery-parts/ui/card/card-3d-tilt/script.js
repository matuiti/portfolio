(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    console.log('card-3d-tilt initialized');
    // 3D チルトカード：requestAnimationFrame でマウス座標を毎フレーム線形補間し、
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
})();
  });
})();