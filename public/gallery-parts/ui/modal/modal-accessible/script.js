(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    console.log('modal-accessible initialized');
    // アクセシブルモーダル：WAI-ARIA Authoring Practices に準拠したフォーカス管理を実装。
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
    })();
  });
})();