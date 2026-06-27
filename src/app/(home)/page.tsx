import { ScrollReveal } from './scrollReveal';
import { MainVisual } from './components/MainVisual';
import { WorksSection } from './components/WorksSection';
import { GallerySection } from './components/GallerySection';
import { ServiceSection } from './components/ServiceSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';

export default function Home() {
  return (
    <div className='w-full overflow-hidden'>
      {/* スクロール位置検知アニメーション制御 */}
      <ScrollReveal />
      {/* 1. MV：初期演出を含む */}
      <MainVisual />
      <div className='space-y-0'>
        {/* 2. WORKS：データ共有・カテゴリスイッチング機能付き */}
        <WorksSection />
        {/* 3. GALLERY：（準備中コンポーネントを配置） */}
        <GallerySection />
        {/* 4. SERVICE：メディアカードレイアウト */}
        <ServiceSection />
        {/* 5. SKILLS：ゲージ表示付きカードレイアウト */}
        <SkillsSection />
        {/* 6. ABOUT：2カラム・プロフィール */}
        <AboutSection />
        {/* 7. CONTACT：フォームセクション */}
        <ContactSection />
      </div>
    </div>
  );
}
