'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SkillCardData } from './types';
import styles from './SkillsSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type SkillCardProps = {
  card: SkillCardData;
};

export const SkillCard = ({ card }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const infoItems = cardRef.current?.querySelectorAll(`.${styles.skillItem}`);
      if (!infoItems) return;

      const TOTAL_DURATION = 2;
      const STAGGER_DELAY = 0.2;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      infoItems.forEach((infoItem, i) => {
        const bar = infoItem.querySelector(`.${styles.gaugeBar}`);
        const numberSpan = infoItem.querySelector(`.${styles.skillLevel}`);
        if (!bar) return;

        const targetValue = parseInt(
          bar.getAttribute('data-percent') || '0',
          10,
        );
        const startTime = i * STAGGER_DELAY;
        const counter = { value: 0 };

        // 1. ゲージの伸び
        tl.to(
          bar,
          {
            width: `${targetValue}%`,
            duration: TOTAL_DURATION,
            ease: 'power4.out',
          },
          startTime,
        );

        // 2. 数値のカウントアップ ＋ ARIA属性更新
        tl.to(
          counter,
          {
            value: targetValue,
            duration: TOTAL_DURATION,
            ease: 'power4.out',
            onUpdate: () => {
              const currentPercent = Math.ceil(counter.value);

              // 視覚的な数字を更新
              if (numberSpan) {
                numberSpan.textContent = `${currentPercent}%`;
              }
              // スクリーンリーダー用のリアルタイムな現在値も一緒に更新
              bar.setAttribute('aria-valuenow', String(currentPercent));
            },
          },
          startTime,
        );
      });
    },
    {
      dependencies: [card],
      scope: cardRef,
    },
  );

 return (
   <div className={styles.card} ref={cardRef}>
     <h3 className={styles.cardTitle}>{card.title}</h3>
     <ul className={styles.skillList}>
       {card.infoItems.map((infoItem) => {
         const labelId = `skill-${card.title}-${infoItem.name}`.replace(
           /\s+/g,
           '-',
         );

         return (
           <li key={infoItem.name} className={styles.skillItem}>
             <div className={styles.skillInfo}>
               <span id={labelId} className={styles.skillName}>
                 {infoItem.name}
               </span>
               <span className={styles.skillLevel}>0%</span>
             </div>
             <div className={styles.gaugeTrack}>
               <div
                 className={styles.gaugeBar}
                 data-percent={infoItem.percentage}
                 role='progressbar'
                 aria-labelledby={labelId}
                 aria-valuenow={infoItem.percentage}
                 aria-valuemin={0}
                 aria-valuemax={100}
               />
             </div>
           </li>
         );
       })}
     </ul>
   </div>
 );

};
