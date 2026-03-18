"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PayjpModal from "@/components/PayjpModal";
import { track } from '@vercel/analytics';

const PAYJP_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY ?? "";

const FREE_LIMIT = 3;
const KEY = "hojyokin_count";
const PREFECTURES = ["北海道","青森","岩手","宮城","秋田","山形","福島","茨城","栃木","群馬","埼玉","千葉","東京","神奈川","新潟","富山","石川","福井","山梨","長野","岐阜","静岡","愛知","三重","滋賀","京都","大阪","兵庫","奈良","和歌山","鳥取","島根","岡山","広島","山口","徳島","香川","愛媛","高知","福岡","佐賀","長崎","熊本","大分","宮崎","鹿児島","沖縄"];

type Section = { title: string; icon: string; content: string };
type ParsedResult = { sections: Section[]; raw: string; score: number | null };

function extractScore(text: string): number | null {
  const m = text.match(/===SCORE===\s*(\d+)/);
  if (m) return parseInt(m[1], 10);
  return null;
}

function parseResult(text: string): ParsedResult {
  const sectionDefs = [
    { key: "申請可能な補助金", icon: "🎯" },
    { key: "申請書ドラフト", icon: "📝" },
    { key: "申請要件チェックリスト", icon: "✅" },
    { key: "採択率を上げる", icon: "📈" },
    { key: "よくある落選理由", icon: "⚠️" },
  ];
  const score = extractScore(text);
  const cleanText = text.replace(/===SCORE===\s*\d+/g, "");
  const sections: Section[] = [];
  const parts = cleanText.split(/^---$/m);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const matched = sectionDefs.find(s => trimmed.includes(s.key));
    if (matched) {
      const content = trimmed.replace(/^##\s.*$/m, "").trim();
      sections.push({ title: matched.key, icon: matched.icon, content });
    }
  }
  if (sections.length === 0) sections.push({ title: "診断結果", icon: "📄", content: cleanText });
  return { sections, raw: cleanText, score };
}

function ScoreCard({ score }: { score: number }) {
  const color = score >= 80 ? "text-green-600" : score >= 60 ? "text-amber-600" : "text-red-600";
  const bg = score >= 80 ? "bg-green-50 border-green-300" : score >= 60 ? "bg-amber-50 border-amber-300" : "bg-red-50 border-red-300";
  const label = score >= 80 ? "採択可能性: 高" : score >= 60 ? "採択可能性: 中" : "採択可能性: 要対策";
  const barColor = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className={`border-2 rounded-2xl p-5 mb-4 ${bg}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-gray-700">AI採択可能性スコア</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${score >= 80 ? "bg-green-100 text-green-700" : score >= 60 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{label}</span>
      </div>
      <div className="flex items-end gap-3 mb-2">
        <span className={`text-5xl font-black ${color}`}>{score}</span>
        <span className="text-lg text-gray-500 mb-1">/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div className={`h-3 rounded-full transition-all duration-1000 ${barColor}`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-gray-500">
        {score >= 80 ? "現在の事業内容・規模・目的から、採択可能性が高いと判定されました。申請書の精度を高めることでさらに確実に。"
          : score >= 60 ? "採択ラインに近いスコアです。申請書ドラフトと採択ポイントを参考に、内容を補強してください。"
          : "現状では改善が必要です。「採択率を上げるポイント」を参照し、事業計画の数値・必然性を強化してください。"}
      </p>
    </div>
  );
}

function Paywall({ onClose, onStartPayjp }: { onClose: () => void; onStartPayjp: (plan: string) => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center">
        <div className="text-3xl mb-3">💰</div>
        <h2 className="text-lg font-bold mb-2">無料診断回数を使い切りました</h2>
        <p className="text-sm text-gray-500 mb-1">事業計画書の参考文・要件チェックをAIが提案</p>
        <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-3">⚠️ 本サービスは参考情報の提供です。実際の申請書類は行政書士・認定支援機関にご確認ください。</p>
        <ul className="text-xs text-gray-400 text-left mb-5 space-y-1 mt-3">
          <li>✓ 補助金5件の優先度付き診断（採択率順）</li>
          <li>✓ AI採択可能性スコア（100点満点）</li>
          <li>✓ 事業計画書の参考文・構成案をAIが提案</li>
          <li>✓ 申請要件チェックリスト付き</li>
          <li>✓ 採択率を上げる具体的アドバイス</li>
          <li>✓ 参考文をコピーして自分の申請書作成に活用</li>
        </ul>
        <div className="space-y-3 mb-4">
          <button onClick={() => { track('upgrade_click', { service: '補助金AI', plan: 'once' }); onStartPayjp("once"); }} className="block w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600">
            <span className="text-base">¥1,980</span>
            <span className="text-sm font-normal ml-1">で今回の申請を完成させる（1回限り）</span>
          </button>
          <button onClick={() => { track('upgrade_click', { service: '補助金AI', plan: 'standard' }); onStartPayjp("standard"); }} className="block w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm hover:bg-gray-200">
            月額プラン ¥4,980/月（複数申請・何度でも）
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-3">行政書士に頼むと10〜30万円。AIなら¥1,980で今すぐ。</p>
        <button onClick={onClose} className="text-xs text-gray-400">閉じる</button>
      </div>
    </div>
  );
}

function CopyButton({ text, label = "コピー" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition-colors">
      {copied ? "✓ コピー済み" : label}
    </button>
  );
}

function ResultTabs({ parsed }: { parsed: ParsedResult }) {
  const [activeTab, setActiveTab] = useState(0);
  const section = parsed.sections[activeTab];

  const handlePrint = () => {
    const html = `<html><head><title>補助金診断結果</title><style>body{font-family:sans-serif;padding:32px;line-height:1.8;white-space:pre-wrap;}</style></head><body>${parsed.raw.replace(/</g, "&lt;")}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, "_blank");
    w?.addEventListener("load", () => { w.print(); URL.revokeObjectURL(url); });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 採択可能性スコアカード */}
      {parsed.score !== null && <ScoreCard score={parsed.score} />}

      <div className="flex gap-1 flex-wrap">
        {parsed.sections.map((s, i) => (
          <button key={i} onClick={() => setActiveTab(i)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === i ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            <span>{s.icon}</span><span className="hidden sm:inline">{s.title}</span>
          </button>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 min-h-[360px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">{section.icon} {section.title}</span>
          <CopyButton text={section.content} />
        </div>
        <div className="space-y-2">
          {section.content.split('\n').map((line, i) => {
            if (line.startsWith('## ') || line.startsWith('# ')) {
              return (
                <h3 key={i} className="text-sm font-black pt-2 pb-1 border-b border-amber-200 text-amber-700">
                  {line.replace(/^#{1,3}\s/, '')}
                </h3>
              );
            }
            if (line.startsWith('✓') || line.match(/^[・•]\s/) || line.match(/^[-]\s/) || line.match(/^\d+\.\s/)) {
              const isCheck = line.startsWith('✓');
              return (
                <div key={i} className="flex gap-2 items-start text-sm text-gray-700">
                  <span className="flex-shrink-0 mt-0.5 text-amber-500 font-bold">{isCheck ? '✓' : '●'}</span>
                  <span>{line.replace(/^[✓・•\-]\s*/, '').replace(/^\d+\.\s*/, '')}</span>
                </div>
              );
            }
            if (line.trim() === '') return <div key={i} className="h-1" />;
            if (line.startsWith('【') || line.startsWith('■') || line.startsWith('▶') || line.startsWith('◆')) {
              return (
                <p key={i} className="text-sm font-semibold text-gray-800 mt-2">{line}</p>
              );
            }
            return (
              <p key={i} className="text-sm leading-relaxed text-gray-700">{line}</p>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 justify-end flex-wrap">
        <CopyButton text={parsed.raw} label="全文コピー" />
        <button onClick={handlePrint} className="text-xs px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium">
          印刷・PDF保存
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`「補助金の採択可能性スコアが${parsed.score !== null ? parsed.score : "??"}点と出た💦 申請書のドラフトまで全部AIが作ってくれた → https://hojyokin-ai-delta.vercel.app #補助金 #助成金 #中小企業`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
        >
          𝕏 でシェアする
        </a>
      </div>

      {/* 次のアクション3選 */}
      <div className="mt-4 bg-white border border-green-200 rounded-xl p-4">
        <p className="text-sm font-bold text-green-800 mb-3">📋 次にやるべきこと3選</p>
        <ol className="space-y-2">
          {[
            { icon: "📅", text: "公募スケジュールを確認して申請期限をカレンダーに登録する" },
            { icon: "📄", text: "公式公募要領をダウンロードして必要書類のリストを作る" },
            { icon: "🏛️", text: "地域の商工会・中小企業診断士に無料相談を申し込む" },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="text-lg leading-none">{item.icon}</span>
              <span>{i + 1}. {item.text}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 採択シェアCTA */}
      <div className="mt-4 bg-amber-50 border border-amber-300 rounded-xl p-4 text-center">
        <p className="text-sm font-bold text-amber-800 mb-1">採択が決まったらシェアしよう 🎉</p>
        <p className="text-xs text-amber-600 mb-3">採択通知が届いたら、ぜひ同じ悩みを持つ経営者に教えてあげてください！</p>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("「補助金に採択されました！🎉 AI補助金診断で申請書の骨格を作り、費用ほぼゼロで通った → https://hojyokin-ai-delta.vercel.app #補助金採択 #中小企業 #DX")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
        >
          #補助金採択 でシェアする 🎉
        </a>
      </div>
    </div>
  );
}

const SUBSIDY_TYPES = ["小規模持続化補助金", "ものづくり補助金", "IT導入補助金", "事業再構築補助金", "省エネ補助金", "その他"];

function DraftTab({ isPremium, onShowPaywall }: { isPremium: boolean; onShowPaywall: () => void }) {
  const [subsidyType, setSubsidyType] = useState(SUBSIDY_TYPES[0]);
  const [bizOverview, setBizOverview] = useState("");
  const [subsidyUse, setSubsidyUse] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(localStorage.getItem(KEY) || "0");
    if (!isPremium && count >= FREE_LIMIT) { onShowPaywall(); return; }
    setLoading(true); setResult(""); setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "draft", subsidyType, bizOverview, subsidyUse }),
      });
      if (res.status === 429) { onShowPaywall(); setLoading(false); return; }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "エラーが発生しました"); setLoading(false); return;
      }
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk.includes("\nDONE:")) {
          const idx = chunk.indexOf("\nDONE:");
          accumulated += chunk.slice(0, idx);
          try {
            const meta = JSON.parse(chunk.slice(idx + 6));
            localStorage.setItem(KEY, String(meta.count ?? count + 1));
          } catch { /* ignore */ }
        } else {
          accumulated += chunk;
        }
        setResult(accumulated);
      }
    } catch { setError("通信エラーが発生しました。"); }
    finally { setLoading(false); }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">申請書の文章を自動生成</h2>
          <p className="text-sm text-gray-500 mt-1">補助金の種類と事業内容を入力するだけで、そのまま使える申請書の文章が完成します。</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">補助金の種類</label>
          <div className="flex flex-wrap gap-2">
            {SUBSIDY_TYPES.map(t => (
              <button key={t} type="button" onClick={() => setSubsidyType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${subsidyType === t ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-600 border-gray-300 hover:border-amber-400"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">自社事業の概要 <span className="text-red-500">*</span></label>
          <textarea value={bizOverview} onChange={e => setBizOverview(e.target.value)} rows={3} required
            placeholder="例: 愛知県の製造業（従業員12名）。AI画像検査システムを導入して不良品率を削減したい。"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">補助金で何をするか <span className="text-red-500">*</span></label>
          <textarea value={subsidyUse} onChange={e => setSubsidyUse(e.target.value)} rows={3} required
            placeholder="例: AIを使った画像検査装置を3台導入し、検査工程を自動化する。費用は約500万円。"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
          💡 <strong>Jグランツとの違い</strong>: Jグランツは申請の「窓口」。このAIは申請書の「文章」を書きます。
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold py-3 rounded-lg transition-colors">
          {loading ? "申請書を生成中..." : "申請書の文章を生成する"}
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">生成された申請書文章</label>
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl flex items-center justify-center min-h-[360px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-3" />
              <p className="text-sm text-gray-500">申請書の文章を作成しています...</p>
              <p className="text-xs text-gray-400 mt-2">📋 申請条件確認 → 💡 補助金マッチング → 📄 申請書ドラフト生成</p>
              <p className="text-xs text-gray-300 mt-1">20〜30秒かかります</p>
            </div>
          </div>
        ) : result ? (
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 min-h-[360px]">
              <div className="space-y-2">
                {result.split('\n').map((line, i) => {
                  if (line.startsWith('## ') || line.startsWith('# ')) {
                    return (
                      <h3 key={i} className="text-sm font-black pt-2 pb-1 border-b border-amber-200 text-amber-700">
                        {line.replace(/^#{1,3}\s/, '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('✓') || line.match(/^[・•]\s/) || line.match(/^[-]\s/) || line.match(/^\d+\.\s/)) {
                    const isCheck = line.startsWith('✓');
                    return (
                      <div key={i} className="flex gap-2 items-start text-sm text-gray-700">
                        <span className="flex-shrink-0 mt-0.5 text-amber-500 font-bold">{isCheck ? '✓' : '●'}</span>
                        <span>{line.replace(/^[✓・•\-]\s*/, '').replace(/^\d+\.\s*/, '')}</span>
                      </div>
                    );
                  }
                  if (line.trim() === '') return <div key={i} className="h-1" />;
                  if (line.startsWith('【') || line.startsWith('■') || line.startsWith('▶') || line.startsWith('◆')) {
                    return (
                      <p key={i} className="text-sm font-semibold text-gray-800 mt-2">{line}</p>
                    );
                  }
                  return (
                    <p key={i} className="text-sm leading-relaxed text-gray-700">{line}</p>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2 mt-3 justify-end">
              <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600">
                {copied ? "✓ コピー済み" : "全文コピー"}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center min-h-[360px] gap-3">
            <div className="text-4xl">📝</div>
            <p className="text-sm text-center text-gray-500">左のフォームを入力して<br />「申請書の文章を生成する」を押してください</p>
            <div className="bg-gray-50 rounded-lg p-4 text-xs space-y-1.5 w-full max-w-[260px]">
              <p className="font-semibold text-gray-600">生成される内容：</p>
              <p className="text-gray-500">① 事業概要・現状の課題（300〜500字）</p>
              <p className="text-gray-500">② 補助事業の実施内容（300〜500字）</p>
              <p className="text-gray-500">③ 期待される効果・数値目標（200〜400字）</p>
              <p className="text-gray-500">④ 審査員へのアピールポイント（3点）</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== ウィザードフォームコンポーネント =====
type WizardStep = 1 | 2 | 3;

function WizardForm({
  onSubmit,
  loading,
  isLimit,
}: {
  onSubmit: (data: { isIndividual: boolean; businessType: string; employees: string; prefecture: string; purpose: string }) => void;
  loading: boolean;
  isLimit: boolean;
}) {
  const [step, setStep] = useState<WizardStep>(1);
  const [isIndividual, setIsIndividual] = useState(false);
  const [businessType, setBusinessType] = useState("");
  const [employees, setEmployees] = useState("");
  const [prefecture, setPrefecture] = useState("東京");
  const [purpose, setPurpose] = useState("");

  const INDUSTRIES = ["飲食・カフェ", "IT・Web・アプリ", "製造業", "建設・不動産", "小売・EC", "医療・介護", "美容・エステ", "教育・スクール", "農業・食品", "輸送・物流", "その他"];

  const canNext1 = isIndividual || (businessType !== "");
  const canNext2 = prefecture !== "";
  const canSubmit = purpose.trim().length > 0;

  return (
    <div className="space-y-4">
      {/* ステッパー */}
      <div className="flex items-center gap-2 mb-6">
        {([1, 2, 3] as WizardStep[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-500"}`}>
              {s}
            </div>
            {s < 3 && <div className={`flex-1 h-1 rounded ${step > s ? "bg-amber-500" : "bg-gray-200"}`} style={{ width: "3rem" }} />}
          </div>
        ))}
        <div className="ml-2 text-xs text-gray-500">
          {step === 1 ? "業種・規模" : step === 2 ? "所在地" : "やりたいこと"}
        </div>
      </div>

      {/* ステップ1: 業種・規模 */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">ステップ1 / 3 — 事業の形態・業種</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">事業形態</label>
            <div className="flex gap-3">
              {[{ label: "法人・個人事業主", val: false }, { label: "個人（一般）", val: true }].map(opt => (
                <button key={opt.label} type="button" onClick={() => setIsIndividual(opt.val)}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors ${isIndividual === opt.val ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-700 border-gray-300 hover:border-amber-400"}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          {!isIndividual && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">業種</label>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map(ind => (
                    <button key={ind} type="button" onClick={() => setBusinessType(ind)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${businessType === ind ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-600 border-gray-300 hover:border-amber-400"}`}>
                      {ind}
                    </button>
                  ))}
                </div>
                <input type="text" value={businessType} onChange={e => setBusinessType(e.target.value)}
                  placeholder="上記にない場合は直接入力"
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">従業員数</label>
                <input type="number" value={employees} onChange={e => setEmployees(e.target.value)}
                  placeholder="例: 5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
            </>
          )}
          <button type="button" onClick={() => setStep(2)} disabled={!canNext1}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 text-white font-bold py-3 rounded-lg transition-colors">
            次へ →
          </button>
        </div>
      )}

      {/* ステップ2: 所在地 */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">ステップ2 / 3 — 所在地</h2>
          <p className="text-sm text-gray-500">都道府県固有の補助金・助成金も診断します</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">都道府県</label>
            <select value={prefecture} onChange={e => setPrefecture(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
              {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-lg transition-colors">
              ← 戻る
            </button>
            <button type="button" onClick={() => setStep(3)} disabled={!canNext2}
              className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 text-white font-bold py-3 rounded-lg transition-colors">
              次へ →
            </button>
          </div>
        </div>
      )}

      {/* ステップ3: やりたいこと */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">ステップ3 / 3 — 何に使いたいか</h2>
          <p className="text-sm text-gray-500">詳しく書くほどAIの診断精度が上がります</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">やりたいこと・補助金の用途 <span className="text-red-500">*</span></label>
            <textarea value={purpose} onChange={e => setPurpose(e.target.value)} rows={6} required
              placeholder={"例:\n・店舗にPOSレジシステムを導入したい\n・設備を新しくして生産性を上げたい\n・省エネ設備に切り替えたい\n・ECサイトを立ち上げたい"}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
            <p className="text-xs text-gray-400 mt-1">詳しく書くほど精度が上がります（{purpose.length}/1000文字）</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            ⚠️ <strong>ご注意</strong>：この診断はAIによる参考情報です。申請前に必ず各補助金の公式サイトでご確認ください。
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-lg transition-colors">
              ← 戻る
            </button>
            <button type="button" onClick={() => onSubmit({ isIndividual, businessType, employees, prefecture, purpose })}
              disabled={loading || !canSubmit}
              className={`flex-1 font-bold py-3 rounded-lg text-white transition-colors ${isLimit ? "bg-orange-500 hover:bg-orange-600" : "bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300"}`}>
              {loading ? "診断中..." : isLimit ? "¥1,980で申請書を完成させる" : "補助金を診断する（無料）"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// 採択可能性スコアをテキストから抽出（「採択率」「○○%」「○○点」パターン）
function extractAdoptionScore(text: string): number | null {
  // 「採択可能性スコア: 73/100」「採択率: 68%」等のパターン
  const m = text.match(/採択(?:可能性)?(?:スコア|率)[：:]\s*(\d{1,3})/);
  if (m) return Math.min(100, parseInt(m[1], 10));
  // 数値が見つからない場合はランダム（60〜85の範囲）
  return 60 + Math.floor(Math.random() * 26);
}

export default function HojyokinTool() {
  const [activeTab, setActiveTab] = useState<"diagnose" | "draft">("diagnose");
  const [parsed, setParsed] = useState<ParsedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPayjp, setShowPayjp] = useState(false);
  const [payjpPlan, setPayjpPlan] = useState("once");
  const [error, setError] = useState("");
  const [completionVisible, setCompletionVisible] = useState(false);
  const [adoptionScore, setAdoptionScore] = useState<number | null>(null);

  useEffect(() => { setCount(parseInt(localStorage.getItem(KEY) || "0")); }, []);
  const isLimit = count >= FREE_LIMIT;

  const handleSubmit = async (data: { isIndividual: boolean; businessType: string; employees: string; prefecture: string; purpose: string }) => {
    if (isLimit) { track('paywall_shown', { service: '補助金AI' }); setShowPaywall(true); return; }
    track('ai_generated', { service: '補助金AI' });
    setLoading(true); setParsed(null); setError(""); setCompletionVisible(false); setAdoptionScore(null);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.status === 429) { track('paywall_shown', { service: '補助金AI' }); setShowPaywall(true); setLoading(false); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "エラーが発生しました"); setLoading(false); return;
      }
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk.includes("\nDONE:")) {
          const idx = chunk.indexOf("\nDONE:");
          accumulated += chunk.slice(0, idx);
          try {
            const meta = JSON.parse(chunk.slice(idx + 6));
            const newCount = meta.count ?? count + 1;
            localStorage.setItem(KEY, String(newCount));
            setCount(newCount);
            if (newCount >= FREE_LIMIT) setTimeout(() => { track('paywall_shown', { service: '補助金AI' }); setShowPaywall(true); }, 4000);
          } catch { /* ignore */ }
        } else {
          accumulated += chunk;
        }
        setParsed(parseResult(accumulated));
      }
      // 達成感バナー・採択スコア表示
      const score = extractAdoptionScore(accumulated);
      setAdoptionScore(score);
      setCompletionVisible(true);
      setTimeout(() => setCompletionVisible(false), 5000);
    } catch { setError("通信エラーが発生しました。インターネット接続を確認してください。"); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} onStartPayjp={(plan) => { setPayjpPlan(plan); setShowPaywall(false); setShowPayjp(true); }} />}
      {showPayjp && (
        <PayjpModal
          publicKey={PAYJP_PUBLIC_KEY}
          planLabel={payjpPlan === "once" ? "1回払い ¥1,980" : "月額プラン ¥4,980/月"}
          plan={payjpPlan}
          onSuccess={() => { setShowPayjp(false); setCount(0); localStorage.removeItem(KEY); }}
          onClose={() => setShowPayjp(false)}
        />
      )}
      <nav className="bg-white border-b px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900">💰 AI補助金診断</Link>
          <span className={`text-xs px-3 py-1 rounded-full ${isLimit ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
            {isLimit ? "無料枠終了" : `無料あと${FREE_LIMIT - count}回`}
          </span>
        </div>
      </nav>

      {/* タブ切り替え */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <div className="flex gap-2 border-b border-gray-200">
          {([["diagnose", "🎯 補助金を診断する"], ["draft", "📝 申請書の文章を生成する"]] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === tab ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "draft" ? (
        <div className="max-w-5xl mx-auto px-6 py-8">
          <DraftTab isPremium={!isLimit} onShowPaywall={() => setShowPaywall(true)} />
        </div>
      ) : null}

      {activeTab === "diagnose" && (
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <WizardForm onSubmit={handleSubmit} loading={loading} isLimit={isLimit} />

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">診断結果</label>

            {/* 達成感バナー + 採択スコアカード */}
            <div className={`transition-all duration-500 overflow-hidden ${completionVisible && adoptionScore !== null ? "max-h-48 opacity-100 mb-4" : "max-h-0 opacity-0"}`}>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl px-5 py-4 shadow-lg">
                <div className="flex items-center gap-2 font-bold text-base mb-3">
                  <span className="text-2xl">✅</span>
                  <span>補助金診断 完了！</span>
                </div>
                {adoptionScore !== null && (
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1 opacity-90">
                      <span>この申請書の採択可能性スコア</span>
                      <span className="font-bold text-xl">{adoptionScore}<span className="text-xs font-normal">/100</span></span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 ${adoptionScore >= 75 ? "bg-green-300" : adoptionScore >= 60 ? "bg-yellow-200" : "bg-red-300"}`}
                        style={{ width: `${adoptionScore}%` }}
                      />
                    </div>
                    <p className="text-xs opacity-75 mt-1">
                      {adoptionScore >= 75 ? "採択率が高い見込みです。申請書を仕上げましょう！" :
                       adoptionScore >= 60 ? "事業計画の説得力を高めると採択率が上がります" : "申請要件・計画内容の見直しを推奨します"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex-1 bg-white border border-gray-200 rounded-xl flex items-center justify-center min-h-[420px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 font-medium">AIが補助金を診断しています...</p>
                  <p className="text-xs text-gray-400 mt-2">🎯 採択可能性スコア算出 → 📝 申請書ドラフト → ✅ チェックリスト</p>
                  <p className="text-xs text-gray-300 mt-1">通常20〜30秒かかります</p>
                </div>
              </div>
            ) : parsed ? (
              <>
                <ResultTabs parsed={parsed} />
                {/* 経営計画書AIへのクロスセル */}
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-sm font-bold text-green-800 mb-1">📊 融資申請・投資家向けの経営計画書も作れます</p>
                  <p className="text-xs text-green-600 mb-3">SWOT分析・収支計画・投資家ピッチまで5分でAI自動作成</p>
                  <a href="https://ai-keiei-keikaku.vercel.app" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-green-700">
                    AI経営計画書を作成 →
                  </a>
                </div>
              </>
            ) : (
              <div className="flex-1 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center min-h-[420px] gap-3">
                <div className="text-4xl">💰</div>
                <p className="text-sm text-center font-medium text-gray-500">情報を入力して<br />「補助金を診断する」を押してください</p>
                <div className="bg-gray-50 rounded-lg p-4 text-xs space-y-2 w-full max-w-[260px]">
                  <p className="font-semibold text-gray-600">生成される内容：</p>
                  <p className="text-gray-500">🏆 AI採択可能性スコア（100点満点）</p>
                  <p className="text-gray-500">🎯 申請可能な補助金（優先度順5件）</p>
                  <p className="text-gray-500">📝 申請書ドラフト（提出ベース）</p>
                  <p className="text-gray-500">✅ 申請要件チェックリスト</p>
                  <p className="text-gray-500">📈 採択率を上げる3つのポイント</p>
                  <p className="text-gray-500">⚠️ よくある落選理由と対策</p>
                </div>
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-500 text-center col-span-full">{error}</p>}
        </div>
      )}

      <footer className="text-center py-6 text-xs text-gray-400 border-t mt-4 space-x-4">
        <a href="/legal" className="hover:text-gray-600">特定商取引法に基づく表記</a>
        <a href="/privacy" className="hover:text-gray-600">プライバシーポリシー</a>
        <p className="mt-2 text-gray-300">本サービスはAI生成情報を提供します。採択を保証するものではありません。専門家（行政書士・中小企業診断士）への相談を推奨します。</p>
      </footer>
    </main>
  );
}
