"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { HighlightSkillGroup } from "./types";
import styles from "./SkillsSection.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SkillCardProps = {
  group: HighlightSkillGroup;
};

export const SkillCard = ({ group }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = cardRef.current?.querySelectorAll(`.${styles.skillItem}`);
      if (!items) return;

      // 全アイテム共通の完了時間と、開始をずらす間隔
      const TOTAL_DURATION = 2;
      const STAGGER_DELAY = 0.2;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      });

      items.forEach((item, i) => {
        const bar = item.querySelector(`.${styles.gaugeBar}`);
        const numberSpan = item.querySelector(`.${styles.skillLevel}`);
        const targetValue = parseInt(
          bar?.getAttribute("data-percent") || "0",
          10,
        );

        // 数値更新用のプロキシ
        const counter = { value: 0 };
        const startTime = i * STAGGER_DELAY;

        // ゲージの伸び（溜めてから加速）
        tl.to(
          bar,
          {
            width: `${targetValue}%`,
            duration: TOTAL_DURATION,
            ease: "power4.out",
          },
          startTime,
        );

        // 数値のカウントアップ（ゲージと同期）
        tl.to(
          counter,
          {
            value: targetValue,
            duration: TOTAL_DURATION,
            ease: "power4.out",
            onUpdate: () => {
              if (numberSpan) {
                numberSpan.textContent = `${Math.ceil(counter.value)}%`;
              }
            },
          },
          startTime,
        );
      });
    }, cardRef);

    return () => ctx.revert();
  }, [group]);

  return (
    <div className={styles.card} ref={cardRef}>
      <h3 className={styles.cardTitle}>{group.title}</h3>
      <ul className={styles.skillList}>
        {group.items.map((item) => (
          <li key={item.name} className={styles.skillItem}>
            <div className={styles.skillInfo}>
              <span className={styles.skillName}>{item.name}</span>
              <span className={styles.skillLevel}>0%</span>
            </div>
            <div className={styles.gaugeTrack}>
              <div className={styles.gaugeBar} data-percent={item.percentage} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
