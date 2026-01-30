import { Button } from "@/components/ui/Button";
import { ContactSection } from "./components/ContactSection";

export default function Home() {
  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">Button Gallery</h1>

      <div className="flex flex-wrap gap-4">
        {/* 標準 */}
        <Button>プロジェクトを見る</Button>

        {/* サイズと色を変更 */}
        <Button intent="outline" size="lg">
          お問い合わせ
        </Button>

        {/* ゴーストボタン */}
        <Button intent="ghost" size="sm">
          キャンセル
        </Button>

        {/* 横幅いっぱい */}
        <Button intent="secondary" fullWidth={true}>
          もっと詳しく
        </Button>
      </div>

      <section id="contact" className="py-24 bg-slate-50/50">
        <ContactSection />
      </section>
    </div>
  );
}
