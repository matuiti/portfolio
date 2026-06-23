'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/lib/hooks/useStore';
import styles from './ContactSection.module.css';

/**
 * 送信完了アニメーション
 */
export const ContactRipple = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const { contactStatus } = useStore();

  useGSAP(
    () => {
      if (rippleRef.current) {
        const tl = gsap.timeline();

        tl.to(rippleRef.current, {
          opacity: 0.6,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        }).to(rippleRef.current, {
          scale: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
        });
      }
    },
    {
      dependencies: [contactStatus],
      scope: containerRef,
    },
  );

  return (
    <div ref={containerRef} className={styles.rippleContainer}>
      <div ref={rippleRef} className={`${styles.ripple} js-contact-ripple`} />
    </div>
  );
};
