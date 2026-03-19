import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ものづくり補助金の採択率を上げる申請書の書き方【2025〜2026年版】",
  description:
    "ものづくり補助金（ものづく・商業・サービス生産性向上促進補助金）の採択率を上げる事業計画書の書き方を解説。採択されやすい記載パターンと避けるべき表現も紹介。",
  keywords: "ものづくり補助金 書き方,ものづくり補助金 採択率,ものづくり補助金 事業計画書,ものづく補助金 2026",
};

export default function MonodukuriPage() {
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
          <Link href="/blog" className="hover:underline">補助金コラム</Link> &gt; ものづくり補助金
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          ものづくり補助金の採択率を上げる申請書の書き方【2025〜2026年版】
        </h1>
        <p className="text-gray-500 text-sm mb-8">更新日: 2026年3月</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <p>
            ものづくり補助金（ものづくり・商業・サービス生産性向上促進補助金）は、
            中小企業・小規模事業者が革新的サービス開発・試作品開発・生産プロセス改善を行う際に
            最大1,250万円（一般型）の補助を受けられる制度です。
            本記事では、採択率を上げるための事業計画書の書き方を解説します。
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">ものづくり補助金の基本情報（2025〜2026年）</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <tbody>
                  {[
                    ["補助上限額", "750万円〜1,250万円（省力化オーダーメード枠は最大1億円）"],
                    ["補助率", "1/2（小規模事業者・再生事業者等は2/3）"],
                    ["対象経費", "機械装置費・システム構築費・技術導入費・専門家経費 等"],
                    ["申請方式", "Jグランツ（電子申請のみ）"],
                    ["審査方式", "書類審査（一次）→ 必要に応じて口頭審査"],
                  ].map(([key, val], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 font-medium text-gray-900 border-b border-gray-200 w-1/3">{key}</td>
                      <td className="py-2 px-4 text-gray-600 border-b border-gray-200">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">採択率を上げる5つのポイント</h2>

            <div className="space-y-6">
              {[
                {
                  num: "1",
                  title: "「革新性」を具体的な数値で表現する",
                  content: "審査員が最も重視するのが「事業の革新性」です。「業界初」「競合他社と比較して○○%優れた」など、具体的な根拠数値で革新性を示しましょう。「新しい取り組みを行う」という抽象表現は採択されにくい傾向があります。",
                  bad: "新製品を開発して売上を伸ばします",
                  good: "現在の手作業工程を自動化し、生産効率を従来比180%向上。業界平均（約120%）を60ポイント上回る革新的な生産体制を構築します",
                },
                {
                  num: "2",
                  title: "補助事業と本業の連続性を示す",
                  content: "「なぜこの設備投資が自社に必要か」を説明する際、自社の経営課題・技術力・市場ニーズと補助事業の関連性を丁寧に記載します。脈絡のない投資計画は採択されにくい傾向があります。",
                  bad: "最新の加工機械を導入します",
                  good: "主力取引先から精密加工部品の受注を受けているが、現有設備では加工精度±0.05mmが限界。導入するマシニングセンタで±0.01mmを実現し、航空宇宙部品市場への参入を目指します",
                },
                {
                  num: "3",
                  title: "収益計画を現実的な数値で記載する",
                  content: "過度に楽観的な売上予測は審査員に疑問を持たれます。市場データ・受注見込み・過去実績を根拠にした現実的な数値計画を立てましょう。補助金終了後3〜5年の収益計画まで示すと評価が高まります。",
                },
                {
                  num: "4",
                  title: "「付加価値額」の向上を明示する",
                  content: "ものづくり補助金の審査基準に「付加価値額の年率3%以上増加」があります。付加価値額＝営業利益＋人件費＋減価償却費で計算され、この数値の改善計画を必ず記載しましょう。",
                },
                {
                  num: "5",
                  title: "図表・写真を積極的に活用する",
                  content: "現状の工程フロー・導入後のフロー・競合比較表などを図で示すと、審査員が内容を理解しやすくなります。Word/Excelで作成した図をPDFに貼り付けて提出可能です。",
                },
              ].map((item) => (
                <div key={item.num} className="border-l-4 border-amber-400 pl-5">
                  <p className="font-bold text-gray-900 mb-2">{item.num}. {item.title}</p>
                  <p className="text-sm text-gray-600 mb-3">{item.content}</p>
                  {item.bad && (
                    <div className="space-y-2 text-sm">
                      <p><span className="text-red-500">❌ 採択されにくい例：</span>「{item.bad}」</p>
                      <p><span className="text-green-600">✅ 採択されやすい例：</span>「{item.good}」</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">採択率の推移（参考）</h2>
            <p className="text-sm text-gray-600 mb-3">
              ものづくり補助金の採択率は年度・枠によって異なります。一般的に30〜50%程度とされており、
              「誰でも申請すれば通る」わけではありません。事業計画書の質が採否を大きく左右します。
            </p>
          </section>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="font-bold text-gray-900 mb-2">AI補助金診断で申請書ドラフトを作成する</p>
            <p className="text-sm text-gray-500 mb-4">
              業種・事業内容を入力するだけで、採択可能性スコアと事業計画書のドラフトをAIが生成します。
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
