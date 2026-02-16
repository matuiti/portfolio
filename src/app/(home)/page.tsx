import { GallerySection } from "./components/GallerySection";
import { MainVisual } from "./components/MainVisual";
import { ServiceSection } from "./components/ServiceSection";
import { SkillsSection } from "./components/SkillsSection";
import { WorksSection } from "./components/WorksSection";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-white text-neutral-900">
      {/* 1. メインビジュアル：初期演出を含む */}
      <MainVisual />

      <div className="space-y-0">
        {/* 2. WORKS：データ共有・カテゴリスイッチング機能付き */}
        <section id="works" className="scroll-mt-20">
          <WorksSection />
        </section>

        {/* 3. GALLERY：準備中コンポーネントを配置予定 */}
        <section id="gallery" className="scroll-mt-20">
          <GallerySection />
        </section>

        {/* 4. SERVICE：メディアカードレイアウト */}
        <section id="service" className="scroll-mt-20">
          <ServiceSection />
        </section>

        {/* 5. SKILLS：ゲージ表示付きカードレイアウト */}
        <section id="skills" className="scroll-mt-20">
            <SkillsSection />
        </section>

        {/* 6. ABOUT：2カラム・プロフィール */}
        <section id="about" className="py-24 scroll-mt-20">
          <div className="container-center px-6">
            {/* <AboutSection /> */}
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-neutral-200 text-neutral-400 font-bold">
              ABOUT SECTION (COMING SOON)
            </div>
          </div>
        </section>

        {/* 7. BLOG：準備中コンポーネントを配置予定 */}
        <section id="blog" className="py-24 bg-neutral-50 scroll-mt-20">
          <div className="container-center px-6">
            {/* <BlogSection /> */}
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-neutral-200 text-neutral-400 font-bold">
              BLOG SECTION (COMING SOON)
            </div>
          </div>
        </section>

        {/* 8. CONTACT：フォームセクション */}
        <section id="contact" className="py-24 scroll-mt-20">
          <div className="container-center px-6">
            {/* <ContactSection /> */}
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-neutral-200 text-neutral-400 font-bold">
              CONTACT SECTION (COMING SOON)
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
