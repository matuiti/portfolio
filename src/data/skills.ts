// src/data/skills.ts
import { SkillGroup } from "@/types/skill";

/**
 * SKILLSページ用データ定義 (Single Source of Truth)
 *
 * 習熟度（label）の定義:
 * - 精通: 指導や設計レベルで深く理解しており、複雑な実装を完遂できる
 * - 実務レベル: 業務において独力で実装・トラブルシューティングが可能
 * - 基礎: 基本的な仕様を理解しており、補助があれば実務対応が可能
 */
export const ALL_SKILLS: SkillGroup[] = [
  {
    title: "サイト制作・運用",
    items: [
      {
        name: "Webサイトのスクラッチ制作",
        label: "精通",
        description:
          "スクラッチ制作（WEBサイトを1から作る）では、デザインを忠実に再現するだけでなく、サイトの拡張や修正のような将来の変更に強いコード作成を心がけています。",
        links: [
          {
            type: "project",
            url: `/works?q=${encodeURIComponent("スクラッチ")}`,
            name: "スクラッチ",
          },
        ],
      },
      {
        name: "Webサイトの修正・保守",
        label: "精通",
        description:
          "長期プロジェクトで毎日ひたすら修正業務をこなしていた期間があり慣れております。チャットベースでのチームワーク連携力、迅速な対応力、デザイン無しで見栄え（レスポンシブ込み）を調整する力、膨大なデータや案件を管理する能力を磨きました。",
        links: [
          {
            type: "project",
            url: `/works?q=${encodeURIComponent("修正")}`,
            name: "修正",
          },
        ],
      },
      {
        name: "WordPressサイト構築",
        label: "実務レベル",
        description:
          "オリジナルテーマの作成から、プラグインのカスタマイズ、既存テーマの修正・改修まで幅広く対応。プラグインを用いた問い合わせフォームのセッティングから、PHPを用いた動的なコンテンツ出力やカスタム投稿タイプの設計なども可能です。",
        links: [
          {
            type: "project",
            url: "/works?category=wordpress",
            name: "WordPress",
          },
        ],
      },
      {
        name: "SEO",
        label: "実務レベル",
        description: "内部SEOを意識した適切な構造化データの実装。",
        links: [
          { type: "project", url: `/works?q=${encodeURIComponent("SEO")}` },
        ],
      },
      {
        name: "アクセシビリティ",
        label: "実務レベル",
        description:
          "WCAG 2.1準拠を目指したアクセシビリティ対応を重視。スクリーンリーダーでの読み上げ考慮やキーボードナビゲーションなど、すべてのユーザーに配慮した品質管理を実践します。",
        links: [
          {
            type: "project",
            url: `/works?q=${encodeURIComponent("アクセシビリティ")}`,
          },
        ],
      },
      {
        name: "Figma",
        label: "実務レベル",
        description:
          "Figmaのデザイン情報から意図やデータを汲み取り、実装に落とし込む能力。また、コメントのような機能を活用することで認識のズレの排除やメンバーとのプロジェクト進行をスムーズ化できるよう心がけます。",
      },
      {
        name: "楽天トラベルサイト",
        label: "精通",
        description:
          "楽天トラベルのプラットフォームを通したWEBサイトのUIコーディング・保守。ページ単位の新規作成、コンテンツ単位の修正、新規追加、バグ改善など。プラットフォーム独自の仕様に準拠。",
        links: [
          {
            type: "project",
            url: `/works?tags=${encodeURIComponent("EC")}`,
            name: "楽天トラベル",
          },
        ],
      },
      {
        name: "B-Cartサイト",
        label: "精通",
        description:
          "B-Cartプラットフォームを通して通販サイト内のUIをコード編集。コンテンツの修正、新規追加、バグ改善、機能追加、機能改修、ページリニューアルを経験。プラットフォーム独自の仕様に準拠。",
        links: [
          {
            type: "project",
            url: `/works?q=${encodeURIComponent("B-Cart")}`,
            name: "B-Cart",
          },
        ],
      },
    ],
  },

  {
    title: "言語・フロントエンド",
    items: [
      {
        name: "HTML",
        label: "精通",
        description:
          "適切なマークアップ（HTML記述）で、クライアントサイトやサービスへの認知集客や、ユーザー体験の向上（アクセシビリティの配慮やサイトパフォーマンス強化）を目指すことが可能です。",
        links: [{ type: "project", url: "/works?tags=CSS" }],
      },
      {
        name: "CSS（SCSS）",
        label: "精通",
        description:
          "納品スピード・手入れのしやすさ・ページの読み込み速度・見栄えのうち何を重視するかや、バランスをとりたいなど、ご相談をもとに柔軟なスタイリング（CSS記述）対応が可能です。お任せでも問題ございません。その際はこれまでの経験と調査をもとに適切に業務を遂行いたします。",
        links: [{ type: "project", url: "/works?tags=CSS" }],
      },
      {
        name: "JavaScript",
        label: "精通",
        description:
          "一般的なWEBサイト制作でよく必要になる技術（DOM操作）に加え、サイトやサービスの雰囲気や体験が豊かになるような高度なアニメーション制御も可能です。制作の規模に応じてコードを分割管理（モジュール化）するなどもできます。ちなみに、WEBサイト（実務）以外では、ゲームやアプリケーションを個人制作する時にも愛用する言語です。",
        links: [{ type: "project", url: "/works?tags=JavaScript" }],
      },
      {
        name: "PHP（WordPress）",
        label: "実務レベル",
        description:
          "基本的なWordPress開発で必要な技術経験を一通り抑えてます。例えば、ブログ記事のデータをデータベースから動的に取得、加工、出力することやカスタム投稿タイプの追加・編集等。※PHP自体はバックエンド言語ですが、PHPの使用経験がWordPress開発の範囲だったのでこちらに記します。",
      },
      {
        name: "HTML5 Canvas",
        label: "基礎",
        description: "ブラウザゲームの個人制作で何度かお世話になったAPIです。",
        links: [{ type: "project", url: "/works?q=canvas" }],
      },
    ],
  },
  {
    title: "フレームワーク・ライブラリ",
    items: [
      {
        name: "TailwindCSS",
        label: "実務レベル",
        description:
          "本ポートフォリオサイト（v4~）や、CMSテンプレート開発案件(v3~)でVue.jsエンジニアに引き継ぐ前提でソースコード制作する際に使用しました。普段も個人利用しています。",
        links: [{ type: "project", url: "/works?tags=CSS" }],
      },
      {
        name: "jQuery",
        label: "実務レベル",
        description:
          "既存サイトのコード編集や機能追加など基本的なことは一通りできます。使用頻度が少ないので調べつつの実装になりがちなスキルです。",
      },
      {
        name: "TypeScript",
        label: "実務レベル",
        description:
          "本ポートフォリオサイトで採用。他には過去のJavaScriptプロジェクトをTypeScript化してみたり、メモアプリの個人開発時に採用したりして経験を積んでいます。",
        links: [
          { type: "project", url: "/works?tag=TypeScript" },
          { type: "github", url: "https://github.com/your-id/portfolio" },
        ],
      },
      {
        name: "Next.js",
        label: "実務レベル",
        description:
          "本ポートフォリオサイトで採用。選んだ理由は、サイトのパフォーマンス最適化や開発体験の向上・一部バックエンド領域の実装が簡単にできるなどメリットが多かったからです。",
        links: [
          { type: "project", url: "/works?tag=TypeScript" },
          { type: "github", url: "https://github.com/your-id/portfolio" },
        ],
      },
      {
        name: "React",
        label: "基礎",
        description:
          "本ポートフォリオサイトで採用。本サイトはNext.jsとしての利用ですが、素のReact経験は個人開発アプリケーションで複数回あります。",
        links: [
          { type: "project", url: "/works?tag=React" },
          { type: "github", url: "https://github.com/your-id/portfolio" },
        ],
      },
    ],
  },
  {
    title: "開発の補助・環境",
    items: [
      {
        name: "Vite",
        label: "実務レベル",
        description:
          "高速な開発環境の構築とビルドプロセスの最適化を狙ってよく使用します。",
      },
      {
        name: "Webpack / Gulp",
        label: "基礎",
        description:
          "モダンなビルドツールやタスクランナーの中で起きていることを少しでもイメージしたいと考え、初学者の頃にUdemy講座を受講してみたり、個人プロジェクトで採用しました。",
      },
      {
        name: "Git / GitHub",
        label: "実務レベル",
        description:
          "個人用途でほぼ100%の採用率です。バックアップやブランチをタスクごとに切り替えて実験が気楽にできること、履歴チェックが容易なことなどが便利で愛用中です。",
      },
      {
        name: "Node.js",
        label: "基礎",
        description:
          "基本的な採用目的はフロントエンド開発をパッケージ管理システムを使い快適化することです。ビルドツールやランタイム環境として使っています。バックエンド領域の理解を深めるために使用することもあります。",
      },
    ],
  },
  {
    title: "ツール・AI",
    items: [
      {
        name: "生成AI",
        label: "実務レベル",
        description:
          "Gemini、ChatGPT、Claudeなどを状況に応じて選定・あるいは利用しないという判断も。用途は多岐にわたり、コードやドキュメントのたたき台を生成。または、設計前の情報整理やリファクタリングアイデアの磨き上げなど。プロジェクト全体の一貫性や整合性のチェックなど。",
      },
      {
        name: "Visual Studio Code",
        label: "精通",
        description:
          "生産性を最大化するための拡張機能の選定や、プロジェクトごとの設定共有（.vscode/settings.json）を徹底。効率的かつミスの少ないコーディング環境を構築・維持します。",
      },
      {
        name: "Slack / Chatwork",
        label: "実務レベル",
        description:
          "プロジェクトの方針に合わせて報連相の頻度や内容・手段の使い分けも配慮（テキストでの伝達が難しいものはビデオ通話を利用するなど）。基本はドキュメントベースの円滑なコミュニケーションを重視。リモート環境下においても、チームの生産性を阻害しない迅速かつ不安にさせないレスポンスを心がけています。",
      },
      {
        name: "FileZilla",
        label: "実務レベル",
        description:
          "ファイル転送ツールです。長期プロジェクトで日常的に使いプロジェクト期間中に100箇所以上のWEBサーバーと連携しました。",
      },
    ],
  },
  {
    title: "ノーコード・その他",
    items: [
      {
        name: "Studio",
        label: "基礎",
        description:
          "デモサイトのトップページ制作経験があり基本的な仕様を一通りさわって理解しています。ノーコード専門ではありませんが、その分普段からコードを扱っているプロとしての強みがありますので、ツール利用上でのバグにお困りのときはご相談ください。",
      },
      {
        name: "Webリテラシー（Web制作）",
        label: "基礎",
        description:
          "実務上で使う必須となるスキルはもちろんですが、それらを支える裏側の仕組みや成り立ちについてよく学びます。例えば、ブラウザーの裏側で起きている処理の流れを知ることや、Webデザインの基礎知識を学んでみることです。先人の知の結晶の上で恩恵を受けて快適に過ごしていますが、一度仕組みに興味を持つと止められません。（お仕事中は我慢しております）",
      },
      {
        name: "Webリテラシー（全域）",
        label: "基礎",
        description:
          "専門はWeb制作ですが、バックエンドやインフラなどの他のWEB領域についても関心があります。専門分野との繋がりを知りたいというモチベーションで学び始めました。WEBを構成する要素・繋がり・仕組み・成り立ちなど調べます。書籍や講座Web標準、最新のセキュリティ動向など。これらはほとんど趣味なのでプライベートで学びます。これらの情報は暗記ではなく理解しているだけでも効果を感じます。例えば、バグの原因が専門分野と他分野の境界線をまたぐ時など役になっています。",
      },
    ],
  },
];
