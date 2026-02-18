import { SectionTitle } from "@/components/ui/SectionTitle";
import { MainButton } from "@/components/ui/Buttons/MainButton";
import { SkillCard } from "./SkillCard";
import { HighlightSkillGroup } from "./types";
import styles from "./SkillsSection.module.scss";

// トップページ固有のハイライトデータ
const SKILLS_HIGHLIGHT: HighlightSkillGroup[] = [
  {
    title: "Coding",
    items: [
      { name: "HTML/CSS (Sass)", percentage: 95 },
      { name: "JavaScript", percentage: 90 },
      { name: "TypeScript", percentage: 80 },
      { name: "a", percentage: 80 },
      { name: "b", percentage: 80 },
      { name: "c", percentage: 80 },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "Next.js / React", percentage: 85 },
      { name: "WordPress", percentage: 90 },
      { name: "LongName LongName", percentage: 70 },
      { name: "Astro", percentage: 70 },
    ],
  },
  {
    title: "Design & Tools",
    items: [
      { name: "Figma", percentage: 80 },
      { name: "Git / GitHub", percentage: 85 },
      { name: "Adobe Creative Cloud", percentage: 60 },
    ],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="scroll-mt-20">
      <div className="section-padding-y section-padding-x bg-light-gray">
        <div className="container-center">
          <div className={styles.sectionHead}>
            <SectionTitle enTitle="skills" jpTitle="スキル" variant="default" />
            <p className={styles.description}>
              常に新しい技術の習得に取り組み、スキルアップを続けています。
            </p>
          </div>

          {/* カードグリッド */}
          <div className={styles.cardGrid}>
            {SKILLS_HIGHLIGHT.map((group) => (
              <SkillCard key={group.title} group={group} />
            ))}
          </div>

          {/* 右寄せの下線ボタン */}
          <div className={styles.buttonWrapper}>
            <MainButton variant="underline" href="/skills">
              一覧を見る
            </MainButton>
          </div>
        </div>
      </div>
    </section>
  );
};
