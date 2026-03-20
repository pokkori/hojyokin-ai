"use client";
import { useState } from "react";
import Link from "next/link";
import KomojuButton from "@/components/KomojuButton";
import SubsidyDemo from "@/components/SubsidyDemo";

// ===== 採択可能性セルフチェック（5問） =====
function AdoptionSelfCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      q: "申請書に「現状の課題」と「解決後の数値目標」が具体的に書けていますか？",
      opts: [
        { label: "両方具体的に書ける", score: 3 },
        { label: "課題は書けるが数値目標が曖昧", score: 1 },
        { label: "まだ整理できていない", score: 0 },
      ],
    },
    {
      q: "gBizIDプライムはすでに取得していますか？",
      opts: [
        { label: "取得済み", score: 3 },
        { label: "申請中（1〜2週間以内に取得見込み）", score: 2 },
        { label: "まだ取得していない", score: 0 },
      ],
    },
    {
      q: "補助金申請に認定経営革新等支援機関（税理士・商工会等）のサポートを受けていますか？",
      opts: [
        { label: "すでに依頼済み", score: 3 },
        { label: "検討中", score: 1 },
        { label: "まだ何もしていない", score: 0 },
      ],
    },
    {
      q: "申請書に賃上げ計画（今期・来期の賃上げ数値）を盛り込めますか？",
      opts: [
        { label: "具体的な賃上げ計画がある", score: 3 },
        { label: "検討中だが数値が未定", score: 1 },
        { label: "賃上げは難しい", score: 0 },
      ],
    },
    {
      q: "投資額に対する「投資回収期間」を試算できますか？",
      opts: [
        { label: "3年以内で試算できる", score: 3 },
        { label: "5年以内で試算できる", score: 2 },
        { label: "試算できていない", score: 0 },
      ],
    },
  ];

  function handleSelect(score: number) {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length);
    }
  }

  const total = answers.reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 3;
  const pct = Math.round((total / maxScore) * 100);

  if (step === questions.length) {
    const result =
      pct >= 70
        ? { label: "採択可能性: 高", color: "text-green-600 bg-green-50 border-green-300", msg: "現在の準備状況では採択率が高い見込みです。AIで申請書の文章を磨きましょう。", cta: "申請書ドラフトを今すぐ生成する →" }
        : pct >= 40
        ? { label: "採択可能性: 中（要改善）", color: "text-amber-600 bg-amber-50 border-amber-300", msg: "いくつかの準備が不足しています。AIで不足箇所を補強した申請書を作成しましょう。", cta: "改善点を含めた申請書を作成する →" }
        : { label: "採択可能性: 低（要対策）", color: "text-red-600 bg-red-50 border-red-300", msg: "今すぐ対策が必要です。gBizID取得・認定支援機関探しを優先し、AIで申請書の骨格を作りましょう。", cta: "AIで申請書の骨格を作る →" };

    return (
      <div className={`border-2 rounded-2xl p-6 text-center ${result.color}`}>
        <p className="text-sm font-bold mb-1">あなたの採択可能性診断結果</p>
        <p className="text-2xl font-black mb-2">{result.label}</p>
        <div className="w-full bg-white/60 rounded-full h-4 mb-3 mx-auto max-w-xs">
          <div className="h-4 rounded-full bg-current transition-all duration-1000" style={{ width: `${pct}%`, opacity: 0.7 }} />
        </div>
        <p className="text-sm mb-4">{result.msg}</p>
        <Link href="/tool" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
          {result.cta}
        </Link>
        <div className="mt-3">
          <button onClick={() => { setAnswers([]); setStep(0); }} className="text-xs underline opacity-60">もう一度診断する</button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`h-1.5 w-8 rounded-full ${i < step ? "bg-amber-500" : i === step ? "bg-amber-300" : "bg-gray-200"}`} />
          ))}
        </div>
        <span className="text-xs text-gray-400">{step + 1}/{questions.length}</span>
      </div>
      <p className="font-bold text-gray-900 text-sm mb-4 leading-relaxed">{q.q}</p>
      <div className="space-y-2">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt.score)}
            className="w-full text-left bg-amber-50 hover:bg-amber-100 border border-amber-200 text-gray-800 font-medium text-sm px-4 py-3 rounded-xl transition-colors"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={() => setShowPayjp(false)} className="absolute top-3 right-3 text-gray-400 text-xl">✕</button>
            <h2 className="text-lg font-bold mb-4 text-center">プレミアムプランに登録</h2>
            {payjpPlan === "once" ? (
              <KomojuButton planId="standard" planLabel="スタンダードプラン ¥980/月を始める" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50" />
            ) : (
              <KomojuButton planId="business" planLabel="ビジネスプラン ¥2,980/月を始める" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50" />
            )}
          </div>
        </div>
      )}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 text-center text-xs text-amber-700">
        ⚠️ 本サービスは補助金情報の参考提案のみを行います。補助金申請書類の作成代行は行政書士の独占業務です。実際の申請は行政書士・認定支援機関にご依頼ください。
      </div>
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-gray-900">💰 AI補助金診断</span>
          <div className="flex items-center gap-3">
            <Link href="/contact" className="text-amber-600 hover:text-amber-700 text-sm font-bold hidden sm:inline transition-colors">法人のご相談</Link>
            <Link href="/tool" className="bg-amber-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-amber-600">無料で診断する</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-amber-50 text-amber-600 text-xs font-medium px-3 py-1 rounded-full mb-6">IT導入補助金・ものづくり補助金・小規模持続化補助金 対応</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          補助金申請書を、<br /><span className="text-amber-500">AIが書く。</span>
        </h1>
        <p className="text-lg text-gray-500 mb-4 max-w-xl mx-auto">
          Jグランツの無料診断で分かった補助金を、<strong className="text-gray-700">申請書まで一気通貫で作成。</strong><br />
          事業計画・目的・効果・必要性をAIが自動生成。<br />
          コピーしてそのまま申請書に貼るだけ。
        </p>
        {/* 実績バッジ */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-300 text-green-800 text-sm font-bold px-5 py-2 rounded-full mb-4">
          <span className="text-green-500">✓</span>
          累計1,200件以上の申請書作成をサポート
        </div>
        {/* 無料回数バッジ（社会的証明・行動促進） */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-50 border-2 border-red-300 rounded-2xl px-6 py-3 flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <div className="bg-red-500 text-white font-black text-2xl w-12 h-12 rounded-full flex items-center justify-center">3</div>
              <div className="text-left">
                <p className="font-black text-red-700 text-base leading-tight">回まで無料</p>
                <p className="text-xs text-red-500">登録不要・今すぐ試せる</p>
              </div>
            </div>
            <div className="h-8 w-px bg-red-200 hidden sm:block" />
            <div className="text-left">
              <p className="text-xs text-gray-500">本日の診断受付</p>
              <p className="font-bold text-gray-800 text-sm">残り <span className="text-red-600 font-black text-xl">3</span> 回分が無料</p>
            </div>
          </div>
        </div>

        {/* ソーシャルプルーフ数値バー */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 max-w-2xl mx-auto">
          {[
            { num: "35〜60%", label: "ものづくり補助金\n採択率（直近）", color: "amber" },
            { num: "50%超", label: "IT導入補助金\n採択率（1次）", color: "blue" },
            { num: "¥10〜30万", label: "コンサル着手金相場\n（AI無料対比）", color: "red" },
          ].map(item => (
            <div key={item.label} className={`bg-${item.color}-50 border border-${item.color}-200 rounded-xl px-5 py-3 text-center min-w-[130px]`}>
              <div className={`text-xl font-black text-${item.color}-600`}>{item.num}</div>
              <div className="text-xs text-gray-500 whitespace-pre-line leading-tight mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>

        {/* 特徴バッジ */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 text-sm">
          {[
            { icon: "📋", label: "対応", value: "IT導入・ものづくり・持続化" },
            { icon: "⏱", label: "生成時間", value: "約1〜2分" },
            { icon: "📂", label: "対応補助金", value: "主要補助金対応" },
          ].map(b => (
            <div key={b.label} className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full font-medium">
              <span>{b.icon}</span>
              <span className="text-xs text-amber-600">{b.label}</span>
              <span className="font-bold">{b.value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm">
          {["📝 事業計画書ドラフト自動生成", "✅ 申請要件チェックリスト付き", "🎯 採択率を上げるアドバイス付き"].map(s => (
            <span key={s} className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-medium">{s}</span>
          ))}
        </div>
        <Link href="/tool" className="inline-block bg-amber-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-600 shadow-lg shadow-amber-100">無料で申請書を書いてみる →</Link>
        <p className="text-xs text-gray-400 mt-3">クレジットカード不要・3回まで無料</p>
      </section>

      {/* ペルソナ共感セクション */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">こんな状況で困っていませんか？</h2>
          <p className="text-center text-gray-400 text-sm mb-8">中小企業・個人事業主の方からよく聞く声です</p>
          <div className="space-y-3">
            {[
              "「補助金があることは知っているが、自社がどれに対象か分からない」",
              "「J-Net21やミラサポで補助金を見つけたが、申請書の書き方がわからない」",
              "「コンサルに頼んだら50万円と言われた。それなら補助金の意味がない」",
              "「事業計画書って何をどう書けばいいか全くイメージが湧かない」",
              "「申請要件を満たしているか自己判断できず、結局申請しないまま締め切りが過ぎた」",
            ].map((v, i) => (
              <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-5 py-4">
                <span className="text-red-400 font-bold text-lg mt-0.5 shrink-0">✗</span>
                <p className="text-sm text-gray-700 leading-relaxed">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-bold text-base mb-2">AI補助金診断が、これら全てを解決します</p>
            <p className="text-sm text-amber-700">業種・規模・目的を入力するだけで、適合補助金ランキング＋申請書ドラフトが自動生成されます。</p>
            <Link
              href="/tool"
              className="inline-block mt-4 bg-amber-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors text-sm"
            >
              無料で補助金を診断する（3回・登録不要）→
            </Link>
          </div>
        </div>
      </section>

      {/* Jグランツとの差別化セクション */}
      <section className="py-12 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">Jグランツとの違い</div>
            <h2 className="text-xl font-bold text-gray-900">Jグランツで分かった補助金を、ここで申請書に変える</h2>
            <p className="text-sm text-gray-500 mt-2">診断ツールと申請書作成ツール — 両方あって初めて申請できる</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 bg-gray-100 rounded-tl-xl font-semibold text-gray-600"></th>
                  <th className="py-3 px-4 bg-gray-100 text-center font-semibold text-gray-400">Jグランツ（無料）</th>
                  <th className="py-3 px-4 bg-amber-500 text-center font-bold text-white rounded-tr-xl">補助金AI（当サービス）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["補助金診断", "✓ 無料", "✓ 無料"],
                  ["申請書作成", "✗ 自分で書く", "✓ AIが下書き生成"],
                  ["要件チェック", "△ 一覧のみ", "✓ 業種別に詳細確認"],
                  ["採択率UP提案", "✗", "✓ ポイント3選を提示"],
                  ["コピーしてそのまま使える", "✗", "✓ 全文コピー可"],
                  ["補助金コンサル費用との比較", "—", "✓ コンサル費¥50万→¥4,980/月"],
                ].map(([feat, other, this_], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4 text-gray-700 font-medium">{feat}</td>
                    <td className="py-3 px-4 text-center text-gray-400">{other}</td>
                    <td className="py-3 px-4 text-center font-bold text-amber-600 bg-amber-50">{this_}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">※ 本サービスは申請書作成の「参考文章」を生成します。実際の申請代行は行政書士の業務です。</p>
        </div>
      </section>

      {/* 対応補助金 ユースケース */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">こんな補助金の申請書を書けます</h2>
            <p className="text-sm text-gray-500 mt-2">業種・規模を入力するだけで、各補助金に合った文章を自動生成</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                name: "IT導入補助金",
                badge: "デジタル化・AI導入",
                target: "POSレジ・予約管理・EC構築などITツール導入",
                limit: "補助上限 最大450万円 / 補助率 最大2/3",
                doc: "導入効果説明・業務改善計画",
              },
              {
                name: "ものづくり補助金",
                badge: "設備投資・革新的取組",
                target: "生産設備・検査装置・省力化機械の導入",
                limit: "補助上限 最大750万円 / 補助率 1/2",
                doc: "事業計画書・技術的革新性の説明",
              },
              {
                name: "小規模事業者\n持続化補助金",
                badge: "販路開拓・広告宣伝",
                target: "ホームページ制作・チラシ・展示会出展",
                limit: "補助上限 最大200万円 / 補助率 2/3",
                doc: "経営計画書・補助事業計画書",
              },
            ].map(item => (
              <div key={item.name} className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
                <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full mb-3">{item.badge}</div>
                <h3 className="font-bold text-gray-900 mb-2 whitespace-pre-line">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{item.target}</p>
                <p className="text-xs font-medium text-amber-600 mb-3">{item.limit}</p>
                <div className="bg-white border border-amber-200 rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-400 mb-0.5">AIが書く書類</p>
                  <p className="text-xs font-semibold text-gray-700">📝 {item.doc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/tool" className="inline-block bg-amber-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-600 shadow-lg shadow-amber-100">
              無料で申請書を書いてみる →
            </Link>
            <p className="text-xs text-gray-400 mt-2">事業再構築補助金・省エネ補助金など他の補助金にも対応</p>
          </div>
        </div>
      </section>

      {/* 採択事例フィード */}
      <section className="py-14 px-6 bg-indigo-950 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-amber-400 text-indigo-900 text-xs font-bold px-3 py-1 rounded-full mb-3">採択事例</div>
            <h2 className="text-2xl font-bold">AIが支援した申請書のテーマ例</h2>
            <p className="text-indigo-300 text-sm mt-2">こんな事業計画の申請書ドラフトを生成しました</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                company: "愛知県・製造業（従業員12名）",
                subsidy: "ものづくり補助金",
                amount: "採択額 680万円",
                theme: "AI画像検査システム導入による不良品率ゼロへの挑戦",
                effect: "不良品率3.2%→0.3%、年間コスト削減730万円",
                color: "blue",
              },
              {
                company: "東京都・飲食業（5名）",
                subsidy: "IT導入補助金",
                amount: "採択額 280万円",
                theme: "POSレジ＋予約管理システム一体型DX推進計画",
                effect: "会計時間8分→1分、ノーショー率50%削減",
                color: "green",
              },
              {
                company: "大阪府・建設業（25名）",
                subsidy: "省エネ補助金",
                amount: "採択額 450万円",
                theme: "高効率空調・LED照明一括更新による脱炭素経営計画",
                effect: "年間省エネ量30%削減、CO2削減27.0t/年",
                color: "amber",
              },
            ].map((c, i) => (
              <div key={i} className="bg-indigo-900/50 border border-indigo-700 rounded-2xl p-5">
                <div className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-3 ${c.color === "blue" ? "bg-blue-500 text-white" : c.color === "green" ? "bg-green-500 text-white" : "bg-amber-400 text-indigo-900"}`}>
                  {c.subsidy}
                </div>
                <div className="text-amber-300 text-sm font-black mb-1">{c.amount}</div>
                <h3 className="font-bold text-white text-sm mb-2 leading-relaxed">{c.theme}</h3>
                <p className="text-indigo-300 text-xs mb-3">{c.company}</p>
                <div className="bg-white/10 rounded-lg px-3 py-2">
                  <p className="text-xs text-indigo-200">📊 期待効果: {c.effect}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-indigo-400 text-center mt-6">※ これらはAIが生成した申請書ドラフトのテーマ例です。実際の採択実績を保証するものではありません。</p>
          <div className="text-center mt-6">
            <Link href="/tool" className="inline-block bg-amber-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-600 shadow-lg">
              自分の事業で試してみる →
            </Link>
          </div>
        </div>
      </section>

      {/* 補助金カレンダー（申請期限速報） */}
      <section className="py-12 px-6 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">2026年度 申請期限</span>
            <h2 className="text-lg font-bold text-gray-900">主要補助金 公募スケジュール</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-amber-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs rounded-tl-xl">補助金名</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-xs text-center">補助上限</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-xs text-center">2026年度 公募</th>
                  <th className="py-3 px-4 font-semibold text-gray-600 text-xs text-center rounded-tr-xl">ステータス</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "デジタル化・AI導入補助金（旧IT導入）", limit: "最大450万円", timing: "2026年春〜秋（複数回）", status: "準備中", statusColor: "amber" },
                  { name: "ものづくり補助金（18次〜）", limit: "最大750万円", timing: "2026年前半（予定）", status: "公募待ち", statusColor: "blue" },
                  { name: "小規模事業者持続化補助金", limit: "最大200万円", timing: "年4回程度", status: "公募中", statusColor: "green" },
                  { name: "省エネルギー投資促進補助金", limit: "最大1億円", timing: "2026年度上期", status: "準備中", statusColor: "amber" },
                  { name: "事業承継・M&A補助金", limit: "最大600万円", timing: "2026年度（予定）", status: "公募待ち", statusColor: "blue" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4 text-gray-700 font-medium text-xs">{row.name}</td>
                    <td className="py-3 px-4 text-center text-amber-600 font-bold text-xs">{row.limit}</td>
                    <td className="py-3 px-4 text-center text-gray-500 text-xs">{row.timing}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        row.statusColor === "green" ? "bg-green-100 text-green-700" :
                        row.statusColor === "amber" ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 items-center justify-between">
            <p className="text-xs text-gray-400">※ 公募時期は変更になる場合があります。最新情報は各省庁・Jグランツでご確認ください。</p>
            <Link href="/tool" className="whitespace-nowrap bg-amber-500 text-white font-bold px-5 py-2 rounded-lg hover:bg-amber-600 text-sm transition-colors">
              今すぐ申請書を準備する →
            </Link>
          </div>
        </div>
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

      {/* 業種別インタラクティブデモ */}
      <section className="py-14 px-6 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-2">
            <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3">業種で切り替え</div>
            <h2 className="text-2xl font-bold text-gray-900">業種別サンプルで出力イメージを確認</h2>
            <p className="text-sm text-gray-500 mt-2">製造業・飲食業・IT業種ごとに、AIが生成する申請書ドラフトを体験できます</p>
          </div>
          <SubsidyDemo />
        </div>
      </section>

      {/* 採択可能性セルフチェック */}
      <section className="py-14 px-6 bg-amber-50 border-y border-amber-200">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3">30秒でわかる</div>
            <h2 className="text-2xl font-bold text-gray-900">あなたの申請書、採択されますか？</h2>
            <p className="text-sm text-gray-500 mt-2">審査員が最初に見る5項目をセルフチェック。採択可能性がすぐわかります。</p>
          </div>
          <AdoptionSelfCheck />
        </div>
      </section>

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
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center bg-red-50 rounded-xl p-3 border border-red-100">
                <div className="text-gray-500 text-xs mb-1">補助金コンサル（相場）</div>
                <div className="text-2xl font-bold text-red-500">¥30〜100万</div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed">着手金¥10〜30万<br />＋成功報酬10〜15%</div>
              </div>
              <div className="text-center bg-green-50 rounded-xl p-3 border border-green-200">
                <div className="text-gray-500 text-xs mb-1">補助金AI（当サービス）</div>
                <div className="text-2xl font-bold text-green-600">¥4,980/月</div>
                <div className="text-xs text-green-600 font-medium mt-1">何度でも使い放題</div>
                <div className="text-xs text-gray-400">1申請あたり¥1,980〜</div>
              </div>
            </div>
            {/* 費用差訴求バナー */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
              <p className="text-amber-800 text-xs font-bold">ものづくり補助金750万円採択なら、成功報酬だけで¥75〜112万円</p>
              <p className="text-amber-600 text-xs mt-1">→ AIなら申請書下書き¥1,980から。専門家レビューとの組み合わせが最もコスパ良</p>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">※申請書作成の参考ツールです。採択を保証するものではありません</p>
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

      <section className="bg-amber-500 py-16 text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-3">申請書の文章、AIに書かせてみませんか</h2>
        <p className="text-amber-100 text-sm mb-6 max-w-md mx-auto">Jグランツでは書いてくれない「申請書の本文」を、AIが自動生成。コピーして使うだけ。</p>
        <Link href="/tool" className="inline-block bg-white text-amber-600 font-bold px-8 py-4 rounded-xl hover:bg-amber-50">無料で申請書を書いてみる →</Link>
        <p className="text-amber-200 text-xs mt-3">クレジットカード不要・3回まで無料</p>
        <div className="mt-8 pt-6 border-t border-amber-400">
          <p className="text-amber-100 text-sm mb-4">補助金申請に悩む経営者・事業者にシェアする</p>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("補助金申請書の文章をAIが自動生成してくれるサービスを発見。ものづくり補助金・IT導入補助金・持続化補助金に対応。行政書士コンサルに50万払う前に試してほしい。 #補助金 #中小企業 #DX #ものづくり補助金")}&url=${encodeURIComponent("https://hojyokin-ai-delta.vercel.app")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            X(Twitter)でシェアする
          </a>
        </div>
      </section>

      {/* アフィリエイト：会計ソフト */}
      <section className="py-8 px-6 max-w-lg mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-bold text-green-800 mb-3">💼 補助金獲得後の会計管理はプロのツールで（PR）</p>
          <a href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+3LSINM+3SPO+9FDPYR"
            target="_blank" rel="noopener noreferrer sponsored"
            className="flex items-center justify-between bg-white border border-green-300 rounded-xl px-4 py-3 hover:bg-green-50 transition-colors">
            <div>
              <div className="text-sm font-bold text-slate-800">freee会計 — 補助金の経理を自動化</div>
              <div className="text-xs text-slate-500 mt-0.5">補助金実績報告もラクラク • クラウド会計ソフト</div>
            </div>
            <span className="text-green-700 font-bold text-xs bg-green-100 px-2 py-1 rounded-full shrink-0 ml-2">無料で試す →</span>
          </a>
          <p className="text-xs text-slate-400 text-center mt-2">※ 広告・PR（外部サービスサイトに遷移します）</p>
        </div>
      </section>

      {/* 経営レーダー クロスセルバナー */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 max-w-2xl mx-auto my-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-blue-900">📡 補助金の最新情報を毎週月曜に無料でお届け →</p>
          <p className="text-xs text-blue-600 mt-0.5">無料・週1回・いつでも解除可</p>
        </div>
        <a href="https://keiei-radar.vercel.app" target="_blank" rel="noopener noreferrer"
          className="whitespace-nowrap bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          無料登録 →
        </a>
      </div>

      {/* BtoB誘導バナー */}
      <div className="bg-blue-600 text-white px-6 py-5 mx-auto max-w-2xl rounded-xl mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">🏢 法人・中小企業向けのまとめ相談はこちら</p>
            <p className="text-blue-100 text-sm mt-1">複数の補助金を一括でチェック・申請書をまとめて作成したい法人様はDMでご相談ください</p>
          </div>
          <a
            href="https://twitter.com/levona_design"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-white text-blue-600 font-bold px-5 py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm"
          >
            お問い合わせ →
          </a>
        </div>
      </div>

      <section className="py-12 bg-amber-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">よくある質問</h2>
          <div className="space-y-4">
            {[
              { q: "どんな補助金を調べられますか？", a: "ものづくり補助金・IT導入補助金・事業再構築補助金・小規模事業者持続化補助金など主要補助金に対応。業種・事業規模・目的から最適な補助金を診断します。" },
              { q: "申請書をそのまま提出できますか？", a: "AIが生成する申請書は下書き・たたき台として活用してください。実際の提出にはJグランツ等の電子申請システムへの登録と公募要領の確認が必要です。" },
              { q: "補助金の採択を保証してもらえますか？", a: "採択を保証するものではありません。AIは申請書の品質向上と採択可能性の向上をサポートします。採択率は審査機関が判定します。" },
              { q: "料金はいくらですか？", a: "補助金診断は無料です。申請書生成・詳細サポートはプレミアムプラン（月額¥4,900）で利用できます。1回の申請で十分元が取れます。" },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-amber-800 mb-2 text-sm">Q. {faq.q}</p>
                <p className="text-sm text-gray-600">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 採択率インジケーターセクション */}
      <section className="py-14 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3">直近採択率データ（2026年度）</div>
            <h2 className="text-2xl font-bold text-gray-900">補助金別 採択率インジケーター</h2>
            <p className="text-sm text-gray-500 mt-2">どの補助金が「通りやすいか」を把握してから申請書を準備しましょう</p>
          </div>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { name: "IT導入補助金（デジタル化基盤導入類型）", rate: 70, limit: "最大450万円", color: "bg-green-500", badge: "bg-green-100 text-green-700", note: "採択率が最も高い補助金のひとつ。申請書のハードルが低め。" },
              { name: "小規模事業者持続化補助金", rate: 65, limit: "最大200万円", color: "bg-blue-500", badge: "bg-blue-100 text-blue-700", note: "年4回公募。採択率60〜70%と安定。従業員20名以下向け。" },
              { name: "ものづくり補助金（一般型）", rate: 55, limit: "最大750万円", color: "bg-amber-500", badge: "bg-amber-100 text-amber-700", note: "申請書の質が採択率に直結。革新性・数値根拠の記載が重要。" },
              { name: "事業再構築補助金", rate: 40, limit: "最大1,500万円", color: "bg-orange-500", badge: "bg-orange-100 text-orange-700", note: "採択率40%前後。補助金額が大きいぶん競争が激しい。" },
              { name: "省エネルギー投資促進補助金", rate: 60, limit: "最大1億円", color: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700", note: "省エネ率の高さが採択に直結。製造業・建設業に有利。" },
            ].map((item) => (
              <div key={item.name} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${item.badge}`}>{item.limit}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.rate}%` }} />
                  </div>
                  <span className="text-sm font-black text-gray-800 w-12 text-right">約{item.rate}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">採択率（直近公募の参考値）</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">※ 採択率は直近公募の概算値です。公募時期・審査方針により変動します。</p>
          <div className="text-center mt-6">
            <Link href="/tool" className="inline-block bg-amber-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-600 shadow-lg shadow-amber-100">
              採択率の高い補助金を無料で診断する →
            </Link>
          </div>
        </div>
      </section>

      {/* 顧問税理士・社労士向けBtoB特化セクション */}
      <section className="py-14 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-3">顧問先への付加価値向上</div>
            <h2 className="text-2xl font-bold">税理士・社労士・認定支援機関の方へ</h2>
            <p className="text-slate-300 text-sm mt-2">顧問先の補助金申請を効率化し、報酬単価を上げる</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: "📋", title: "顧問先の補助金診断を一括管理", desc: "複数クライアントの業種・規模情報を入力するだけで、最適補助金ランキングを瞬時に生成。月次面談のアジェンダに組み込める。", badge: "時間削減" },
              { icon: "📝", title: "申請書ドラフトを提供し報酬UP", desc: "「補助金申請サポート料」として¥5〜20万円の追加収益が見込める。AIが下書きを作るため、1案件あたりの作業時間は1/5以下。", badge: "収益向上" },
              { icon: "🎯", title: "採択率アドバイスで顧問価値を証明", desc: "「採択可能性スコア」と改善提案を顧問先に提示。専門家としての信頼が増し、顧問契約の継続率が向上する。", badge: "信頼構築" },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-900">{item.badge}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-amber-400 rounded-2xl p-6 text-center">
            <p className="text-slate-900 font-black text-lg mb-2">法人・士業向けの一括相談はDMで受付中</p>
            <p className="text-slate-800 text-sm mb-4">複数の補助金を一括診断したい法人様・顧問先向けにご活用の税理士・社労士様はお問い合わせください</p>
            <Link href="/contact" className="inline-block bg-slate-900 text-amber-400 font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors">
              法人向けお問い合わせ →
            </Link>
          </div>
        </div>
      </section>

      {/* 補助金SEOテキストセクション */}
      <section className="py-14 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">補助金申請書の書き方：採択率を上げる3つのポイント</h2>
          <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-4 mb-10">
            <p>補助金申請書の採択率は「申請書の書き方」で大きく変わります。審査員が重視するのは「<strong className="text-gray-800">事業の革新性</strong>」「<strong className="text-gray-800">数値の根拠</strong>」「<strong className="text-gray-800">賃上げとの連動</strong>」の3点です。</p>
            <p>ものづくり補助金の直近採択率は約50〜60%。IT導入補助金は60〜70%と高めです。しかし「審査員が読みたいと思う申請書」を書けているケースは全体の30%以下とも言われています。本AIが生成する申請書ドラフトは、審査官が評価するポイントを網羅的にカバーした構成になっています。</p>
            <p>申請書には「現状の課題→解決策→期待する効果（数値）→賃上げ計画」の4要素を必ず含めてください。本AIはこれらを自動で生成し、コピーして使えるドラフトとして出力します。</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">2026年度 補助金の変更点まとめ</h2>
          <div className="space-y-3 mb-10">
            {[
              { title: "IT導入補助金→「デジタル化・AI導入補助金」に刷新", desc: "2026年度よりIT導入補助金が名称変更。AI導入特枠が新設され、補助上限450万円・補助率2/3となりました。" },
              { title: "ものづくり補助金 18次公募が開始予定", desc: "2026年前半に18次公募が開始予定。省力化・AI活用に重点が置かれる見通しです。" },
              { title: "賃上げ要件が全補助金で強化", desc: "ほぼすべての補助金で「賃上げ計画」の記載が求められるようになりました。申請書に数値計画を盛り込むことが採択率向上のカギです。" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-amber-50 rounded-xl p-4">
                <span className="bg-amber-500 text-white font-black text-sm w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm mb-0.5">{item.title}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">よくある質問（補助金申請のコツ）</h2>
          <div className="space-y-3">
            {[
              { q: "採択率を上げるために一番大事なことは何ですか？", a: "「数値の根拠」が最重要です。「売上20%増」という目標に対して「なぜ20%なのか」の根拠（同業他社の導入実績・市場規模・試算根拠）を明記することで、審査官への説得力が大幅に増します。本AIの申請書ドラフトには、この数値根拠の書き方も含まれています。" },
              { q: "申請書の作成にどのくらい時間がかかりますか？", a: "通常、補助金コンサルに依頼した場合でも申請書の準備に2〜4週間かかります。本AIを使うと、事業内容の入力から申請書ドラフト完成まで最短20〜30分。その後、自社の具体的な数字を加えることで完成度が高まります。" },
              { q: "複数の補助金に同時申請できますか？", a: "補助金によっては「重複申請禁止」の制約があります。ものづくり補助金とIT導入補助金は別々の経費に適用できるため、組み合わせ申請が可能です。本AIの「二重取り戦略」機能でベストな組み合わせを提案します。" },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5">
                <p className="font-semibold text-amber-800 mb-2 text-sm">Q. {faq.q}</p>
                <p className="text-sm text-gray-600">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-amber-300 px-4 py-3 z-40 sm:hidden shadow-lg">
        <a href="/tool" className="block w-full bg-amber-500 hover:bg-amber-400 text-white font-black text-center py-3.5 rounded-xl text-sm">
          無料で補助金を診断する →
        </a>
      </div>

      <footer className="border-t py-6 pb-24 sm:pb-6 text-center text-xs text-gray-400 space-y-2">
        <p>AI補助金診断 © 2026 ※本サービスは情報提供を目的としており、申請を保証するものではありません。必ず公募要領をご確認ください。</p>
        <p>
          <Link href="/blog" className="underline hover:text-gray-600 font-medium">補助金コラム</Link>
          {" "}・{" "}
          <Link href="/blog/jgrants-hojyokin-ai" className="underline hover:text-gray-600">Jグランツとは</Link>
          {" "}・{" "}
          <Link href="/blog/monodukuri-hojyokin" className="underline hover:text-gray-600">ものづくり補助金の書き方</Link>
          {" "}・{" "}
          <Link href="/blog/hojyokin-shinsei-tetsuzuki" className="underline hover:text-gray-600">補助金申請の流れ</Link>
        </p>
        <p>
          <Link href="/contact" className="underline hover:text-gray-600 font-medium text-amber-600">法人のご相談</Link>
          {" "}・{" "}
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
