import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "補助金AI｜中小企業の補助金申請をAIが完全サポート";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 50%, #1e40af 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 12, display: "flex" }}>💰</div>
        <div style={{ fontSize: 52, fontWeight: 700, color: "#fff", marginBottom: 12, textAlign: "center", display: "flex" }}>
          補助金AI
        </div>
        <div style={{ fontSize: 26, color: "#bfdbfe", textAlign: "center", maxWidth: 900, marginBottom: 8, display: "flex" }}>
          中小企業の補助金・助成金申請をAIが完全サポート
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          {["ものづくり補助金", "IT導入補助金", "小規模事業者持続化", "¥2,980/回〜"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 20px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 24,
                fontSize: 16,
                color: "#dbeafe",
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
