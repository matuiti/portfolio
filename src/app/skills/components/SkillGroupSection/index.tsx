'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { SkillGroup } from '@/types/skill';
import { SkillCard } from '../SkillCard';
import { KeyboardArrowRight } from '@/components/ui/Icons';
import styles from '../../Skills.module.css';

type Props = {
  group: SkillGroup;
  index: number;
};
const subscribeEmpty = () => () => {};

/**
 * "group" は関連スキルをまとめた1つの単位です。
 * ex. フロントエンド・プログラミング言語 ...
 */
export const SkillGroupSection = ({ group, index }: Props) => {
  const groupContentRef = useRef<HTMLDivElement>(null);
  const groupId = group.title;

  // サーバー側とクライアント側の値を安全に分離する
  const isOpen = useSyncExternalStore(
    subscribeEmpty,
    // クライアント（ブラウザ）側で評価する値
    () => {
      const savedGroups = window.history.state?.openGroups;
      // 初回訪問時
      const isInitialVisit = savedGroups === undefined;
      if (isInitialVisit) {
        return index === 0; // 1つ目のグループだけを開く
      }
      // 2回目以降
      if (Array.isArray(savedGroups)) {
        return savedGroups.includes(groupId);
      }

      return false; // 想定外のデータ型が入っていた場合のフォールバック
    },

    // サーバー（SSR）側で評価する初期値（一律で閉じている状態にする）
    () => false,
  );

  // 再レンダリングを促すためのダミーステイト
  const [, setTick] = useState(0);

  // 初回訪問時、一番上の状態を履歴に保存
  useEffect(() => {
    const currentState = window.history.state || {};
    const isInitialVisit = currentState.openGroups === undefined;
    if (isInitialVisit && index === 0) {
      window.history.replaceState(
        { ...currentState, openGroups: [groupId] },
        '',
      );
    }
  }, [groupId, index]);

  // 履歴の同期
  const handleToggle = () => {
    const currentState = window.history.state || {};
    const currentOpenGroups: string[] = currentState.openGroups || [];
    let nextOpenGroups: string[];

    if (!isOpen) {
      nextOpenGroups = Array.from(new Set([...currentOpenGroups, groupId]));
    } else {
      nextOpenGroups = currentOpenGroups.filter((id) => id !== groupId);
    }

    window.history.replaceState(
      { ...currentState, openGroups: nextOpenGroups },
      '',
    );

    // useSyncExternalStoreに再評価を促すためにステイトを更新
    setTick((t) => t + 1);
  };

  // --- アニメーション制御 (GSAP) ---
  useEffect(() => {
    if (!groupContentRef.current) return;

    if (isOpen) {
      gsap.to(groupContentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: true,
      });
    } else {
      gsap.to(groupContentRef.current, {
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
      <div ref={groupContentRef} className={styles.groupContent}>
        <div className={styles.skillGrid}>
          {group.items.map((item) => (
            <SkillCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
