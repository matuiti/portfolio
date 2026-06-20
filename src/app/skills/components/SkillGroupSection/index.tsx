'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { AllSkills } from '@/types/skill';
import { SkillCard } from '../SkillCard';
import { KeyboardArrowRight } from '@/components/ui/Icons';
import styles from '../../Skills.module.css';

type Props = {
  group: AllSkills;
  index: number;
};

// 空のサブスクライブ関数（history.state はイベントをリスンできないため空で定義）
const subscribeEmpty = () => () => {};

export const SkillGroupSection = ({ group, index }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const groupId = group.title;

  // useSyncExternalStore を使い、サーバー側とクライアント側の値を安全に分離する
  const isOpen = useSyncExternalStore(
    subscribeEmpty,
    // クライアント（ブラウザ）側で評価する値
    () => {
      const savedGroups = window.history.state?.openGroups;
      if (savedGroups !== undefined && Array.isArray(savedGroups)) {
        return savedGroups.includes(groupId);
      }
      return index === 0;
    },
    // サーバー（SSR）側で評価する初期値（一律で閉じている状態にする）
    () => false,
  );

  // 状態を変更・再レンダリングさせるためのトリガー用ダミーステイト
  const [, setTick] = useState(0);

  // 初回訪問時、一番上の状態を履歴に保存（これはReact外部への書き込みなので useEffect として正しい用途）
  useEffect(() => {
    const currentState = window.history.state || {};
    if (currentState.openGroups === undefined && index === 0) {
      window.history.replaceState(
        { ...currentState, openGroups: [groupId] },
        '',
      );
    }
  }, [groupId, index]);

  // クリック時の処理（履歴の同期）
  const handleToggle = () => {
    const currentState = window.history.state || {};
    const currentOpenGroups: string[] = currentState.openGroups || [];

    let nextOpenGroups: string[];
    // 現在の状態の反対にする
    if (!isOpen) {
      nextOpenGroups = Array.from(new Set([...currentOpenGroups, groupId]));
    } else {
      nextOpenGroups = currentOpenGroups.filter((id) => id !== groupId);
    }

    window.history.replaceState(
      { ...currentState, openGroups: nextOpenGroups },
      '',
    );

    // useSyncExternalStore に再評価を促すためにステイトを更新
    setTick((t) => t + 1);
  };

  // --- 2. アニメーション制御 (GSAP) ---
  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: true,
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
        overwrite: true,
      });
    }
  }, [isOpen]);

  return (
    <section className={styles.groupSection}>
      <button
        type='button'
        onClick={handleToggle}
        className={styles.groupHeader}
        aria-expanded={isOpen}
      >
        <span className={styles.groupTitle}>{group.title}</span>
        <div
          style={{
            transform: `rotate(${isOpen ? -180 : 0}deg)`,
            transition: 'transform 0.5s ease',
          }}
        >
          <KeyboardArrowRight direction='bottom' color='white' />
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
