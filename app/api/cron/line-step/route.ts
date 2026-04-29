/**
 * LINE ステップ配信 CRON - 補助金AI
 * GET /api/cron/line-step
 * Vercel CRON: "0 0 * * *" (毎日 09:00 JST)
 *
 * 補助金AI専用シーケンス（中小企業・個人事業主向け補助金申請訴求）
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SERVICE_URL = "https://hojyokin-ai.vercel.app";
const SERVICE_NAME = "補助金AI";
const APP_ID = "hojyokin";

interface StepDef {
  step: number;
  nextStep: number | null;
  daysUntilNext: number;
  message: string;
}

const STEPS: StepDef[] = [
  {
    step: 1,
    nextStep: 2,
    daysUntilNext: 2,
    message: `【${SERVICE_NAME}】ご登録ありがとうございます。

事業内容を入力するだけで、使える補助金を自動でリストアップします。
まずは無料でお試しください。

${SERVICE_URL}`,
  },
  {
    step: 2,
    nextStep: 3,
    daysUntilNext: 3,
    message: `【${SERVICE_NAME}】IT導入補助金2026（最大450万円）をご存知ですか？

AIが申請書の下書きを自動生成します。
「うちは対象になるか？」という質問にもAIがその場で回答します。

${SERVICE_URL}`,
  },
  {
    step: 3,
    nextStep: 4,
    daysUntilNext: 2,
    message: `【${SERVICE_NAME}】月額プランのご案内です。

月額プランなら、補助金申請書の下書きを無制限に生成できます。
ものづくり補助金・小規模事業者持続化補助金・IT導入補助金など、複数の補助金を同時に調べることも可能です。

詳細: ${SERVICE_URL}#pricing`,
  },
  {
    step: 4,
    nextStep: null,
    daysUntilNext: 0,
    message: `【${SERVICE_NAME}】補助金採択率を上げる3つのコツをお伝えします。

1. 「誰のために」「何が変わるか」を数値で書く
2. 補助金ごとの審査基準に合わせた文体を使う
3. 類似事例との差別化を明確にする

AIがこれを全てサポートします。月額プランの詳細はこちら: ${SERVICE_URL}#pricing`,
  },
];

async function sendLineMessage(userId: string, text: string): Promise<boolean> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) return false;
  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: "text", text }],
    }),
  });
  return res.ok;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const now = new Date();
  const maxStep = STEPS.length;

  const { data: users, error } = await supabase
    .from("line_step_users")
    .select("id, line_user_id, step, next_send_at")
    .lte("next_send_at", now.toISOString())
    .lt("step", maxStep)
    .eq("app_id", APP_ID)
    .order("next_send_at", { ascending: true })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results: { userId: string; step: number; status: string }[] = [];

  for (const user of users ?? []) {
    const stepDef = STEPS.find((s) => s.step === (user.step as number) + 1);
    if (!stepDef) continue;

    const sent = await sendLineMessage(user.line_user_id as string, stepDef.message);
    const nextSendAt =
      stepDef.nextStep !== null && stepDef.daysUntilNext > 0
        ? new Date(now.getTime() + stepDef.daysUntilNext * 86400 * 1000).toISOString()
        : null;

    await supabase
      .from("line_step_users")
      .update({
        step: stepDef.step,
        next_send_at: nextSendAt,
        updated_at: now.toISOString(),
      })
      .eq("id", user.id);

    results.push({
      userId: user.line_user_id as string,
      step: stepDef.step,
      status: sent ? "sent" : "error",
    });
  }

  return NextResponse.json({
    processed: results.length,
    results,
    executedAt: now.toISOString(),
  });
}
