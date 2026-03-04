// src/data/works.ts
import { Work, WorkFilterCategory } from "@/types/work";

/**
 * WORKSセクション全体で使用する共通カテゴリ定義 (SSoT)
 */
export const WORK_CATEGORIES: { label: string; value: WorkFilterCategory }[] = [
  { label: "すべて", value: "all" },
  { label: "Web制作", value: "web" },
  { label: "WordPress", value: "wordpress" },
  { label: "アプリケーション", value: "app" },
  { label: "ゲーム", value: "game" },
  // { label: "実案件", value: "client" },
  // { label: "非公開", value: "nda" },
];

/**
 * 全制作実績データ
 * role, duration, disclosureLevel は必須入力。
 */
export const ALL_WORKS: Work[] = [
  {
    id: "w-cms-multi-theme",
    title: "CMSマルチテーマテンプレート開発 (4テーマ)",
    category: ["web"],
    tags: [
      "CMS",
      "HTML/CSS",
      "JavaScript",
      "SEO",
      "Sass",
      "Slack",
      "Swiper",
      "TailwindCSS",
      "figma",
      "アクセシビリティ",
      "レスポンシブデザイン",
      "実務",
      "秘密保持契約",
    ],
    thumbnail: "/assets/images/works/cms-template.jpg",
    images: [
      "/assets/images/common/bg-page-header.jpg",
      "/assets/images/common/comingsoon.jpg",
      "/assets/images/common/noimage.jpg",
    ],
    summary:
      "独自CMS向けの4テーマテンプレート開発。プロフェッショナルチームと連携し、高度なUI実装と保守性の高い設計を追求しました。",
    url: "https://multi-theme-template-set-for-review.vercel.app/",
    github: "https://github.com/matuiti/MultiThemeTemplateSet-forReview",
    background:
      "クライアント企業の独自CMS向けに、トップ・一覧・詳細の3ページ構成×4種類のデザインテーマを開発。GitHubの公開コードを評価いただき、概算見積から本見積、採用という流れで参画しました。企画・デザイン、フロントエンドエンジニア兼PMなど5名のプロフェッショナルチーム体制での開発です。",
    features: [
      // "HTML 6ファイル、CSS 12ファイル、JS 1ファイル、関連アセット一式の納品",
      "ブレイクポイントごとに細やかな制御を行うレスポンシブヘッダー",
      "多階層アコーディオンUIで情報量とコンパクト性を両立した大型モーダル検索メニュー",
      "スクロール追従型で検索・アカウント・人気記事等の拡張パネルを展開するボトムメニュー",
      "返信機能、本人判定UI、インタラクション（全文表示等）を備えたコメントエリア",
      "Swiperを用い、縦/横/全画面/複数型/自動スクロール/中央強調など多様なパターンを実装",
      "テーマ別スタイルに対応したサイドメニューや多機能カード（複数バリエーション）",
    ],
    points: [
      "ルートクラスによるテーマ切り替え機構と、Tailwindのユーティリティ×カスタムクラスの適切な使い分けによる高再利用性の実現",
      "SEO・アクセシビリティの徹底、プロジェクト専用フォーマット設定によるコード一貫性の確保、UI/UXに関する細部へのフィードバック対応",
      "レビュー用ポータルページの作成、引き継ぎ用ドキュメント（コードリーディング支援）作成、新規ブレイクポイント追加対応、CMS設定に応じたUI切り替え対応",
      "各分野のプロとの協働。迅速な課題解決と、互いのミスを補完し合う品質追求姿勢を共有",
      "プロジェクト後、EJSによるHTMLモジュール化やPlaywrightによるテストコード導入など、開発環境のリファクタリングを継続実施",
    ],
    role: "コーディング, 見積もり",
    duration: "3ヶ月",
    disclosureLevel: "NDA",
  },
  {
    id: "w-wp-original-theme",
    title: "WordPressオリジナルテーマ開発",
    category: ["wordpress"],
    tags: [
      "WordPress",
      "PHP",
      "HTML/CSS",
      "JavaScript",
      "XD",
      "レスポンシブデザイン",
      "自主制作",
    ],
    thumbnail: "/assets/images/works/wp-original.jpg",
    summary:
      "HTMLサイトのWordPress化に加え、管理運用面を意識した高度なカスタマイズを実装。",
    url: "https://animo-web-create.com/",
    background:
      "静的なHTMLサイトをWordPress化。デザイナーと密に連携し、サイト全体の構造を共有しながら、実用的なポートフォリオサイトを構築しました。",
    features: [
      "ブログ機能、カスタム投稿機能、お問い合わせフォームの実装",
      "管理者（運用者）向けに最適化したコンテンツ編集画面のカスタマイズ",
    ],
    points: [
      "実際に盛り込んだ機能や工夫ポイントを詳細な解説記事として公開しており、設計から実装までのプロセスを可視化しています。",
    ],
    role: "コーディング, 企画, 設計",
    duration: "長期",
    disclosureLevel: "Full",
  },
  {
    id: "w-wp-maintenance-hotels",
    title: "宿泊施設サイト 継続保守・修正（数十サイト）",
    category: ["wordpress"],
    tags: [
      "WordPress",
      "PHP",
      "HTML/CSS",
      "JavaScript",
      "楽天トラベル",
      "Chatwork",
      "実務",
      "秘密保持契約",
    ],
    thumbnail: "/assets/images/works/hotel-maintenance.jpg",
    summary:
      "ホテル・旅館等の宿泊施設サイトにおける、WordPressおよび楽天トラベルの運用保守。",
    background:
      "Web制作会社様よりの業務委託として、9ヶ月間にわたり継続的に参画。観光・宿泊施設に特化した高頻度の更新が求められる環境で業務を遂行しています。",
    features: [
      "テキスト、画像、リンク先の差し替え、バナー設置、通知パネルの新規作成",
      "イメージマップ編集（画像内に座標指定で複数リンクを埋め込み）",
      "WordPress（ブロックエディタ・カスタムフィールド）および楽天トラベルカスタマイズページの反映",
      "外国語ページの編集、リダイレクト設定、時間指定でのコンテンツ更新対応",
    ],
    points: [
      "タスク単位の「受取り→納品」を繰り返しつつ、複数の担当者と連携し、同時並行的かつスピーディーに進行するルーティンを構築。週5日の安定した稼働体制でクライアントをサポートしています。",
    ],
    role: "コーディング",
    duration: "9ヶ月（継続中）",
    disclosureLevel: "NDA",
  },
  {
    id: "w-ec-uiux-improvement",
    title: "ECサイト（Wagashi-biz）UI/UX・機能改善",
    category: ["web"],
    tags: ["B-Cart", "ECサイト", "HTML/CSS", "JavaScript", "UI/UX改善", "実務"],
    thumbnail: "/assets/images/works/wagashi-total.jpg",
    summary:
      "ECサイトにおけるユーザビリティ向上と、運用効率化のための継続的な改修・サポート。",
    url: "https://wagashi-biz.jp/",
    background:
      "B-Cartを利用したECサイトにおいて、コンテンツ増加に伴う課題解決や、広告効果・UX向上のための施策を継続的にご提案・実装しています。",
    features: [
      "タブメニューによるコンテンツとURLの動的切り替え、折りたたみ収納機能の実装",
      "PC/SPそれぞれに最適化した検索窓デザイン、ヘッダー（検索窓）のスクロール追従化",
      "サイドメニューの開閉状態制御、検索結果のタグ視認性向上",
      "モバイルメニューやログインUIの調整、既存の表への項目追加とバグ対応",
    ],
    points: [
      "1ヶ月に及ぶ密なヒアリングを通じた認識のすり合わせと、プロジェクト完遂の達成感を共有",
      "納品後、クライアント側で要素追加やメンテナンスができるよう、HTML/CSSの解説を含む詳細な手順書を作成し、属人化を防ぐ工夫を行いました。",
    ],
    role: "コーディング, ヒアリング, 技術サポート, 見積もり",
    duration: "継続的（案件により数日〜1ヶ月）",
    disclosureLevel: "Full",
  },
  {
    id: "w-recruit-team-dev",
    title: "企業採用サイト 下層ページ制作",
    category: ["wordpress"],
    tags: [
      "WordPress",
      "CMS",
      "Sass",
      "JavaScript",
      "Chatwork",
      "チーム開発",
      "実務",
      "秘密保持契約",
    ],
    thumbnail: "/assets/images/works/recruit-site.jpg",
    summary:
      "大規模プロジェクトへの途中参画。既存コードとの整合性を保ちながら複数ページを制作。",
    background:
      "既存プロジェクトへ途中から参画し、デザイナー、ディレクター、他のコーダーと連携しながら、新卒/中途採用募集要項、最新記事一覧/詳細、FAQページを担当しました。",
    features: [
      "プロジェクト開始前の入念なキャッチアップ（ディレクトリ構造、他メンバーの作業範囲、編集箇所の明確化）",
      "多職種・多重下請け環境での密なコミュニケーションによるコード納品",
    ],
    points: [
      "情報不足を先読みして他のコーダーへ積極的に相談し、大規模案件特有の手戻りを未然に防止",
      "既存のSass/CSS設計を読み解き、不要な影響を与えないよう慎重にスコープを管理して実装。確実な仕事が評価され、完遂直後に別件のご相談をいただきました。",
    ],
    role: "コーディング",
    duration: "2ヶ月",
    disclosureLevel: "NDA",
  },
  {
    id: "w-sample-bakery",
    title: "技術凝縮サンプルサイト（ベーカリー）",
    category: ["web"],
    tags: [
      "Sass",
      "JavaScript",
      "SEO",
      "figma",
      "アクセシビリティ",
      "自主制作",
    ],
    thumbnail: "/assets/images/works/sample-bakery.jpg",
    summary:
      "UX、アクセシビリティ、SEOのスキルを網羅。高品質なWebサイト制作へのこだわりを体現。",
    url: "https://sample-site-02.vercel.app/",
    github: "https://github.com/matuiti/sample-site-02",
    background:
      "自身のコーディングスキル（UX、ユーザビリティ、アクセシビリティ、SEO対策）を総合的に証明するために、Figmaのデザインをベースに自主制作しました。",
    features: [
      "セマンティックなマークアップによるSEO最適化",
      "スクリーンリーダーやキーボード操作を意識したアクセシビリティ配慮",
      "Figmaからの正確なデザイン再現とUIアニメーション",
    ],
    points: [
      "単なる見た目の再現ではなく、内部品質（コードの美しさと機能性）にこだわり、そのプロセスを詳細記事としてアウトプットしています。",
    ],
    role: "コーディング, デザイン, 企画, 設計",
    duration: "1ヶ月",
    disclosureLevel: "Full",
  },
  {
    id: "w-sample-udemy",
    title: "学習再現サンプルサイト（CodeMafia講座）",
    category: ["web"],
    tags: ["Sass", "JavaScript", "Swiper", "自主制作"],
    thumbnail: "/assets/images/works/sample-udemy.jpg",
    summary:
      "プロの技術・設計思想を深く理解し、自力で再現することに注力した学習プロジェクト。",
    url: "https://sample-site-01.vercel.app/",
    github: "https://github.com/matuiti/sample-site-01",
    background:
      "実務経験に加え、プロの設計思想を改めて体系的に学ぶため、元ソフトバンクエンジニアのUdemy講座内容を徹底的に学習。自力で再現できるよう反復作成を行いました。",
    features: [
      "Swiperを用いた高度なスライダー実装",
      "Sassによる保守性の高いスタイル設計の実践",
    ],
    points: [
      "「なぜこの設計にするのか」という意図を汲み取り、自身の血肉とすることに注力。制作を通じて得たスキルを解説記事としてまとめています。",
    ],
    role: "コーディング",
    duration: "1週間",
    disclosureLevel: "Full",
  },
];