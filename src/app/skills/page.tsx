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
  const description = `実務で使用したものや、個人開発用に独学で学んだものもあります。
業務では主に〇〇を行ってきたので、〇〇が比較的強いです。
GitHubやUIギャラリーとして作成したサンプルをご覧いただけますので、参考にしてもらえれば幸いです。`;

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
