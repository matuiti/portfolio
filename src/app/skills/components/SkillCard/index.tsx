'use client';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react';
import { LabelType, SkillItem } from '@/types/skill';
import { SubButton } from '@/components/ui/Buttons/SubButton';
import { Launch, GitHub } from '@/components/ui/Icons';
import { LABEL_DESCRIPTION } from '@/data/skills';
import { useIsMounted } from '@/lib/hooks/useIsMounted';
import styles from './SkillCard.module.css';

type SkillCardProps = {
  item: SkillItem;
};

export const SkillCard = ({ item }: SkillCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const [isActive, setIsActive] = useState(false);
  const isMounted = useIsMounted();

  const { refs, floatingStyles } = useFloating({
    open: isActive,
    onOpenChange: setIsActive,
    placement: 'top',
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });

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

  const getTooltipText = (label: LabelType): string | null => {
    switch (label) {
      case '基礎レベル':
        return `${LABEL_DESCRIPTION.基礎レベル}`;
      case '実務レベル':
        return `${LABEL_DESCRIPTION.実務レベル}`;
      case '精通レベル':
        return `${LABEL_DESCRIPTION.精通レベル}`;
      default:
        return null;
    }
  };

  const tooltipText = getTooltipText(item.label);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{item.name}</h3>

        <span
          ref={(node) => refs.setReference(node)}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          onClick={() => setIsActive(!isActive)}
          className={`${styles.tag} select-none`}
        >
          {item.label}
        </span>

        {isActive &&
          tooltipText &&
          isMounted &&
          createPortal(
            <span
              ref={(node) => refs.setFloating(node)}
              style={floatingStyles}
              className='fixed px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-md whitespace-nowrap z-50 font-normal normal-case tracking-normal pointer-events-none'
            >
              {tooltipText}
              <span className='absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800' />
            </span>,
            document.body,
          )}
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
