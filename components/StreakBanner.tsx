'use client';
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'hojokin_ai_streak_v2';

interface StreakData {
  count: number;
  lastDate: string;
  freezeCount: number;
  longestStreak: number;
}

function getStreakData(): StreakData {
  if (typeof window === 'undefined') return { count: 0, lastDate: '', freezeCount: 1, longestStreak: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lastDate: '', freezeCount: 1, longestStreak: 0 };
  } catch { return { count: 0, lastDate: '', freezeCount: 1, longestStreak: 0 }; }
}

function updateStreak(): { data: StreakData; isNewDay: boolean; isMilestone: boolean } {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const twoDaysAgo = new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10);

  const data = getStreakData();
  if (data.lastDate === today) return { data, isNewDay: false, isMilestone: false };

  let newCount: number;
  let freezeCount = data.freezeCount;

  if (data.lastDate === yesterday) {
    newCount = data.count + 1;
  } else if (data.lastDate === twoDaysAgo && freezeCount > 0) {
    newCount = data.count + 1;
    freezeCount--;
  } else {
    newCount = 1;
    freezeCount = 1;
  }

  const milestones = [3, 7, 14, 30, 60, 100];
  const isMilestone = milestones.includes(newCount);

  const newData: StreakData = {
    count: newCount,
    lastDate: today,
    freezeCount,
    longestStreak: Math.max(newCount, data.longestStreak),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  return { data: newData, isNewDay: true, isMilestone };
}

const MILESTONES = [
  { days: 3,  label: '3日連続',  color: '#CD7F32' },
  { days: 7,  label: '1週間',    color: '#C0C0C0' },
  { days: 14, label: '2週間',    color: '#FFD700' },
  { days: 30, label: '1ヶ月',    color: '#E5E4E2' },
  { days: 60, label: '2ヶ月',    color: '#FF6B6B' },
  { days: 100, label: '100日',   color: '#6366F1' },
];

export function StreakBanner() {
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationLabel, setCelebrationLabel] = useState('');

  useEffect(() => {
    const { data, isNewDay, isMilestone } = updateStreak();
    setStreak(data.count);

    if (isNewDay && isMilestone) {
      const milestone = MILESTONES.find(m => m.days === data.count);
      if (milestone) {
        setCelebrationLabel(milestone.label);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    }
  }, []);

  if (streak === 0) return null;

  const currentMilestone = [...MILESTONES].reverse().find(m => streak >= m.days);

  return (
    <>
      {showCelebration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          aria-live="polite"
          role="status"
        >
          <div className="text-center animate-bounce bg-black/60 rounded-2xl px-8 py-6">
            <p className="text-4xl font-bold text-yellow-400">{celebrationLabel}達成!</p>
            <p className="text-white/80 mt-1">{streak}日連続利用</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 py-2 px-4 text-sm" role="status" aria-label={`${streak}日連続利用中`}>
        <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 23c-3.866 0-7-3.134-7-7 0-3.866 3.134-9 7-15 3.866 6 7 11.134 7 15 0 3.866-3.134 7-7 7z"/>
        </svg>
        <span className="font-bold text-orange-300">{streak}日連続</span>
        {currentMilestone && (
          <span
            className="px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: `${currentMilestone.color}22`, color: currentMilestone.color, border: `1px solid ${currentMilestone.color}44` }}
          >
            {currentMilestone.label}達成中
          </span>
        )}
      </div>
    </>
  );
}
