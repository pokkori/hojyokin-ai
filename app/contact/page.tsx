"use client";
import { useState } from "react";
import Link from "next/link";

type FormData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  subsidyName: string;
  message: string;
};

const INITIAL_FORM: FormData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  subsidyName: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/xdkgqnpr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          会社名: form.companyName,
          担当者名: form.contactName,
          メールアドレス: form.email,
          電話番号: form.phone,
          相談したい補助金: form.subsidyName,
          相談内容: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm(INITIAL_FORM);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ナビ */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-gray-900">
            💰 AI補助金診断
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="text-amber-600 text-sm font-bold hidden sm:inline"
            >
              法人のご相談
            </Link>
            <Link
              href="/tool"
              className="bg-amber-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              無料で診断する
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-14 px-6 text-center border-b border-amber-100">
        <div className="max-w-2xl mx-auto">
          <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
            法人・中小企業向け
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
            法人向け補助金申請支援の
            <br />
            <span className="text-amber-600">ご相談</span>
          </h1>
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            複数補助金の一括診断・申請書まとめ作成・社員向けセミナー等、
            法人・中小企業のご要件に合わせて対応いたします。
          </p>
          <div className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-xl px-5 py-2.5 text-sm font-bold text-amber-700">
            <span>📅</span> 3営業日以内にご回答いたします
          </div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12">
        {/* 特長 */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: "🎯", title: "複数補助金を一括診断", desc: "事業内容から適合補助金を一括でチェック" },
            { icon: "📝", title: "申請書ドラフト量産", desc: "複数案件を効率的に申請書化" },
            { icon: "👥", title: "社員研修・セミナー", desc: "補助金活用の社内勉強会も対応" },
          ].map((item) => (
            <div key={item.title} className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="text-xs font-bold text-gray-800 mb-1 leading-tight">{item.title}</p>
              <p className="text-xs text-gray-500 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 送信済み */}
        {status === "success" ? (
          <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-black text-green-800 mb-2">
              お問い合わせを受け付けました
            </h2>
            <p className="text-green-700 text-sm leading-relaxed mb-4">
              3営業日以内に担当者よりご登録いただいたメールアドレスへご回答いたします。
              お急ぎの場合は X（@levona_design）からもご連絡いただけます。
            </p>
            <Link
              href="/"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              トップページへ戻る
            </Link>
          </div>
        ) : (
          /* フォーム */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  会社名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                  placeholder="例：株式会社〇〇製作所"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  担当者名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  required
                  placeholder="例：山田 太郎"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="例：info@example.co.jp"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  電話番号
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="例：03-1234-5678"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                ご相談の補助金名（任意）
              </label>
              <input
                type="text"
                name="subsidyName"
                value={form.subsidyName}
                onChange={handleChange}
                placeholder="例：ものづくり補助金、IT導入補助金など（未定でも可）"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-gray-400"
              />
              <p className="text-xs text-gray-400 mt-1">
                補助金名が未定・複数ある場合は「未定」「複数」などご記入ください
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                相談内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder={`例：\n・従業員25名の製造業です\n・AI画像検査システムを導入予定で、ものづくり補助金の対象か確認したい\n・申請書の下書き作成を複数件まとめてお願いしたい`}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder-gray-400 resize-none leading-relaxed"
              />
            </div>

            {status === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                送信に失敗しました。お手数ですが、しばらくしてから再度お試しください。
              </div>
            )}

            {/* 注意事項 */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 space-y-1">
              <p className="font-bold">送信前にご確認ください</p>
              <p>• 本サービスは補助金情報の参考提案・申請書ドラフト生成のみ行います</p>
              <p>• 補助金申請書類の作成代行は行政書士の独占業務です</p>
              <p>• 採択を保証するものではありません</p>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-colors text-base"
            >
              {status === "submitting" ? "送信中..." : "相談内容を送信する →"}
            </button>

            <p className="text-center text-xs text-gray-400">
              📅 3営業日以内にご登録メールアドレスへご回答いたします
            </p>
          </form>
        )}

        {/* 別の連絡手段 */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-sm text-center text-gray-500 mb-4">お急ぎの場合・その他のお問い合わせ</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://twitter.com/levona_design"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X（Twitter）でDM
            </a>
            <Link
              href="/tool"
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
            >
              まず無料ツールを試す →
            </Link>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t py-6 pb-8 text-center text-xs text-gray-400 space-y-2 mt-4">
        <p>AI補助金診断 © 2026 ポッコリラボ</p>
        <p>
          <Link href="/" className="underline hover:text-gray-600">
            トップ
          </Link>
          {" "}・{" "}
          <Link href="/tool" className="underline hover:text-gray-600">
            無料診断ツール
          </Link>
          {" "}・{" "}
          <Link href="/legal" className="underline hover:text-gray-600">
            特定商取引法に基づく表記
          </Link>
          {" "}・{" "}
          <Link href="/privacy" className="underline hover:text-gray-600">
            プライバシーポリシー
          </Link>
        </p>
      </footer>
    </main>
  );
}
