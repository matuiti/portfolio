"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SkillGroup } from "@/types/skill";
import { SkillCard } from "../SkillCard";
import { KeyboardArrowRight } from "@/components/ui/Icons";
import styles from "../../Skills.module.scss";

type Props = {
  group: SkillGroup;
  isOpen: boolean;
  onToggle: () => void;
};

export const SkillGroupSection = ({ group, isOpen, onToggle }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      // 開くアニメーション：内容に合わせた正確な高さを計算
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
    } else {
      // 閉じるアニメーション
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
        overwrite: true,
      });
    }
  }, [isOpen]);

  return (
    <section className={styles.groupSection}>
      <button
        type="button"
        onClick={onToggle}
        className={styles.groupHeader}
        aria-expanded={isOpen}
      >
        <span className={styles.groupTitle}>
          {group.title}
        </span>
        {/* アイコンの回転もGSAPのイージングに合わせるとより洗練されます */}
        <div
          style={{
            transform: `rotate(${isOpen ? -180 : 0}deg)`,
            transition: "transform 0.5s ease",
          }}
        >
          <KeyboardArrowRight direction="bottom" color="white" />
        </div>
      </button>

      <div ref={contentRef} className={styles.groupContent}>
        <div className={styles.skillGrid}>
          {group.items.map((item) => (
            <SkillCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
