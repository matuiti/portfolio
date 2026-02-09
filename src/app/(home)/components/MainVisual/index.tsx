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

  useEffect(() => {
    // 1. useEffectはブラウザでしか実行されないため、ここでGSAPを開始すれば
    //    サーバー/クライアントの不一致（Hydration Error）は発生しません。
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setPhase("header-entry"),
      });

      // アニメーション開始フェーズへ
      setPhase("mv-playing");

      tl.to(".js-mv-item", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      }).to(
        ".js-scroll-indicator",
        {
          opacity: 1,
          duration: 1,
        },
        "-=0.4",
      );
    }, rootRef); // rootRefの範囲内のみを対象にする

    // 2. クリーンアップ関数（コンポーネントが消える時にアニメーションを停止させる）
    return () => ctx.revert();
  }, [setPhase]); // setPhaseはZustandの関数なので依存配列に入れて安全です

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden flex items-center bg-black h-svh min-h-mv-height-mini mobile:min-h-mv-height-mobile tablet:min-h-mv-height-tablet small:min-h-mv-height-small"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center small:pt-header-lg pt-header-sm">
        <div className="space-y-6 z-10">
          <div className="js-mv-item opacity-0 translate-y-8">
            <p className="text-white font-bold tracking-widest mb-4 text-sm">
              FRONTEND ENGINEER
            </p>
            <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] text-white tracking-tight">
              Design meets
              <br />
              Implementation.
            </h1>
          </div>
          <p className="js-mv-item opacity-0 translate-y-8 text-white max-w-md text-lg">
            「実装力」と「設計力」で、アイデアを確かな形にする。
          </p>
        </div>

        <div className="js-mv-item opacity-0 translate-y-8 relative aspect-square w-full max-w-125 mx-auto">
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

      <div
        className={`js-scroll-indicator opacity-0 absolute bottom-12 right-12 ${styles.scrollIndicator}`}
      >
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.dropLineTrack} />
      </div>
    </section>
  );
};
