"use client";

import React from "react";
import { LogoIcon } from "@/components/common/LogoIcon";

export default function HQPosterPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px",
        overflow: "hidden",
        backgroundColor: "#0A0A0B",
      }}
    >
      {/* Architectural Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Top/bottom vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, black, transparent 40%, transparent 60%, black)",
        }}
      />
      {/* Gold glow */}
      <div
        style={{
          position: "absolute",
          top: "33%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background: "rgba(212,175,55,0.15)",
          borderRadius: "50%",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 32px",
        }}
      >
        {/* Top: Architectural Motif */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            opacity: 0.6,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-body-en)",
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#6b7280",
                display: "block",
              }}
            >
              Facility
            </span>
            <span
              style={{
                fontFamily: "var(--font-body-en)",
                fontSize: "14px",
                letterSpacing: "0.15em",
                color: "#d4af37",
                display: "block",
                marginTop: "8px",
              }}
            >
              001
            </span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <div
              style={{
                width: "64px",
                height: "1px",
                background: "rgba(212,175,55,0.5)",
              }}
            />
            <div
              style={{
                width: "16px",
                height: "1px",
                background: "rgba(255,255,255,0.3)",
              }}
            />
          </div>
        </div>

        {/* Center: Logo + Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "64px",
          }}
        >
          {/* Neon Logo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(212,175,55,0.2)",
                  filter: "blur(30px)",
                  borderRadius: "50%",
                  transform: "scale(1.5)",
                }}
              />
              <LogoIcon size={120} color="#fff" />
            </div>
            <div
              style={{
                marginTop: "32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-heading-en)",
                  fontSize: "48px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textShadow: "0 0 10px rgba(255,255,255,0.5)",
                  margin: 0,
                }}
              >
                BlackBear
              </h1>
              <div
                style={{
                  height: "1px",
                  width: "96px",
                  background:
                    "linear-gradient(90deg, transparent, #d4af37, transparent)",
                  margin: "12px 0",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-body-en)",
                  fontSize: "18px",
                  letterSpacing: "0.4em",
                  color: "#d4af37",
                  textTransform: "uppercase",
                }}
              >
                Headquarters
              </span>
            </div>
          </div>

          {/* Arabic Text */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <h2
              dir="rtl"
              style={{
                fontFamily: "var(--font-heading-ar)",
                fontSize: "48px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                margin: 0,
                textShadow: "0 4px 16px rgba(0,0,0,0.5)",
              }}
            >
              نفتح أبوابنا لتجسيد
              <br />
              أفكاركم{" "}
              <span style={{ color: "#d4af37", fontStyle: "italic" }}>
                الاستثنائية. 🏢🖤
              </span>
            </h2>
            <div
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                backdropFilter: "blur(12px)",
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "24px",
                borderRadius: "16px",
              }}
            >
              <p
                dir="rtl"
                style={{
                  fontFamily: "var(--font-body-ar)",
                  fontSize: "22px",
                  color: "#d1d5db",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                مساحة إبداعية متكاملة ومجهزة بأحدث التقنيات. نتشرف بزيارتكم
                لتشهدوا على معايير الفخامة بأنفسكم.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Location */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "12px 32px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#d4af37",
                borderRadius: "50%",
              }}
            />
            <span
              dir="rtl"
              style={{
                fontFamily: "var(--font-body-ar)",
                fontSize: "20px",
                letterSpacing: "0.05em",
                color: "#fff",
              }}
            >
              طريق المطار التجاري ، الدوحة
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
