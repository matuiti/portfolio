import { SectionTitle } from '@/components/ui/SectionTitle';
import { MainButton } from '@/components/ui/Buttons/MainButton';
import { SKILL_CARDS_DATA } from './data';
import { SkillCard } from './SkillCard';
import styles from './SkillsSection.module.css';

export const SkillsSection = () => {
  return (
    <section id='skills' className='-scroll-mt-2'>
      <div className='section-padding-y section-padding-x bg-light-gray'>
        <div className='container-center'>
          <div className={styles.sectionHead}>
            <SectionTitle
              enTitle='skills'
              jpTitle='スキル'
              variant='default'
              className='js-fuwa-fade'
            />
            <p className={`${styles.description} js-fuwa-fade`}>
              フロントエンド技術を柱としつつ、サーバーサイドなどの周辺知識も随時拡充してます。
            </p>
          </div>
          <div className={`${styles.cardGrid} js-fuwa-fade`}>
            {SKILL_CARDS_DATA.map((card) => (
              <SkillCard key={card.title} card={card} />
            ))}
            <div className={`${styles.buttonWrapper} js-fuwa-fade`}>
              <MainButton
                variant='underline'
                href='/skills'
                aria-label='スキル一覧を見る'
              >
                一覧を見る
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
