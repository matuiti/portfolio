'use client';
import { useState, useRef, useEffect } from 'react';
import { SkillItem } from '@/types/skill';
import { SubButton } from '@/components/ui/Buttons/SubButton';
import { Launch, GitHub } from '@/components/ui/Icons';
import styles from './SkillCard.module.css';

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
      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight);
      const tripleLineHeight = lineHeight * 3;
      const isOverflowing = el.scrollHeight > tripleLineHeight - 1;
      setHasOverflow(isOverflowing);
      if (!isOverflowing) {
        setIsExpanded((prev) => {
          if (prev) return false;
          return prev;
        });
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [item.description]);

  const projectLink = item.links?.find((l) => l.type === 'project');
  const githubLink = item.links?.find((l) => l.type === 'github');

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{item.name}</h3>
        <span className={styles.tag}>{item.label}</span>
      </div>

      <div className={styles.content}>
        <p
          ref={descriptionRef}
          className={`${styles.description} ${isExpanded ? styles.isExpanded : ''}`}
        >
          {item.description}
        </p>

        {hasOverflow && (
          <button
            type='button'
            className={styles.toggleBtn}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '閉じる' : 'もっと見る'}
          </button>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.buttonGroup}>
          {projectLink && (
            <SubButton
              href={projectLink.url}
              leftIcon={Launch}
              variant='gray'
              className={styles.subBtn}
            >
              {`「${projectLink.name || item.name}」の事例を見る`}
            </SubButton>
          )}
          {githubLink && (
            <SubButton
              href={githubLink.url}
              target='_blank'
              leftIcon={GitHub}
              variant='gray'
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
