"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

function Confetti() {
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; color: string; size: number }[]>([]);

  useEffect(() => {
    const colors = ["#f59e0b", "#10b981", "#3b82f6", "#f97316", "#a855f7", "#06b6d4"];
    const ps = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 6,
    }));
    setParticles(ps);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s ease-in forwards;
        }
      `}</style>
    </div>
  );
}

function SuccessContent() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="max-w-lg w-full mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-7xl mb-4">💰</div>
          <h1 className="text-3xl font-black text-amber-800 mb-2">プレミアム会員へようこそ！</h1>
          <p className="text-gray-500">補助金AIのフル機能が解放されました</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-amber-800 mb-3 text-sm">あなたの特典</h2>
          <ul className="space-y-2 text-sm text-amber-900">
            <li className="flex items-start gap-2"><span className="text-amber-600 mt-0.5">✓</span>申請可能な補助金を優先度順に最大5件診断（無制限）</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 mt-0.5">✓</span>申請書ドラフトを自動生成（コピー・印刷対応）</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 mt-0.5">✓</span>採択率を上げるためのチェックリスト・アドバイス付き</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 mt-0.5">✓</span>業種別・規模別の最適補助金を優先度順に提示</li>
            <li className="flex items-start gap-2"><span className="text-amber-600 mt-0.5">✓</span>2026年度の新設補助金（デジタル化・AI導入補助金等）に対応</li>
          </ul>
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="font-bold text-gray-800 text-center text-sm">まずはこの3ステップ</h2>

          <Link href="/tool" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-amber-500">1</div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-sm">事業内容を入力して診断する</p>
              <p className="text-xs text-gray-400">業種・従業員数・目的を入力するだけ</p>
            </div>
            <span className="text-gray-300 group-hover:text-amber-600 transition-colors">→</span>
          </Link>

          <Link href="/tool" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-amber-500">2</div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-sm">申請書ドラフトをPDF保存する</p>
              <p className="text-xs text-gray-400">生成したドラフトは必ず保存しておこう</p>
            </div>
            <span className="text-gray-300 group-hover:text-amber-600 transition-colors">→</span>
          </Link>

          <Link href="/tool" className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-amber-400 hover:shadow-md transition-all group">
            <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-amber-500">3</div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-sm">複数の補助金を診断して比較する</p>
              <p className="text-xs text-gray-400">条件を変えて最適な申請先を見つけよう</p>
            </div>
            <span className="text-gray-300 group-hover:text-amber-600 transition-colors">→</span>
          </Link>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-sm text-green-800">
          <p className="font-bold mb-1">💡 採択率を上げるコツ</p>
          <p className="text-xs">補助金申請は公募開始から2〜4週間で締め切られることが多いです。診断結果を見たらすぐに申請書の準備を始めましょう。</p>
        </div>

        <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
          <p className="text-xs text-gray-500 mb-1">新しい補助金情報をすぐにチェック</p>
          <p className="text-sm font-bold text-gray-700">このサイトをブックマークしておきましょう</p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400 mb-1">ご感想をお聞かせください（30秒）</p>
          <a href="mailto:support@pokkorilab.com?subject=補助金AIへのご感想&body=ご感想をお書きください" className="text-xs text-blue-500 underline hover:text-blue-700">感想を送る →</a>
        </div>
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center py-12">
      <Suspense fallback={<div className="text-center text-gray-500">読み込み中...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
