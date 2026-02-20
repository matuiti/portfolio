import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SubButton } from "@/components/ui/Buttons/SubButton";
import { Mail, GitHub } from "@/components/ui/Icons";
import styles from "./AboutSection.module.scss";

const PROFILE_DATA = {
  jobTitle: "Webコーダー",
  name: "松葉一八",
  description: `Web制作コーダーとしての「実装力」と、フロントエンドエンジニアとしての「設計力」を武器に、アイデアを確かな形にします。
  セマンティックなマークアップ、保守性の高いCSS設計、そしてユーザー体験を向上させる細やかなアニメーション実装を得意としています。`,
  links: {
    contact: "/#contact",
    github: "https://github.com/your-id",
  },
  images: {
    sp: "/assets/images/home/about-profile-sp.jpg",
    pc: "/assets/images/home/about-profile-pc.jpg",
  },
} as const;

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="scroll-mt-20 section-padding-y section-padding-x bg-white js-fuwa-fade"
    >
      <div className="container-center">
        <div className={styles.inner}>
          {/* 2. セクションタイトル */}
          <div className={`${styles.titleArea}`}>
            <SectionTitle
              enTitle="about"
              jpTitle="私について"
              variant="underlined"
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
              sizes="(max-width: 839px) 100vw, 1px"
            />
          </div>

          {/* 3. 画像エリア（PC用：2カラム 1:1） */}
          <div className={`${styles.imageWrapper} ${styles.isPC}`}>
            <Image
              src={PROFILE_DATA.images.pc}
              alt={PROFILE_DATA.name}
              fill
              className={styles.image}
              sizes="(min-width: 840px) 570px, 1px"
            />
          </div>

          {/* 4. 説明文 */}
          <p className={styles.description}>{PROFILE_DATA.description}</p>

          {/* 5. ボタンエリア */}
          <div className={styles.buttonArea}>
            <SubButton href={PROFILE_DATA.links.github} leftIcon={GitHub}>
              GitHub
            </SubButton>
            <SubButton href={PROFILE_DATA.links.contact} leftIcon={Mail}>
              Contact
            </SubButton>
          </div>
        </div>
      </div>
    </section>
  );
};
