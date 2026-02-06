// src/app/(home)/components/MainVisual/index.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useUIStore } from "@/store/useUIStore";
import styles from "./MainVisual.module.scss";

export const MainVisual = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const setPhase = useUIStore((state) => state.setPhase);

  // コンポーネントがマウントされ、ブラウザが画面を書き換える直前にこのフックが発火
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setPhase("header-entry"), // ➃
      });

      setPhase("mv-playing"); // ➀

      // ➁
      tl.to(".js-mv-item", {
        opacity: 1,
        y: 0,
        duration: 1.2, // 1つの要素につき設定秒かけて動く
        stagger: 0.2, // 複数要素に対して設定秒ずつずらして順差表示
        ease: "power4.out", // 最初は速く、最後はゆっくりと止まる
      }).to(
        // ➂
        ".js-scroll-indicator",
        {
          opacity: 1,
          duration: 1,
        },
        "-=0.4", // 前の要素のアニメーションが終わる設定秒前に、このアニメーションを開始させる
      );
    }, rootRef);

    return () => ctx.revert();
  }, [setPhase]);

  return (
    <section
      ref={rootRef}
      className="relative h-svh w-full overflow-hidden bg-black flex items-center"
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

      {/* styles を適用することで警告を解消 */}
      <div
        className={`js-scroll-indicator opacity-0 absolute bottom-12 right-12 ${styles.scrollIndicator}`}
      >
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.dropLineTrack} />
      </div>
    </section>
  );
};
