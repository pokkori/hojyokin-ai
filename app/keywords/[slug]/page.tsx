import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

/* ───────── キーワードデータ ───────── */
interface KwData {
  title: string;
  description: string;
  h1: string;
  heroLead: string;
  features: { icon: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  crossSell: { href: string; label: string }[];
  lastUpdated: string;
}

const SITE_URL = "https://hojyokin-ai-delta.vercel.app";

const KEYWORDS: Record<string, KwData> = {
  "hojokin-kobojigyo": {
    title: "小規模事業者持続化補助金｜対象要件をAIが無料診断",
    description:
      "小規模事業者持続化補助金の対象要件・申請方法をAIが判定。従業員数・業種を入力するだけで最大200万円の補助金申請書ドラフトを自動生成します。",
    h1: "小規模事業者持続化補助金の要件・申請方法をAIが判定",
    heroLead:
      "従業員5人以下（製造業20人以下）の小規模事業者が販路開拓・業務効率化に使える補助金。最大200万円（特別枠500万円）。AIが対象要件を自動チェックし、申請書ドラフトまで生成します。",
    features: [
      { icon: "clipboard-check", title: "要件を自動チェック", desc: "業種・従業員数を入力するだけで対象可否をAIが即時判定。商工会議所の確認前にセルフチェックできます。" },
      { icon: "file-text", title: "申請書ドラフト自動生成", desc: "事業内容を入力すると、経営計画書・補助事業計画書のドラフトをAIが自動生成。採択率アップのポイントも提示。" },
      { icon: "piggy-bank", title: "コンサル費用を大幅削減", desc: "通常15〜30万円のコンサル費用が不要。¥2,980で申請書の骨格が完成します。" },
    ],
    faqs: [
      { q: "小規模事業者持続化補助金の対象者は？", a: "商業・サービス業は従業員5人以下、宿泊業・娯楽業・製造業は20人以下の法人・個人事業主が対象です。NPO法人も要件を満たせば申請可能です。" },
      { q: "補助金額はいくらまで？", a: "通常枠で最大50万円、特別枠（賃金引上げ枠・卒業枠・後継者支援枠・創業枠）で最大200万円。インボイス特例で+50万円上乗せの場合もあります。" },
      { q: "申請に必要な書類は？", a: "経営計画書・補助事業計画書・事業支援計画書（商工会議所発行）が必須です。本AIが経営計画書と補助事業計画書のドラフトを自動生成します。" },
    ],
    crossSell: [
      { href: "/keywords/hojokin-shinsei-kakikata", label: "補助金申請書の書き方ガイド" },
      { href: "/keywords/hojokin-shinsa-point", label: "審査で加点されるポイント" },
    ],
    lastUpdated: "2026-03-31",
  },
  "hojokin-it-dounyu": {
    title: "IT導入補助金｜対象ツール・申請要件をAIが自動チェック",
    description:
      "IT導入補助金の対象ツール・申請要件をAIが自動チェック。会計ソフト・ECサイト・セキュリティ対策など、あなたの導入したいITツールが補助対象か即時判定します。",
    h1: "IT導入補助金の対象ツール・申請要件をAIが自動チェック",
    heroLead:
      "中小企業・小規模事業者がITツール導入費用の最大3/4（最大450万円）を補助。会計ソフト・受発注システム・ECサイト構築・セキュリティ対策が対象。AIが要件チェックから申請書作成まで自動サポート。",
    features: [
      { icon: "monitor", title: "対象ツールを即時判定", desc: "導入予定のITツール名を入力するだけで、IT導入補助金の対象かどうかをAIが即時判定します。" },
      { icon: "layers", title: "申請類型を自動選択", desc: "通常枠・セキュリティ対策推進枠・デジタル化基盤導入枠など、最適な申請類型をAIが提案。" },
      { icon: "trending-up", title: "採択率アップのコツ", desc: "加点項目（SECURITY ACTION・gBizIDプライム取得等）の取得ガイドもAIが解説。" },
    ],
    faqs: [
      { q: "IT導入補助金の対象となるITツールは？", a: "事務局に登録されたITツールが対象です。会計ソフト（freee・マネーフォワード等）、受発注システム、ECサイト構築ツール、セキュリティソフトなどが含まれます。" },
      { q: "補助率と補助額は？", a: "通常枠は補助率1/2以内で最大450万円。デジタル化基盤導入枠は補助率3/4以内（50万円以下）で会計・受発注・決済・ECの機能を持つツールが対象です。" },
      { q: "個人事業主でも申請できる？", a: "はい。中小企業・小規模事業者に該当すれば個人事業主でも申請可能です。gBizIDプライムの取得が必要になります。" },
    ],
    crossSell: [
      { href: "/keywords/hojokin-kobojigyo", label: "小規模事業者持続化補助金" },
      { href: "/keywords/hojokin-freelance", label: "フリーランス向け補助金" },
    ],
    lastUpdated: "2026-03-31",
  },
  "hojokin-jigyou-saikouchiku": {
    title: "事業再構築補助金｜対象要件をAIが判定・採択率アップのコツ",
    description:
      "事業再構築補助金の対象要件をAIが自動判定。新分野展開・業態転換・事業転換の区分選択から申請書ドラフト作成まで。採択率アップのコツも解説。",
    h1: "事業再構築補助金の対象要件をAIが判定。採択率アップのコツ",
    heroLead:
      "ポストコロナに対応する新分野展開・業態転換・事業転換を支援。中小企業は最大1,500万円、中堅企業は最大1億円。AIが類型判定から事業計画書の骨格作成までサポートします。",
    features: [
      { icon: "refresh-cw", title: "再構築類型を自動判定", desc: "事業内容を入力するだけで、新分野展開・業態転換・事業転換・業種転換のどれに該当するかAIが判定。" },
      { icon: "bar-chart-2", title: "事業計画書を自動生成", desc: "市場分析・競合分析・収支計画の骨格をAIが自動生成。認定経営革新等支援機関の確認前にドラフトが完成。" },
      { icon: "award", title: "加点項目を網羅チェック", desc: "賃上げ加点・DX加点・グリーン加点など、取得可能な加点項目をAIが提案して採択率を向上。" },
    ],
    faqs: [
      { q: "事業再構築補助金の申請要件は？", a: "認定経営革新等支援機関と共同で事業計画を策定していること、補助事業終了後3〜5年で付加価値額を年率3%以上増加させる計画であることが必要です。" },
      { q: "どのくらいの補助が受けられる？", a: "成長枠で中小企業最大1,500万円（補助率1/2）、グリーン成長枠で最大1億円。従業員数や申請枠によって上限が異なります。" },
      { q: "採択率を上げるコツは？", a: "市場規模の数値的根拠、具体的な収支計画、既存事業とのシナジー、加点項目の確実な取得が重要です。本AIが事業計画のチェックポイントを自動解説します。" },
    ],
    crossSell: [
      { href: "/keywords/hojokin-shinsa-point", label: "補助金審査のポイント" },
      { href: "/keywords/hojokin-shinsei-kakikata", label: "申請書の書き方ガイド" },
    ],
    lastUpdated: "2026-03-31",
  },
  "hojokin-shinsei-kakikata": {
    title: "補助金申請書の書き方｜AIが採択される事業計画書を自動ガイド",
    description:
      "補助金申請書の書き方をAIがガイド。採択される事業計画書の構成・数値目標の書き方・審査員に響くポイントを解説。申請書ドラフトも自動生成。",
    h1: "補助金申請書の書き方をAIがガイド。採択される事業計画書の作成",
    heroLead:
      "補助金の採択率は事業計画書の完成度で決まります。AIが申請書の構成・書き方のコツ・数値目標の設定方法をガイドし、ドラフトまで自動生成。初めての申請でも安心です。",
    features: [
      { icon: "edit-3", title: "構成テンプレート提供", desc: "ものづくり補助金・小規模事業者持続化補助金など、補助金別の申請書テンプレートをAIが自動生成。" },
      { icon: "target", title: "数値目標の書き方", desc: "審査で高評価を得る売上目標・付加価値額・生産性向上率の書き方をAIが具体例付きでガイド。" },
      { icon: "check-circle", title: "提出前チェックリスト", desc: "記入漏れ・添付書類の不備をAIが自動チェック。書類不備による不採択を防ぎます。" },
    ],
    faqs: [
      { q: "申請書で最も重要なポイントは？", a: "具体的な数値目標（売上○%増、生産性○%向上）と、その根拠となる市場データの提示が最重要です。「頑張ります」ではなく「○年で売上○万円増」と具体的に書きましょう。" },
      { q: "初めてでも採択される？", a: "はい。初めての申請でも事業計画書の完成度が高ければ採択されます。本AIが構成・書き方・数値の設定まで一貫してガイドするので、初めての方でも安心です。" },
      { q: "AIが生成したドラフトをそのまま提出できる？", a: "ドラフトはあくまで骨格です。自社の具体的な数字・実績・写真等を追加して完成させてください。AIドラフト+自社データで、コンサル不要の高品質な申請書が作れます。" },
    ],
    crossSell: [
      { href: "/keywords/hojokin-shinsa-point", label: "審査で加点されるポイント" },
      { href: "/keywords/hojokin-consultant-hiyou", label: "コンサル費用を削減する方法" },
    ],
    lastUpdated: "2026-03-31",
  },
  "hojokin-freelance": {
    title: "フリーランス向け補助金一覧｜AIが使える補助金を検索・判定",
    description:
      "フリーランス・個人事業主が使える補助金一覧をAIが検索・判定。小規模事業者持続化補助金・IT導入補助金など、業種・事業内容に合った補助金を自動提案。",
    h1: "フリーランスが使える補助金一覧をAIが検索・判定",
    heroLead:
      "フリーランス・個人事業主でも申請できる補助金は多数あります。業種・事業内容・投資目的を入力するだけで、あなたが使える補助金をAIが優先度順に最大5件提案。申請書ドラフトも自動生成。",
    features: [
      { icon: "search", title: "使える補助金を自動検索", desc: "フリーランスの業種・売上規模・投資目的から対象補助金をAIが自動検索。見落としがちな補助金も発見。" },
      { icon: "user-check", title: "要件適合を即時判定", desc: "「従業員0人の個人事業主でも申請OK？」をAIが即時回答。要件を満たさない補助金は除外して効率化。" },
      { icon: "file-plus", title: "申請書を自動作成", desc: "フリーランス向けに最適化された申請書テンプレートでドラフトを自動生成。開業届のコピー等の必要書類も案内。" },
    ],
    faqs: [
      { q: "フリーランスでも補助金は使える？", a: "はい。小規模事業者持続化補助金（最大200万円）・IT導入補助金・各自治体の創業支援補助金など、個人事業主・フリーランスが対象の補助金は多数あります。" },
      { q: "開業したばかりでも申請できる？", a: "創業枠がある補助金（小規模事業者持続化補助金の創業枠等）なら、開業後間もない方でも申請可能です。創業補助金の一覧もAIが検索します。" },
      { q: "副業フリーランスでも対象になる？", a: "開業届を提出している個人事業主であれば、副業でも対象になる補助金があります。ただし確定申告書の提出が求められる場合があります。" },
    ],
    crossSell: [
      { href: "/keywords/hojokin-sougyou", label: "創業時に使える補助金" },
      { href: "/keywords/hojokin-kobojigyo", label: "小規模事業者持続化補助金" },
    ],
    lastUpdated: "2026-03-31",
  },
  "hojokin-inshokuten": {
    title: "飲食店向け補助金・助成金｜AIが一括検索・申請書自動生成",
    description:
      "飲食店向けの補助金・助成金をAIが一括検索。設備投資・店舗改装・テイクアウト対応・人材採用に使える補助金を自動判定し申請書ドラフトも生成。",
    h1: "飲食店向けの補助金・助成金をAIが一括検索",
    heroLead:
      "飲食店の設備投資・店舗改装・テイクアウト対応・メニュー開発・人材採用に使える補助金をAIが一括検索。業態・従業員数・投資目的を入力するだけで最適な補助金を提案します。",
    features: [
      { icon: "utensils", title: "飲食店特化で検索", desc: "居酒屋・カフェ・レストラン・テイクアウト専門店など、業態に合った補助金をAIが自動フィルタリング。" },
      { icon: "home", title: "店舗改装・設備投資", desc: "厨房設備・内装工事・テラス席増設など、飲食店特有の設備投資に使える補助金を優先表示。" },
      { icon: "users", title: "人材確保の助成金も", desc: "キャリアアップ助成金・トライアル雇用助成金など、人手不足解消に使える助成金もカバー。" },
    ],
    faqs: [
      { q: "飲食店で使える主な補助金は？", a: "小規模事業者持続化補助金（販路開拓・設備投資）、IT導入補助金（POSレジ・予約システム）、事業再構築補助金（業態転換）が代表的です。自治体独自の飲食店支援補助金もあります。" },
      { q: "店舗の改装費用に補助金は使える？", a: "小規模事業者持続化補助金の「機械装置等費」「外注費」で内装工事・設備購入が対象になります。ただし補助事業の目的が販路開拓であることが必要です。" },
      { q: "テイクアウト対応の費用は補助される？", a: "テイクアウト用の包装資材・デリバリー用設備・Webサイト構築費用などが補助対象になり得ます。事業計画で販路拡大効果を明記することが重要です。" },
    ],
    crossSell: [
      { href: "/keywords/hojokin-kobojigyo", label: "小規模事業者持続化補助金の詳細" },
      { href: "/keywords/hojokin-it-dounyu", label: "IT導入補助金でPOSレジ導入" },
    ],
    lastUpdated: "2026-03-31",
  },
  "josei-kin-ichiran-2026": {
    title: "助成金一覧 2026年最新版｜業種別にAIが検索",
    description:
      "2026年最新の助成金一覧をAIが業種別に検索。雇用・設備投資・創業・DX推進など目的別に使える助成金を自動提案。申請書ドラフトも生成。",
    h1: "2026年最新の助成金一覧をAIが業種別に検索",
    heroLead:
      "2026年度の最新助成金情報をAIが業種・目的・従業員数から自動検索。キャリアアップ助成金・両立支援等助成金・トライアル雇用助成金など、あなたの事業に合った助成金を優先度順に提案します。",
    features: [
      { icon: "calendar", title: "2026年度最新情報", desc: "2026年度の公募情報をベースに、最新の助成金・補助金をAIが自動検索。申請期限も通知。" },
      { icon: "briefcase", title: "業種別に自動フィルタ", desc: "製造業・飲食店・IT・小売・建設など、業種を選ぶだけで対象助成金を絞り込み。" },
      { icon: "list", title: "目的別に一括比較", desc: "人材採用・設備投資・DX推進・省エネなど、目的別に助成金を比較して最適なものを提案。" },
    ],
    faqs: [
      { q: "補助金と助成金の違いは？", a: "補助金は審査があり採択されないと受給できません。助成金は要件を満たせば原則受給可能です。厚生労働省系の助成金は要件型が多く、経済産業省系の補助金は競争型が多いです。" },
      { q: "2026年度の主な助成金は？", a: "キャリアアップ助成金（非正規→正社員化で最大80万円）、両立支援等助成金（育児・介護との両立支援）、人材開発支援助成金（研修費用の補助）などが代表的です。" },
      { q: "助成金の申請期限は？", a: "助成金によって異なりますが、通年申請可能なものと公募期間が限定されるものがあります。本AIが申請期限をチェックし、期限切れの助成金は除外します。" },
    ],
    crossSell: [
      { href: "/keywords/hojokin-freelance", label: "フリーランス向け補助金" },
      { href: "/keywords/hojokin-inshokuten", label: "飲食店向け補助金" },
    ],
    lastUpdated: "2026-03-31",
  },
  "hojokin-sougyou": {
    title: "創業補助金｜起業時に使える補助金をAIが診断・最大200万円",
    description:
      "創業・起業時に使える補助金をAIが診断。小規模事業者持続化補助金の創業枠・地域創業支援など、最大200万円の補助金情報と申請書作成をサポート。",
    h1: "創業・起業時に使える補助金をAIが診断。最大200万円",
    heroLead:
      "起業・創業を予定している方向けの補助金をAIが一括検索。小規模事業者持続化補助金の創業枠（最大200万円）や自治体の創業支援補助金など、使える制度を自動診断します。",
    features: [
      { icon: "rocket", title: "創業向け補助金を網羅", desc: "国の補助金から自治体独自の創業支援まで、起業時に使える補助金をAIが網羅的に検索。" },
      { icon: "map-pin", title: "地域別の支援制度", desc: "都道府県・市区町村の創業支援補助金・利子補給制度・創業融資情報もAIが検索。" },
      { icon: "file-text", title: "創業計画書の作成支援", desc: "創業計画書・事業計画書のドラフトをAIが自動生成。金融機関への提出にも活用できます。" },
    ],
    faqs: [
      { q: "開業前でも補助金は申請できる？", a: "はい。小規模事業者持続化補助金の創業枠は、創業後間もない事業者が対象です。また自治体によっては開業前から申請可能な創業支援補助金もあります。" },
      { q: "創業補助金の金額は？", a: "小規模事業者持続化補助金の創業枠で最大200万円。自治体の創業支援補助金は数十万円〜100万円程度が一般的です。併用可能な場合もあります。" },
      { q: "法人設立前でも使える？", a: "個人事業主として開業届を提出していれば申請可能な補助金が多数あります。法人設立予定の場合も、開業届後に申請→採択後に法人化という流れが可能です。" },
    ],
    crossSell: [
      { href: "/keywords/hojokin-freelance", label: "フリーランス向け補助金" },
      { href: "/keywords/hojokin-shinsei-kakikata", label: "申請書の書き方ガイド" },
    ],
    lastUpdated: "2026-03-31",
  },
  "hojokin-shinsa-point": {
    title: "補助金審査で加点されるポイント｜AIが解説・採択率アップ",
    description:
      "補助金審査で加点されるポイントをAIが解説。ものづくり補助金・小規模事業者持続化補助金の審査基準・加点項目・採択率を上げるコツを徹底ガイド。",
    h1: "補助金審査で加点されるポイントをAIが解説",
    heroLead:
      "補助金の採択率は40〜80%。審査で差がつくのは加点項目の取得と事業計画書の具体性です。AIが補助金別の審査基準・加点項目・採択率アップのコツを解説します。",
    features: [
      { icon: "star", title: "加点項目を網羅チェック", desc: "経営革新計画・事業継続力強化計画・賃上げ加点など、取得可能な加点項目をAIが一覧で提示。" },
      { icon: "bar-chart", title: "審査基準を解説", desc: "補助金ごとの審査基準（革新性・実現可能性・収益性等）をAIが解説。高評価を得るポイントを具体例付きで紹介。" },
      { icon: "zap", title: "採択率を数値で提示", desc: "過去の公募回ごとの採択率データをAIが参照。あなたの申請内容の強み・改善点を数値で可視化。" },
    ],
    faqs: [
      { q: "加点項目を取得すると採択率はどれくらい上がる？", a: "加点項目を複数取得すると採択率が10〜20%程度向上するケースがあります。特に経営革新計画の承認やDX推進計画の策定は有効です。" },
      { q: "審査でマイナスになるポイントは？", a: "数値目標が曖昧・市場分析が不十分・既存事業との差別化が不明確・申請書の記載ミスなどがマイナスになります。本AIが事前にチェックします。" },
      { q: "不採択になった場合、再申請できる？", a: "はい。次回の公募に再申請可能です。不採択の理由を分析し、事業計画書をブラッシュアップすることで採択率を向上できます。AIが改善ポイントを提案します。" },
    ],
    crossSell: [
      { href: "/keywords/hojokin-shinsei-kakikata", label: "申請書の書き方ガイド" },
      { href: "/keywords/hojokin-jigyou-saikouchiku", label: "事業再構築補助金" },
    ],
    lastUpdated: "2026-03-31",
  },
  "hojokin-consultant-hiyou": {
    title: "補助金コンサル費用¥30万→¥2,980｜AIで申請を自動サポート",
    description:
      "補助金コンサルの費用相場15〜30万円をAIで大幅削減。¥2,980で補助金診断から申請書ドラフト作成まで自動サポート。コンサル不要で採択率もアップ。",
    h1: "コンサル費用¥30万→¥2,980。AIで補助金申請を自動サポート",
    heroLead:
      "補助金コンサルの費用相場は15〜30万円。成功報酬型だと採択額の10〜20%がかかることも。AI補助金診断なら¥2,980で補助金検索・要件チェック・申請書ドラフト作成まで完結。",
    features: [
      { icon: "dollar-sign", title: "コスト1/100に削減", desc: "コンサル費用30万円→AI診断¥2,980。浮いた費用を事業投資に回せます。成功報酬も不要。" },
      { icon: "clock", title: "24時間即時対応", desc: "コンサルは予約制で数週間待ち。AIなら24時間いつでも即時に診断・申請書生成が可能。" },
      { icon: "repeat", title: "何度でも修正可能", desc: "コンサルへの修正依頼は追加費用がかかりがち。AIなら何度でも無料で申請書を修正・再生成。" },
    ],
    faqs: [
      { q: "補助金コンサルの費用相場は？", a: "着手金5〜10万円+成功報酬（採択額の10〜20%）が一般的。トータルで15〜30万円、大型補助金では50万円以上になることもあります。" },
      { q: "AIだけで本当に採択される？", a: "AIが生成するドラフトに自社の具体的な数字・実績を追加すれば、十分採択レベルの申請書が作成可能です。複雑な案件は認定支援機関への相談も併用を推奨します。" },
      { q: "コンサルとAIの併用は可能？", a: "もちろん可能です。AIでドラフトを作成→コンサルに最終チェックを依頼すれば、コンサル費用を大幅に抑えつつ高品質な申請書が完成します。" },
    ],
    crossSell: [
      { href: "/keywords/hojokin-shinsei-kakikata", label: "申請書の書き方ガイド" },
      { href: "/keywords/hojokin-shinsa-point", label: "審査で加点されるポイント" },
    ],
    lastUpdated: "2026-03-31",
  },
};

const SLUGS = Object.keys(KEYWORDS);

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const kw = KEYWORDS[params.slug];
  if (!kw) return {};
  return {
    title: kw.title,
    description: kw.description,
    other: {
      "article:modified_time": kw.lastUpdated,
    },
    openGraph: {
      title: kw.title,
      description: kw.description,
      url: `${SITE_URL}/keywords/${params.slug}`,
      siteName: "AI補助金診断",
      locale: "ja_JP",
      type: "website",
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: kw.title }],
    },
    twitter: { card: "summary_large_image", title: kw.title, description: kw.description },
    alternates: { canonical: `${SITE_URL}/keywords/${params.slug}` },
  };
}

/* ───────── Component ───────── */
export default function KeywordPage({ params }: { params: { slug: string } }) {
  const kw = KEYWORDS[params.slug];
  if (!kw) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": kw.lastUpdated,
    mainEntity: kw.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <main className="min-h-screen bg-[#0B0F1E] text-white">
        {/* ───── Hero ───── */}
        <section className="relative overflow-hidden px-4 pt-16 pb-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-2xl">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
              {kw.h1}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              {kw.heroLead}
            </p>
            <Link
              href="/tool"
              className="mt-8 inline-block rounded-xl bg-amber-500 px-8 py-4 font-bold text-white shadow-lg shadow-amber-500/25 transition hover:bg-amber-600 hover:shadow-amber-500/40"
            >
              無料でAI診断を試す →
            </Link>
          </div>
        </section>

        {/* ───── Features ───── */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-8 text-center text-xl font-bold sm:text-2xl">
            AI補助金診断の特長
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {kw.features.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                  <FeatureIcon name={f.icon} />
                </div>
                <h3 className="mb-2 font-bold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="mb-8 text-center text-xl font-bold sm:text-2xl">
            よくある質問
          </h2>
          <div className="space-y-4">
            {kw.faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur"
              >
                <summary className="cursor-pointer list-none px-6 py-4 font-bold transition hover:text-amber-400">
                  <span className="flex items-center justify-between">
                    <span>Q. {f.q}</span>
                    <span className="ml-2 text-white/40 transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <div className="px-6 pb-4 text-sm leading-relaxed text-white/70">
                  A. {f.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ───── CTA ───── */}
        <section className="px-4 py-12 text-center">
          <div className="mx-auto max-w-xl rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent p-8 backdrop-blur">
            <h2 className="mb-3 text-xl font-bold sm:text-2xl">
              あなたの事業に合う補助金を今すぐ診断
            </h2>
            <p className="mb-6 text-sm text-white/70">
              業種・従業員数・投資目的を入力するだけ。AIが最適な補助金を最大5件ご提案します。
            </p>
            <Link
              href="/tool"
              className="inline-block rounded-xl bg-amber-500 px-8 py-4 font-bold text-white shadow-lg shadow-amber-500/25 transition hover:bg-amber-600 hover:shadow-amber-500/40"
            >
              無料でAI診断を試す →
            </Link>
          </div>
        </section>

        {/* LastUpdated */}
        <p className="text-center text-xs text-white/40 mt-8">
          最終更新: 2026年3月31日
        </p>

        {/* ───── CrossSell ───── */}
        {kw.crossSell.length > 0 && (
          <section className="mx-auto max-w-3xl px-4 pb-16">
            <h2 className="mb-4 text-center text-lg font-bold">関連ページ</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {kw.crossSell.map((cs, i) => (
                <Link
                  key={i}
                  href={cs.href}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 transition hover:border-amber-500/40 hover:text-amber-400"
                >
                  {cs.label}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

/* ───────── Simple SVG icons ───────── */
function FeatureIcon({ name }: { name: string }) {
  const s = { width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24" };
  switch (name) {
    case "clipboard-check":
      return <svg {...s}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 14l2 2 4-4" /></svg>;
    case "file-text":
      return <svg {...s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>;
    case "piggy-bank":
    case "dollar-sign":
      return <svg {...s}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>;
    case "monitor":
      return <svg {...s}><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>;
    case "layers":
      return <svg {...s}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>;
    case "trending-up":
      return <svg {...s}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
    case "refresh-cw":
      return <svg {...s}><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>;
    case "bar-chart-2":
    case "bar-chart":
      return <svg {...s}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
    case "award":
      return <svg {...s}><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>;
    case "edit-3":
      return <svg {...s}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>;
    case "target":
      return <svg {...s}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
    case "check-circle":
      return <svg {...s}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>;
    case "search":
      return <svg {...s}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
    case "user-check":
      return <svg {...s}><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>;
    case "file-plus":
      return <svg {...s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>;
    case "utensils":
      return <svg {...s}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" /></svg>;
    case "home":
      return <svg {...s}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    case "users":
      return <svg {...s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>;
    case "calendar":
      return <svg {...s}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
    case "briefcase":
      return <svg {...s}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>;
    case "list":
      return <svg {...s}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>;
    case "rocket":
      return <svg {...s}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
    case "map-pin":
      return <svg {...s}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "star":
      return <svg {...s}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
    case "zap":
      return <svg {...s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
    case "clock":
      return <svg {...s}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
    case "repeat":
      return <svg {...s}><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>;
    default:
      return <svg {...s}><circle cx="12" cy="12" r="10" /></svg>;
  }
}
