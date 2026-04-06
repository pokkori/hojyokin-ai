"use client";

import Link from "next/link";
import { useState } from "react";

const PURPOSES_HOJYOKIN = ["補助金の対象か調べたい", "申請書作成の効率化", "士業として顧客への提案に活用", "社内のDX推進補助金申請", "その他"];

function DemoForm({ accentColor, serviceName, purposes }: { accentColor: string; serviceName: string; purposes: string[] }) {
  const [form, setForm] = useState({ company: "", name: "", email: "", phone: "", purpose: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`${serviceName} 無料デモのお申込み`);
    const body = encodeURIComponent(
      `会社名: ${form.company}\n担当者名: ${form.name}\nメール: ${form.email}\n電話番号: ${form.phone}\nご利用目的: ${form.purpose}`
    );
    window.open(`mailto:support@pokkorilab.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  }

  const ring = accentColor === "amber" ? "focus:border-amber-400" : "focus:border-indigo-400";
  const btn = accentColor === "amber" ? "bg-amber-600 hover:bg-amber-700" : "bg-indigo-600 hover:bg-indigo-700";
  const badge = accentColor === "amber" ? "bg-amber-50 text-amber-700" : "bg-indigo-50 text-indigo-700";

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${badge}`}>法人・士業限定</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">無料デモ・お見積もり申込</h2>
          <p className="text-sm text-gray-500">3営業日以内にご連絡いたします</p>
        </div>
        {submitted ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <div className="flex justify-center mb-3"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
            <p className="font-bold text-gray-900 mb-2">メールアプリが開きました</p>
            <p className="text-sm text-gray-500">送信後、3営業日以内にご連絡いたします。<br />メールが開かない場合は <span className="font-medium">support@pokkorilab.com</span> まで直接ご連絡ください。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">会社名 <span className="text-red-500">*</span></label>
                <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="株式会社○○" className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none ${ring}`} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">担当者名 <span className="text-red-500">*</span></label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="山田 太郎" className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none ${ring}`} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="info@example.com" className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none ${ring}`} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">電話番号</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="090-0000-0000" className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none ${ring}`} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">ご利用目的</label>
              <select value={form.purpose} onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))} className={`w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none ${ring}`}>
                <option value="">選択してください</option>
                {purposes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <button type="submit" className={`w-full ${btn} text-white font-bold py-3 rounded-xl text-sm transition-colors`}>
              無料デモを申し込む →
            </button>
            <p className="text-xs text-gray-400 text-center">送信するとメールアプリが開きます。3営業日以内にご連絡します。</p>
          </form>
        )}
      </div>
    </section>
  );
}

const PROBLEMS = [
  { title: "どの補助金が使えるか調べるのに何時間もかかる", desc: "事業内容を入力するだけで対象補助金を優先度順に最大5件診断。調査時間をゼロに。" },
  { title: "申請書の書き方がわからず外注すると20万円以上かかる", desc: "AIが申請書ドラフトを自動生成。コンサル費用をほぼゼロにできます。" },
  { title: "公募期間が短くて気づいたら締め切れていた", desc: "AIが最新の公募情報をもとに診断。期限内に申請書の準備を開始できます。" },
  { title: "士業として顧客に補助金提案をしたいが調査が大変", desc: "行政書士・診断士向けプランで複数顧客の補助金診断を効率化。提案力を10倍に。" },
];

const USECASES = [
  {
    icon: "🏭",
    title: "製造業・建設業",
    problem: "ものづくり補助金・省エネ補助金など対象が多く、どれが最適か判断できない。",
    solution: "業種・従業員数・投資目的を入力するだけで最適補助金をランキング形式で提示。申請書ドラフトも即生成。",
    result: "調査時間を10時間 → 3分に短縮",
  },
  {
    icon: "🍽",
    title: "飲食店・小売業",
    problem: "IT導入補助金・小規模事業者持続化補助金を知らずに機会損失していた。",
    solution: "POSレジ・予約システムなど設備投資計画を入力すると対象補助金と採択率が即わかる。",
    result: "補助金コンサル費¥20万以上を節約",
  },
  {
    icon: "📊",
    title: "行政書士・中小企業診断士",
    problem: "顧客への補助金提案は手間がかかり、1件あたりの調査に3〜5時間かかっていた。",
    solution: "士業プロプランで顧客情報を入力するだけで即診断・ドラフト生成。1時間で複数顧客に提案できる。",
    result: "提案件数が月3件 → 15件に向上",
  },
];

const PLANS = [
  {
    name: "スタンダード",
    price: "¥980",
    per: "/月",
    target: "個人事業主・小規模事業者",
    features: ["補助金診断（月3回）", "申請書ドラフト生成", "採択率アップのアドバイス", "2026年度対応"],
    cta: "まず1ヶ月お試し ¥980",
    highlight: false,
  },
  {
    name: "ビジネス",
    price: "¥9,800",
    per: "/月",
    target: "中小企業・法人向け",
    features: ["補助金診断（無制限）", "申請書ドラフト無制限生成", "業種別・規模別の優先提示", "新設補助金（AI導入等）対応", "請求書払い対応"],
    cta: "まず1ヶ月お試し ¥9,800",
    highlight: false,
  },
  {
    name: "士業プロ",
    price: "¥19,800",
    per: "/月",
    target: "行政書士・中小企業診断士向け",
    features: ["複数顧客の一括診断", "申請書ドラフト無制限", "採択率向上チェックリスト", "顧客別レポート出力", "専任サポート担当", "請求書払い対応"],
    cta: "お問い合わせ",
    highlight: true,
  },
];

const ONBOARDING_STEPS = [
  {
    day: "今日",
    title: "申し込む（3分）",
    desc: "クレジットカードで即時決済。メールアドレスだけで登録完了。",
    icon: "📝",
    color: "bg-amber-600",
  },
  {
    day: "今日中",
    title: "事業内容を入力して診断",
    desc: "業種・従業員数・投資目的を入力するだけ。3分で対象補助金リストが完成。",
    icon: "🔍",
    color: "bg-green-500",
  },
  {
    day: "今週中",
    title: "申請書を仕上げて提出",
    desc: "AIドラフトに事業の具体的な数字を加えるだけ。コンサルなしで申請書が完成。",
    icon: "📄",
    color: "bg-purple-500",
  },
];

const FAQ_ITEMS = [
  {
    q: "補助金申請の代行もしてもらえますか？",
    a: "申請書のドラフト生成と採択率向上のアドバイスを提供します。実際の申請手続きはお客様ご自身または士業の先生にご依頼ください。ドラフトをそのまま使える形で出力するため、士業の先生への依頼コストも大幅に削減できます。",
  },
  {
    q: "最新の補助金情報に対応していますか？",
    a: "2026年度の新設補助金（中小企業デジタル化補助金・AI導入補助金等）を含む最新情報に随時対応しています。公募開始から2〜4週間で締め切られることが多いため、早めの診断をお勧めします。",
  },
  {
    q: "士業プランで複数の顧客を診断できますか？",
    a: "はい。士業プロプランでは顧客情報を入力するたびに個別の診断レポートを生成できます。顧客ごとにドラフトを保存・出力できるため、月15〜20件の提案が可能になります。",
  },
  {
    q: "採択される保証はありますか？",
    a: "採択の保証はできません。ただし、審査員の評価基準に沿ったドラフト生成と採択率を上げるチェックリストを提供しています。最終的な申請書の内容はお客様の事業実態を反映させてください。",
  },
  {
    q: "請求書払い・銀行振込は対応していますか？",
    a: "ビジネスプラン・士業プロプランで請求書払いに対応しています。経理処理しやすい形式で請求書を発行します。お問い合わせフォームからご連絡ください。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "はい、いつでも解約可能です。解約後は次回更新日まで引き続きご利用いただけます。",
  },
];

function ROICalculator() {
  const [appsPerYear, setAppsPerYear] = useState(3);
  const consultingCost = 150000; // 補助金コンサル平均¥15万/件

  const savedCost = appsPerYear * consultingCost;
  const planCost = 9800 * 12; // ビジネスプラン年額
  const netSaving = savedCost - planCost;

  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-lg p-6 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">コスト削減計算機</h3>
      <p className="text-sm text-gray-500 text-center mb-8">年間の補助金申請件数を入力して、コンサル費用との差額を確認</p>

      <div className="space-y-6 mb-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">年間の補助金申請予定件数</label>
            <span className="text-2xl font-bold text-amber-600">{appsPerYear}件</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={appsPerYear}
            onChange={(e) => setAppsPerYear(Number(e.target.value))}
            className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1件</span>
            <span>20件</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <p className="text-xs text-red-600 font-semibold mb-1">コンサル依頼の場合</p>
          <p className="text-3xl font-bold text-red-700">¥{(savedCost / 10000).toFixed(0)}<span className="text-lg">万</span></p>
          <p className="text-xs text-gray-500 mt-1">¥15万/件 × {appsPerYear}件</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 text-center">
          <p className="text-xs text-amber-600 font-semibold mb-1">補助金AIの年額</p>
          <p className="text-3xl font-bold text-amber-700">¥{(planCost / 10000).toFixed(1)}<span className="text-lg">万</span></p>
          <p className="text-xs text-gray-500 mt-1">¥9,800/月 × 12ヶ月</p>
        </div>
        <div className={`rounded-xl p-4 text-center ${netSaving > 0 ? "bg-green-50" : "bg-gray-50"}`}>
          <p className={`text-xs font-semibold mb-1 ${netSaving > 0 ? "text-green-600" : "text-gray-500"}`}>年間節約額</p>
          <p className={`text-3xl font-bold ${netSaving > 0 ? "text-green-700" : "text-gray-500"}`}>
            {netSaving > 0 ? "+" : ""}¥{(netSaving / 10000).toFixed(0)}<span className="text-lg">万</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">{netSaving > 0 ? "純コスト削減" : "申請件数を増やすと効果大"}</p>
        </div>
      </div>

      {netSaving > 0 && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-4 text-white text-center">
          <p className="text-sm font-bold mb-1">
            年{appsPerYear}件申請する場合、¥9,800/月の投資で
          </p>
          <p className="text-2xl font-bold">
            年¥{Math.round(netSaving / 10000)}万円のコスト削減
          </p>
          <p className="text-amber-100 text-xs mt-1">ROI {Math.round((netSaving / planCost) * 100)}%（年次）</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link
          href="/tool"
          className="inline-block bg-amber-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-amber-700 shadow-md text-sm"
        >
          まず1ヶ月お試し ¥980 →
        </Link>
      </div>
    </div>
  );
}

export default function BusinessLP() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4 sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900">補助金AI <span className="text-amber-600 text-sm font-medium ml-2">法人・士業向け</span></span>
          <div className="flex gap-3">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">個人向けはこちら</Link>
            <Link href="/tool" className="bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-amber-700">無料で診断する</Link>
          </div>
        </div>
      </nav>

      {/* 緊急バナー */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 text-center text-sm text-amber-800">
        <span className="font-bold">📢 2026年度</span>：中小企業デジタル化補助金・AI導入補助金など新設補助金が続々公募開始。
        <span className="font-bold ml-1">今すぐ自社が対象か確認しましょう。</span>
      </div>

      {/* ヒーロー */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          中小企業・行政書士・中小企業診断士向け法人プラン
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          補助金コンサル費¥20万を<br /><span className="text-amber-600">月¥980に変える</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
          事業内容を入力するだけで対象補助金を自動診断。<br />申請書ドラフトまで3分で生成。コンサルなしで採択を目指せます。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/tool" className="inline-block bg-amber-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-700 shadow-lg shadow-amber-100">
            まず無料で診断する →
          </Link>
          <a href="mailto:support@pokkorilab.com?subject=補助金AI法人プランについて" className="inline-block bg-gray-100 text-gray-700 font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-200">
            士業プランを問い合わせる
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">解約はいつでも可能</p>
      </section>

      {/* ROI スタッツ */}
      <section className="bg-amber-600 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
            {[
              { num: "¥20万+", label: "コンサル費用の節約", sub: "1申請あたりの平均コンサル費" },
              { num: "3分", label: "補助金診断にかかる時間", sub: "従来は3〜5時間の調査が必要" },
              { num: "5件", label: "一度に診断できる補助金数", sub: "優先度・採択率付きで提示" },
            ].map(stat => (
              <div key={stat.num}>
                <div className="text-4xl font-bold mb-1">{stat.num}</div>
                <div className="text-sm font-medium text-amber-100">{stat.label}</div>
                <div className="text-xs text-amber-200 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI計算機 */}
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3">コンサル費用との比較を計算する</h2>
          <p className="text-center text-gray-500 text-sm mb-10">年間申請件数を入力するだけで節約額が即座にわかります</p>
          <ROICalculator />
        </div>
      </section>

      {/* 導入ステップ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3">最短3ステップで補助金申請を完成させる</h2>
          <p className="text-center text-gray-500 text-sm mb-12">今日申し込めば、今日中に対象補助金が分かります</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ONBOARDING_STEPS.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className={`w-20 h-20 rounded-full ${step.color} text-white text-3xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {step.icon}
                </div>
                <div className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full mb-2">
                  {step.day}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/tool" className="inline-block bg-amber-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-700 shadow-lg shadow-amber-100">
              まず無料で診断する →
            </Link>
            <p className="text-xs text-gray-400 mt-3">解約はいつでも可能</p>
          </div>
        </div>
      </section>

      {/* 課題 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">こんな課題を解決します</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROBLEMS.map(p => (
              <div key={p.title} className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-red-500 shrink-0 mt-0.5">✗</span>{p.title}
                </p>
                <p className="text-sm text-gray-500 flex items-start gap-2">
                  <span className="text-green-500 shrink-0 mt-0.5">→</span>{p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 業種別ユースケース */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">業種別の活用例</h2>
          <div className="space-y-5">
            {USECASES.map(u => (
              <div key={u.title} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{u.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">{u.title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-red-500 mb-1">課題</p>
                    <p className="text-sm text-gray-600">{u.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-500 mb-1">解決策</p>
                    <p className="text-sm text-gray-600">{u.solution}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-green-600 mb-1">導入効果</p>
                    <p className="text-sm font-bold text-green-700">{u.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3">法人・士業向け料金プラン</h2>
          <p className="text-center text-gray-500 text-sm mb-10">すべてのプランで補助金診断・申請書ドラフト・採択率アドバイスがフルセット</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div key={plan.name} className={`rounded-2xl border p-6 relative flex flex-col ${plan.highlight ? "border-amber-500 shadow-xl shadow-amber-50 bg-white" : "border-gray-200 bg-white"}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-amber-600 text-white px-3 py-0.5 rounded-full whitespace-nowrap">士業に一番人気</div>
                )}
                <p className="text-xs text-gray-400 mb-1">{plan.target}</p>
                <p className="font-bold text-gray-900 text-lg mb-1">{plan.name}</p>
                <p className="text-3xl font-bold text-amber-600 mb-5">
                  {plan.price}<span className="text-sm font-normal text-gray-500">{plan.per}</span>
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.cta === "お問い合わせ" ? "mailto:support@pokkorilab.com?subject=士業プロプランについて" : "/tool"}
                  className={`block w-full text-center text-sm font-bold py-3 rounded-xl ${plan.highlight ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">解約はいつでも可能</p>
        </div>
      </section>

      {/* CTA（中間） */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto bg-amber-600 rounded-2xl p-8 text-center text-white">
          <p className="text-sm font-semibold text-amber-200 mb-2">まずは実際の診断精度を体感してください</p>
          <h2 className="text-2xl font-bold mb-4">今日診断を始めれば、今週中に申請書を提出できます</h2>
          <Link href="/tool" className="inline-block bg-white text-amber-600 font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-50 shadow-lg">
            まず無料で診断する →
          </Link>
          <p className="text-amber-200 text-xs mt-3">解約はいつでも可能</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">よくある質問</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2 text-sm">Q. {faq.q}</p>
                <p className="text-sm text-gray-600">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 法人デモ申込フォーム */}
      <DemoForm accentColor="amber" serviceName="補助金AI" purposes={PURPOSES_HOJYOKIN} />

      {/* 最終CTA */}
      <section className="bg-amber-600 py-16 text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-3">補助金コンサル費を、今月から削減する</h2>
        <p className="text-amber-100 text-sm mb-8">解約はいつでも可能。リスクなくお試しいただけます。</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/tool" className="inline-block bg-white text-amber-600 font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-50 shadow-lg">
            まず無料で診断する →
          </Link>
          <a href="mailto:support@pokkorilab.com?subject=補助金AI士業プランについて" className="inline-block bg-amber-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-400">
            士業プランを問い合わせる
          </a>
        </div>
      </section>

      <footer className="border-t py-6 text-center text-xs text-gray-400 space-x-4">
        <Link href="/legal" className="hover:underline">特定商取引法に基づく表記</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
      </footer>
    </main>
  );
}
