import { ImageResponse } from "next/og";
import { BRAND_ACCENTS, SITE_NAME } from "./site-metadata";

export const alt = "Physera — Rethinking Applied Intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            {BRAND_ACCENTS.map((c) => (
              <div
                key={c}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "9px",
                  background: c,
                }}
              />
            ))}
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 600,
              color: "#0d0d0d",
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              fontSize: "82px",
              fontWeight: 600,
              color: "#0d0d0d",
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              maxWidth: "940px",
            }}
          >
            Rethinking Applied Intelligence
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#656565",
              lineHeight: 1.35,
              maxWidth: "860px",
            }}
          >
            A research and product lab working at the intersection of model
            efficiency and behavioural simulation.
          </div>
        </div>
      </div>
    ),
    size
  );
}
