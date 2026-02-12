// src/app/(home)/components/MainVisual/index.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useUIStore } from "@/store/useUIStore";
import styles from "./MainVisual.module.scss";

export const MainVisual = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const setPhase = useUIStore((state) => state.setPhase);
  const phase = useUIStore((state) => state.phase);

  /**
   * 演出スキップ判定（他ページから戻った際などの挙動）
   */
  const isAllFinished = phase === "ready";

  /**
   * コンテンツ（メインテキスト等）の表示判定
   * ヘッダー登場フェーズ（header-entry）以降であれば表示状態にする
   */
  const isMvItemVisible = phase === "ready" || phase === "header-entry";

  useEffect(() => {
    // すでに演出済みならGSAPを実行しない
    if (isAllFinished) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        // すべてのアニメーション完了後に phase を "ready" に更新 [ソース118, 184]
        onComplete: () => setPhase("ready"),
      });

      // 1. 演出開始フェーズへ [ソース34, 184]
      setPhase("mv-playing");

      // 2. メインコンテンツの登場アニメーション
      tl.to(".js-mv-item", {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.7,
        ease: "power4.out",
      })
        // 3. ヘッダーを登場させる（コンテンツの演出中に少し早めに開始） [ソース118, 185]
        .add(() => setPhase("header-entry"), "-=0.8")

        // 4. スクロールインジケーターの登場
        .to(
          ".js-scroll-indicator",
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "+=0.5",
        );
    }, rootRef);

    return () => ctx.revert();
  }, [setPhase, isAllFinished]);

  // クラス名の動的生成
  const itemClass = `js-mv-item ${isMvItemVisible ? "opacity-100" : "opacity-0"}`;

  /**
   * スクロールインジケーターのスタイル
   * 物理配置は親の「配置用コンテナ」が制御するため、ここでは位置微調整（-right-3等）と表示制御を行う
   */
  const scrollClass = `js-scroll-indicator ${
    isAllFinished ? "opacity-100" : "opacity-0"
  } absolute bottom-0 -right-3 mobile:-right-4.5 tablet:-right-10.5 small:-right-14.125 default:-right-20 ${styles.scrollIndicator}`;

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden flex items-start justify-center bg-black h-svh min-h-mv-height-mini mobile:min-h-mv-height-mobile tablet:min-h-mv-height-tablet small:min-h-mv-height-small"
    >
      {/* --- 1. メインコンテンツ層 --- */}
      <div className={`${styles["mv-container"]}`}>
        <div
          className={`${itemClass} grid grid-cols-1 md:grid-cols-2 gap-12 items-center small:pt-header-small pt-header-mini`}
        >
          {/* テキストコンテンツ */}
          <div className="space-y-6 z-10">
            <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] text-white tracking-tight">
              Design meets
              <br />
              Implementation.
            </h1>
            <p className="text-white max-w-md text-lg">
              「実装力」と「設計力」で、アイデアを確かな形にする。
            </p>
          </div>

          {/* メイン画像エリア */}
          <div
            className={`${itemClass} relative aspect-square w-full max-w-125 mx-auto`}
          >
            <div className="absolute inset-0 border border-blue-600 translate-x-6 translate-y-6 -z-10" />
            <div className="relative w-full h-full bg-neutral-200 overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/mv-main.jpg"
                alt="Main Visual"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. スクロールインジケーター配置専用レイヤー --- */}
      {/* セクション（h-svh）の全域を覆う絶対配置の枠 */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        {/*
            既存の .mv-container を再利用して横幅・横位置を完全に同期。
            mt-0! で上部マージンを消し、h-full でセクション下部（bottom-0）まで領域を伸ばす。
        */}
        <div className={`${styles["mv-container"]} relative h-full mt-0!`}>
          {/*
              この div の「右下（bottom-0, -right-X）」が基準点となる。
              雫のアニメーション（物理演算的な演出）は styles.scrollIndicator 内で定義されている。
          */}
          <div className={scrollClass}>
            <span className={styles.scrollText}>Scroll</span>
            <div className={styles.dropLineTrack} />
          </div>
        </div>
      </div>
    </section>
  );
};
