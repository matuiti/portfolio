import { ContactForm } from "@/home/components/ContactSection/ContactForm";

export const ContactSection = () => {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* セクションの見出し */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Contact
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-12 bg-blue-600 rounded-full" />
          </div>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            制作のご依頼やご相談など、お気軽にお問い合わせください。
            通常2〜3営業日以内にご返信いたします。
          </p>
        </div>

        {/* フォームの配置 */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
