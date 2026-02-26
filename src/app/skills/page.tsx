// src/app/skills/page.tsx
"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  FileCode,
} from "lucide-react";
import { SkillGroup, SkillLink, SkillLevelValue } from "@/types/skill";
import { ALL_SKILLS } from "@/data/skills";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";

// --- ヘルパー: カテゴリー/タグの自動判別リンク生成 ---
const getProjectLink = (itemName: string) => {
  // WORKS側で定義されている有効なカテゴリー値 [cite: 79]
  const WORK_CATEGORIES = ["web", "wordpress", "app", "game"];
  const name = itemName.toLowerCase();

  // 1. カテゴリー名と一致する場合 (例: WordPress, Web)
  if (WORK_CATEGORIES.includes(name)) {
    return `/works?category=${name}`;
  }

  // 2. それ以外は「タグ」として扱う (例: Next.js, React)
  // 検索キーワード(q)ではなくタグパラメータにすることで、WORKS側のUIでタグが選択状態になります
  return `/works?tags=${encodeURIComponent(itemName)}`;
};

// --- ゲージ表示コンポーネント ---
const LevelBar = ({
  level,
  label,
}: {
  level: SkillLevelValue;
  label: string;
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex">
      {[1 - 5].map((s) => (
        <div
          key={s}
          className={`w-3.5 h-3 md:w-4 md:h-3.5 border-r border-y border-slate-900 ${
            s <= level ? "bg-slate-900" : "bg-transparent"
          } ${s === 1 ? "border-l" : ""}`}
        />
      ))}
    </div>
    <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">
      {label}
    </span>
  </div>
);

// --- リンクアイコン判定 ---
const LinkIcon = ({ type }: { type: SkillLink["type"] }) => {
  if (type === "github") return <Github size={12} />;
  if (type === "project") return <FileCode size={12} />;
  return <ExternalLink size={12} />;
};

export default function SkillsPage() {
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(ALL_SKILLS.map((g) => [g.id, true])),
  );

  const PAGE_HEADER_IMAGE_PATH = "/assets/images/common/bg-page-header.jpg";
  const PAGE_HEADER_DATA = {
    jpTitle: "スキル",
    enTitle: "SKILLS",
    images: PAGE_HEADER_IMAGE_PATH,
    bgPath: `url(${PAGE_HEADER_IMAGE_PATH})`,
  } as const;

  const breadcrumbItems = [{ label: "トップ", href: "/" }, { label: "スキル" }];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* ページヘッダー */}
        <PageHeader
          enTitle={PAGE_HEADER_DATA.enTitle}
          jpTitle={PAGE_HEADER_DATA.jpTitle}
          bgImage={PAGE_HEADER_DATA.images}
        />
        {/* パンくずリスト */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Skill Groups */}
        {ALL_SKILLS.map((group: SkillGroup) => (
          <div key={group.id} className="mb-12">
            <button
              onClick={() =>
                setOpenGroups((p) => ({ ...p, [group.id]: !p[group.id] }))
              }
              className="w-full flex items-center justify-between bg-slate-900 text-white px-6 py-3 mb-8 group hover:scale-[1.005] transition-transform"
            >
              <span className="text-xs font-black tracking-widest uppercase">
                SECTION_{group.id.toUpperCase()}
                {group.title}
              </span>
              {openGroups[group.id] ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            <div
              className={`transition-all duration-500 ${
                openGroups[group.id]
                  ? "opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {group.categories.map((cat, idx) => (
                <div key={idx} className="mb-12">
                  <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-slate-900"></span>
                    {cat.label}
                  </h3>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto mb-8">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-slate-900 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <th className="py-4 text-left w-[25%]">
                            Technical_Item
                          </th>
                          <th className="py-4 text-left w-[20%]">Grade</th>
                          <th className="py-4 text-left">
                            Description & Evidence
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {cat.items.map((item) => (
                          <tr
                            key={item.name}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="py-6 align-top">
                              <div className="font-black text-slate-900">
                                {item.name}
                              </div>
                              <div className="text-[10px] text-slate-400 mt-1 font-bold">
                                {item.experience}
                              </div>
                            </td>
                            <td className="py-6 align-top">
                              <LevelBar
                                level={item.level as SkillLevelValue}
                                label={item.label}
                              />
                            </td>
                            <td className="py-6 align-top">
                              <p className="text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                                {item.description}
                              </p>
                              {/* 動的リンク表示 [cite: 252] */}
                              {item.links && item.links.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {item.links.map((link, lIdx) => (
                                    <a
                                      key={lIdx}
                                      href={
                                        link.type === "project"
                                          ? getProjectLink(item.name) // 修正ポイント
                                          : link.url
                                      }
                                      target={
                                        link.type === "github"
                                          ? "_blank"
                                          : "_self"
                                      }
                                      rel="noreferrer"
                                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-900 text-[9px] font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all uppercase tracking-tighter shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-px active:translate-y-px active:shadow-none"
                                    >
                                      <LinkIcon type={link.type} />
                                      {link.label}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-6">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-6 bg-white border border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-black text-slate-900 text-lg">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-bold tracking-tight">
                              {item.experience}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-black text-slate-900 uppercase">
                              {item.label}
                            </div>
                          </div>
                        </div>
                        <LevelBar
                          level={item.level as SkillLevelValue}
                          label=""
                        />
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {item.description}
                        </p>
                        {item.links && item.links.length > 0 && (
                          <div className="flex flex-col gap-2 pt-2">
                            {item.links.map((link, lIdx) => (
                              <a
                                key={lIdx}
                                href={
                                  link.type === "project"
                                    ? getProjectLink(item.name) // 修正ポイント
                                    : link.url
                                }
                                target={
                                  link.type === "github" ? "_blank" : "_self"
                                }
                                rel="noreferrer"
                                className="flex items-center gap-2 px-3 py-2 border border-slate-900 text-[9px] font-black uppercase tracking-tighter bg-white shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:shadow-none active:translate-x-px active:translate-y-px"
                              >
                                <LinkIcon type={link.type} />
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer info */}
        <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <div>Certified_Spec_Inventory_v4.2</div>
          <div className="flex gap-6">
            <span className="text-blue-600">Verified_Link_Active</span>
            <span>Precision_Ref: CODE_V4.2_LINKED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
