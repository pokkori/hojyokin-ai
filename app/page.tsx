"use client";
import { useState } from "react";
import Link from "next/link";
import PayjpModal from "@/components/PayjpModal";

const SAMPLES = [
  {
    industry: "🏭 製造業",
    situation: "愛知県・従業員12名・AI画像検査システム導入希望",
    tabs: [
      {
        label: "🎯 診断結果",
        content: `【診断結果】ものづくり補助金（一般型）が最有力候補です

■ 推奨補助金ランキング
1位 ものづくり補助金（一般型）★★★
   補助上限：750万円 / 補助率：1/2（中小企業）
   理由：AI・ロボット等の先端設備導入に最適。製造業かつ従業員20名以下で要件充足。

2位 デジタル化・AI導入補助金
   補助上限：450万円 / 補助率：2/3
   理由：AI導入コストに特化。ソフト費用も対象。申請書が比較的シンプル。

3位 IT導入補助金（デジタル化基盤導入類型）
   補助上限：350万円 / 補助率：3/4
   理由：ITツール・ソフトウェア費用に特化。手続きが簡便。`,
      },
      {
        label: "📝 申請書ドラフト",
        content: `【事業計画書（抜粋）】ものづくり補助金 申請書ドラフト

■ 事業名
AI画像検査システム導入による不良品率ゼロへの挑戦

■ 現状の課題
当社では年間生産量X万個のうち、目視検査による不良品率が約3.2%発生しており、
年間廃棄コストおよび再加工費用として約800万円の損失が生じています。
熟練検査員の高齢化による後継者不足も深刻で、品質維持に課題を抱えています。

■ 導入する革新的サービス・試作品の開発内容
AI画像検査システム（深層学習モデル搭載）を生産ライン3箇所に設置し、
毎分120個の自動検査を実現します。学習データ5,000件をもとに訓練済みの
モデルが、微細なキズ・変形・色ムラを0.01mm精度で検出します。

■ 期待される効果
・不良品率：3.2% → 0.3%以下（91%削減）
・年間コスト削減：約730万円
・検査工数：現状比60%削減（人員を付加価値業務へ再配置）
・3年後の売上高増加見込み：15%増（品質保証力向上による新規受注）`,
      },
      {
        label: "✅ 要件チェック",
        content: `【申請要件チェックリスト】

✅ 中小企業・小規模事業者であること（従業員300名以下）→ 充足（12名）
✅ 事業場内最低賃金が地域別最低賃金+30円以上 → 要確認（愛知県：¥1,027+¥30=¥1,057以上）
✅ 付加価値額が年率平均3%以上増加する計画 → ドラフトに記載済み
✅ 補助対象経費（機械装置・システム構築費等）が明確 → 記載済み
⚠️ gBizIDプライムの取得 → 未取得の場合は申請前に取得が必要（2〜3週間）
⚠️ 直近の決算書（2期分）の準備 → 準備状況を確認してください

【採択率を上げる3つのポイント】
1. 「賃上げ」との連動をアピール（今期・来期の賃上げ計画を数値で明記）
2. AI導入の「革新性」を強調（同業他社が未導入の技術であることを記載）
3. CO2削減効果を付記（環境省連携で加点対象になるケースあり）`,
      },
    ],
  },
  {
    industry: "🍽 飲食業",
    situation: "東京都・従業員5名・POSレジ＋予約管理システム導入希望",
    tabs: [
      {
        label: "🎯 診断結果",
        content: `【診断結果】IT導入補助金が最有力候補です

■ 推奨補助金ランキング
1位 IT導入補助金（デジタル化基盤導入類型）★★★
   補助上限：350万円 / 補助率：3/4
   理由：POSレジ・予約管理ツールが対象経費に直接該当。飲食業の採択実績が最多。

2位 小規模事業者持続化補助金
   補助上限：200万円 / 補助率：2/3
   理由：販路開拓・IT化に幅広く対応。経営計画書の審査がメイン。

3位 東京都 中小企業デジタル化支援補助金
   補助上限：150万円 / 補助率：1/2
   理由：都内飲食店向け優遇枠あり。国の補助金と併用可能なケースも。`,
      },
      {
        label: "📝 申請書ドラフト",
        content: `【事業計画書（抜粋）】IT導入補助金 申請書ドラフト

■ 事業名
POSレジ・予約管理システム一体型導入によるDX推進計画

■ 現状の課題
現在、注文・会計・予約管理をすべて手作業で行っており、
ピーク時間帯（17〜21時）の会計待ち時間が平均8分と長く、
月間で約15件の機会損失（待ち切れずに帰客）が発生しています。
在庫管理も目視・手記録のため、廃棄ロスが売上の約6%に達しています。

■ 導入するITツール
タブレットPOSレジ（×3台）＋オンライン予約管理システム
・自動会計：会計時間を8分→1分に短縮
・予約の自動受付・リマインド送信：ノーショー率を50%削減見込み
・在庫自動連動：廃棄ロスを現状比40%削減

■ 期待される効果
・月間売上高：+8%（回転率向上・ノーショー削減）
・年間廃棄削減：約60万円
・スタッフ残業：月30時間削減`,
      },
      {
        label: "✅ 要件チェック",
        content: `【申請要件チェックリスト】

✅ 中小企業・小規模事業者（従業員20名以下の飲食業）→ 充足（5名）
✅ ITツールがIT導入支援事業者を通じた導入であること → 要確認（対応ベンダー選択が必要）
✅ 労働生産性向上の数値計画 → ドラフトに記載済み
⚠️ gBizIDプライムの取得 → 未取得の場合は申請前2〜3週間必要
⚠️ セキュリティ対策費（EDR等）が要件化 → 対応ソフトの選定が必要

【採択率を上げる3つのポイント】
1. 「労働生産性向上」の数値を具体的に（1人あたり売上高○%増など）
2. 「賃上げ計画」を明記すると加点（例：来年度最低賃金+50円）
3. 補助金終了後の自社負担での継続運用計画を記載`,
      },
    ],
  },
  {
    industry: "🏗 建設業",
    situation: "大阪府・従業員25名・工事管理アプリ＋省エネ設備導入希望",
    tabs: [
      {
        label: "🎯 診断結果",
        content: `【診断結果】2種類の補助金の組合せが最大化戦略です

■ 推奨補助金ランキング
1位 ものづくり補助金（一般型）★★★ ←工事管理DXに適用
   補助上限：750万円 / 補助率：1/2

2位 省エネルギー投資促進・脱炭素化支援補助金 ★★★ ←省エネ設備に適用
   補助上限：1億円（規模による） / 補助率：1/3〜1/2
   理由：エアコン・照明・コンプレッサー等の省エネ設備が対象。建設業の採択実績が高い。

3位 大阪府 中小企業DX促進補助金（都道府県独自）
   補助上限：100万円 / 補助率：1/2
   理由：国の補助金と一部併用可。申請負担が少ない。`,
      },
      {
        label: "📝 申請書ドラフト",
        content: `【事業計画書（抜粋）】省エネ補助金 申請書ドラフト

■ 事業名
高効率空調・LED照明一括更新による脱炭素・コスト削減計画

■ 現状のエネルギー使用状況
事務所・作業場合計の年間電力消費量：約180,000kWh
年間エネルギーコスト：約288万円（電力単価16円/kWh想定）
現行設備：エアコン（15年使用・省エネ等級なし）、蛍光灯照明

■ 導入予定設備
・高効率ヒートポンプ空調システム（APF値6.0以上）×6台
・LED照明（蛍光灯比消費電力60%削減）全棟更新
・エネルギー管理システム（BEMS）導入

■ 期待される削減効果
・年間省エネ量：約54,000kWh（現状比30%削減）
・CO2削減量：約27.0t-CO2/年
・年間コスト削減：約86万円
・投資回収期間：約7.5年（補助金活用時：約4.2年）`,
      },
      {
        label: "✅ 要件チェック",
        content: `【申請要件チェックリスト】

✅ 中小企業・小規模事業者（建設業：従業員300名以下）→ 充足（25名）
✅ 省エネ率が基準年比で1%以上削減 → ドラフトでは30%削減を計画（要件充足）
✅ SIIに登録した設備・機器であること → 対象機器リスト確認が必要
⚠️ 省エネ診断の受診が要件 → 申請前に中小企業省エネ診断を受診（無料）
⚠️ エネルギー使用量データの提出 → 電力会社から過去3年分を取り寄せる

【採択率を上げる3つのポイント】
1. 省エネ率を「最低限の1%」ではなく「高い削減率」で計画（審査で有利）
2. 脱炭素経営宣言・RE100目標を事業計画書に盛り込む（加点対象）
3. 補助金申請と同時に「省エネ認定」取得を目指すと社会的信用も向上`,
      },
    ],
  },
];

function SampleSection() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const sample = SAMPLES[activeIndustry];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3">実際の出力サンプル</div>
          <h2 className="text-2xl font-bold text-gray-900">こんな申請書ドラフトが自動生成されます</h2>
          <p className="text-sm text-gray-500 mt-2">業種・目的を入力するだけで、補助金診断から申請書まで一括作成</p>
        </div>

        {/* 業種タブ */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {SAMPLES.map((s, i) => (
            <button key={i} onClick={() => { setActiveIndustry(i); setActiveTab(0); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeIndustry === i ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {s.industry}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
          {/* 入力サマリー */}
          <div className="px-5 py-3 border-b border-gray-200 bg-amber-50">
            <p className="text-xs text-gray-500 font-medium">入力情報</p>
            <p className="text-sm text-gray-700 font-bold">{sample.situation}</p>
          </div>

          {/* 出力タブ */}
          <div className="p-5">
            <div className="flex gap-1 mb-4 flex-wrap">
              {sample.tabs.map((tab, i) => (
                <button key={i} onClick={() => setActiveTab(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === i ? "bg-amber-500 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{sample.tabs[activeTab].content}</pre>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">※ これはサンプルです。実際の生成結果はあなたの事業情報に基づいてカスタマイズされます</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/tool" className="inline-block bg-amber-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-600 shadow-lg shadow-amber-100">
            自分の補助金を無料で診断する →
          </Link>
          <p className="text-xs text-gray-400 mt-2">クレジットカード不要・3回まで無料</p>
        </div>
      </div>
    </section>
  );
}

const PAYJP_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY ?? "";

export default function HojyokinLP() {
  const [showPayjp, setShowPayjp] = useState(false);
  const [payjpPlan, setPayjpPlan] = useState<"once" | "standard">("once");

  function startCheckout(plan: "once" | "standard") {
    setPayjpPlan(plan);
    setShowPayjp(true);
  }

  return (
    <main className="min-h-screen bg-white">
      {showPayjp && (
        <PayjpModal
          publicKey={PAYJP_PUBLIC_KEY}
          planLabel={payjpPlan === "once" ? "1回払い ¥1,980" : "月額プラン ¥4,980/月"}
          plan={payjpPlan}
          onSuccess={() => setShowPayjp(false)}
          onClose={() => setShowPayjp(false)}
        />
      )}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-center text-xs text-amber-700">
        ⚠️ 本サービスは補助金情報の参考提案のみを行います。補助金申請書類の作成代行は行政書士の独占業務です。実際の申請は行政書士・認定支援機関にご依頼ください。
      </div>
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900">💰 AI補助金診断</span>
          <Link href="/tool" className="bg-amber-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-amber-600">無料で診断する</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-amber-50 text-amber-600 text-xs font-medium px-3 py-1 rounded-full mb-6">中小企業・個人事業主・個人向け</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          あなたが申請できる補助金を<br /><span className="text-amber-500">AIが30秒で診断</span>
        </h1>
        <p className="text-lg text-gray-500 mb-4 max-w-xl mx-auto">もらえるはずの補助金を知らずに損していませんか？<br />事業内容を入力するだけで申請可能な補助金を診断し、事業計画書作成の参考になる文章をAIが提案します。</p>
        <div className="flex justify-center gap-6 mb-8 text-sm text-gray-500">
          {["ものづくり補助金 最大1,250万円", "IT導入補助金 最大450万円", "小規模持続化補助金 最大200万円"].map(s => (
            <span key={s} className="flex items-center gap-1"><span className="text-amber-500">✓</span>{s}</span>
          ))}
        </div>
        <Link href="/tool" className="inline-block bg-amber-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-600 shadow-lg shadow-amber-100">無料で診断する →</Link>
        <p className="text-xs text-gray-400 mt-3">クレジットカード不要・3回まで無料</p>
      </section>

      {/* 2026年度 新補助金 速報 */}
      <section className="py-12 px-6 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">2026年度 NEW</span>
            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">IT補助金から変更</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            「デジタル化・AI導入補助金」2026年度から新設
          </h2>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            2026年度より、IT導入補助金が「<strong>デジタル化・AI導入補助金</strong>」へ刷新。
            補助率・対象経費・申請要件が大きく変わりました。
            変更点を把握して、<strong>申請書を今すぐ準備しましょう。</strong>
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "補助率", value: "最大2/3", note: "中小企業の場合" },
              { label: "補助上限", value: "最大450万円", note: "AI導入特枠" },
              { label: "申請期限", value: "2026年秋頃", note: "公募期間に注意" },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-xl border border-amber-200 p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div className="text-xl font-bold text-amber-600">{item.value}</div>
                <div className="text-xs text-gray-400">{item.note}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-amber-300 p-4 mb-4">
            <p className="text-sm font-bold text-gray-900 mb-2">✅ このAIで申請書を準備できること</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 自社がデジタル化・AI導入補助金の対象かチェック</li>
              <li>• 「事業計画書」「導入効果説明」をAIが自動生成</li>
              <li>• 採択されやすい表現・訴求ポイントをAIが提案</li>
            </ul>
          </div>
          <a href="#tool" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-full transition-colors text-sm">
            今すぐ補助金診断と事業計画の参考文を作る →
          </a>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">補助金でよくある悩み</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {["どんな補助金があるか知らない", "申請書類が難しくて諦めた", "コンサルに頼んだら成功報酬20%取られた", "申請しても採択されるか不安"].map(p => (
              <div key={p} className="flex gap-3 bg-white rounded-xl p-4 border border-gray-200">
                <span className="text-amber-500">💸</span>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SampleSection />

      {/* 利用者の声 */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-white">利用者の声</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "田中さん・仮名（飲食店経営・神奈川）", text: "ものづくり補助金に採択されました。どの補助金が使えるかわからなかったのですが、AIが事業内容を分析して3つの候補を提示してくれました。" },
              { name: "鈴木さん・仮名（IT企業・東京）", text: "IT導入補助金の申請書ドラフトをAIが作ってくれて、参考文として活用できました。通常の申請代行費用¥20万以上が節約できました。" },
              { name: "山田さん・仮名（製造業・愛知）", text: "補助金の存在は知っていたけど申請したことがなかった。AIの診断で自社が対象と分かり初めて申請できました。" },
            ].map((t) => (
              <div key={t.name} className="bg-gray-800 rounded-2xl p-6">
                <p className="text-gray-200 text-sm mb-4">「{t.text}」</p>
                <p className="text-blue-400 text-xs font-bold">{t.name}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-6">※個人の感想です。効果には個人差があります。</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-10">料金プラン</h2>
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 mb-8 max-w-2xl mx-auto text-sm">
            <p className="font-bold text-gray-900 mb-3 text-center">💰 補助金コンサルと比べると</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-gray-500 text-xs mb-1">補助金コンサル</div>
                <div className="text-2xl font-bold text-red-500">¥50万〜</div>
                <div className="text-xs text-gray-400">着手金+成功報酬15%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 text-xs mb-1">補助金AI</div>
                <div className="text-2xl font-bold text-green-600">¥4,980/月</div>
                <div className="text-xs text-gray-400">何度でも使い放題</div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-3">※申請書作成の参考ツールです。採択を保証するものではありません</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "お試し", price: "無料", limit: "3回まで", plan: null as null, highlight: false },
              { name: "1回払い", price: "¥1,980/回", limit: "今回の申請を完成させる", plan: "once" as const, highlight: true },
              { name: "スタンダード", price: "¥4,980/月", limit: "月20回診断＋ドラフト（複数申請向け）", plan: "standard" as const, highlight: false },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl border p-6 relative ${plan.highlight ? "border-amber-500 shadow-lg" : "border-gray-200"}`}>
                {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-amber-500 text-white px-3 py-0.5 rounded-full">人気</div>}
                <div className="font-bold mb-1">{plan.name}</div>
                <div className="text-2xl font-bold text-amber-500 mb-1">{plan.price}</div>
                <div className="text-xs text-gray-500 mb-4">{plan.limit}</div>
                {plan.plan === null ? (
                  <Link href="/tool" className="block w-full text-center text-sm font-medium py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                    無料で診断
                  </Link>
                ) : (
                  <button
                    onClick={() => startCheckout(plan.plan!)}
                    className={`block w-full text-center text-sm font-medium py-2.5 rounded-lg ${plan.highlight ? "bg-amber-500 text-white hover:bg-amber-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  >
                    申し込む
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-500 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">もらえる補助金、まず調べてみませんか</h2>
        <Link href="/tool" className="inline-block bg-white text-amber-600 font-bold px-8 py-4 rounded-xl hover:bg-amber-50">無料で診断する →</Link>
      </section>

      <footer className="border-t py-6 text-center text-xs text-gray-400 space-y-2">
        <p>AI補助金診断 © 2026 ※本サービスは情報提供を目的としており、申請を保証するものではありません。必ず公募要領をご確認ください。</p>
        <p>
          <Link href="/legal" className="underline hover:text-gray-600">特定商取引法に基づく表記</Link>
          {" "}・{" "}
          <Link href="/terms" className="underline hover:text-gray-600">利用規約</Link>
          {" "}・{" "}
          <Link href="/privacy" className="underline hover:text-gray-600">プライバシーポリシー</Link>
        </p>
        <div className="pt-2 border-t border-gray-100">
          <p className="mb-1">ポッコリラボの他のサービス</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <a href="https://claim-ai-beryl.vercel.app" className="hover:text-gray-600">クレームAI</a>
            <a href="https://keiyakusho-ai.vercel.app" className="hover:text-gray-600">契約書AIレビュー</a>
            <a href="https://rougo-sim-ai.vercel.app" className="hover:text-gray-600">老後シミュレーターAI</a>
            <a href="https://keiba-yoso-ai.vercel.app" className="hover:text-gray-600">競馬予想AI</a>
            <a href="https://ai-keiei-keikaku.vercel.app" className="hover:text-gray-600">AI経営計画書</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
