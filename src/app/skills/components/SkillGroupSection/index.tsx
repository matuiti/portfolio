"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SkillGroup } from "@/types/skill";
import { SkillCard } from "../SkillCard";
import { KeyboardArrowRight } from "@/components/ui/Icons";
import styles from "../../Skills.module.scss";

type Props = {
  group: SkillGroup;
  index: number; // 何番目のセクションか判定するために追加
};

export const SkillGroupSection = ({ group, index }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // 識別子として title を使用（型エラー回避のため group.id ではなく title を使用）
  const groupId = group.title;

  // --- 1. 状態管理（初期化ロジック） ---
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    // サーバーサイドレンダリング時は実行しない
    if (typeof window === "undefined") return false;

    const savedGroups = window.history.state?.openGroups;

    // A. 履歴データが存在する場合（「戻る」や「実績から帰還」した時）
    if (savedGroups !== undefined && Array.isArray(savedGroups)) {
      return savedGroups.includes(groupId);
    }

    // B. 新規訪問時（履歴データがまだ作られていない時）
    // index が 0（一番上）のグループだけ true を返す
    return index === 0;
  });

  // 初回訪問時、一番上の状態を履歴に保存するための副作用
  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentState = window.history.state || {};
    // まだ一度も履歴が保存されていない場合のみ、初期状態を書き込む
    if (currentState.openGroups === undefined && index === 0) {
      window.history.replaceState(
        { ...currentState, openGroups: [groupId] },
        "",
      );
    }
  }, [groupId, index]);

  // クリック時の処理（履歴の同期）
  const handleToggle = () => {
    setIsOpen((prev) => {
      const nextStatus = !prev;
      const currentState = window.history.state || {};
      const currentOpenGroups: string[] = currentState.openGroups || [];

      let nextOpenGroups: string[];
      if (nextStatus) {
        nextOpenGroups = Array.from(new Set([...currentOpenGroups, groupId]));
      } else {
        nextOpenGroups = currentOpenGroups.filter((id) => id !== groupId);
      }

      window.history.replaceState(
        { ...currentState, openGroups: nextOpenGroups },
        "",
      );

      return nextStatus;
    });
  };

  // --- 2. アニメーション制御 (GSAP) ---
  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
    } else {
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
        onClick={handleToggle}
        className={styles.groupHeader}
        aria-expanded={isOpen}
      >
        <span className={styles.groupTitle}>{group.title}</span>
        <div
          style={{
            transform: `rotate(${isOpen ? -180 : 0}deg)`,
            transition: "transform 0.5s ease",
          }}
        >
          <KeyboardArrowRight direction="bottom" color="white" />
        </div>
      </button>

      <div
        ref={contentRef}
        className={styles.groupContent}
        style={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
        }}
      >
        <div className={styles.skillGrid}>
          {group.items.map((item) => (
            <SkillCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
