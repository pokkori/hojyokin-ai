import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "補助金コラム｜Jグランツ・ものづくり補助金・申請のコツを解説",
  description:
    "中小企業・個人事業主向けの補助金情報を解説。Jグランツの使い方、ものづくり補助金の採択ポイント、申請書の書き方まで網羅。",
};

const articles = [
  {
    href: "/blog/jgrants-hojyokin-ai",
    category: "Jグランツ",
    categoryColor: "bg-amber-100 text-amber-700",
    title: "Jグランツとは？使い方・登録方法・補助金AIとの違いをわかりやすく解説",
    desc: "政府の補助金申請システム「Jグランツ」の使い方を解説。gBizIDの取得から申請まで、ステップバイステップで説明します。",
    date: "2026年3月",
  },
  {
    href: "/blog/monodukuri-hojyokin",
    category: "ものづくり補助金",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "ものづくり補助金の採択率を上げる申請書の書き方【2025〜2026年版】",
    desc: "ものづくり補助金（ものづく・商業・サービス生産性向上促進補助金）の採択率を上げる申請書の書き方を解説します。",
    date: "2026年3月",
  },
  {
    href: "/blog/hojyokin-shinsei-tetsuzuki",
    category: "申請手続き",
    categoryColor: "bg-green-100 text-green-700",
    title: "補助金申請の流れ・スケジュール｜公募から採択・入金までの完全ガイド",
    desc: "補助金の申請から採択・補助金の受け取りまで、全ステップを解説。申請前の準備から事業化状況報告まで網羅します。",
    date: "2026年3月",
  },
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900 text-sm">
            AI補助金診断
          </Link>
          <Link
            href="/tool"
            className="text-sm bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600"
          >
            無料で診断する
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">補助金コラム</h1>
        <p className="text-gray-500 text-sm mb-10">
          中小企業・個人事業主が使える補助金情報をわかりやすく解説します。
        </p>

        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="block border border-gray-200 rounded-xl p-6 hover:border-amber-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${article.categoryColor}`}>
                  {article.category}
                </span>
                <span className="text-xs text-gray-400">{article.date}</span>
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">{article.desc}</p>
              <div className="mt-3 text-xs text-amber-600 font-medium">続きを読む →</div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <p className="font-bold text-gray-900 mb-2">AIが最適な補助金を診断します</p>
          <p className="text-sm text-gray-500 mb-4">
            業種・規模・目的を入力するだけ。採択可能性スコアと申請書ドラフトをAIが生成します。
          </p>
          <Link
            href="/tool"
            className="inline-block bg-amber-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors text-sm"
          >
            無料で補助金を診断する →
          </Link>
        </div>
      </div>
    </main>
  );
}
