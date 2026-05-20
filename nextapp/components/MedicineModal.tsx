"use client";

import { useEffect } from "react";
import { X, MessageCircle, FlaskConical, Pill, Building2, Route, Tag, ChevronLeft } from "lucide-react";
import type { Medicine } from "@/types/medicine";
import { PHARMACY_CONFIG } from "@/config/pharmacy";
import {
  getRelatedByScientific,
  getCheaperAlternatives,
  getRelatedByClass,
  generateWhatsAppMessage,
  formatRoute,
} from "@/lib/medicines";
import MedicineCard from "./MedicineCard";

interface MedicineModalProps {
  medicine: Medicine;
  allMedicines: Medicine[];
  onClose: () => void;
  onSelect: (medicine: Medicine) => void;
}

export default function MedicineModal({
  medicine,
  allMedicines,
  onClose,
  onSelect,
}: MedicineModalProps) {
  const related = getRelatedByScientific(medicine, allMedicines, 4);
  const cheaper = getCheaperAlternatives(medicine, allMedicines, 4);
  const sameClass = getRelatedByClass(medicine, allMedicines, 4);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const handleWhatsApp = () => {
    const msg = generateWhatsAppMessage(medicine, PHARMACY_CONFIG.name);
    window.open(`https://wa.me/${PHARMACY_CONFIG.whatsapp}?text=${msg}`, "_blank");
  };

  const fields = [
    { icon: <FlaskConical size={16} />, label: "الاسم العلمي", value: medicine.scientific_name },
    { icon: <Building2 size={16} />, label: "الشركة المصنعة", value: medicine.manufacturer },
    { icon: <Tag size={16} />, label: "تصنيف الدواء", value: medicine.drug_class },
    { icon: <Route size={16} />, label: "طريقة الاستخدام", value: formatRoute(medicine.route) },
    { icon: <Pill size={16} />, label: "السعر", value: medicine.price_egp > 0 ? `${medicine.price_egp} جنيه مصري` : "غير محدد" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "24px 24px 0 0",
          width: "100%",
          maxWidth: 680,
          maxHeight: "92vh",
          overflowY: "auto",
          animation: "slideUp 0.3s ease",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #15803d 0%, #059669 50%, #0d9488 100%)",
            padding: "1.5rem",
            borderRadius: "24px 24px 0 0",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              transition: "background 0.2s",
            }}
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>

          <div style={{ paddingLeft: "3rem" }}>
            {medicine.drug_class && (
              <span
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 50,
                  display: "inline-block",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {medicine.drug_class.slice(0, 40)}
              </span>
            )}
            <h2 style={{ color: "white", fontSize: 22, fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>
              {medicine.commercial_name_en}
            </h2>
            {medicine.commercial_name_ar && (
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16, direction: "rtl" }}>
                {medicine.commercial_name_ar}
              </p>
            )}
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <span
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  padding: "6px 16px",
                  borderRadius: 50,
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                {medicine.price_egp > 0 ? `${medicine.price_egp} ج` : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div style={{ padding: "1.5rem" }}>
          {/* Info grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {fields.map(({ icon, label, value }) => (
              value ? (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                    padding: "0.75rem",
                    background: "#f8fffe",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ color: "#16a34a", marginTop: 1, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, color: "#1a2e1c", fontWeight: 500 }}>{value}</div>
                  </div>
                </div>
              ) : null
            ))}
          </div>

          {/* WhatsApp CTA */}
          <button
            onClick={handleWhatsApp}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              background: "linear-gradient(135deg, #16a34a, #059669)",
              color: "white",
              border: "none",
              borderRadius: 14,
              padding: "1rem",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
              boxShadow: "0 8px 24px rgba(22,163,74,0.35)",
              marginBottom: "1.5rem",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <MessageCircle size={20} />
            اطلب عبر واتساب الآن
          </button>

          {/* Cheaper alternatives */}
          {cheaper.length > 0 && (
            <Section title="💰 بدائل أرخص" subtitle="نفس الفئة العلاجية بسعر أقل">
              <div style={gridStyle}>
                {cheaper.map((m) => (
                  <MedicineCard key={m.commercial_name_en} medicine={m} onClick={onSelect} compact />
                ))}
              </div>
            </Section>
          )}

          {/* Same scientific name */}
          {related.length > 0 && (
            <Section title="🔬 نفس المادة الفعّالة" subtitle="أدوية تحتوي على نفس المركب الكيميائي">
              <div style={gridStyle}>
                {related.map((m) => (
                  <MedicineCard key={m.commercial_name_en} medicine={m} onClick={onSelect} compact />
                ))}
              </div>
            </Section>
          )}

          {/* Same class */}
          {sameClass.length > 0 && (
            <Section title="💊 من نفس الفئة" subtitle={`أدوية في فئة ${medicine.drug_class?.slice(0,30)}`}>
              <div style={gridStyle}>
                {sameClass.map((m) => (
                  <MedicineCard key={m.commercial_name_en} medicine={m} onClick={onSelect} compact />
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2e1c", marginBottom: 4 }}>{title}</h3>
      {subtitle && <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: "0.75rem" }}>{subtitle}</p>}
      {children}
    </div>
  );
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "0.75rem",
};
