import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://hojyokin-ai-delta.vercel.app";
const TITLE = "AI補助金診断｜申請可能な補助金を診断＋申請書ドラフトを自動生成";
const DESC = "事業内容を入力するだけ。AIが使える補助金5件を優先度順に診断し、申請書ドラフト・チェックリスト・採択率アドバイスまで自動生成。行政書士不要。¥2,980/1申請〜。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💰</text></svg>" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "AI補助金診断",
    locale: "ja_JP",
    type: "website",
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
      "offers": { "@type": "Offer", "price": "980", "priceCurrency": "JPY", "description": "プレミアムプラン ¥980/月" },
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
