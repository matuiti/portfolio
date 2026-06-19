'use client';
import Image from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SubButton } from '@/components/ui/Buttons/SubButton';
import { Mail, GitHub } from '@/components/ui/Icons';
import { SITE_CONFIG } from '@/data/site';
import { PROFILE_DATA } from './data';
import styles from './AboutSection.module.css';

export const AboutSection = () => {
  return (
    <section
      id='about'
      className='section-padding-y section-padding-x bg-white js-fuwa-fade'
    >
      <div className='container-center'>
        <div className={styles.inner}>
          <div className={`${styles.titleArea}`}>
            <SectionTitle
              enTitle='about'
              jpTitle='私のこと'
              variant='underlined'
            />
          </div>

          {/* プロフィール見出し */}
          <h3 className={styles.profileHead}>
            {PROFILE_DATA.jobTitle} / {PROFILE_DATA.name}
          </h3>

          {/* 画像エリア（SP用：1カラム 16:9） */}
          <div className={`${styles.imageWrapper} ${styles.isSP}`}>
            <Image
              src={PROFILE_DATA.images.sp}
              alt={PROFILE_DATA.name}
              fill
              className={styles.image}
              sizes='(max-width: 839px) 100vw, 1px'
            />
          </div>

          {/* 画像エリア（PC用：2カラム 1:1） */}
          <div className={`${styles.imageWrapper} ${styles.isPC}`}>
            <Image
              src={PROFILE_DATA.images.pc}
              alt={PROFILE_DATA.name}
              fill
              className={styles.image}
              sizes='(min-width: 840px) 570px, 1px'
            />
          </div>

          <p className={styles.description}>{PROFILE_DATA.description}</p>

          <div className={styles.buttonArea}>
            <SubButton
              href={SITE_CONFIG.links.github}
              leftIcon={GitHub}
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub
            </SubButton>
            <SubButton href={SITE_CONFIG.links.contact} leftIcon={Mail}>
              Contact
            </SubButton>
          </div>
        </div>
      </div>
    </section>
  );
};
