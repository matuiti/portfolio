// src/app/skills/components/SkillCard/index.tsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import { SkillItem } from "@/types/skill";
import { SubButton } from "@/components/ui/Buttons/SubButton";
import { Launch, GitHub } from "@/components/ui/Icons";
import styles from "./SkillCard.module.scss";

type SkillCardProps = {
  item: SkillItem;
};

export const SkillCard = ({ item }: SkillCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const el = descriptionRef.current;
      if (!el) return;

      // 1. ブラウザが計算した現在の正確な line-height を取得
      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight);

      /**
       * 2. 「3行分の高さ」を計算
       * line-clamp: 3 は、中身が (lineHeight * 3) を超えた瞬間に発動します。
       * ブラウザのレンダリング誤差（0.5pxなど）による誤判定を防ぐため、
       * 1px程度のバッファを持たせて比較します。
       */
      const tripleLineHeight = lineHeight * 3;

      // scrollHeight は展開状態に関わらず「テキスト全体の高さ」を返すため、
      // これを 3行分の高さと比較することで、クランプが必要か正確に判定できます
      const isOverflowing = el.scrollHeight > tripleLineHeight - 1;

      setHasOverflow(isOverflowing);

      // リサイズなどで3行以内に収まった場合は、自動的に展開状態を解除
      if (!isOverflowing && isExpanded) {
        setIsExpanded(false);
      }
    };

    // 初期化時とリサイズ時に実行
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [item.description, isExpanded]);

  const projectLink = item.links?.find((l) => l.type === "project");
  const githubLink = item.links?.find((l) => l.type === "github");

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{item.name}</h3>
        <span className={styles.tag}>{item.label}</span>
      </div>

      <div className={styles.content}>
        <p
          ref={descriptionRef}
          className={`${styles.description} ${isExpanded ? styles.isExpanded : ""}`}
        >
          {item.description}
        </p>

        {hasOverflow && (
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "閉じる" : "もっと見る"}
          </button>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.buttonGroup}>
          {projectLink && (
            <SubButton
              href={projectLink.url}
              leftIcon={Launch}
              variant="gray"
              className={styles.subBtn}
            >
              {`「${projectLink.name || item.name}」の事例を見る`}
            </SubButton>
          )}
          {githubLink && (
            <SubButton
              href={githubLink.url}
              target="_blank"
              leftIcon={GitHub}
              variant="gray"
              className={styles.subBtn}
            >
              GitHub
            </SubButton>
          )}
        </div>
      </div>
    </article>
  );
};
