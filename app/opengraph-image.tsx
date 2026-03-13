import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "補助金AI｜中小企業の補助金申請をAIが自動診断・申請書ドラフト生成";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #451a03 0%, #78350f 50%, #451a03 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 12, display: "flex" }}>💰</div>
        <div style={{ fontSize: 52, fontWeight: 700, color: "#fbbf24", marginBottom: 12, textAlign: "center", display: "flex" }}>
          補助金AI
        </div>
        <div style={{ fontSize: 24, color: "#fef3c7", textAlign: "center", maxWidth: 900, marginBottom: 4, display: "flex" }}>
          事業内容を入力するだけで対象補助金を自動診断
        </div>
        <div style={{ fontSize: 24, color: "#fef3c7", textAlign: "center", maxWidth: 900, marginBottom: 16, display: "flex" }}>
          申請書ドラフトまで3分で生成。コンサル費¥20万を節約。
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          {["ものづくり補助金", "IT導入補助金", "2026年新設対応"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 20px",
                background: "rgba(251,191,36,0.15)",
                border: "1px solid rgba(251,191,36,0.4)",
                borderRadius: 24,
                fontSize: 18,
                color: "#fde68a",
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 28,
            padding: "12px 36px",
            background: "#d97706",
            borderRadius: 40,
            fontSize: 22,
            color: "#fff",
            fontWeight: 700,
            display: "flex",
          }}
        >
          診断無料 → プレミアム¥980/月〜
        </div>
      </div>
    ),
    { ...size }
  );
}
