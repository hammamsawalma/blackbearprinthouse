"use client";

import React from "react";
import { LogoIcon } from "@/components/common/LogoIcon";

export default function LaunchPosterPage() {
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
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #0a0a0b 0%, #111115 50%, #0a0a0b 100%)",
          zIndex: 0,
        }}
      />
      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
          width: "384px",
          height: "384px",
          background: "rgba(200,149,108,0.10)",
          borderRadius: "50%",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          right: "25%",
          width: "384px",
          height: "384px",
          background: "rgba(28,28,28,0.15)",
          borderRadius: "50%",
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "768px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "48px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(200,149,108,0.2)",
                filter: "blur(20px)",
                borderRadius: "16px",
              }}
            />
            <LogoIcon size={56} color="#d4af37" />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-heading-en)",
                fontSize: "36px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              BlackBear
            </h1>
            <span
              style={{
                fontFamily: "var(--font-body-en)",
                fontSize: "14px",
                letterSpacing: "0.3em",
                color: "var(--color-copper)",
                textTransform: "uppercase",
              }}
            >
              Print House
            </span>
          </div>
        </div>

        {/* Glassmorphic Mockup */}
        <div
          className="glass-panel"
          style={{
            width: "100%",
            height: "256px",
            borderRadius: "24px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, var(--color-copper), transparent)",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
              padding: "0 32px",
            }}
          >
            <div
              style={{
                width: "33%",
                height: "16px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "9999px",
              }}
            />
            <div
              style={{
                width: "100%",
                height: "32px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                width: "66%",
                height: "32px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
              }}
            />
            <div style={{ display: "flex", gap: "16px", paddingTop: "16px" }}>
              <div
                style={{
                  width: "96px",
                  height: "32px",
                  background: "rgba(200,149,108,0.2)",
                  border: "1px solid rgba(200,149,108,0.3)",
                  borderRadius: "9999px",
                }}
              />
              <div
                style={{
                  width: "96px",
                  height: "32px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "9999px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Arabic Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            paddingTop: "32px",
          }}
        >
          <h2
            dir="rtl"
            style={{
              fontFamily: "var(--font-heading-ar)",
              fontSize: "48px",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            الخطوة الأولى نحو التميز
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #d4af37, #e5c158)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              تبدأ من هنا.
            </span>{" "}
            🌐✨
          </h2>
          <p
            dir="rtl"
            style={{
              fontFamily: "var(--font-body-ar)",
              fontSize: "20px",
              color: "#9ca3af",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            استكشف عالماً من حلول الطباعة الفاخرة والتغليف المخصص التي صُممت
            لتعكس رقي علامتك التجارية وترتقي بها.
          </p>
        </div>

        {/* CTA / URL */}
        <div
          style={{
            paddingTop: "32px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "16px 32px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              boxShadow: "0 0 30px rgba(212,175,55,0.1)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body-en)",
                fontSize: "20px",
                letterSpacing: "0.15em",
                color: "var(--color-copper)",
              }}
            >
              WWW.BLACKBEAR.AGENCY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
