import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SubButton } from "@/components/ui/Buttons/SubButton";
import { Mail, GitHub } from "@/components/ui/Icons";
import styles from "./AboutSection.module.scss";
import { siteConfig } from "@/data/site-config";

const PROFILE_DATA = {
  jobTitle: "Webフロントエンドエンジニア / コーダー",
  name: "松葉一八",
  description: `独学スタートからフルリモート案件のみで4年半の実績です。

観光・宿泊施設サイト30サイト超の長期保守、企業サイトのリニューアルへのチーム参画、ECサイトの継続的な改修サポート経験など、年単位での継続プロジェクト経験が複数ございます。

大切にしているのは、ご要件の達成はもちろん、
ユーザーが「戸惑わない実装」、
クライアントが「快適に運用できる実装」、
未来の同業者が「扱いやすい実装」です。

オンラインだからこそ、その先の「人」を意識した実装を心がけております。`,
  images: {
    sp: "/assets/images/home/about-profile-sp.jpg",
    pc: "/assets/images/home/about-profile-pc.jpg",
  },
} as const;

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="section-padding-y section-padding-x bg-white js-fuwa-fade"
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
            <SubButton
              href={siteConfig.links.github}
              leftIcon={GitHub}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </SubButton>
            <SubButton href={siteConfig.links.contact} leftIcon={Mail}>
              Contact
            </SubButton>
          </div>
        </div>
      </div>
    </section>
  );
};
