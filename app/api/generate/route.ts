import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { isActiveSubscription } from "@/lib/supabase";
import { createErrorResponse, getClaudeErrorMessage } from "@/lib/claude-error";

export const dynamic = "force-dynamic";

let _client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!_client) _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return _client;
}
const FREE_LIMIT = 3;
const COOKIE_KEY = "hojyokin_use_count";
const APP_ID = "hojyokin";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) { rateLimit.set(ip, { count: 1, resetAt: now + 60000 }); return true; }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

const systemPrompt = `あなたはFP（ファイナンシャルプランナー）資格と中小企業診断士の知識を持つ補助金・助成金の専門コンサルタントです。10年以上の実績を持ち、採択率向上のノウハウを熟知しています。
J-Net21・Jグランツ等の競合サービスを超える、個別化された補助金診断と実用的な申請書ドラフトを提供します。

## 出力の絶対ルール

1. **数値の根拠を必ず明示する**
   - 補助上限額・補助率・採択率は根拠（公募要領・直近統計）とともに記述する
   - 不確かな場合は「概算」「直近公募実績」と明記する

2. **申請確度の高い順にランキング**
   - 依頼者の業種・規模・目的に最も合致する補助金を第1位とする
   - 「なぜあなたに合うか」を3点で具体的に説明する

3. **J-Net21との差別化ポイント**
   - 「あなたの業種・規模に合った」という個別化を徹底する
   - 申請書の書き方アドバイスまで踏み込む
   - 複数の補助金を組み合わせた「二重取り」戦略を示す
   - 「申請書の採択可能性スコア」を整数で ===SCORE=== の後に出力する（例: ===SCORE===\n73）

4. **今すぐできるアクション3ステップ**
   出力の最後に:
   【今日やること（5分以内）】: [具体的なアクション]
   【今週やること（1時間以内）】: [具体的なアクション]
   【今月やること（継続的）】: [具体的なアクション]

5. **根拠条文・法令基準日**
   - 補助金の根拠法令・要綱を明示すること（例: 中小企業等経営強化法、ものづくり補助金公募要領第〇条）
   - 回答の末尾に「※ 2026年3月時点の補助金情報に基づいています。公募要領・申請期間は変更される場合があります。最新情報は各省庁・Jグランツでご確認ください。」と記載すること
   - 回答の末尾に「※ 本回答はAIによる参考情報です。申請書類の作成代行は行政書士の独占業務です。実際の申請は行政書士・認定支援機関にご依頼ください。」と記載すること

最後に必ず「## 次の3ステップ」というセクションを追加し、ユーザーが今すぐ取れる具体的な行動を箇条書き（「- 」で始まる）3つ記載してください。各ステップは「〇〇する（例：記録を残す・専門家に相談する・証拠を収集する等）」の形式で書いてください。`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }
  const email = req.cookies.get("user_email")?.value;
  let isPremium = false;
  if (email) {
    isPremium = await isActiveSubscription(email, APP_ID);
  } else {
    isPremium = req.cookies.get("premium")?.value === "1" || req.cookies.get("stripe_premium")?.value === "1";
  }
  const cookieCount = parseInt(req.cookies.get(COOKIE_KEY)?.value || "0");
  if (!isPremium && cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "リクエストの形式が正しくありません" }, { status: 400 }); }

  // draftモードの場合
  const mode = (body as Record<string, string>).mode;
  if (mode === "draft") {
    const { subsidyType, bizOverview, subsidyUse } = body as Record<string, string>;
    if (!bizOverview || !subsidyUse) {
      return NextResponse.json({ error: "事業概要と補助金の用途は必須です" }, { status: 400 });
    }

    const draftPrompt = `以下の情報をもとに、${subsidyType}の申請書文章を作成してください（補助金種別: ${subsidyType || "ものづくり補助金"}）。

【自社事業の概要】
${bizOverview}

【補助金で何をするか】
${subsidyUse}

以下の構成で申請書の文章を作成してください（各セクションは「---」で区切ること）:

---
### 【1】事業計画の概要
（事業の目的・背景・現状の課題を具体的に記述。300〜500文字）

---
### 【2】補助事業の実施内容
（何を購入・導入・実施するか、手順を具体的に。300〜500文字）

---
### 【3】期待される効果・数値目標
（売上・生産性・コスト削減など数値目標を含めて。200〜400文字）

---
### 【4】審査員へのアピールポイント（3点）
1.
2.
3.

---
※本文章はAI生成の参考案です。実際の申請書には公募要領の指定フォーマットを使用してください。`;

    const newCount = cookieCount + 1;
    const stream = getClient().messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: draftPrompt }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          const meta = JSON.stringify({ count: newCount });
          controller.enqueue(encoder.encode(`\nDONE:${meta}`));
          controller.close();
        } catch (err) {
          const status = (err as { status?: number })?.status;
          const msg = getClaudeErrorMessage(status ?? 500);
          controller.enqueue(encoder.encode(`\nERROR:${JSON.stringify({ error: msg })}`));
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Set-Cookie": `${COOKIE_KEY}=${newCount}; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly; Secure; Path=/`,
      },
    });
  }

  const { businessType, employees, purpose, prefecture, isIndividual } = body as Record<string, string>;
  if (!purpose) return NextResponse.json({ error: "活用目的は必須です" }, { status: 400 });
  if (purpose.length > 1000) return NextResponse.json({ error: "活用目的は1000文字以内で入力してください" }, { status: 400 });

  const prompt = `以下の依頼者情報をもとに、申請可能な補助金の診断と採択を見据えた申請書ドラフトを作成してください。

【依頼者情報】
事業形態: ${isIndividual ? "個人（一般）" : "法人・個人事業主"}
業種: ${businessType || "未入力"}
従業員数: ${employees || "0"}名
所在地: ${prefecture || "未入力"}
活用目的・やりたいこと: ${purpose}

以下の構成で詳細に回答してください：

---

## [診断] 申請可能な補助金・助成金（優先度順 上位5件）

### ◆ 第1位: [補助金名]
- **補助上限額**:
- **補助率**:
- **申請期間**: （次回公募の想定時期）
- **主管省庁**:
- **採択率（直近）**:
- **あなたが選ばれる理由**: （具体的に3点）
- **注意すべき要件**:

### ◆ 第2位: [補助金名]
- **補助上限額**:
- **補助率**:
- **申請期間**:
- **主管省庁**:
- **採択率（直近）**:
- **あなたが選ばれる理由**: （具体的に3点）
- **注意すべき要件**:

### ◆ 第3位: [補助金名]
- **補助上限額**:
- **補助率**:
- **申請期間**:
- **主管省庁**:
- **あなたが選ばれる理由**: （具体的に2点）

### ◆ 第4位・第5位（簡易）
- [補助金名]: 補助上限額・補助率・一言コメント
- [補助金名]: 補助上限額・補助率・一言コメント

---

## [申請書] 申請書ドラフト（第1位の補助金向け・提出ベース）

### 【1】事業計画の概要
（事業の目的・背景・現状の課題を具体的に記述。300文字程度）

### 【2】補助事業の必要性・緊急性
（なぜ今この補助金が必要か、補助なしではどう困るかを論理的に記述。300文字程度）

### 【3】事業の具体的な実施内容
（何を購入・導入・実施するか、どんな手順で進めるかを具体的に記述。300文字程度）

### 【4】期待される効果と数値目標
（売上・生産性・コスト削減など数値で示せる目標を含めて記述。300文字程度）

### 【5】補助事業後の展開・持続可能性
（補助金終了後も事業が継続・発展できる根拠を記述。200文字程度）

---

## [チェック] 申請要件チェックリスト（第1位）

以下の項目を申請前に確認してください：
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]

---

## [改善] 採択率を上げる3つのポイント

1.
2.
3.

---

## [注意] よくある落選理由と対策

| 落選理由 | 対策 |
|---------|------|
|  |  |
|  |  |
|  |  |

---

※本情報は参考情報です。補助金の内容は変更される場合があります。実際の申請前に必ず公募要領・所管省庁の最新情報をご確認ください。`;

  const newCount = cookieCount + 1;
  const stream = getClient().messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: [
      {
        type: "text",
        text: systemPrompt,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: prompt }],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(chunk.delta.text));
          }
        }
        const meta = JSON.stringify({ count: newCount });
        controller.enqueue(encoder.encode(`\nDONE:${meta}`));
        controller.close();
      } catch (err) {
        console.error(err);
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      "Set-Cookie": `${COOKIE_KEY}=${newCount}; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly; Secure; Path=/`,
    },
  });
}
