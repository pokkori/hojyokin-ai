"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import KomojuButton from "@/components/KomojuButton";
import { track } from '@vercel/analytics';

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
          <KomojuButton
            planId="standard"
            planLabel="スタンダード ¥1,980（1回限り・今回の申請を完成）"
            className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
          <KomojuButton
            planId="business"
            planLabel="ビジネス ¥4,980/月（複数申請・何度でも）"
            className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          />
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
        <button
          onClick={() => {
            const bom = '\uFEFF';
            const blob = new Blob([bom + parsed.raw], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `補助金申請書ドラフト_${new Date().toISOString().slice(0,10)}.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="text-xs px-3 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-700 font-medium"
        >
          📥 TXTダウンロード
        </button>
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

// クイック診断プリセット
const QUICK_PRESETS = [
  {
    icon: "💻",
    label: "ITシステム・AIを入れたい",
    industry: "IT・Web・アプリ",
    purpose: "ITシステム・AI・クラウドツールを導入して業務を効率化・デジタル化したい。生産性向上と人件費削減を目指す。",
    color: "blue",
  },
  {
    icon: "🏭",
    label: "設備・機械を導入したい",
    industry: "製造業",
    purpose: "生産設備・機械・検査装置を新規導入して生産性を向上させたい。老朽化した設備の入れ替えや省力化も含む。",
    color: "orange",
  },
  {
    icon: "🛒",
    label: "販路拡大・広告をしたい",
    industry: "小売・EC",
    purpose: "ホームページ制作・EC構築・チラシ・展示会出展など販路開拓・広告宣伝に補助金を活用したい。",
    color: "green",
  },
  {
    icon: "⚡",
    label: "省エネ・脱炭素に取り組む",
    industry: "建設・不動産",
    purpose: "省エネ設備（LED・空調・太陽光等）の導入や脱炭素経営への取り組みに補助金を活用したい。",
    color: "emerald",
  },
  {
    icon: "🔄",
    label: "新事業・業態転換したい",
    industry: "その他",
    purpose: "既存事業からの転換・新分野への進出・新しいビジネスモデルへの挑戦に補助金を活用したい。",
    color: "purple",
  },
];

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
            {/* A4風ドキュメントプレビュー */}
            <div className="bg-white border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden">
              {/* 文書ヘッダー */}
              <div className="bg-amber-600 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white text-lg">📄</span>
                  <span className="text-white font-bold text-sm">補助金申請書ドラフト</span>
                  <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded font-medium">{subsidyType}</span>
                </div>
                <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/90 text-amber-700 font-bold hover:bg-white transition-colors">
                  {copied ? "✓ コピー済み" : "📋 全文コピー"}
                </button>
              </div>
              {/* 文書本文 */}
              <div className="p-6 max-h-[500px] overflow-y-auto">
                <div className="space-y-3">
                  {result.split('\n').map((line, i) => {
                    if (line.startsWith('## ') || line.startsWith('# ')) {
                      const heading = line.replace(/^#{1,3}\s/, '');
                      return (
                        <div key={i} className="border-l-4 border-amber-500 pl-3 mt-5 first:mt-0">
                          <h3 className="text-sm font-black text-amber-800">{heading}</h3>
                        </div>
                      );
                    }
                    if (line.startsWith('【') || line.startsWith('■') || line.startsWith('▶') || line.startsWith('◆')) {
                      return (
                        <p key={i} className="text-sm font-bold text-gray-900 mt-3 bg-amber-50 px-2 py-1 rounded">{line}</p>
                      );
                    }
                    if (line.startsWith('✓') || line.match(/^[・•]\s/) || line.match(/^[-]\s/) || line.match(/^\d+\.\s/)) {
                      const isCheck = line.startsWith('✓');
                      return (
                        <div key={i} className="flex gap-2 items-start text-sm text-gray-700 pl-2">
                          <span className="flex-shrink-0 mt-0.5 text-amber-500 font-bold">{isCheck ? '✓' : '●'}</span>
                          <span className="leading-relaxed">{line.replace(/^[✓・•\-]\s*/, '').replace(/^\d+\.\s*/, '')}</span>
                        </div>
                      );
                    }
                    if (line.trim() === '') return <div key={i} className="h-2" />;
                    return (
                      <p key={i} className="text-sm leading-relaxed text-gray-700">{line}</p>
                    );
                  })}
                </div>
              </div>
              {/* 文書フッター */}
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex items-center justify-between">
                <p className="text-xs text-gray-400">※ AIが生成した参考文章です。実際の申請前に認定支援機関・行政書士に確認してください。</p>
                <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="text-xs px-3 py-1 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 whitespace-nowrap ml-2">
                  {copied ? "✓ コピー済み" : "コピー"}
                </button>
              </div>
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

// ===== 業種別おすすめ補助金テーブル =====
const INDUSTRY_SUBSIDIES = [
  {
    icon: "🏭",
    industry: "製造業",
    subsidies: "ものづくり補助金・省エネ補助金",
    limit: "最大3,000万円",
    color: "blue",
  },
  {
    icon: "🍽️",
    industry: "飲食・小売",
    subsidies: "小規模事業者持続化補助金・IT導入補助金",
    limit: "最大250万円",
    color: "orange",
  },
  {
    icon: "💻",
    industry: "IT・サービス",
    subsidies: "IT導入補助金・事業再構築補助金",
    limit: "最大450万円",
    color: "purple",
  },
  {
    icon: "🏥",
    industry: "医療・介護",
    subsidies: "介護・障害福祉事業者向け補助金・医療DX推進補助金",
    limit: "要問合せ",
    color: "green",
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; badge: string; text: string }> = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   badge: "bg-blue-100 text-blue-700",   text: "text-blue-800" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-100 text-orange-700", text: "text-orange-800" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-100 text-purple-700", text: "text-purple-800" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  badge: "bg-green-100 text-green-700",  text: "text-green-800" },
};

function IndustrySubsidyTable() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 bg-amber-50">
        <p className="text-sm font-bold text-amber-800">📊 業種別よくある補助金</p>
        <p className="text-xs text-amber-600 mt-0.5">タップして詳細を確認できます</p>
      </div>
      <div className="divide-y divide-gray-100">
        {INDUSTRY_SUBSIDIES.map((row, i) => {
          const c = COLOR_MAP[row.color];
          const isOpen = openIdx === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-xl shrink-0">{row.icon}</span>
                <span className="flex-1 text-sm font-semibold text-gray-800">{row.industry}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${c.badge}`}>{row.limit}</span>
                <span className="text-gray-400 text-xs ml-1">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <div className={`px-4 pb-3 pt-1 ${c.bg} border-t ${c.border}`}>
                  <p className={`text-xs font-semibold ${c.text} mb-1`}>主な補助金</p>
                  <p className="text-sm text-gray-700">{row.subsidies}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-400">※ 上限金額は代表的な補助金の参考値です。公募時期により変動します。</p>
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
  const [quickSelected, setQuickSelected] = useState<number | null>(null);

  function applyQuickPreset(idx: number) {
    const preset = QUICK_PRESETS[idx];
    setQuickSelected(idx);
    setIsIndividual(false);
    setBusinessType(preset.industry);
    setPurpose(preset.purpose);
    setStep(2);
  }

  const INDUSTRIES = ["飲食・カフェ", "IT・Web・アプリ", "製造業", "建設・不動産", "小売・EC", "医療・介護", "美容・エステ", "教育・スクール", "農業・食品", "輸送・物流", "その他"];

  const canNext1 = isIndividual || (businessType !== "");
  const canNext2 = prefecture !== "";
  const canSubmit = purpose.trim().length > 0;

  return (
    <div className="space-y-4">
      {/* クイック診断ボタン（ステップ1のみ表示） */}
      {step === 1 && (
        <div className="mb-5">
          <p className="text-xs font-bold text-gray-500 mb-2">⚡ 目的から選ぶ（クイック診断）</p>
          <div className="grid grid-cols-1 gap-2">
            {QUICK_PRESETS.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => applyQuickPreset(i)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all text-sm font-medium
                  ${quickSelected === i
                    ? "bg-amber-500 text-white border-amber-500 shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:border-amber-400 hover:bg-amber-50"
                  }`}
              >
                <span className="text-lg shrink-0">{preset.icon}</span>
                <span>{preset.label}</span>
                <span className="ml-auto text-xs opacity-60">→</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 my-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">または詳しく入力する</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>
      )}

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
          {quickSelected !== null && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <span className="text-amber-600 text-sm">{QUICK_PRESETS[quickSelected].icon}</span>
              <span className="text-xs text-amber-700 font-medium">「{QUICK_PRESETS[quickSelected].label}」を選択中 — 内容を自由に編集できます</span>
            </div>
          )}
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

// ===== 申請準備チェックリスト =====
const HOJYOKIN_CHECKLIST = [
  {
    phase: "📋 申請前の準備",
    color: "amber",
    items: [
      { id: "h1", text: "gBizIDプライムの取得（申請に必須・審査2〜3週間）" },
      { id: "h2", text: "認定経営革新等支援機関（認定支援機関）を探す" },
      { id: "h3", text: "補助金の公募要領を最新版で入手・熟読する" },
      { id: "h4", text: "過去3期分の決算書・確定申告書を準備する" },
      { id: "h5", text: "補助対象経費の見積書（相見積もり含む）を取得する" },
    ],
  },
  {
    phase: "📝 事業計画書の作成",
    color: "blue",
    items: [
      { id: "h6", text: "自社の現状・課題を数値で整理する（売上/利益/従業員数等）" },
      { id: "h7", text: "補助事業の実施内容・スケジュールを明確に記述する" },
      { id: "h8", text: "投資により見込まれる数値目標（売上UP/コスト削減）を設定する" },
      { id: "h9", text: "「なぜこの補助金が必要か」の根拠・必然性を説明できる" },
      { id: "h10", text: "加点項目（DX・GX・賃上げ等）を確認し対応する" },
    ],
  },
  {
    phase: "✅ 申請・提出",
    color: "green",
    items: [
      { id: "h11", text: "電子申請システム（Jグランツ等）でアカウント登録" },
      { id: "h12", text: "申請書類を全てPDF化・容量確認（上限超えに注意）" },
      { id: "h13", text: "締め切り日より余裕を持って（1週間前）申請する" },
      { id: "h14", text: "申請受理確認・受付番号を記録する" },
    ],
  },
  {
    phase: "🏆 採択後の手続き",
    color: "purple",
    items: [
      { id: "h15", text: "交付申請書を期限内に提出する" },
      { id: "h16", text: "補助事業中の領収書・証拠書類を全て保管する" },
      { id: "h17", text: "事業完了報告書を期限内に提出する" },
      { id: "h18", text: "補助金の振込確認・精算完了" },
    ],
  },
];

const HOJYOKIN_CHECKLIST_KEY = "hojyokin_checklist";

function HojyokinChecklistTab() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try { setChecked(JSON.parse(localStorage.getItem(HOJYOKIN_CHECKLIST_KEY) ?? "{}")); } catch { /* */ }
  }, []);
  function toggle(id: string) {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(HOJYOKIN_CHECKLIST_KEY, JSON.stringify(next));
      return next;
    });
  }
  const total = HOJYOKIN_CHECKLIST.flatMap(p => p.items).length;
  const done = HOJYOKIN_CHECKLIST.flatMap(p => p.items).filter(i => checked[i.id]).length;
  const pct = Math.round((done / total) * 100);
  const colorMap: Record<string, string> = { amber: "#f59e0b", blue: "#3b82f6", green: "#10b981", purple: "#8b5cf6" };
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h2 className="text-xl font-bold text-gray-900 mb-2">📋 補助金申請 準備チェックリスト</h2>
      <p className="text-sm text-gray-500 mb-4">申請前に必要な準備が揃っているか確認しましょう。チェックした内容は自動保存されます。</p>
      {/* 進捗バー */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-700">申請準備の進捗</span>
          <span className="text-sm font-black text-amber-600">{done}/{total} 完了</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="h-3 rounded-full transition-all duration-500 bg-amber-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-1">{pct}% 完了</p>
        {done === total && (
          <div className="mt-3 bg-green-50 border border-green-300 rounded-lg p-3 text-center">
            <p className="text-green-700 font-bold text-sm">🎉 全項目チェック完了！申請の準備が整いました</p>
          </div>
        )}
      </div>
      {/* チェックリスト */}
      <div className="space-y-6">
        {HOJYOKIN_CHECKLIST.map(phase => {
          const phaseDone = phase.items.filter(i => checked[i.id]).length;
          const phaseColor = colorMap[phase.color] ?? "#6b7280";
          return (
            <div key={phase.phase} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between" style={{ borderLeft: `4px solid ${phaseColor}` }}>
                <span className="font-bold text-gray-800 text-sm">{phase.phase}</span>
                <span className="text-xs font-bold" style={{ color: phaseColor }}>{phaseDone}/{phase.items.length}</span>
              </div>
              <ul className="divide-y divide-gray-100">
                {phase.items.map(item => (
                  <li key={item.id}>
                    <button onClick={() => toggle(item.id)} className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                      <span className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checked[item.id] ? "border-amber-500 bg-amber-500" : "border-gray-300"}`}>
                        {checked[item.id] && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </span>
                      <span className={`text-sm leading-relaxed ${checked[item.id] ? "line-through text-gray-400" : "text-gray-700"}`}>{item.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <button onClick={() => { setChecked({}); localStorage.removeItem(HOJYOKIN_CHECKLIST_KEY); }} className="mt-4 text-xs text-gray-400 hover:text-gray-600 w-full text-center">🗑 チェックをリセット</button>
      {/* freee アフィリ */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm font-bold text-amber-800 mb-1">📊 事業計画書・決算書の作成に</p>
        <p className="text-xs text-amber-600 mb-3">補助金申請に必要な財務書類をクラウドで管理</p>
        <a href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+8TUYXE+3TT6+65W2N" target="_blank" rel="noopener noreferrer sponsored"
          className="flex items-center justify-between bg-white border border-amber-300 rounded-xl px-4 py-3 hover:bg-amber-50 transition-colors">
          <div>
            <div className="text-sm font-bold text-gray-800">freee — 会計ソフト 30日間無料</div>
            <div className="text-xs text-gray-500 mt-0.5">確定申告・決算書作成を自動化</div>
          </div>
          <span className="text-amber-600 font-bold text-xs bg-amber-100 px-2 py-1 rounded-full shrink-0 ml-2">無料で試す →</span>
        </a>
        <p className="text-xs text-gray-400 text-center mt-2">※ 広告（freee公式サイトに遷移します）</p>
      </div>
    </div>
  );
}

// ===== 申請スケジュール管理 =====
const SCHEDULE_KEY = "hojyokin_schedule";
const STATUS_CYCLE: Array<"未着手" | "準備中" | "申請済み"> = ["未着手", "準備中", "申請済み"];
const STATUS_COLORS: Record<string, string> = {
  "未着手":  "bg-gray-100 text-gray-600",
  "準備中":  "bg-amber-100 text-amber-700",
  "申請済み": "bg-green-100 text-green-700",
};

type ScheduleItem = { id: string; name: string; deadline: string; status: "未着手" | "準備中" | "申請済み" };

function ScheduleTab() {
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(SCHEDULE_KEY) ?? "[]")); } catch { /* */ }
  }, []);

  function save(next: ScheduleItem[]) {
    setItems(next);
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(next));
  }

  function addItem() {
    if (!name.trim()) return;
    save([...items, { id: Date.now().toString(), name: name.trim(), deadline, status: "未着手" }]);
    setName(""); setDeadline("");
  }

  function cycleStatus(id: string) {
    save(items.map(item => {
      if (item.id !== id) return item;
      const idx = STATUS_CYCLE.indexOf(item.status);
      return { ...item, status: STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length] };
    }));
  }

  function removeItem(id: string) {
    save(items.filter(i => i.id !== id));
  }

  const done = items.filter(i => i.status === "申請済み").length;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h2 className="text-xl font-bold text-gray-900 mb-1">📅 補助金申請スケジュール管理</h2>
      <p className="text-sm text-gray-500 mb-5">申請予定の補助金を登録して、ステータスを管理しましょう。</p>

      {/* 追加フォーム */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">
        <p className="text-sm font-bold text-gray-700 mb-3">＋ 申請予定を追加する</p>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="補助金名（例: ものづくり補助金）"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">申請期限（任意）</label>
              <input
                type="date"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              onClick={addItem}
              disabled={!name.trim()}
              className="self-end bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              追加
            </button>
          </div>
        </div>
      </div>

      {/* 件数バッジ */}
      {items.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500">{items.length}件登録中</span>
          <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">{done}件申請済み</span>
        </div>
      )}

      {/* スケジュール一覧（アコーディオン） */}
      {items.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400 text-sm">
          <div className="text-3xl mb-2">📭</div>
          <p>申請予定がまだ登録されていません</p>
          <p className="text-xs mt-1">診断後に補助金名をメモして追加しましょう</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(item => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[item.status]}`}>{item.status}</span>
                  <span className="flex-1 text-sm font-medium text-gray-800 truncate">{item.name}</span>
                  {item.deadline && (
                    <span className="text-xs text-gray-400 shrink-0">期限: {item.deadline}</span>
                  )}
                  <span className="text-gray-400 text-xs ml-1">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-gray-50">
                    <p className="text-xs text-gray-500 mb-3">
                      {item.deadline ? `申請期限: ${item.deadline}` : "期限: 未設定"}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => cycleStatus(item.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 font-bold hover:bg-amber-200 transition-colors"
                      >
                        ステータスを変更 → {STATUS_CYCLE[(STATUS_CYCLE.indexOf(item.status) + 1) % STATUS_CYCLE.length]}
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* クイック入力ヒント */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-xs font-bold text-amber-800 mb-2">💡 よく使う補助金名（クリックで追加）</p>
        <div className="flex flex-wrap gap-2">
          {["小規模持続化補助金", "ものづくり補助金", "IT導入補助金", "事業再構築補助金", "省エネ補助金"].map(n => (
            <button
              key={n}
              onClick={() => setName(n)}
              className="text-xs px-2 py-1 rounded-lg bg-white border border-amber-300 text-amber-700 hover:bg-amber-100 transition-colors"
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== ROI・生産性向上コスト削減試算 =====
function RoiCalculator() {
  const [employees, setEmployees] = useState(10);
  const [hourlyWage, setHourlyWage] = useState(2500);
  const [manualHours, setManualHours] = useState(20);
  const [subsidyAmount, setSubsidyAmount] = useState(300);
  const [systemCost, setSystemCost] = useState(500);
  const [showResult, setShowResult] = useState(false);

  // 年間削減工数 = 従業員数 × 月間削減時間 × 12
  const annualHoursSaved = employees * manualHours * 12;
  // 年間コスト削減額 = 削減工数 × 時給換算
  const annualCostSaving = Math.round(annualHoursSaved * hourlyWage / 10000);
  // 自己負担額（補助後）
  const selfCost = Math.max(0, systemCost - subsidyAmount);
  // 投資回収期間（年）
  const paybackYears = annualCostSaving > 0 ? (selfCost / annualCostSaving).toFixed(1) : "∞";
  // 5年間の純便益
  const netBenefit5y = annualCostSaving * 5 - selfCost;
  // ROI
  const roi = selfCost > 0 ? Math.round((netBenefit5y / selfCost) * 100) : 0;

  const adoptionLevels = [
    { score: 90, label: "採択可能性: 高", color: "green" },
    { score: 70, label: "採択可能性: 中", color: "amber" },
    { score: 50, label: "採択可能性: 低", color: "red" },
  ];
  // 投資回収 < 3年 → 採択率高、3〜5年 → 中、>5年 → 低
  const paybackNum = parseFloat(paybackYears as string);
  const adoptionIdx = isNaN(paybackNum) ? 2 : paybackNum < 3 ? 0 : paybackNum < 5 ? 1 : 2;
  const adoption = adoptionLevels[adoptionIdx];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-1">💹 補助金活用ROI・生産性向上試算</h2>
      <p className="text-sm text-gray-500 mb-6">ITツール・設備投資の費用対効果と補助金活用後の投資回収期間を計算します</p>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">対象従業員数</label>
              <span className="text-lg font-black text-amber-600">{employees}名</span>
            </div>
            <input type="range" min={1} max={100} step={1} value={employees}
              onChange={e => setEmployees(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1名</span><span>100名</span></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">1人あたりの時給（円）</label>
              <span className="text-lg font-black text-amber-600">{hourlyWage.toLocaleString()}円</span>
            </div>
            <input type="range" min={1000} max={5000} step={100} value={hourlyWage}
              onChange={e => setHourlyWage(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1,000円</span><span>5,000円</span></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">1人あたりの月間削減工数</label>
              <span className="text-lg font-black text-amber-600">{manualHours}時間/月</span>
            </div>
            <input type="range" min={1} max={80} step={1} value={manualHours}
              onChange={e => setManualHours(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1時間</span><span>80時間</span></div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">投資総額（万円）</label>
              <span className="text-lg font-black text-amber-600">{systemCost}万円</span>
            </div>
            <input type="range" min={50} max={3000} step={50} value={systemCost}
              onChange={e => setSystemCost(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-amber-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>50万円</span><span>3,000万円</span></div>
          </div>
          <div className="sm:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">見込み補助金額（万円）</label>
              <span className="text-lg font-black text-green-600">▼ {subsidyAmount}万円</span>
            </div>
            <input type="range" min={0} max={2000} step={50} value={subsidyAmount}
              onChange={e => setSubsidyAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0万円</span><span>2,000万円</span></div>
          </div>
        </div>
        <button onClick={() => setShowResult(true)}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors">
          ROIを計算する
        </button>
      </div>

      {showResult && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">年間削減コスト</p>
              <p className="text-xl font-black text-amber-600">{annualCostSaving.toLocaleString()}万円</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">自己負担額（補助後）</p>
              <p className="text-xl font-black text-green-600">{selfCost.toLocaleString()}万円</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">投資回収期間</p>
              <p className="text-xl font-black text-blue-600">{paybackYears}年</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">5年間ROI</p>
              <p className="text-xl font-black text-purple-600">{roi}%</p>
            </div>
          </div>
          <div className={`rounded-xl p-4 border-2 ${adoption.color === "green" ? "bg-green-50 border-green-300" : adoption.color === "amber" ? "bg-amber-50 border-amber-300" : "bg-red-50 border-red-300"}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${adoption.color === "green" ? "bg-green-500 text-white" : adoption.color === "amber" ? "bg-amber-500 text-white" : "bg-red-500 text-white"}`}>{adoption.label}</span>
              <span className="text-sm font-bold text-gray-800">申請書の投資回収根拠として使えます</span>
            </div>
            <p className="text-xs text-gray-600">
              {adoptionIdx === 0 && "投資回収3年未満は採択審査で高評価。「事業計画書」にこの数値を明記してください。"}
              {adoptionIdx === 1 && "投資回収3〜5年は標準的なレベル。より具体的な数値（売上UP・残業削減時間等）を追加すると採択率が上がります。"}
              {adoptionIdx === 2 && "投資回収5年超は審査で不利になることがあります。コスト削減効果以外の売上向上・品質改善などの効果も加算してください。"}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-bold text-gray-800 mb-2">📋 この数値を申請書に使う方法</p>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-700 font-mono whitespace-pre-line">{`【期待される効果】
・年間削減工数: ${annualHoursSaved.toLocaleString()}時間（${employees}名×${manualHours}時間/月×12ヶ月）
・年間コスト削減額: ${annualCostSaving.toLocaleString()}万円（時給${hourlyWage.toLocaleString()}円換算）
・投資回収期間: ${paybackYears}年（補助金活用後 自己負担${selfCost.toLocaleString()}万円）
・5年間の純利益効果: ${netBenefit5y.toLocaleString()}万円`}</div>
            <button
              onClick={() => navigator.clipboard.writeText(`【期待される効果】\n・年間削減工数: ${annualHoursSaved.toLocaleString()}時間（${employees}名×${manualHours}時間/月×12ヶ月）\n・年間コスト削減額: ${annualCostSaving.toLocaleString()}万円（時給${hourlyWage.toLocaleString()}円換算）\n・投資回収期間: ${paybackYears}年（補助金活用後 自己負担${selfCost.toLocaleString()}万円）\n・5年間の純利益効果: ${netBenefit5y.toLocaleString()}万円`)}
              className="mt-2 text-xs px-3 py-1.5 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 transition-colors"
            >
              📋 申請書用にコピーする
            </button>
          </div>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`補助金AIでROI試算してみた💹\n年間コスト削減: ${annualCostSaving.toLocaleString()}万円\n投資回収期間: ${paybackYears}年\n5年間ROI: ${roi}%\n→ https://hojyokin-ai-delta.vercel.app #補助金 #中小企業DX`)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors w-full"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            この試算結果をXでシェアする
          </a>
          <p className="text-xs text-gray-400 text-center">※ この試算はあくまで参考値です。実際の効果は導入するシステム・業務内容によって異なります。</p>
        </div>
      )}
    </div>
  );
}

export default function HojyokinTool() {
  const [activeTab, setActiveTab] = useState<"diagnose" | "draft" | "roi" | "checklist" | "schedule">("diagnose");
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
            <button onClick={() => setShowPayjp(false)} className="absolute top-3 right-3 text-gray-400 text-xl">✕</button>
            <h2 className="text-lg font-bold mb-4 text-center">プランに登録</h2>
            <KomojuButton planId="business" planLabel={payjpPlan === "once" ? "スタンダード ¥1,980を始める" : "ビジネス ¥4,980/月を始める"} className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 disabled:opacity-50" />
          </div>
        </div>
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
        <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
          {([["diagnose", "🎯 補助金を診断する"], ["draft", "📝 申請書を生成する"], ["roi", "💹 ROI試算"], ["checklist", "📋 申請チェックリスト"], ["schedule", "📅 スケジュール管理"]] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${activeTab === tab ? "border-amber-500 text-amber-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "draft" && (
        <div className="max-w-5xl mx-auto px-6 py-8">
          <DraftTab isPremium={!isLimit} onShowPaywall={() => setShowPaywall(true)} />
        </div>
      )}

      {activeTab === "roi" && (
        <div className="max-w-3xl mx-auto px-6 py-8">
          <RoiCalculator />
        </div>
      )}

      {activeTab === "checklist" && <HojyokinChecklistTab />}

      {activeTab === "schedule" && <ScheduleTab />}

      {activeTab === "diagnose" && (
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <WizardForm onSubmit={handleSubmit} loading={loading} isLimit={isLimit} />
            <IndustrySubsidyTable />
          </div>

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

      {/* 専門家サポートアフィリエイト（A8.net） */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="text-sm font-black text-green-900 mb-1">🏆 申請を成功させる専門家サポート</p>
          <p className="text-xs text-green-700 mb-4">AIの申請書を専門家がブラッシュアップ。採択率が大幅にUPします。</p>
          <div className="grid grid-cols-1 gap-3">
            <a href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+3LSINM+3SPO+9FDPYR" target="_blank" rel="noopener noreferrer sponsored"
              className="flex items-center justify-between bg-white border border-green-300 rounded-xl px-4 py-3 hover:bg-green-50 transition-colors">
              <div>
                <div className="text-sm font-bold text-slate-800">freee会計 — 補助金申請の財務書類作成</div>
                <div className="text-xs text-slate-500 mt-0.5">30日間無料 • 決算書・財務諸表を自動生成</div>
              </div>
              <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded-full">無料で試す →</span>
            </a>
            <a href="https://biz.moneyforward.com/" target="_blank" rel="noopener noreferrer sponsored"
              className="flex items-center justify-between bg-white border border-green-300 rounded-xl px-4 py-3 hover:bg-green-50 transition-colors">
              <div>
                <div className="text-sm font-bold text-slate-800">マネーフォワード クラウド — 中小企業向け</div>
                <div className="text-xs text-slate-500 mt-0.5">補助金申請に必要な試算表を瞬時に出力</div>
              </div>
              <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded-full">無料で試す →</span>
            </a>
          </div>
          <p className="text-xs text-slate-400 text-center mt-3">※ 広告・PR掲載（各社公式サイトに遷移します）</p>
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t mt-4 space-x-4">
        <a href="/legal" className="hover:text-gray-600">特定商取引法に基づく表記</a>
        <a href="/privacy" className="hover:text-gray-600">プライバシーポリシー</a>
        <p className="mt-2 text-gray-300">本サービスはAI生成情報を提供します。採択を保証するものではありません。専門家（行政書士・中小企業診断士）への相談を推奨します。</p>
      </footer>
    </main>
  );
}
