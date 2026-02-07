"use client";

import Link from "next/link";
import { useWorkFilter } from "@/app/works/lib/hooks/useWorkFilter";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { button as buttonStyle } from "@/components/ui/Button";
import { WorkFilterCategory } from "@/types/work";
import { WorkCard } from "@/app/works/components/WorkCard"; // 共通化したカードをインポート

export const WorksSection = () => {
  /**
   * トップページ用：3件制限をかけてフックを呼び出し
   * 内部で currentPage 等も管理されますが、トップでは主に paginatedWorks (最初の3件) を使用します。
   */
  const { paginatedWorks, selectedCategory, toggleCategory } = useWorkFilter(3);

  // カテゴリ定義（仕様書に基づき定義）
  const categories: { label: string; value: WorkFilterCategory }[] = [
    { label: "Web制作", value: "web" },
    { label: "アプリケーション", value: "app" },
    { label: "ゲーム", value: "game" },
    { label: "すべて", value: "all" },
  ];

  return (
    <section className="py-20 container mx-auto px-6">
      <SectionTitle title="WORKS" />

      {/* フィルタボタン：共通のトーンに合わせたスタイリング */}
      <div className="flex flex-wrap gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => toggleCategory(cat.value)}
            className={`px-6 py-2 rounded-full border text-sm font-bold transition-all duration-300 ${
              selectedCategory === cat.value
                ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* カードグリッド：共通の WorkCard を使用して整合性を確保 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {paginatedWorks.map((work) => (
          <WorkCard
            key={work.id}
            work={work}
            // トップページではクリック時に詳細ページ（/works）へ遷移させるか、
            // 必要に応じて詳細モーダルを開くロジックをここに追加できます。
            onClick={() => {
              // 例: 詳細ページへ遷移させる場合
              // window.location.href = `/works?id=${work.id}`;
            }}
          />
        ))}

        {/* フィルタ結果が0件の場合のフォールバック */}
        {paginatedWorks.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400 font-bold">
            該当する実績がありません。
          </div>
        )}
      </div>

      {/* 下部アクション：一覧ページへのリンク */}
      <div className="text-center">
        <Link
          href="/works"
          className={buttonStyle({ size: "long", intent: "outline" })}
        >
          すべての実績を見る
        </Link>
      </div>
    </section>
  );
};
