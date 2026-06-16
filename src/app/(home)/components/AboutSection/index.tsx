import Image from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SubButton } from '@/components/ui/Buttons/SubButton';
import { Mail, GitHub } from '@/components/ui/Icons';
import styles from './AboutSection.module.scss';
import { SITE_CONFIG } from '@/data/site';

const PROFILE_DATA = {
  jobTitle: 'WEBフロントエンドエンジニア',
  name: '松葉一八',
  description: `フルリモート環境で案件を獲得・達成して5年です。

受注歴は、観光・宿泊施設サイト30サイト超の長期保守、企業サイトのリニューアルへのチーム参画、ECサイトの継続的な改修サポート経験など、4サイト同時納品プロジェクトなどです。年単位での継続プロジェクト経験が複数ございます。

コミュニケーション経験は、チャットベースの連携やWebカメラを通じたミーティングなど様々です。

納める成果物の基本方針は、要求・要件の達成に加えて、ユーザーにとって不満のない、クライアントが管理・運用をスムーズにできる、のちにコードを編集する同業者にとって扱いやすい、そのような実装です。

クライアントの課題にいかに貢献できるかを最重要視しております。
`,
  images: {
    sp: '/assets/images/home/about-profile-sp.jpg',
    pc: '/assets/images/home/about-profile-pc.jpg',
  },
} as const;

export const AboutSection = () => {
  return (
    <section
      id='about'
      className='section-padding-y section-padding-x bg-white js-fuwa-fade'
    >
      <div className='container-center'>
        <div className={styles.inner}>
          {/* 2. セクションタイトル */}
          <div className={`${styles.titleArea}`}>
            <SectionTitle
              enTitle='about'
              jpTitle='私について'
              variant='underlined'
            />
          </div>

          {/* 2. プロフィール見出し */}
          <h3 className={styles.profileHead}>
            {PROFILE_DATA.jobTitle} / {PROFILE_DATA.name}
          </h3>

          {/* 3. 画像エリア（SP用：1カラム 16:9） */}
          <div className={`${styles.imageWrapper} ${styles.isSP}`}>
            <Image
              src={PROFILE_DATA.images.sp}
              alt={PROFILE_DATA.name}
              fill
              className={styles.image}
              sizes='(max-width: 839px) 100vw, 1px'
            />
          </div>

          {/* 3. 画像エリア（PC用：2カラム 1:1） */}
          <div className={`${styles.imageWrapper} ${styles.isPC}`}>
            <Image
              src={PROFILE_DATA.images.pc}
              alt={PROFILE_DATA.name}
              fill
              className={styles.image}
              sizes='(min-width: 840px) 570px, 1px'
            />
          </div>

          {/* 4. 説明文 */}
          <p className={styles.description}>{PROFILE_DATA.description}</p>

          {/* 5. ボタンエリア */}
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
