import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jグランツとは？使い方・登録方法・補助金AIとの違いをわかりやすく解説",
  description:
    "政府の補助金申請システム「Jグランツ」の使い方を解説。gBizIDの取得から申請完了まで、ステップバイステップで説明します。補助金AIとの使い分けも解説。",
  keywords: "Jグランツ 使い方,Jグランツ 申請,gBizID 取得,補助金 申請 オンライン,ものづくり補助金 Jグランツ",
};

export default function JGrantsPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900 text-sm">AI補助金診断</Link>
          <Link href="/tool" className="text-sm bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600">
            無料で診断する
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-xs text-amber-600 font-medium mb-3">
          <Link href="/blog" className="hover:underline">補助金コラム</Link> &gt; Jグランツ
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Jグランツとは？使い方・登録方法・補助金AIとの違いをわかりやすく解説
        </h1>
        <p className="text-gray-500 text-sm mb-8">更新日: 2026年3月</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <p>
            補助金の申請手続きを電子化した政府システム「Jグランツ（Jグランツ：jGrants）」。
            ものづくり補助金・小規模事業者持続化補助金・IT導入補助金など主要補助金の多くがJグランツ経由で申請できるようになっています。
            本記事では、Jグランツの使い方と、AI補助金診断との賢い使い分けを解説します。
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Jグランツとは</h2>
            <p>
              Jグランツ（jGrants）は、経済産業省が2020年に開始した補助金電子申請システムです。
              従来は紙で行っていた補助金申請を、オンラインで完結できるようになりました。
            </p>
            <div className="bg-amber-50 rounded-lg p-4 text-sm mt-4">
              <p className="font-medium mb-2">Jグランツで申請できる主な補助金</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>ものづくり・商業・サービス生産性向上促進補助金</li>
                <li>小規模事業者持続化補助金</li>
                <li>IT導入補助金</li>
                <li>事業再構築補助金</li>
                <li>省エネルギー投資促進・需要構造転換支援事業費補助金</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Jグランツの使い方（ステップ別）</h2>

            <div className="space-y-4">
              {[
                {
                  step: "Step 1",
                  title: "gBizIDの取得",
                  desc: "Jグランツを使うには、まず「gBizID」（GビズID）のアカウントが必要です。gBizIDプライムを取得すると、申請から採択後の手続きまで全てオンラインで完結できます。取得には約2〜3週間かかるため、補助金公募期間が始まる前に準備しましょう。",
                },
                {
                  step: "Step 2",
                  title: "Jグランツにログイン・事業者情報登録",
                  desc: "gBizIDでJグランツにログイン後、事業者情報（会社名・所在地・代表者・業種等）を登録します。一度登録すれば、次回以降は使い回せます。",
                },
                {
                  step: "Step 3",
                  title: "申請する補助金を選択",
                  desc: "「補助金を探す」から申請したい補助金を検索。公募要領をダウンロードして、申請要件・対象経費・スケジュールを必ず確認してください。",
                },
                {
                  step: "Step 4",
                  title: "申請書類の作成・アップロード",
                  desc: "事業計画書・見積書・決算書等をPDFで作成してアップロードします。事業計画書の作成が最も時間がかかる工程です（AI補助金診断はこの部分をサポートします）。",
                },
                {
                  step: "Step 5",
                  title: "電子申請・審査",
                  desc: "申請後、審査期間は補助金によって1〜3ヶ月程度。採択結果はJグランツのマイページとメールで通知されます。",
                },
              ].map((item, i) => (
                <div key={i} className="border-l-4 border-amber-400 pl-4">
                  <p className="text-xs text-amber-600 font-bold mb-1">{item.step}</p>
                  <p className="font-bold text-gray-900 mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">AI補助金診断とJグランツの使い分け</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="font-bold text-amber-800 mb-2">AI補助金診断が得意なこと</p>
                <ul className="space-y-1 text-gray-700">
                  <li>✓ 自社に合った補助金の絞り込み</li>
                  <li>✓ 採択可能性スコアの判定</li>
                  <li>✓ 事業計画書のドラフト生成</li>
                  <li>✓ 要件チェックリストの確認</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="font-bold text-blue-800 mb-2">Jグランツが担う役割</p>
                <ul className="space-y-1 text-gray-700">
                  <li>✓ 実際の電子申請・提出</li>
                  <li>✓ 採択後の交付申請</li>
                  <li>✓ 実績報告・精算払請求</li>
                  <li>✓ 審査状況の確認</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              つまり、「AI補助金診断で補助金の選定と申請書の下準備 → Jグランツで正式提出」という流れが最も効率的です。
            </p>
          </section>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
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
      </article>
    </main>
  );
}
