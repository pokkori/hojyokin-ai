import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import FeedbackButton from "@/components/FeedbackButton";
import "./globals.css";


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
          "name": "士業・顧問先へのサポートに相続AIを使えますか？",
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
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
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
      <body className="antialiased">
        {children}
        <footer className="flex justify-center py-2">
          <FeedbackButton serviceName="補助金AI" />
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
