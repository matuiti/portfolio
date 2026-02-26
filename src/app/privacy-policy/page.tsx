// src/app/privacy-policy/page.tsx
import React from "react";
import styles from "./PrivacyPolicy.module.scss";
import { MainButton } from "@/components/ui/Buttons/MainButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

/**
 * プライバシーポリシーページ
 *
 * 当プロジェクトの技術スタック（Resend, Cloudflare Turnstile等）に
 * 基づいた透明性の高い安全管理措置を明文化しています。
 */
export default function PrivacyPolicyPage() {
  const PAGE_HEADER_IMAGE_PATH = "/assets/images/common/bg-page-header.jpg";
  const PAGE_HEADER_DATA = {
    jpTitle: "プライバシーポリシー",
    enTitle: "PRIVACY POLICY",
    images: PAGE_HEADER_IMAGE_PATH,
    bgPath: `url(${PAGE_HEADER_IMAGE_PATH})`,
  } as const;

  const breadcrumbItems = [
    { label: "トップ", href: "/" },
    { label: "プライバシーポリシー" },
  ];

  return (
    <article className="section-padding-x section-padding-y">
      <div className="container-center">
        <div className={styles.inner}>

          {/* ページヘッダー */}
          <PageHeader
            enTitle={PAGE_HEADER_DATA.enTitle}
            jpTitle={PAGE_HEADER_DATA.jpTitle}
            bgImage={PAGE_HEADER_DATA.images}
          />
          {/* パンくずリスト */}
          <Breadcrumbs items={breadcrumbItems} />

          <div className={styles.content}>
            <section className={styles.section}>
              <h2 className={styles.heading}>1. 個人情報の収集と利用目的</h2>
              <p className={styles.text}>
                当サイト（以下、「本サイト」）では、お問い合わせフォームを通じて、お名前、メールアドレス、件名、メッセージ内容等の個人情報を収集します。
                収集した個人情報は、以下の目的でのみ利用し、これらの目的以外で利用することはありません。
              </p>
              <ul className={styles.list}>
                <li>
                  お問い合わせに対する回答や、必要な情報を電子メール等でご連絡するため
                </li>
                <li>
                  本サイトのサービス向上を目的とした統計データの分析（個人を特定できない形式）
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.heading}>
                2. 外部サービスの利用とデータ転送について
              </h2>
              <p className={styles.text}>
                本サイトでは、お問い合わせ機能の信頼性とセキュリティを担保するため、以下の外部サービスを利用しています。
              </p>
              <ul className={styles.list}>
                <li>
                  <strong>メール配信エンジン (Resend)</strong>:
                  お問い合わせ内容の確実な到達と管理のため、Resendのインフラを利用してメールを送信します。
                </li>
                <li>
                  <strong>スパム対策 (Cloudflare Turnstile)</strong>:
                  悪意のあるボットやスパムからサイトを保護するため、Cloudflare社のManaged検証システムを導入しています。この際、セキュリティ維持の目的でデバイス情報等のデータが収集される場合があります。
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.heading}>3. 個人情報の安全管理措置</h2>
              <p className={styles.text}>
                本サイトでは、収集した個人情報の漏洩、滅失、または毀損を防止するため、以下の技術的対策を講じています。
              </p>
              <ul className={styles.list}>
                <li>
                  <strong>通信の暗号化</strong>:
                  SSL/TLSを用いた暗号化通信により、第三者によるデータの盗聴を防ぎます。
                </li>
                <li>
                  <strong>多層防御の実装</strong>: サーバーサイド（Next.js
                  Server
                  Actions）およびフロントエンドの両面で厳格なバリデーション（Zodスキーマ）を実施し、不正なデータの混入を防止しています。
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.heading}>4. 個人情報の第三者への開示</h2>
              <p className={styles.text}>
                本サイトでは、個人情報を適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
              </p>
              <ul className={styles.list}>
                <li>本人の同意がある場合</li>
                <li>法令に基づき開示が必要となる場合</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.heading}>5. 免責事項</h2>
              <p className={styles.text}>
                本サイトからのリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について、本サイトおよび管理者は一切の責任を負いません。
                また、本サイトで紹介している制作実績（WORKS）の中には、守秘義務（NDA）に基づき情報を一部抽象化しているものがあります。
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.heading}>6. プライバシーポリシーの変更</h2>
              <p className={styles.text}>
                本サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。修正された最新のプライバシーポリシーは、常に本ページにて開示されます。
              </p>
            </section>

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
