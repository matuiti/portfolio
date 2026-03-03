// src/app/skills/page.tsx
"use client";

import { useState } from "react";
import { ALL_SKILLS } from "@/data/skills";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import styles from "./Skills.module.scss";
import { SkillGroupSection } from "./components/SkillGroupSection";

export default function SkillsPage() {
  // 初期表示は index === 0（最初の要素）のみアコーディオンを展開
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(ALL_SKILLS.map((g, index) => [g.title, index === 0])),
  );

  const PAGE_HEADER_IMAGE_PATH = "/assets/images/common/bg-page-header.jpg";
  const PAGE_HEADER_DATA = {
    jpTitle: "スキル",
    enTitle: "SKILLS",
    images: PAGE_HEADER_IMAGE_PATH,
    bgPath: `url(${PAGE_HEADER_IMAGE_PATH})`,
  } as const;

  const breadcrumbItems = [{ label: "トップ", href: "/" }, { label: "スキル" }];
  // src/app/skills/page.tsx 内の description 変数を以下に差し替えます

  const description = `
0→1のテンプレート設計から大規模改修まで、既存コードを壊さず迅速に適応する自走力が強みです。

直近では企業独自CMSの構築にて、デザイナー・エンジニアと密に連携し4テーマを同時完遂しました。
リモート環境でも仕様の行間を読み解き、保守性の高いコードで貴社の制作ラインを支える即戦力として貢献します。
`.trim();

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
            {ALL_SKILLS.map((group) => (
              <SkillGroupSection
                key={group.title}
                group={group}
                isOpen={openGroups[group.title]}
                onToggle={() =>
                  setOpenGroups((p) => ({
                    ...p,
                    [group.title]: !p[group.title],
                  }))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
