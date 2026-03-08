import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SubButton } from "@/components/ui/Buttons/SubButton";
import { Mail, GitHub } from "@/components/ui/Icons";
import styles from "./AboutSection.module.scss";
import { siteConfig } from "@/data/site-config";

const PROFILE_DATA = {
  jobTitle: "Webコーダー",
  name: "松葉一八",
  description: `コーディング歴は5年、Web制作のコーダーとして実務を積んで3年以上になります。

観光・宿泊施設サイト30サイト超の長期保守、企業サイトのリニューアルへのチーム参画、ECサイトの継続的な改修サポートなど、単発の制作だけでなく「継続してお付き合いできるコーダー」としての経験が土台にあります。

大切にしているのは、再現精度の高さはもちろん、「触ってはいけない部分を見極める」「手戻りが起きないよう事前に確認する」「納品後も困らないようにする」といった、地味だけれど信頼につながる部分です。

デザインカンプがある案件もない案件も、状況に合わせて柔軟に対応しますので、まずはお気軽にご相談ください。`,
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
