// form01 のスクリプト
(function() {
  'use strict';

  // DOM読み込み完了後に実行
  document.addEventListener('DOMContentLoaded', function() {
    const element = document.querySelector('.form01');
    
    if (!element) return;

    // 初期化処理
    init();

    function init() {
      console.log('form01 initialized');
      // ここに初期化ロジックを追加
    }
  });
})();