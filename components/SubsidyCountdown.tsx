"use client";
import { useState, useEffect } from "react";

const DEADLINES = [
  { name: "ものづくり補助金（第20次）", date: "2026-06-30" },
  { name: "IT導入補助金2026", date: "2026-07-31" },
  { name: "事業再構築補助金", date: "2026-05-31" },
];

export function SubsidyCountdown() {
  const [days, setDays] = useState<number | null>(null);
  const [subsidy, setSubsidy] = useState(DEADLINES[0]);

  useEffect(() => {
    const now = Date.now();
    const nearest = DEADLINES
      .map(d => ({ ...d, ms: new Date(d.date).getTime() - now }))
      .filter(d => d.ms > 0)
      .sort((a, b) => a.ms - b.ms)[0];
    if (nearest) {
      setSubsidy(nearest);
      setDays(Math.ceil(nearest.ms / 86400000));
    }
  }, []);

  if (days === null) return null;

  return (
    <div className="rounded-xl bg-amber-900/30 border border-amber-500/50 p-4 text-center mb-6">
      <p className="text-xs font-bold text-amber-400 mb-1">{subsidy.name} 公募締切まで</p>
      <p className="text-4xl font-black text-amber-300">
        {days}<span className="text-lg ml-1 font-bold">日</span>
      </p>
      <p className="text-xs text-amber-400/70 mt-1">今すぐAIで申請書を作成</p>
    </div>
  );
}
