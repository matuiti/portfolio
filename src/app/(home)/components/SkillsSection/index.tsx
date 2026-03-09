import { SectionTitle } from "@/components/ui/SectionTitle";
import { MainButton } from "@/components/ui/Buttons/MainButton";
import { SkillCard } from "./SkillCard";
import { HighlightSkillGroup } from "./types";
import styles from "./SkillsSection.module.scss";

// トップページ固有のハイライトデータ
const SKILLS_HIGHLIGHT: HighlightSkillGroup[] = [
  {
    title: "WEBサイト",
    items: [
      { name: "HTML", percentage: 95 },
      { name: "CSS / SASS", percentage: 95 },
      { name: "JavaScript", percentage: 90 },
      { name: "WordPress / PHP", percentage: 85 },
    ],
  },
  {
    title: "ライブラリ、フレームワーク",
    items: [
      { name: "TypeScript", percentage: 85 },
      { name: "Next.js / React", percentage: 85 },
      { name: "TailwindCSS", percentage: 85 },
      { name: "jQuery", percentage: 80 },
    ],
  },
  {
    title: "ツール",
    items: [
      { name: "Figma", percentage: 85 },
      { name: "Git / GitHub", percentage: 85 },
      { name: "生成AI", percentage: 85 },
      { name: "Slack / Chatwork", percentage: 80 },
    ],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="-scroll-mt-2">
      <div className="section-padding-y section-padding-x bg-light-gray">
        <div className="container-center">
          <div className={styles.sectionHead}>
            <SectionTitle
              enTitle="skills"
              jpTitle="スキル"
              variant="default"
              className="js-fuwa-fade"
            />
            <p className={`${styles.description} js-fuwa-fade`}>
              常に新しい技術の習得に取り組み、専門性を磨いて参ります。
            </p>
          </div>

          {/* カードグリッド */}
          <div className={`${styles.cardGrid} js-fuwa-fade`}>
            {SKILLS_HIGHLIGHT.map((group) => (
              <SkillCard key={group.title} group={group} />
            ))}
            {/* 右寄せの下線ボタン */}
            <div className={`${styles.buttonWrapper} js-fuwa-fade`}>
              <MainButton variant="underline" href="/skills">
                一覧を見る
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
