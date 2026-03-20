'use client';
import { useState } from 'react';

const DEMO_DATA = {
  manufacturing: {
    label: '製造業',
    subsidy: 'ものづくり補助金',
    text: `【事業計画書】
事業者名: 株式会社〇〇精機
補助事業名: CNC旋盤設備導入による生産性向上事業

■事業概要
当社は○○精密部品を製造する創業30年の中小製造業です。
現在の主課題は旧型設備による生産効率の低下であり、
新型CNC旋盤の導入により加工時間を30%短縮します。

■実施内容
導入設備: 5軸CNC旋盤（○○製作所製）
投資額: ¥18,000,000（補助申請額¥12,000,000）

■期待効果
・月間生産能力: 500個 → 750個（+50%）
・不良品率: 3.2% → 1.5%（▲1.7%）
・人件費削減: 年間¥2,400,000

採択率インジケーター: ████████░░ 82%（類似案件の採択平均）`,
  },
  food: {
    label: '飲食業',
    subsidy: 'IT導入補助金',
    text: `【IT導入補助金 申請書】
事業者名: 有限会社〇〇フーズ
導入ITツール: POSレジシステム + 予約管理システム

■現状の課題
現在、予約はすべて電話対応で管理しており、
繁忙期の予約取りこぼしが月50件発生しています。

■導入内容
・クラウドPOSシステム（月額¥15,000）
・オンライン予約システム（月額¥8,000）
・顧客管理CRM連携

■導入後の効果
・予約取りこぼし: 月50件 → 5件（▲90%）
・客単価向上: ¥3,200 → ¥3,800（+19%）
・月間売上増加見込み: ¥480,000

採択率インジケーター: ███████░░░ 74%`,
  },
  it: {
    label: 'IT・Web',
    subsidy: '小規模事業者持続化補助金',
    text: `【小規模事業者持続化補助金 申請書】
事業者名: 合同会社〇〇デジタル（従業員5名）
補助事業名: Webサイトリニューアルによる新規顧客獲得

■事業概要
Webシステム開発を専業とする小規模IT企業です。
現サイトが2018年制作で情報が古く、問い合わせが減少。

■補助事業の内容
・Webサイト全面リニューアル（SEO対策込み）
・制作実績ページの充実
・導入事例コンテンツ（5社分）作成

■期待効果
・年間問い合わせ数: 24件 → 48件（+100%）
・成約率改善: 25% → 35%
・年間受注増加見込み: ¥3,600,000

採択率インジケーター: ████████░░ 81%`,
  },
};

export default function SubsidyDemo() {
  const [selected, setSelected] = useState<keyof typeof DEMO_DATA>('manufacturing');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mt-8">
      <h3 className="font-bold text-lg text-gray-800 mb-4">実際の生成サンプル（業種別）</h3>

      <div className="flex gap-2 mb-4 flex-wrap">
        {Object.entries(DEMO_DATA).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setSelected(key as keyof typeof DEMO_DATA)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selected === key
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {data.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-green-700">{DEMO_DATA[selected].subsidy}</span>
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
            AI生成サンプル
          </span>
        </div>
        <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed overflow-auto max-h-64">
          {DEMO_DATA[selected].text}
        </pre>
      </div>

      <a href="/tool" className="mt-4 block bg-green-600 text-white text-center font-bold px-6 py-3 rounded-lg hover:bg-green-700">
        自分の業種で申請書を生成する（無料）→
      </a>
    </div>
  );
}
