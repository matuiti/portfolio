'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SkillCardData } from './types';
import styles from './SkillsSection.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type SkillCardProps = {
  group: SkillCardData;
};

export const SkillCard = ({ group }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = cardRef.current?.querySelectorAll(`.${styles.skillItem}`);
      if (!items) return;

      const TOTAL_DURATION = 2;
      const STAGGER_DELAY = 0.2;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      items.forEach((item, i) => {
        const bar = item.querySelector(`.${styles.gaugeBar}`);
        const numberSpan = item.querySelector(`.${styles.skillLevel}`);
        const targetValue = parseInt(
          bar?.getAttribute('data-percent') || '0',
          10,
        );

        const counter = { value: 0 };
        const startTime = i * STAGGER_DELAY;

        // ゲージの伸び
        tl.to(
          bar,
          {
            width: `${targetValue}%`,
            duration: TOTAL_DURATION,
            ease: 'power4.out',
          },
          startTime,
        );

        // 数値のカウントアップ
        tl.to(
          counter,
          {
            value: targetValue,
            duration: TOTAL_DURATION,
            ease: 'power4.out',
            onUpdate: () => {
              if (numberSpan) {
                numberSpan.textContent = `${Math.ceil(counter.value)}%`;
              }
            },
          },
          startTime,
        );
      });
    },
    {
      dependencies: [group],
      scope: cardRef,
    },
  );

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
