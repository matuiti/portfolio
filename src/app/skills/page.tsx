// src/app/skills/page.tsx
"use client";

import { useEffect } from "react";
import { ALL_SKILLS } from "@/data/skills";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import styles from "./Skills.module.scss";
import { SkillGroupSection } from "./components/SkillGroupSection";

export default function SkillsPage() {
  const PAGE_HEADER_IMAGE_PATH = "/assets/images/common/bg-page-header.jpg";
  const PAGE_HEADER_DATA = {
    jpTitle: "スキル",
    enTitle: "SKILLS",
    images: PAGE_HEADER_IMAGE_PATH,
    bgPath: `url(${PAGE_HEADER_IMAGE_PATH})`,
  } as const;

  const breadcrumbItems = [{ label: "トップ", href: "/" }, { label: "スキル" }];

  const description = `
0→1のテンプレート設計から大規模改修まで、既存コードを壊さず迅速に適応する自走力が強みです。

直近では企業独自CMSの構築にて、デザイナー・エンジニアと密に連携し4テーマを同時完遂しました。
リモート環境でも仕様の行間を読み解き、保守性の高いコードで貴社の制作ラインを支える即戦力として貢献します。
`.trim();

  /**
   * 1. ページ遷移時のスクロール位置補正
   * コンポーネントがブラウザに読み込まれた瞬間、
   * 前のページのスクロール位置が残っている場合を考慮し、
   * 強制的に最上部 (y=0) へスクロールさせます。
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeader
        enTitle={PAGE_HEADER_DATA.enTitle}
        jpTitle={PAGE_HEADER_DATA.jpTitle}
        bgImage={PAGE_HEADER_DATA.images}
      />

      <div className="section-padding-x w-full bg-white">
        <div className="container-center">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* コンテンツ本体 */}
      <div className={`${styles.pageBody} section-padding-x`}>
        <div className="container-center">
          <p className={styles.description}>{description}</p>
          <div className={styles.skillGroups}>
            {/* index を渡すことで、子コンポーネント側が
                「初回訪問時に自分（一番上）を開くべきか」を判断できるようにします
            */}
            {ALL_SKILLS.map((group, index) => (
              <SkillGroupSection
                key={group.title}
                group={group}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
