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
    const draftPrompt = `あなたは補助金申請書の文章作成の専門家です。中小企業診断士・行政書士と連携した補助金支援実績を年間50件以上持ち、ものづくり補助金・IT導入補助金・小規模事業者持続化補助金など主要補助金の審査基準と採択ポイントを熟知しています。過去5年間の採択事例を300件以上分析し、審査員が「これは採択したい」と感じる申請書の構成と語彙を把握しています。

以下の情報から、審査員が高評価をつける申請書の文章をそのままコピーして使える状態で生成してください。

【品質基準（必須）】
- 各セクションは指定文字数を必ず満たすこと（文字数不足は不採択リスクを高めます）
- 「現状維持で十分」「既存設備で対応可能」と読まれる表現は避け、「補助金なしでは実現困難な必然性」を論理的に記述すること
- 数値・具体的な固有名詞（設備名・システム名・業界統計）を必ず盛り込むこと
- プロフェッショナルな行政文書語彙を使用すること（例：「行う」→「実施する」「遂行する」、「良くなる」→「改善が見込まれる」「向上が期待される」）

【補助金の種類】${subsidyType || "未指定"}
【事業の概要】${bizOverview}
【補助金で何をするか】${subsidyUse}

---

## ① 事業概要・現状の課題（**400〜550文字・必達**）

【記述の要件】
- 冒頭に「本事業は〜」と始め、事業の本質と社会的意義を1〜2文で示す
- 業界・市場の現状を数字で示す（例：「国内EC市場は2023年に○兆円を突破し、前年比○%成長を続けている」等の具体的な市場データ）
- 自社が直面している具体的な課題を2〜3点、論理的かつ数値を交えて説明する（例：「生産リードタイムが業界平均の1.5倍に相当する○日を要しており、受注機会損失が月平均○件発生している」）
- 「補助金なしには解決できない理由」と「今この時期に申請する必然性（市場変化・競合動向・規制対応等）」を明確にする
- 地域経済・業界への貢献・社会的意義（雇用維持・地域活性化・カーボンニュートラル等）にも言及する

（ここに400〜550文字の文章を生成）

---

## ② 補助事業の実施内容（**400〜550文字・必達**）

【記述の要件】
- 「本補助事業において、〜を実施します」と導入内容を冒頭で明示し、補助対象経費の全体像を示す
- 購入・導入する設備・システム・サービスの具体的な名称・スペック・想定金額・メーカー（または類似製品の代替表現）を記述（例：「クラウド型生産管理システム（想定導入費用：○○万円）を導入し、現行のExcel管理から脱却する」）
- 実施スケジュールを時系列で示す（例：「交付決定後1ヶ月以内にベンダー選定・発注を完了し、3ヶ月以内に導入・テスト運用を開始、6ヶ月以内に本格稼働を達成する」）
- 実施体制（担当者・役割分担・外部専門家の活用）を具体的に記述（例：「代表者が統括責任者、○○担当が実務推進者として、認定支援機関である○○商工会議所の指導のもと推進する」）
- 導入前の業務フローと導入後の改善点を対比して示す（Before→Afterの構造）

（ここに400〜550文字の文章を生成）

---

## ③ 期待される効果と数値目標（**300〜450文字・必達**）

【記述の要件】
- 導入後1年・3年後の定量目標を数値で示す（売上・生産性・コスト削減・雇用創出など。例：「売上高：1年後○○万円（現状比+○%）、3年後○○万円（現状比+○%）」）
- 目標数値の算出根拠を具体的に説明する（例：「業界平均の生産性向上率○%と自社の現在の生産量○個/月をもとに試算」）
- 定量効果に加え、定性効果（従業員の労働環境改善・顧客満足度向上・地域への波及効果等）も具体的に明記
- 「本補助事業が採択された場合、○年後には〜の状態を実現し、地域経済・業界の持続的発展に貢献します」と具体的に締める

（ここに300〜450文字の文章を生成）

---

## ④ 審査員へのアピールポイント（加点項目 箇条書き**5点・各理由付き**）

【記述の要件】
- 各補助金の審査基準に照らした「加点されやすいポイント」を5点、箇条書きで具体的に列挙
- 「賃上げ・雇用創出への貢献（例：採択後○年以内に従業員○名増員予定）」「DX・デジタル化推進（例：業務のペーパーレス化率○%達成）」「グリーン・脱炭素（例：電力消費量○%削減）」「地域経済への波及効果（例：地域内業者への外注比率○%維持）」「政策方向性との合致」等の観点を含める
- 各ポイントに「なぜ審査で評価されるか」の理由を1文で必ず付記する

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

  const prompt = `あなたは補助金・助成金の専門コンサルタントです。中小企業診断士の資格を持ち、ものづくり補助金・IT導入補助金・小規模事業者持続化補助金・事業再構築補助金・雇用調整助成金など国・都道府県・市区町村の補助金・助成金に精通しています。年間200件以上の補助金申請支援を行い、採択率は業界平均の2倍以上を誇ります。審査員の視点から「採択される申請書」と「落選する申請書」の違いを熟知しています。

【品質基準（必須）】
- 補助金名は実在する制度名を使用すること。架空の名称は禁止
- 各セクションで指定された文字数・項目数を必ず満たすこと
- 数値・具体的な金額・期日・機関名を盛り込み、抽象的な記述を避けること
- プロフェッショナルな行政・ビジネス語彙を使用すること（例：「対応する」→「対処する」「講じる」、「問題」→「課題」「懸案事項」）
- 実例・採択事例を参考にした具体的なアドバイスを提供すること

以下の依頼者情報をもとに、最適な補助金の診断と、採択を見据えた申請書ドラフトを日本語の自然なビジネス文書として作成してください。

【重要】回答の最初の行に必ず以下の形式でスコアを出力してください（他の回答内容の前に）:
===SCORE===XX
（XXは依頼者の事業内容・規模・明確性・補助金との適合性をもとに0〜100で評価した採択可能性スコア。平均的な事業が60〜70、具体的で優れた事業が80〜90、不明確・不適合な事業が30〜50）

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
      max_tokens: 4500,
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
