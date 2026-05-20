"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { PHARMACY_CONFIG } from "@/config/pharmacy";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        background: "rgba(255,255,255,0.95)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 2px 20px rgba(22,163,74,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 70,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "linear-gradient(135deg, #16a34a 0%, #059669 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
            }}
          >
            ✚
          </div>
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: "#15803d",
                lineHeight: 1.2,
                letterSpacing: "-0.3px",
              }}
            >
              د. أبانوب رمزي
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#6b7c6e",
                lineHeight: 1,
                fontWeight: 500,
              }}
            >
              Dr. Abanoub Ramzy Pharmacy
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden-mobile">
          <Link href="/" style={linkStyle}>الرئيسية</Link>
          <Link href="/search" style={linkStyle}>البحث</Link>
          <Link href="/categories" style={linkStyle}>الفئات</Link>
          <a
            href={`https://wa.me/${PHARMACY_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "linear-gradient(135deg, #16a34a, #059669)",
              color: "white",
              padding: "0.5rem 1.2rem",
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <Phone size={14} />
            اطلب الآن
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            color: "#15803d",
          }}
          className="show-mobile"
          aria-label="القائمة"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid var(--border)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Link href="/" style={mobileLinkStyle} onClick={() => setOpen(false)}>🏠 الرئيسية</Link>
          <Link href="/search" style={mobileLinkStyle} onClick={() => setOpen(false)}>🔍 البحث عن دواء</Link>
          <Link href="/categories" style={mobileLinkStyle} onClick={() => setOpen(false)}>📋 الفئات</Link>
          <a
            href={`https://wa.me/${PHARMACY_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...mobileLinkStyle,
              background: "linear-gradient(135deg, #16a34a, #059669)",
              color: "white",
              borderRadius: 12,
              padding: "0.75rem 1rem",
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            📱 تواصل على واتساب
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

const linkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#374151",
  fontSize: 14,
  fontWeight: 500,
  transition: "color 0.2s",
};

const mobileLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#374151",
  fontSize: 16,
  fontWeight: 500,
  padding: "0.5rem 0",
  display: "block",
  borderBottom: "1px solid #f0fdf4",
};
