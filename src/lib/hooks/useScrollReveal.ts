// src / lib / hooks / useScrollReveal.ts;
"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useUIStore } from "@/store/useUIStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * サイト全体の出現演出を一括管理するフック（スタッガー対応）
 */
export const useScrollReveal = (deps: React.DependencyList = []) => {
  const phase = useUIStore((state) => state.phase);

  useEffect(() => {
    // 1. MV演出完了(ready)を待機 [3, 4]
    if (phase !== "ready") return;

    let ctx: gsap.Context;

    // ReactのDOM反映を確実にするため描画フレームを待機
    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // プロジェクト規約の .js- プレフィックス要素を取得 [2]
        const targets = document.querySelectorAll(".js-fuwa-fade");

        const initialized: HTMLElement[] = [];
        const toAnimate: HTMLElement[] = [];

        targets.forEach((el) => {
          const element = el as HTMLElement;
          if (element.dataset.fuwaInitialized === "true") {
            initialized.push(element);
          } else {
            toAnimate.push(element);
          }
        });

        // 既に出現済みの要素は状態を固定
        if (initialized.length > 0) {
          gsap.set(initialized, { autoAlpha: 1, y: 0, pointerEvents: "auto" });
        }

        // 未出現要素に対して時間差演出(Stagger)を適用
        if (toAnimate.length > 0) {
          ScrollTrigger.batch(toAnimate, {
            onEnter: (batch) => {
              gsap.fromTo(
                batch,
                {
                  autoAlpha: 0,
                  y: "3rem", // 規約に基づくrem指定の根拠 [2]
                  pointerEvents: "none",
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  pointerEvents: "auto",
                  duration: 1.2,
                  ease: "power3.out",
                  stagger: 0.15, // 0.15秒ずつずらして登場
                  onStart: () => {
                    /**
                     * ★修正ポイント
                     * self.targets() を使わず、onEnterの引数である batch を直接使用します。
                     * batch は現在アニメーションが開始された要素の配列です。
                     */
                    batch.forEach((el) => {
                      (el as HTMLElement).dataset.fuwaInitialized = "true";
                    });
                  },
                },
              );
            },
            // FV見切れ対応：画面底から20px入ったら発火 [5]
            start: "top bottom-=20px",
            once: true,
          });
        }

        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, ...deps]);
};