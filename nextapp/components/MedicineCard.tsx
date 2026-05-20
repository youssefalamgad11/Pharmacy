"use client";

import { MessageCircle, Pill, FlaskConical } from "lucide-react";
import type { Medicine } from "@/types/medicine";
import { PHARMACY_CONFIG, } from "@/config/pharmacy";
import { generateWhatsAppMessage } from "@/lib/medicines";

interface MedicineCardProps {
  medicine: Medicine;
  onClick?: (medicine: Medicine) => void;
  compact?: boolean;
}

export default function MedicineCard({ medicine, onClick, compact = false }: MedicineCardProps) {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = generateWhatsAppMessage(medicine, PHARMACY_CONFIG.name);
    window.open(`https://wa.me/${PHARMACY_CONFIG.whatsapp}?text=${msg}`, "_blank");
  };

  const priceColor =
    medicine.price_egp < 50
      ? "#15803d"
      : medicine.price_egp < 200
      ? "#d97706"
      : "#dc2626";

  return (
    <div
      onClick={() => onClick?.(medicine)}
      style={{
        background: "white",
        borderRadius: 16,
        border: "1px solid var(--border)",
        padding: compact ? "1rem" : "1.25rem",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        boxShadow: "0 2px 8px rgba(22,163,74,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(22,163,74,0.15)";
        (e.currentTarget as HTMLElement).style.borderColor = "#86efac";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(22,163,74,0.06)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => { if (e.key === "Enter") onClick?.(medicine); }}
    >
      {/* Green accent top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          height: 3,
          background: "linear-gradient(90deg, #16a34a, #059669, #2dd4bf)",
        }}
      />

      {/* Drug class badge */}
      {medicine.drug_class && (
        <span
          style={{
            display: "inline-block",
            background: "#f0fdf4",
            color: "#15803d",
            fontSize: 10,
            fontWeight: 600,
            padding: "2px 8px",
            borderRadius: 50,
            border: "1px solid #bbf7d0",
            alignSelf: "flex-start",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {medicine.drug_class.slice(0, 30)}
        </span>
      )}

      {/* Medicine name */}
      <div>
        <h3
          style={{
            fontSize: compact ? 14 : 16,
            fontWeight: 700,
            color: "#1a2e1c",
            lineHeight: 1.3,
            marginBottom: 4,
          }}
        >
          {medicine.commercial_name_en}
        </h3>
        {medicine.commercial_name_ar && (
          <p
            style={{
              fontSize: 13,
              color: "#6b7c6e",
              direction: "rtl",
              fontWeight: 500,
            }}
          >
            {medicine.commercial_name_ar}
          </p>
        )}
      </div>

      {/* Scientific name */}
      {!compact && medicine.scientific_name && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem" }}>
          <FlaskConical size={12} style={{ color: "#86efac", marginTop: 2, flexShrink: 0 }} />
          <span
            style={{
              fontSize: 11,
              color: "#9ca3af",
              lineHeight: 1.4,
              fontStyle: "italic",
            }}
          >
            {medicine.scientific_name.slice(0, 60)}
            {medicine.scientific_name.length > 60 ? "..." : ""}
          </span>
        </div>
      )}

      {/* Manufacturer + Route */}
      {!compact && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Pill size={11} style={{ color: "#86efac", flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "#9ca3af" }}>
            {medicine.manufacturer?.split(">")[0]?.trim() || "—"}
          </span>
        </div>
      )}

      {/* Price + WhatsApp */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: "0.5rem",
          borderTop: "1px solid #f0fdf4",
        }}
      >
        <div>
          <span style={{ fontSize: 10, color: "#9ca3af", display: "block", marginBottom: 1 }}>
            السعر
          </span>
          <span
            style={{
              fontSize: compact ? 16 : 18,
              fontWeight: 800,
              color: priceColor,
            }}
          >
            {medicine.price_egp > 0 ? `${medicine.price_egp} ج` : "—"}
          </span>
        </div>

        <button
          onClick={handleWhatsApp}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            background: "linear-gradient(135deg, #16a34a, #059669)",
            color: "white",
            border: "none",
            borderRadius: 50,
            padding: "0.45rem 0.9rem",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
            transition: "transform 0.15s, box-shadow 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget).style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget).style.transform = "scale(1)";
          }}
          aria-label={`اطلب ${medicine.commercial_name_en} عبر واتساب`}
        >
          <MessageCircle size={13} />
          اطلب
        </button>
      </div>
    </div>
  );
}
