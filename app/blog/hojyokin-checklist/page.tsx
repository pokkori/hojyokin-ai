import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026年度 中小企業が使える補助金チェックリスト【採択率UP】",
  description:
    "補助金申請前の確認10項目・よくある不採択理由5つ・採択率を上げる3つのコツを徹底解説。補助金 申請 チェックリスト 2026版。ものづくり補助金・小規模事業者持続化補助金などに対応。",
  keywords:
    "補助金 申請 チェックリスト 2026,補助金 採択率 上げる,補助金 不採択 理由,ものづくり補助金 チェックリスト,小規模事業者持続化補助金 申請",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "補助金の採択率はどのくらいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "補助金の種類によって異なりますが、ものづくり補助金は約45〜60%、小規模事業者持続化補助金は約60〜70%が採択されています。ただし締切直前の応募集中期や、申請内容の質によって大きく変動します。AI診断ツールで自社の採択可能性を事前チェックすることをお勧めします。",
      },
    },
    {
      "@type": "Question",
      name: "ものづくり補助金と小規模事業者持続化補助金の違いは？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ものづくり補助金は設備投資・システム構築に特化しており、補助上限が750万円〜1,250万円と高額です。対して小規模事業者持続化補助金は販路開拓・宣伝活動が主な対象で、上限は50万円（一部200万円）です。従業員数・業種・目的によって最適な補助金が異なるため、AI診断で自社に合った補助金を確認しましょう。",
      },
    },
    {
      "@type": "Question",
      name: "申請書の事業計画書はどのくらいの量が必要ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "補助金の種類によりますが、ものづくり補助金では10〜15ページ程度の事業計画書が一般的です。採択率を上げるには、①現状の課題、②導入する設備・システム、③事業効果（売上・生産性向上の数値目標）の3点を具体的な数字を交えて記載することが重要です。",
      },
    },
    {
      "@type": "Question",
      name: "補助金申請にgBizIDは必ず必要ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jグランツ経由でオンライン申請する場合はgBizIDが必須です。取得には郵送での本人確認が必要なため、2〜3週間かかります。公募締切の1〜2ヶ月前には取得申請を開始してください。取得が遅れて公募期間内に間に合わないケースが多発しています。",
      },
    },
    {
      "@type": "Question",
      name: "採択後いつ補助金が入金されますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "補助金は「後払い」が原則です。採択後に交付申請→事業実施→実績報告→確定検査→精算払請求という流れを経て入金されます。採択から入金まで通常12〜18ヶ月かかります。先に自己資金で支払いを行う必要があるため、資金繰りの確認が重要です。",
      },
    },
  ],
};

export default function HojyokinChecklistPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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

      <article className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-xs text-amber-600 font-medium mb-3">
          <Link href="/blog" className="hover:underline">
            補助金コラム
          </Link>{" "}
          &gt; チェックリスト
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          2026年度 中小企業が使える補助金チェックリスト【採択率UP】
        </h1>
        <p className="text-gray-500 text-sm mb-2">
          更新日: 2026年3月 | 対象: ものづくり補助金・小規模事業者持続化補助金・IT導入補助金
        </p>
        <p className="text-gray-500 text-xs mb-8">
          キーワード: 補助金 申請 チェックリスト 2026
        </p>

        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-sm mb-8">
          <p className="font-bold text-amber-800 mb-1">この記事でわかること</p>
          <ul className="space-y-1 text-amber-700">
            <li>✓ 申請前に確認すべき10項目</li>
            <li>✓ よくある不採択理由5つとその対策</li>
            <li>✓ 採択率を上げる3つのコツ</li>
          </ul>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
          {/* セクション1: 申請前確認10項目 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              申請前に必ず確認すべき10項目
            </h2>
            <p className="text-sm mb-5">
              補助金申請で落ちる企業の多くは、申請要件を満たしていないまま提出しています。
              以下の10項目を事前に全てクリアしておきましょう。
            </p>
            <div className="space-y-3">
              {[
                {
                  num: "01",
                  title: "対象業種・規模の確認",
                  detail:
                    "補助金には業種制限・従業員数・資本金の上限があります。製造業なら従業員300人以下、小売業なら50人以下など補助金ごとに異なります。",
                  critical: true,
                },
                {
                  num: "02",
                  title: "gBizIDの取得（Jグランツ申請の場合）",
                  detail:
                    "取得に2〜3週間かかります。公募締切の2ヶ月前には申請を開始してください。",
                  critical: true,
                },
                {
                  num: "03",
                  title: "直近2期分の決算書の準備",
                  detail:
                    "赤字決算が続く企業は審査で不利になる場合があります。事前に数字を確認しておきましょう。",
                  critical: false,
                },
                {
                  num: "04",
                  title: "経営革新計画・認定支援機関との連携確認",
                  detail:
                    "ものづくり補助金等では認定支援機関（税理士・商工会等）の確認書が必要です。早めに依頼しましょう。",
                  critical: true,
                },
                {
                  num: "05",
                  title: "補助対象経費の範囲確認",
                  detail:
                    "購入予定の設備・サービスが補助対象かを公募要領で確認。土地・建物・消耗品は多くの補助金で対象外です。",
                  critical: true,
                },
                {
                  num: "06",
                  title: "見積書の取得（2社以上）",
                  detail:
                    "相見積もりが必要な補助金が多くあります。特定の業者のみから取得すると加点が得られない場合も。",
                  critical: false,
                },
                {
                  num: "07",
                  title: "交付決定前の発注・契約がないことを確認",
                  detail:
                    "交付決定前に発注・支払いをすると補助対象外になります。採択通知≠交付決定なので注意が必要です。",
                  critical: true,
                },
                {
                  num: "08",
                  title: "補助事業実施期間の確認",
                  detail:
                    "事業実施期限（通常交付決定後12〜18ヶ月）内に全ての購入・支払いを完了させる必要があります。",
                  critical: false,
                },
                {
                  num: "09",
                  title: "賃上げ要件の確認（加点項目）",
                  detail:
                    "ものづくり補助金・IT導入補助金では賃上げ表明で加点されます。最低賃金を上回る計画があるか確認しましょう。",
                  critical: false,
                },
                {
                  num: "10",
                  title: "電子申請環境の準備",
                  detail:
                    "Jグランツ等での電子申請には電子証明書が必要なケースがあります。法人の場合は法人印の電子化も検討してください。",
                  critical: false,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`border rounded-xl p-4 flex gap-4 items-start ${
                    item.critical
                      ? "border-amber-300 bg-amber-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-block text-sm font-black px-2 py-1 rounded-lg ${
                        item.critical
                          ? "bg-amber-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {item.num}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm mb-1">
                      {item.critical && (
                        <span className="text-red-500 mr-1">必須</span>
                      )}
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* セクション2: よくある不採択理由5つ */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              よくある不採択理由5つ（と対策）
            </h2>
            <p className="text-sm mb-5">
              採択経験のある中小企業診断士・認定支援機関へのヒアリングをもとに、
              不採択になる申請書の共通パターンをまとめました。
            </p>
            <div className="space-y-4">
              {[
                {
                  reason: "事業計画書の数値根拠が薄い",
                  detail:
                    "「生産性が上がる」「売上が増える」という記載だけでは不採択になります。導入設備によって何%のコスト削減・何円の売上増加が見込めるかを具体的な数字で示す必要があります。",
                  fix: "過去の業績データ・業界平均値を活用して具体的数値を入れる",
                },
                {
                  reason: "補助事業と本業のつながりが不明確",
                  detail:
                    "単に「最新設備を導入したい」という記載では審査員に伝わりません。現在の業務フローのどのボトルネックを解決し、どう競争力が上がるかのストーリーが必要です。",
                  fix: "課題→解決策→効果の流れを図解・箇条書きで明確に示す",
                },
                {
                  reason: "申請直前に事業計画書を書き始めた",
                  detail:
                    "質の高い事業計画書の作成には最低1〜2ヶ月かかります。公募開始と同時に書き始めても提出期限に間に合わず、中身も薄くなりがちです。",
                  fix: "公募開始2ヶ月前から準備開始・認定支援機関に早めに相談",
                },
                {
                  reason: "見積金額と市場価格に大きな乖離がある",
                  detail:
                    "極端に高い見積もりは審査で指摘されます。複数社から相見積もりを取り、適正価格であることを証明できる状態にしておきましょう。",
                  fix: "相見積もりを必ず2社以上取得し、選定理由を記載する",
                },
                {
                  reason: "申請要件をギリギリ満たしていない",
                  detail:
                    "従業員数・資本金・売上規模などの要件をギリギリで満たしているケースは審査で厳しく見られます。余裕をもって要件を確認し、加点項目を積み重ねることが重要です。",
                  fix: "AI診断ツールで自社の採択可能性スコアを事前確認する",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-red-100 bg-red-50 rounded-xl p-5"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-red-500 text-lg flex-shrink-0">
                      ✗
                    </span>
                    <p className="font-bold text-red-800 text-sm">
                      不採択理由 {i + 1}: {item.reason}
                    </p>
                  </div>
                  <p className="text-xs text-gray-700 mb-2 ml-7">
                    {item.detail}
                  </p>
                  <div className="ml-7 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-green-700 font-medium">
                      対策: {item.fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* セクション3: 採択率を上げる3つのコツ */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              採択率を上げる3つのコツ
            </h2>
            <div className="space-y-5">
              {[
                {
                  num: "コツ1",
                  title: "加点項目を最大化する",
                  body: "補助金審査では基礎点に加え、さまざまな加点項目があります。賃上げ計画・女性活躍推進・DX認定・経営革新計画承認などを事前に取得しておくと採択率が大幅に上がります。特にものづくり補助金では加点で最大+5点が加算されます。",
                  tip: "AI補助金診断で加点項目の対応状況を確認できます",
                },
                {
                  num: "コツ2",
                  title: "認定支援機関を早期に巻き込む",
                  body: "商工会・商工会議所・認定税理士・中小企業診断士などの認定支援機関は、採択実績のある事業計画書の書き方を熟知しています。申請書のレビューを依頼することで採択率が平均15〜20%向上するというデータもあります。",
                  tip: "商工会への相談は無料。まず地域の商工会に連絡してみましょう",
                },
                {
                  num: "コツ3",
                  title: "応募が少ない時期・ラウンドを狙う",
                  body: "補助金の応募は締切直前に集中します。複数回の公募がある場合、初期のラウンド（第1〜3次）は競合が少なく採択されやすい傾向があります。公募スケジュールを事前にチェックし、早めに申請することが重要です。",
                  tip: "補助金カレンダーで公募スケジュールを確認して早期申請を心がけましょう",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-amber-200 rounded-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {item.num}
                    </span>
                    <p className="font-bold text-gray-900">{item.title}</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{item.body}</p>
                  <div className="bg-amber-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-amber-700 font-medium">
                      💡 {item.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              よくある質問（FAQ）
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "補助金の採択率はどのくらいですか？",
                  a: "補助金の種類によって異なりますが、ものづくり補助金は約45〜60%、小規模事業者持続化補助金は約60〜70%が採択されています。ただし締切直前の応募集中期や申請内容の質によって大きく変動します。",
                },
                {
                  q: "ものづくり補助金と小規模事業者持続化補助金の違いは？",
                  a: "ものづくり補助金は設備投資・システム構築に特化しており補助上限が750万円〜1,250万円と高額です。小規模事業者持続化補助金は販路開拓・宣伝活動が主な対象で上限は50万円（一部200万円）です。従業員数・業種・目的によって最適な補助金が異なります。",
                },
                {
                  q: "採択後いつ補助金が入金されますか？",
                  a: "補助金は「後払い」が原則です。採択から実績報告・確定検査を経て入金されるまで通常12〜18ヶ月かかります。先に自己資金で支払いを行う必要があるため、資金繰りの確認が重要です。",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div className="bg-gray-50 px-5 py-3">
                    <p className="font-bold text-gray-900 text-sm">
                      Q. {item.q}
                    </p>
                  </div>
                  <div className="px-5 py-3">
                    <p className="text-sm text-gray-700">A. {item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-8 text-center">
            <p className="font-bold text-gray-900 text-xl mb-2">
              今すぐ無料で補助金診断
            </p>
            <p className="text-sm text-gray-600 mb-5">
              業種・従業員数・導入目的を入力するだけで、自社に最適な補助金と
              採択可能性スコアをAIが即時診断します。
            </p>
            <Link
              href="/tool"
              className="inline-block bg-amber-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-600 transition-colors text-base"
            >
              無料で補助金を診断する（60秒） →
            </Link>
            <p className="text-xs text-gray-500 mt-3">
              登録不要 • 完全無料 • AIが即時診断
            </p>
          </div>

          {/* 関連記事 */}
          <div>
            <h3 className="font-bold text-gray-700 mb-4">関連コラム</h3>
            <div className="space-y-3">
              {[
                {
                  href: "/blog/hojyokin-shinsei-tetsuzuki",
                  title: "補助金申請の流れ・スケジュール完全ガイド",
                },
                {
                  href: "/blog/monodukuri-hojyokin",
                  title: "ものづくり補助金とは？対象・補助額・申請方法を解説",
                },
                {
                  href: "/blog/jgrants-hojyokin-ai",
                  title: "Jグランツとは？AI補助金診断との使い方",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm text-amber-700 hover:border-amber-300 hover:underline transition-colors"
                >
                  {item.title} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
