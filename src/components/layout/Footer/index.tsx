// src/components/layout/Footer/index.tsx
import Link from "next/link";
import { Github, Lock } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { NAV_ITEMS } from "@/data/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* 1. サイト情報 */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-xl font-bold text-slate-900">
              {siteConfig.name}
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              {siteConfig.description}
            </p>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-slate-900 w-fit"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          {/* 2. メニュー（ここで1つずつ確実に判定） */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">
              Sitemap
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="list-none">
                  {/* 公開フラグが明示的に false の場合のみ「未公開スタイル」 */}
                  {item.isPublished === false ? (
                    <div className="flex items-center gap-2 text-slate-300 select-none">
                      <Lock className="h-3 w-3 shrink-0" />
                      <span className="text-sm line-through decoration-slate-200">
                        {item.label}
                      </span>
                      <span className="text-[8px] bg-slate-200 text-slate-500 px-1 rounded-sm font-bold uppercase tracking-tighter">
                        Soon
                      </span>
                    </div>
                  ) : (
                    /* それ以外（true または 省略時）はすべて「公開リンク」 */
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors group"
                    >
                      <span className="h-1 w-1 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 flex justify-between items-center text-[11px] text-slate-400">
          <p>
            &copy; {currentYear} {siteConfig.author || siteConfig.name}
          </p>
          <p>Built with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
