"use client";

import { useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { useUIStore } from "@/store/useUIStore";

export const useScrollReveal = () => {
  const phase = useUIStore((state) => state.phase);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * 【実装：内容】
   * アニメーションを実行し、完了後に制御を CSS へバトンタッチする
   */
  const revealElement = useCallback((el: Element) => {
    const target = el as HTMLElement;

    // すでに表示済み、またはアニメーション中の場合は絶対に何もしない（制御のガード）
    if (
      target.dataset.revealed === "true" ||
      target.dataset.revealing === "true"
    )
      return;

    // 進行中フラグを立てる
    target.dataset.revealing = "true";

    gsap.to(target, {
      autoAlpha: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      overwrite: "auto",
      onComplete: () => {
        // 1. GSAPのインラインスタイルを全削除（ホバーの解放）
        gsap.set(target, { clearProps: "all" });

        // 2. CSSの初期スタイル（opacity:0等）に負けないよう、表示状態を固定
        target.style.opacity = "1";
        target.style.visibility = "visible";
        target.style.pointerEvents = "auto";

        // 3. 完了フラグを立て、進行中フラグを下ろす
        target.dataset.revealed = "true";
        target.removeAttribute("data-revealing");
      },
    });
  }, []);

  /**
   * 【制御：選択】
   * まだ表示されていない要素（シールがない要素）だけを狙ってスキャンする
   */
  const observeNewElements = useCallback(() => {
    // すでに完了した要素（.is-revealed や data-revealed）を検索対象から完全に除外
    const targets = document.querySelectorAll(
      ".js-fuwa-fade:not([data-revealed='true'])",
    );

    targets.forEach((target) => {
      const rect = target.getBoundingClientRect();
      // すでに画面内なら即実行、外なら監視カメラに登録
      if (rect.top < window.innerHeight) {
        revealElement(target);
      } else if (observerRef.current) {
        observerRef.current.observe(target);
      }
    });
  }, [revealElement]);

  /**
   * 【制御：タイミング】
   * ライフサイクルやDOMの変化に合わせて、スキャンを指示する
   */
  useEffect(() => {
    // 準備が整うまで（MV完了またはスクロール済み）待機
    const isScrolled = window.scrollY > 100;
    if (!isScrolled && phase !== "ready") return;

    // 1. スクロール監視（Intersection Observer）の初期化
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -50px 0px" },
    );

    // 2. 初回実行（ロード時に見えている要素用）
    observeNewElements();

    // 3. DOM変化監視（Mutation Observer）：タブ切り替え対策
    let timer: NodeJS.Timeout;
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(timer);
      // 連続発火を抑えるデバウンス処理
      timer = setTimeout(() => {
        observeNewElements();
      }, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observerRef.current?.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timer);
    };
  }, [phase, revealElement, observeNewElements]);
};
