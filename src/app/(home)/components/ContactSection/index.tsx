import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/home/components/ContactSection/ContactForm";
import styles from "./ContactSection.module.scss";

export const ContactSection = () => {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="section-padding-y section-padding-x bg-white">
        <div className="container-center">
          <div className={styles.sectionHead}>
            <SectionTitle
              enTitle="contact"
              jpTitle="お問い合わせ"
              variant="center"
              size="large"
            />
            <p className={styles.description}>
              <span>ご質問やご相談がございましたら、</span>
              <span>お気軽にお問い合わせください。</span>
            </p>
          </div>
          <div className={styles.formContainer}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
