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
   * サイト全体の演出が完了（ready）しているかどうかを基準にします [3, 4]
   */
  const isAllFinished = phase === "ready";

  /**
   * コンテンツ（メインテキスト等）の表示判定
   * ヘッダー登場フェーズ（header-entry）以降であれば表示状態にします [4]
   */
  const isMvItemVisible = phase === "ready" || phase === "header-entry";

  useEffect(() => {
    // すでに演出済みならGSAPを実行しない
    if (isAllFinished) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        // すべてのアニメーション完了後に phase を "ready" に更新
        onComplete: () => setPhase("ready"),
      });

      // 1. 演出開始フェーズへ [3, 5]
      setPhase("mv-playing");

      // 2. メインコンテンツの登場アニメーション
      tl.to(".js-mv-item", {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.7,
        ease: "power4.out",
      })
        // 3. ヘッダーを登場させる（コンテンツの演出中に少し早めに開始）
        .add(() => setPhase("header-entry"), "-=0.8")

        // 4. スクロールインジケーターの登場
        // ヘッダーが出てから "+=0.5"秒の「溜め」を作ってからフェードイン [1, 2]
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
  // 演出中は GSAP が opacity を操作するため、初期状態は opacity-0 にします
  const itemClass = `js-mv-item ${isMvItemVisible ? "opacity-100" : "opacity-0"}`;

  // スクロールインジケーターは「ready」になるまでCSSクラスでの表示（opacity-100）を制限します
  const scrollClass = `js-scroll-indicator ${isAllFinished ? "opacity-100" : "opacity-0"} absolute bottom-12 right-12 ${styles.scrollIndicator}`;

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden flex items-center bg-black h-svh min-h-mv-height-mini mobile:min-h-mv-height-mobile tablet:min-h-mv-height-tablet small:min-h-mv-height-small"
    >
      <div
        className={`${itemClass} container-center grid grid-cols-1 md:grid-cols-2 gap-12 items-center small:pt-header-small pt-header-mini`}
      >
        {/* テキストコンテンツ */}
        <div className="space-y-6 z-10">
          <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] text-white tracking-tight">
            Design meets
            <br />
            Implementation.
          </h1>
          <p className="text-white max-w-md text-lg">
            「実装力」と「設計力」で、アイデアを確かな形にする。 [6]
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

      {/* スクロールインジケーター（物理演算的な「雫」の演出） [7, 8] */}
      <div className={scrollClass}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.dropLineTrack} />
      </div>
    </section>
  );
};
