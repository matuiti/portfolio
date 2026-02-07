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

// --- ゲージ表示コンポーネント ---
const LevelBar = ({
  level,
  label,
}: {
  level: SkillLevelValue;
  label: string;
}) => (
  <div className="flex items-center gap-4">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((s) => (
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

  return (
    <div className="container bg-slate-50 min-h-screen">
      <header className="mb-16">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
          Tech_Stack_Verified_2025
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
          Proof of
          <br />
          Capability.
        </h1>
        <p className="max-w-xl text-sm text-slate-600 leading-relaxed font-medium">
          実務における技術的習熟度と、それを証明するエビデンスのカタログ。
          <br />
          エンジニアリング品質を「透明化」するための仕様書です。
        </p>
      </header>

      <div className="space-y-12">
        {ALL_SKILLS.map((group: SkillGroup) => (
          <section key={group.id} className="border-t-2 border-slate-900 pt-8">
            <button
              onClick={() =>
                setOpenGroups((p) => ({ ...p, [group.id]: !p[group.id] }))
              }
              className="w-full flex items-center justify-between bg-slate-900 text-white px-6 py-3 mb-8 group hover:scale-[1.005] transition-transform"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-black opacity-50">
                  SECTION_{group.id.toUpperCase()}
                </span>
                <h2 className="text-sm font-black uppercase tracking-widest">
                  {group.title}
                </h2>
              </div>
              {openGroups[group.id] ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            <div
              className={`transition-all duration-500 ${openGroups[group.id] ? "opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
            >
              {group.categories.map((cat, idx) => (
                <div key={idx} className="mb-12">
                  <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 px-1">
                    {cat.label}
                  </h3>

                  {/* Desktop Table [cite: 91, 92] */}
                  <div className="hidden md:block overflow-hidden border border-slate-900 bg-white">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-900">
                          <th className="p-4 text-[10px] font-black uppercase tracking-widest w-1/4">
                            Technical_Item
                          </th>
                          <th className="p-4 text-[10px] font-black uppercase tracking-widest w-1/4">
                            Grade
                          </th>
                          <th className="p-4 text-[10px] font-black uppercase tracking-widest">
                            Description & Evidence
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {cat.items.map((item) => (
                          <tr
                            key={item.name}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="p-5 align-top">
                              <div className="font-black text-slate-900">
                                {item.name}
                              </div>
                              <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase">
                                {item.experience}
                              </div>
                            </td>
                            <td className="p-5 align-top">
                              <LevelBar
                                level={item.level as SkillLevelValue}
                                label={item.label}
                              />
                            </td>
                            <td className="p-5 align-top">
                              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                {item.description}
                              </p>

                              {/* 動的リンク表示 [cite: 92] */}
                              {item.links && item.links.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {item.links.map((link, lIdx) => (
                                    <a
                                      key={lIdx}
                                      href={
                                        link.type === "project"
                                          ? `/works?category=all&q=${encodeURIComponent(item.name)}`
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

                  {/* Mobile Cards (350px対応) [cite: 92, 93] */}
                  <div className="md:hidden space-y-4">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="p-6 bg-white border border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-black text-slate-900">
                              {item.name}
                            </div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                              {item.experience}
                            </div>
                          </div>
                          <div className="text-[10px] font-black text-blue-600 uppercase border-b border-blue-600">
                            {item.label}
                          </div>
                        </div>
                        <LevelBar
                          level={item.level as SkillLevelValue}
                          label=""
                        />
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.description}
                        </p>

                        {item.links && item.links.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-2">
                            {item.links.map((link, lIdx) => (
                              <a
                                key={lIdx}
                                href={
                                  link.type === "project"
                                    ? `/works?category=all&q=${encodeURIComponent(item.name)}`
                                    : link.url
                                }
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
          </section>
        ))}
      </div>

      <footer className="mt-20 pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <div>Certified_Spec_Inventory_v4.2</div>
        <div className="flex items-center gap-4">
          <span>Verified_Link_Active</span>
          <span className="text-slate-900">
            Precision_Ref: CODE_V4.2_LINKED
          </span>
        </div>
      </footer>
    </div>
  );
}
