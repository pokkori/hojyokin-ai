import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI補助金診断｜あなたが申請できる補助金を30秒で診断",
  description: "事業内容を入力するだけ。AIがあなたに合った補助金を診断し、申請書のドラフトまで自動生成。中小企業・個人事業主・個人向け。",
};

export default function HojyokinLP() {
  return (
    <main className="min-h-screen bg-white">
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
        <p className="text-lg text-gray-500 mb-4 max-w-xl mx-auto">もらえるはずの補助金を知らずに損していませんか？<br />事業内容を入力するだけで申請可能な補助金と申請書ドラフトを自動生成します。</p>
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
            今すぐ申請書を作成する →
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

      {/* 利用者の声 */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10 text-white">利用者の声</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "田中さん（飲食店経営・神奈川）", text: "ものづくり補助金に採択されました。どの補助金が使えるかわからなかったのですが、AIが事業内容を分析して3つの候補を提示してくれました。" },
              { name: "鈴木さん（IT企業・東京）", text: "IT導入補助金の申請書ドラフトをAIが作ってくれて、ほぼそのまま提出できました。通常の申請代行費用¥20万以上が節約できました。" },
              { name: "山田さん（製造業・愛知）", text: "補助金の存在は知っていたけど申請したことがなかった。AIの診断で自社が対象と分かり初めて申請できました。" },
            ].map((t) => (
              <div key={t.name} className="bg-gray-800 rounded-2xl p-6">
                <p className="text-gray-200 text-sm mb-4">「{t.text}」</p>
                <p className="text-blue-400 text-xs font-bold">{t.name}</p>
              </div>
            ))}
          </div>
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
              { name: "お試し", price: "無料", limit: "3回まで", url: "/tool", highlight: false },
              { name: "1回払い", price: "¥1,980/回", limit: "今回の申請を完成させる", url: "/tool", highlight: true },
              { name: "スタンダード", price: "¥4,980/月", limit: "月20回診断＋ドラフト（複数申請向け）", url: "/tool", highlight: false },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl border p-6 relative ${plan.highlight ? "border-amber-500 shadow-lg" : "border-gray-200"}`}>
                {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-amber-500 text-white px-3 py-0.5 rounded-full">人気</div>}
                <div className="font-bold mb-1">{plan.name}</div>
                <div className="text-2xl font-bold text-amber-500 mb-1">{plan.price}</div>
                <div className="text-xs text-gray-500 mb-4">{plan.limit}</div>
                <Link href={plan.url} className={`block w-full text-center text-sm font-medium py-2.5 rounded-lg ${plan.highlight ? "bg-amber-500 text-white hover:bg-amber-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  {plan.name === "お試し" ? "無料で診断" : "申し込む"}
                </Link>
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
      </footer>
    </main>
  );
}
