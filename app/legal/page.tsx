import Link from "next/link";

const ITEMS = [
  { label: "販売業者", value: "新美諭" },
  { label: "電話番号", value: "090-6093-5290" },
  { label: "運営責任者", value: "ポッコリラボ 代表 新美諭" },
  { label: "お問い合わせ", value: "levonadesign@gmail.com（X: @levona_design）" },
  { label: "所在地", value: "非公開（請求があれば遅滞なく開示します）" },
  { label: "販売価格", value: "一回払い ¥1,980（税込）、スタンダードプラン ¥980/月（税込）、ビジネスプラン ¥2,980/月（税込）" },
  { label: "支払方法", value: "クレジットカード（オンライン決済サービス経由）（Visa・Mastercard・American Express・JCB）" },
  { label: "商品代金以外の必要料金", value: "なし（インターネット接続料等はお客様のご負担となります）" },
  { label: "支払時期", value: "お申込み時に即時決済。以降、毎月同日に自動更新" },
  { label: "サービス提供時期", value: "決済完了後、即時ご利用いただけます" },
  { label: "返品・キャンセル", value: "デジタルコンテンツの性質上、決済完了後の返金は承っておりません。解約はいつでもマイページより行えます。解約後は次回更新日まで引き続きご利用いただけます" },
  { label: "動作環境", value: "インターネット接続環境および最新版ブラウザが必要です" },
];

export default function LegalPage() {
  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(135deg, #0f0b15 0%, #1a1333 25%, #0d1f2d 50%, #1a1333 75%, #0f0b15 100%)" }}>
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
      </div>

      <nav className="relative z-10 border-b border-white/5 px-6 py-4">
        <Link href="/" className="font-bold text-white/80 hover:text-white transition-colors flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="#facc15" strokeWidth="2" strokeLinecap="round"/></svg>
          AI補助金診断
        </Link>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">特定商取引法に基づく表記</h1>
        <p className="text-slate-500 text-sm mb-8">Act on Specified Commercial Transactions</p>

        <div className="rounded-2xl p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <dl className="space-y-4">
            {ITEMS.map((item, i) => (
              <div key={item.label} className={i < ITEMS.length - 1 ? "border-b border-white/5 pb-4" : "pb-0"}>
                <dt className="text-sm font-semibold text-slate-400 mb-1">{item.label}</dt>
                <dd className="text-slate-200 text-sm leading-relaxed">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-base font-bold text-white/80 mb-3">AIによる生成コンテンツに関する免責</h2>
          <ol className="space-y-2 list-decimal list-inside text-xs text-slate-400 leading-relaxed">
            <li>本サービスが提供するAI生成コンテンツは、あくまでも参考情報・補助情報として提供するものであり、その正確性、完全性、有用性を保証するものではありません。</li>
            <li>生成AIは常に正確または完全であるとは限りません。専門家（医師、弁護士、税理士、社会保険労務士等）の判断が必要な事項については、必ず専門家にご相談ください。</li>
            <li>当社は、AI生成コンテンツの利用により生じた損害について、一切の責任を負いません。</li>
            <li>基盤モデル提供者（Anthropic, Inc.）のサービス停止や仕様変更により、本サービスの機能が変更・停止される場合があります。</li>
          </ol>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          ※ 本サービスの診断結果は参考情報です。実際の補助金申請にあたっては、公募要領および各支援機関にご確認ください。
        </p>
      </div>
    </div>
  );
}
