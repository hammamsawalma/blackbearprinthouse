"use client";

import React from "react";
import { LogoIcon } from "@/components/common/LogoIcon";

/**
 * OG Image Poster — 1200×630px
 * Uses the real BlackBear logo and brand design system.
 * Navigate to /posters/og-image and screenshot to generate og-image.png
 */
export default function OGImagePosterPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#0A0A0B",
      }}
    >
      {/* Architectural Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.07,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Left Gold Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "18%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "400px",
          background: "rgba(212,175,55,0.12)",
          borderRadius: "50%",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      {/* Right Copper Glow */}
      <div
        style={{
          position: "absolute",
          top: "60%",
          right: "10%",
          width: "300px",
          height: "300px",
          background: "rgba(200,149,108,0.08)",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      {/* Top/bottom vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.6), transparent 30%, transparent 70%, rgba(0,0,0,0.6))",
          zIndex: 1,
        }}
      />

      {/* Border Accent */}
      <div
        style={{
          position: "absolute",
          inset: "12px",
          border: "1px solid rgba(212,175,55,0.15)",
          borderRadius: "4px",
          zIndex: 2,
        }}
      />

      {/* Corner Accents */}
      {/* Top-left */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          width: "40px",
          height: "40px",
          borderTop: "2px solid rgba(212,175,55,0.5)",
          borderLeft: "2px solid rgba(212,175,55,0.5)",
          zIndex: 3,
        }}
      />
      {/* Top-right */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "40px",
          height: "40px",
          borderTop: "2px solid rgba(212,175,55,0.5)",
          borderRight: "2px solid rgba(212,175,55,0.5)",
          zIndex: 3,
        }}
      />
      {/* Bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          width: "40px",
          height: "40px",
          borderBottom: "2px solid rgba(212,175,55,0.5)",
          borderLeft: "2px solid rgba(212,175,55,0.5)",
          zIndex: 3,
        }}
      />
      {/* Bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          right: "12px",
          width: "40px",
          height: "40px",
          borderBottom: "2px solid rgba(212,175,55,0.5)",
          borderRight: "2px solid rgba(212,175,55,0.5)",
          zIndex: 3,
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "56px",
          padding: "0 72px",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Left: Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ position: "relative" }}>
            {/* Logo Glow */}
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                background: "rgba(212,175,55,0.15)",
                filter: "blur(25px)",
                borderRadius: "50%",
              }}
            />
            <LogoIcon size={140} color="#fff" />
          </div>
        </div>

        {/* Divider Line */}
        <div
          style={{
            width: "1px",
            height: "280px",
            flexShrink: 0,
            background:
              "linear-gradient(to bottom, transparent, #d4af37, rgba(200,149,108,0.5), transparent)",
          }}
        />

        {/* Right: Text Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
          }}
        >
          {/* English Name */}
          <div>
            <h1
              style={{
                fontFamily: "var(--font-heading-en)",
                fontSize: "52px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1.1,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              BlackBear
            </h1>
            <span
              style={{
                fontFamily: "var(--font-body-en)",
                fontSize: "20px",
                letterSpacing: "0.35em",
                color: "#d4af37",
                textTransform: "uppercase",
                display: "block",
                marginTop: "4px",
              }}
            >
              Print House
            </span>
          </div>

          {/* Gold Separator */}
          <div
            style={{
              height: "1px",
              width: "200px",
              background:
                "linear-gradient(90deg, #d4af37, rgba(200,149,108,0.5), transparent)",
            }}
          />

          {/* Arabic Name */}
          <h2
            dir="rtl"
            style={{
              fontFamily: "var(--font-heading-ar)",
              fontSize: "38px",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
              margin: 0,
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            مطبعة بلاك بير
          </h2>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "#d4af37",
                borderRadius: "50%",
                flexShrink: 0,
              }}
            />
            <p
              dir="rtl"
              style={{
                fontFamily: "var(--font-body-ar)",
                fontSize: "18px",
                color: "#9ca3af",
                margin: 0,
                letterSpacing: "0.03em",
              }}
            >
              خدمات طباعة احترافية — الدوحة، قطر
            </p>
          </div>

          {/* CMYK Dots */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            {["#00AEEF", "#EC008C", "#FFF200", "#000000"].map(
              (color, i) => (
                <div
                  key={i}
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: color,
                    borderRadius: "50%",
                    opacity: 0.6,
                    border:
                      color === "#000000"
                        ? "1px solid rgba(255,255,255,0.2)"
                        : "none",
                  }}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Code */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "32px",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body-en)",
            fontSize: "10px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          print.blackbear.qa
        </span>
      </div>
    </div>
  );
}
