import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, M_PLUS_Rounded_1c } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import FeedbackButton from "@/components/FeedbackButton";
import { GoogleAdScript } from "@/components/GoogleAdScript";
import "./globals.css";
import { InstallPrompt } from "@/components/InstallPrompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-rounded",
});


const SITE_URL = "https://hojyokin-ai-delta.vercel.app";
const TITLE = "AI補助金診断｜補助金申請書をAI自動生成・無料診断・ものづくり補助金・IT導入補助金対応";
const DESC = "補助金申請書の文章生成をAIが自動化。事業内容を入力するだけで使える補助金5件を無料診断し、補助金申請書ドラフト・チェックリスト・採択率アドバイスまでAIが自動生成。ものづくり補助金・IT導入補助金・小規模事業者持続化補助金対応。行政書士不要。¥2,980/1申請〜。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23f59e0b'><rect x='10' y='20' width='80' height='60' rx='10'/><rect x='25' y='40' width='50' height='8' rx='4' fill='white'/><rect x='25' y='55' width='30' height='8' rx='4' fill='white'/></svg>" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "AI補助金診断",
    locale: "ja_JP",
    type: "website",
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "AI補助金診断" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  other: { "theme-color": "#0B0F1E" },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "補助金診断ツール", "item": `${SITE_URL}/tool` },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "AI補助金診断",
      "url": SITE_URL,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "keywords": "補助金,補助金申請書,文章生成,AI,ものづくり補助金,IT導入補助金,小規模事業者持続化補助金,無料診断",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY", "description": "基本無料診断・申請書生成 ¥2,980/1申請〜" },
      "description": DESC,
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "どの補助金が使えるか調べてもらえますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい。業種・従業員数・投資目的を入力するだけで、対象補助金を優先度順に最大5件診断します。ものづくり補助金・IT導入補助金・小規模事業者持続化補助金など2026年度の最新補助金に対応しています。"
          }
        },
        {
          "@type": "Question",
          "name": "申請書の作成も手伝ってもらえますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "プレミアムプランでは申請書ドラフトを自動生成します。通常¥15〜20万かかる補助金コンサルの費用を大幅に節約できます。生成したドラフトに事業の具体的な数字を加えるだけで申請書が完成します。"
          }
        },
        {
          "@type": "Question",
          "name": "無料で使えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "補助金の基本診断は無料でお試しいただけます。申請書ドラフト生成・採択率アドバイス・無制限診断はプレミアムプラン（¥980/月）でご利用いただけます。"
          }
        },
        {
          "@type": "Question",
          "name": "ものづくり補助金とIT導入補助金はどう違いますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ものづくり補助金は製造業・サービス業が生産性向上のための設備投資に使う補助金で、補助上限は750万円〜3,000万円。IT導入補助金はITツール導入費用の補助で中小企業・小規模事業者が対象、補助上限は最大450万円。本AIが業種・投資目的から最適な補助金を診断します。"
          }
        },
        {
          "@type": "Question",
          "name": "小規模事業者持続化補助金はどんな事業者が対象ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "小売業・飲食業・サービス業など従業員5人以下、製造業・宿泊業・娯楽業は従業員20人以下の小規模事業者が対象です。販路開拓・業務効率化のための費用（広告費・Webサイト制作・設備購入等）に最大200万円（特例500万円）が補助されます。"
          }
        },
        {
          "@type": "Question",
          "name": "補助金申請に行政書士は必要ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "法律上は行政書士なしで自社申請が可能です。ただし採択率を高めるには事業計画書の完成度が重要です。本AIが申請書の骨格を自動生成することで、行政書士費用（15〜30万円）を大幅に節約できます。複雑な案件は認定支援機関（商工会議所・中小企業診断士等）への相談も推奨します。"
          }
        },
        {
          "@type": "Question",
          "name": "補助金の採択率はどのくらいですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "補助金の採択率は種類・公募回によって異なりますが、ものづくり補助金は40〜55%、IT導入補助金は80%以上、小規模事業者持続化補助金は60〜70%程度が一般的です。事業計画書の具体性・数値目標の明確さが採択率を大きく左右します。本AIのアドバイス機能で採択率向上のポイントを確認できます。"
          }
        },
        {
          "@type": "Question",
          "name": "補助金は事前に申請が必要ですか？後から申請できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "多くの補助金は「採択後に発注・支払い」が原則です。申請前に設備を購入したり、発注してしまうと補助対象外になるケースがあります。必ず申請・採択の後に発注・支払いを行ってください。本AIが補助金ごとの注意事項もわかりやすく解説します。"
          }
        },
        {
          "@type": "Question",
          "name": "士業・顧問先へのサポートに補助金AIを使えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "税理士・中小企業診断士・行政書士が顧問先の補助金診断サポートとして活用いただけます。法人向けプランでは複数顧問先の一括診断・申請書の一括生成が可能です。お問い合わせは「法人のご相談」からどうぞ。"
          }
        },
        {
          "@type": "Question",
          "name": "補助金を受け取ったあとに注意すべき点はありますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "補助金採択後は、実績報告書の提出・補助事業の実施状況の確認・補助金の精算請求が必要です。また、補助事業終了後も一定期間（5年程度）は事業継続義務や報告義務があります。補助金は収益として税務申告が必要な場合もあるため、税理士にご確認ください。"
          }
        },
        {
          "@type": "Question",
          "name": "採択後の手続きはAIでサポートできますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "採択後の実績報告書・経費精算書・事業継続報告のドラフト生成にも対応しています。採択通知書の内容を入力すると、報告期限・必要書類・注意事項をまとめたチェックリストも自動生成します。"
          }
        },
        {
          "@type": "Question",
          "name": "補助金と助成金の違いは何ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "補助金は競争審査があり採択されなければ受給できませんが、助成金は要件を満たせば原則受給可能です。補助金は経済産業省・中小企業庁管轄が多く、助成金は厚生労働省管轄（雇用関係）が中心です。本AIが業種・状況から最適な補助金・助成金を診断します。"
          }
        },
        {
          "@type": "Question",
          "name": "申請に必要な書類は何ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "補助金の種類によって異なりますが、一般的には事業計画書・収支計画書・決算書（直近2期分）・見積書・登記簿謄本が必要です。本AIが補助金ごとの必要書類一覧と取得先をチェックリスト形式で生成します。"
          }
        },
        {
          "@type": "Question",
          "name": "複数の補助金を同時に申請できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "原則として複数の補助金を同時申請は可能ですが、同じ経費に対する重複受給は禁止されています。補助金ごとに対象経費と期間を分けることが重要です。本AIが申請スケジュールと経費配分の整理をサポートします。"
          }
        },
        {
          "@type": "Question",
          "name": "2026年度の最新補助金情報に対応していますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい。ものづくり補助金・IT導入補助金・小規模事業者持続化補助金の2026年度公募要領に基づき、最新の補助率・上限額・申請要件を反映しています。公募スケジュールが変更された場合は速やかに情報を更新します。"
          }
        },
        {
          "@type": "Question",
          "name": "スタートアップ・創業間もない企業も申請できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "創業1年未満でも申請可能な補助金があります。創業補助・小規模事業者持続化補助金（創業枠）・事業再構築補助金の創業特例などが対象です。本AIが創業年数・業種から申請可能な補助金を診断します。"
          }
        },
        {
          "@type": "Question",
          "name": "事業再構築補助金はどんな事業者に向いていますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "新分野展開・業態転換・事業転換・業種転換などの大胆な事業再構築に取り組む中小企業・中堅企業が対象です。補助上限は最大1.5億円と高額ですが、売上減少要件や認定支援機関の確認が必要です。本AIが要件チェックと申請計画書の骨格を生成します。"
          }
        },
        {
          "@type": "Question",
          "name": "補助金の申請書作成にかかる時間はどれくらい短縮できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "通常、行政書士や補助金コンサルに依頼すると2〜4週間かかる申請書作成が、本AIを使えば最短30分でドラフトが完成します。事業概要・強み・投資計画を入力するだけで、審査員が評価するポイントを押さえた文章を自動生成します。"
          }
        },
        {
          "@type": "Question",
          "name": "個人事業主も補助金を申請できますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "はい、個人事業主も多くの補助金に申請できます。小規模事業者持続化補助金・IT導入補助金・ものづくり補助金の一部が対象です。開業届の提出・確定申告の実施が要件となる場合が多いです。本AIが個人事業主向けの対象補助金を診断します。"
          }
        },
        {
          "@type": "Question",
          "name": "補助金申請が不採択になった場合、再申請はできますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "多くの補助金は次回公募で再申請が可能です。不採択通知には「審査コメント」が記載される場合があり、その内容を踏まえて事業計画書を改善することで採択率が上がります。本AIに前回の申請内容と不採択理由を入力すると、改善点をAIが分析して強化された申請書ドラフトを再生成します。諦めずに複数回チャレンジすることが採択への近道です。"
          }
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "name": "AI補助金診断",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "url": SITE_URL,
      "description": DESC,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "JPY",
        "description": "基本無料診断・申請書生成 ¥2,980/1申請〜"
      }
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`dark ${inter.variable} ${notoSansJP.variable} ${mPlusRounded.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>
        {children}
        <InstallPrompt />
        <footer className="flex justify-center py-2">
          <FeedbackButton serviceName="補助金AI" />
        </footer>
        <Analytics />
        <SpeedInsights />
        <GoogleAdScript />
        {process.env.NEXT_PUBLIC_CLARITY_ID && process.env.NODE_ENV === 'production' && (
          <Script
            id="clarity-init"
            strategy="afterInteractive"
          >
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
