import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "補助金申請の流れ・スケジュール｜公募から採択・入金まで完全ガイド",
  description:
    "補助金の申請から採択・補助金の受け取りまで全ステップを解説。事前準備・公募申請・採択後の手続き・精算払請求まで網羅した完全ガイドです。",
  keywords: "補助金 申請 流れ,補助金 スケジュール,補助金 採択後 手続き,補助金 入金 いつ,補助金 申請方法",
};

export default function HojyokinShinseiPage() {
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
          <Link href="/blog" className="hover:underline">補助金コラム</Link> &gt; 申請手続き
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          補助金申請の流れ・スケジュール｜公募から採択・入金まで完全ガイド
        </h1>
        <p className="text-gray-500 text-sm mb-8">更新日: 2026年3月</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <p>
            「補助金に申請してみたいが、何から始めればいいかわからない」という方のために、
            補助金申請の全ステップを時系列でまとめました。
            補助金の種類によって多少の違いはありますが、基本的な流れは共通です。
          </p>

          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-sm">
            <p className="font-bold text-amber-800 mb-1">⚠️ 重要：補助金は「後払い」</p>
            <p className="text-amber-700">補助金は原則として「先に自己資金で支払い、後から補助金が振り込まれる」仕組みです。採択されても、事業実施・完了報告後に初めて入金されます（通常6〜18ヶ月後）。</p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">補助金申請の全ステップ</h2>
            <div className="space-y-4">
              {[
                {
                  phase: "フェーズ1",
                  timing: "公募開始の1〜2ヶ月前",
                  title: "事前準備",
                  items: [
                    "gBizIDの取得（Jグランツ経由で申請する場合）",
                    "決算書・確定申告書の準備",
                    "公募要領の熟読・要件確認",
                    "AI補助金診断で採択可能性を事前チェック",
                  ],
                },
                {
                  phase: "フェーズ2",
                  timing: "公募期間中（通常1〜2ヶ月）",
                  title: "申請書の作成・提出",
                  items: [
                    "事業計画書の作成（最重要・最も時間がかかる）",
                    "添付書類の準備（決算書・見積書・定款等）",
                    "Jグランツまたは郵送で提出",
                    "提出後に受付番号を保存・確認",
                  ],
                },
                {
                  phase: "フェーズ3",
                  timing: "提出後1〜3ヶ月",
                  title: "審査・採択結果通知",
                  items: [
                    "書類審査（内容の確認・審査）",
                    "必要に応じて口頭審査（ビデオ会議等）",
                    "採択・不採択の通知（メール・Jグランツ）",
                    "採択後：交付申請の提出（事業開始前に必須）",
                  ],
                },
                {
                  phase: "フェーズ4",
                  timing: "交付決定後〜事業完了まで",
                  title: "事業の実施",
                  items: [
                    "交付決定通知を受けてから事業開始（前倒し不可）",
                    "購入・契約・支払いを実施",
                    "領収書・請求書を全て保管（5〜10年間）",
                    "事業期間内（通常1〜2年）に完了が必要",
                  ],
                },
                {
                  phase: "フェーズ5",
                  timing: "事業完了後1〜3ヶ月",
                  title: "実績報告・補助金の受け取り",
                  items: [
                    "実績報告書の提出（支出証拠書類を全て添付）",
                    "確定検査・審査（書類・現地確認の場合あり）",
                    "補助金の確定・精算払請求",
                    "補助金の入金（請求後1〜2ヶ月目安）",
                  ],
                },
              ].map((phase, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">{phase.phase}</span>
                    <span className="text-xs text-gray-500">{phase.timing}</span>
                  </div>
                  <p className="font-bold text-gray-900 mb-2">{phase.title}</p>
                  <ul className="space-y-1">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-amber-500 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">よくある失敗パターン</h2>
            <ul className="space-y-3 text-sm">
              {[
                "採択前に発注・支払いをしてしまう（交付決定前の支出は補助対象外）",
                "事業計画書を申請直前に書き始める（採択率が低下）",
                "gBizIDの取得が遅れて公募に間に合わない",
                "領収書・請求書を紛失してしまう（実績報告時に必要）",
                "事業期間内に設備導入が完了しない（補助対象外になるリスク）",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">⚠️</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="font-bold text-gray-900 mb-2">まず自社に合った補助金を診断しましょう</p>
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
