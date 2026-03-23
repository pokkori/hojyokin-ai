import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
