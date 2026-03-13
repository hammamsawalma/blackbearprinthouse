"use client";

import React from "react";
import { LogoIcon } from "@/components/common/LogoIcon";

export default function OrdersPosterPage() {
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
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top right, rgba(31,26,14,0.8), black 60%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-25%",
          right: "-25%",
          width: "800px",
          height: "800px",
          background: "rgba(212,175,55,0.05)",
          borderRadius: "50%",
          filter: "blur(150px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "500px",
          background:
            "linear-gradient(to top, black, rgba(0,0,0,0.8) 50%, transparent)",
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
        {/* Top: Branding Ribbon */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#d4af37",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-heading-en)",
                color: "#d4af37",
                fontSize: "20px",
                fontStyle: "italic",
                letterSpacing: "0.1em",
              }}
            >
              Est. 2026
            </span>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "#d4af37",
              }}
            />
          </div>
          <div
            style={{
              padding: "8px 24px",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "9999px",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body-en)",
                fontSize: "13px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Premium Collection
            </span>
          </div>
        </div>

        {/* Center: Visual + Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: "64px",
          }}
        >
          {/* Stacked Cards Mockup */}
          <div
            style={{
              position: "relative",
              width: "600px",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            {/* Back card */}
            <div
              style={{
                position: "absolute",
                width: "450px",
                height: "250px",
                background: "#111",
                borderRadius: "12px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.05)",
                transform: "rotate(-6deg) translateY(32px)",
                filter: "blur(2px)",
                opacity: 0.4,
              }}
            />
            {/* Middle card */}
            <div
              style={{
                position: "absolute",
                width: "450px",
                height: "250px",
                background: "#161616",
                borderRadius: "12px",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.1)",
                transform: "rotate(-3deg) translateY(16px)",
                opacity: 0.7,
              }}
            />
            {/* Front card */}
            <div
              style={{
                position: "relative",
                width: "450px",
                height: "250px",
                background:
                  "linear-gradient(135deg, #1a1a1a, #0a0a0a)",
                borderRadius: "12px",
                boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
                border: "1px solid rgba(212,175,55,0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
                zIndex: 20,
              }}
            >
              {/* Shine overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)",
                  pointerEvents: "none",
                  borderRadius: "12px",
                }}
              />
              <LogoIcon size={64} color="#d4af37" />
              <div
                style={{
                  height: "1px",
                  width: "96px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
                  margin: "24px 0",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-heading-en)",
                  fontSize: "24px",
                  color: "#fff",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                BlackBear
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body-en)",
                  fontSize: "11px",
                  color: "#d4af37",
                  letterSpacing: "0.4em",
                  marginTop: "8px",
                  textTransform: "uppercase",
                }}
              >
                Bespoke Print
              </span>
            </div>
          </div>

          {/* Arabic Typography */}
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              position: "relative",
              zIndex: 30,
              paddingTop: "32px",
            }}
          >
            <h2
              dir="rtl"
              style={{
                fontFamily: "var(--font-heading-ar)",
                fontSize: "56px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.2,
                margin: 0,
                textShadow: "0 4px 16px rgba(0,0,0,0.5)",
              }}
            >
              الجودة لا تُرى فقط..
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #e5c158, #d4af37, #b5952f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                بل تُلمس.
              </span>{" "}
              👑✨
            </h2>
            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
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
                نستقبل الآن طلباتكم. دعنا نحول رؤيتك إلى واقع ملموس يعكس
                هيبتك في السوق.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            paddingTop: "40px",
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "20px 40px",
              borderRadius: "9999px",
              display: "flex",
              gap: "48px",
              alignItems: "center",
              border: "1px solid rgba(212,175,55,0.2)",
              boxShadow: "0 0 40px rgba(212,175,55,0.05)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-body-en)",
                  fontSize: "11px",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Direct Message
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body-en)",
                  fontSize: "18px",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                @BlackBearPrint
              </span>
            </div>
            <div
              style={{
                width: "1px",
                height: "48px",
                background: "rgba(255,255,255,0.1)",
              }}
            />
            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-body-en)",
                  fontSize: "11px",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Or Visit
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body-en)",
                  fontSize: "18px",
                  color: "#d4af37",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                }}
              >
                BLACKBEAR.AGENCY
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
