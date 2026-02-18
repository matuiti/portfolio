// src/app/privacy-policy/page.tsx
import React from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import styles from "./PrivacyPolicy.module.scss";
import { MainButton } from "@/components/ui/Buttons/MainButton";

/**
 * プライバシーポリシーページ
 * プロジェクト規約に基づき、PageLayoutで包み、rem換算でスタイリングします。
 */
export default function PrivacyPolicyPage() {
  return (
    <article className="section-padding-x section-padding-y">
      <div className="container-center">
        <div className={styles.inner}>
          {/* セクションタイトル: 下線付きのレスポンシブサイズ [7, 8] */}
          <SectionTitle
            enTitle="Privacy Policy"
            jpTitle="プライバシーポリシー"
            variant="underlined"
            className={styles.title}
          />

          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.heading}>1. 個人情報の収集について</h2>
              <p className={styles.text}>
                当サイト（以下、「本サイト」）では、お問い合わせフォームを通じて、お名前、メールアドレス等の個人情報を収集する場合があります
                [9,
                10]。これらの情報は、お問い合わせへの回答や必要な情報を電子メール等でご連絡する場合にのみ利用し、目的以外では利用いたしません。
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.heading}>2. スパム対策について</h2>
              <p className={styles.text}>
                本サイトでは、スパム対策として Cloudflare Turnstile
                を導入しています [9,
                11]。このサービスに関連して収集されるデータは、セキュリティ維持の目的でのみ使用されます。
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.heading}>
                3. 個人情報の第三者への開示について
              </h2>
              <p className={styles.text}>
                本サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
              </p>
              <ul className={styles.list}>
                <li>本人のご了解がある場合</li>
                <li>法令等への協力のため、開示が必要となる場合</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.heading}>4. 免責事項</h2>
              <p className={styles.text}>
                本サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
              </p>
            </section>

            {/* --- 追加：戻るボタンエリア --- */}
            <div className={styles.buttonWrapper}>
              <MainButton variant="underline" href="/#contact">
                トップページに戻る
              </MainButton>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
