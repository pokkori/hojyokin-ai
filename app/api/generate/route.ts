import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { isActiveSubscription } from "@/lib/supabase";

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
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

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }
  const email = req.cookies.get("user_email")?.value;
  let isPremium = false;
  if (email) {
    isPremium = await isActiveSubscription(email, APP_ID);
  }
  if (!isPremium) {
    isPremium = req.cookies.get("premium")?.value === "1";
  }
  const cookieCount = parseInt(req.cookies.get(COOKIE_KEY)?.value || "0");
  if (!isPremium && cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "リクエストの形式が正しくありません" }, { status: 400 }); }

  const { businessType, employees, purpose, prefecture, isIndividual, mode, subsidyType, bizOverview, subsidyUse } = body as Record<string, string>;

  // 申請書文章生成モード
  if (mode === "draft") {
    if (!bizOverview || !subsidyUse) return NextResponse.json({ error: "事業概要と補助金の使途は必須です" }, { status: 400 });
    const draftPrompt = `あなたは補助金申請書の文章作成の専門家です。中小企業診断士・行政書士と連携した補助金支援実績を多数持ち、ものづくり補助金・IT導入補助金・小規模事業者持続化補助金など主要補助金の採択ポイントを熟知しています。
以下の情報から、審査員が高評価をつける申請書の文章をそのままコピーして使える状態で生成してください。
文章は自然な日本語のビジネス文書として、論理的かつ説得力のある表現を使ってください。

【補助金の種類】${subsidyType || "未指定"}
【事業の概要】${bizOverview}
【補助金で何をするか】${subsidyUse}

---

## ① 事業概要・現状の課題（350〜500文字）

【記述の要件】
- 冒頭に「本事業は〜」と始め、事業の本質を1文で示す
- 業界・市場の現状（規模感・トレンド・競合環境）を数字や具体的な背景で示す
- 自社が直面している具体的な課題を2〜3点、論理的に説明する
- 「補助金なしには解決できない理由」と「今この時期に申請する必然性」を明確にする
- 地域経済・業界への貢献・社会的意義にも言及する

（ここに350〜500文字の文章を生成）

---

## ② 補助事業の実施内容（350〜500文字）

【記述の要件】
- 「本補助事業において、〜を実施します」と導入内容を冒頭で明示
- 購入・導入する設備・システム・サービスの具体的な名称・スペック・想定金額を記述
- 実施スケジュールを時系列で示す（「交付決定後○ヶ月以内に発注、○ヶ月以内に導入完了」等）
- 実施体制（担当者・役割分担・外部専門家の活用）を記述
- 導入前の業務フローと導入後の改善点を対比して示す

（ここに350〜500文字の文章を生成）

---

## ③ 期待される効果と数値目標（250〜400文字）

【記述の要件】
- 導入後1年・3年後の定量目標を数値で示す（売上・生産性・コスト削減・雇用創出など）
- 目標数値の算出根拠を1文で説明する（「業界平均○%向上の実績データをもとに算出」等）
- 定量効果に加え、定性効果（従業員の働きやすさ・顧客満足度・地域への波及効果等）も明記
- 「本補助事業が採択された場合、〇年後には〜の状態を実現し、地域経済・業界の発展に貢献します」と締める

（ここに250〜400文字の文章を生成）

---

## ④ 審査員へのアピールポイント（加点項目 箇条書き4〜5点）

【記述の要件】
- 各補助金の審査基準に照らした「加点されやすいポイント」を具体的に列挙
- 「賃上げ・雇用創出への貢献」「DX・デジタル化推進」「グリーン・脱炭素」「地域経済への波及効果」「政策方向性との合致」等の観点を含める
- 各ポイントに「なぜ審査で評価されるか」の理由を1文で付記する

（ここに箇条書きを生成）

---

⚠️【免責事項】本サービスは申請書作成の補助ツールです。補助金の採択可否はAIでは保証できません。最終的な申請内容はご自身の責任でご確認の上、認定支援機関・行政書士への相談を推奨します。`;

    try {
      const newCount = cookieCount + 1;
      const stream = getClient().messages.stream({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2000,
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
            controller.enqueue(encoder.encode(`\nDONE:${JSON.stringify({ count: newCount })}`));
            controller.close();
          } catch (err) { console.error(err); controller.error(err); }
        },
      });
      return new Response(readable, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          "Set-Cookie": `${COOKIE_KEY}=${newCount}; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly; Secure; Path=/`,
        },
      });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "AI生成中にエラーが発生しました。" }, { status: 500 });
    }
  }

  if (!purpose) return NextResponse.json({ error: "活用目的は必須です" }, { status: 400 });
  if (purpose.length > 1000) return NextResponse.json({ error: "活用目的は1000文字以内で入力してください" }, { status: 400 });

  const prompt = `あなたは補助金・助成金の専門コンサルタントです。中小企業診断士の資格を持ち、ものづくり補助金・IT導入補助金・小規模事業者持続化補助金・事業再構築補助金・雇用調整助成金など国・都道府県・市区町村の補助金・助成金に精通しています。
以下の依頼者情報をもとに、最適な補助金の診断と、採択を見据えた申請書ドラフトを日本語の自然なビジネス文書として作成してください。

【依頼者情報】
事業形態: ${isIndividual ? "個人（一般）" : "法人・個人事業主"}
業種: ${businessType || "未入力"}
従業員数: ${employees || "0"}名
所在地: ${prefecture || "未入力"}
活用目的・やりたいこと: ${purpose}

以下の構成で詳細に回答してください：

---

## 🎯 申請可能な補助金・助成金（優先度順 上位5件）

### ◆ 第1位: [補助金名]
- **補助上限額**: （具体的な金額）
- **補助率**: （例: 中小企業2/3、小規模事業者3/4）
- **申請期間**: （次回公募の想定時期を具体的に。例: 2026年5月〜6月頃）
- **主管省庁・窓口**: （例: 中小企業庁 / 商工会議所経由）
- **採択率（直近）**: （%または「高め/普通/低め」で）
- **この依頼者が選ばれる理由**: （依頼者の業種・規模・目的に照らして具体的に3点）
- **注意すべき要件・落とし穴**: （申請前に必ず確認すべき条件）

### ◆ 第2位: [補助金名]
- **補助上限額**:
- **補助率**:
- **申請期間**: （次回公募の想定時期）
- **主管省庁・窓口**:
- **採択率（直近）**:
- **この依頼者が選ばれる理由**: （具体的に3点）
- **注意すべき要件・落とし穴**:

### ◆ 第3位: [補助金名]
- **補助上限額**:
- **補助率**:
- **申請期間**:
- **主管省庁・窓口**:
- **この依頼者が選ばれる理由**: （具体的に2点）

### ◆ 第4位・第5位（簡易）
- [補助金名]: 補助上限額・補助率・この依頼者へのひと言コメント
- [補助金名]: 補助上限額・補助率・この依頼者へのひと言コメント

---

## 📝 申請書ドラフト（第1位の補助金向け・提出ベース）

自然な日本語のビジネス文書として、審査員が読んで納得できる内容で生成してください。

### 【1】事業計画の概要（300〜400文字）
冒頭に「本事業は〜」と始め、事業の目的・背景・現状の課題を論理的に記述。業界動向・数字・競合環境を盛り込む。

（ここに300〜400文字の文章を生成）

### 【2】補助事業の必要性・緊急性（250〜350文字）
なぜ今この補助金が必要か、補助なしではどう困るかを論理的に記述。「この時期に申請する必然性」を明確にする。

（ここに250〜350文字の文章を生成）

### 【3】事業の具体的な実施内容（300〜400文字）
何を購入・導入・実施するか、どんな手順で進めるかを具体的に記述。実施スケジュール（月単位）も含める。

（ここに300〜400文字の文章を生成）

### 【4】期待される効果と数値目標（250〜350文字）
売上・生産性・コスト削減など数値で示せる目標（1年後・3年後）と算出根拠を記述。

（ここに250〜350文字の文章を生成）

### 【5】補助事業後の展開・持続可能性（200〜300文字）
補助金終了後も事業が継続・発展できる根拠を記述。地域経済・雇用への貢献にも言及。

（ここに200〜300文字の文章を生成）

---

## ✅ 申請要件チェックリスト（第1位）

申請前に確認すべき項目を、この依頼者の状況に合わせて6〜8項目列挙してください：
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]
- [ ]

---

## 📈 採択率を上げる3つのポイント（この依頼者向け）

1. （具体的なアドバイス。「〜すると審査員の印象が上がる」等）
2.
3.

---

## ⚠️ よくある落選理由と対策（この補助金・この業種向け）

| 落選理由 | この依頼者が取るべき対策 |
|---------|------|
| （具体的な落選理由） | （具体的な対策） |
| （具体的な落選理由） | （具体的な対策） |
| （具体的な落選理由） | （具体的な対策） |

---

⚠️【重要な免責事項】
・本情報はAIによる参考情報です。補助金の公募時期・要件・金額は毎年変更されます
・2026年の最新公募情報は必ず各省庁の公式サイト（中小企業庁・経済産業省等）でご確認ください
・「ものづくり補助金」「IT導入補助金」等は公募ごとに要件が変わります
・申請前には認定支援機関（商工会議所・金融機関等）への相談を強く推奨します`;

  try {
    const newCount = cookieCount + 1;
    const stream = getClient().messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3000,
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
          controller.enqueue(encoder.encode(`\nDONE:${JSON.stringify({ count: newCount })}`));
          controller.close();
        } catch (err) { console.error(err); controller.error(err); }
      },
    });
    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Set-Cookie": `${COOKIE_KEY}=${newCount}; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax; HttpOnly; Secure; Path=/`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI生成中にエラーが発生しました。しばらく待ってから再試行してください。" }, { status: 500 });
  }
}
