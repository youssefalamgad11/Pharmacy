"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MedicineCard from "@/components/MedicineCard";
import MedicineModal from "@/components/MedicineModal";
import type { Medicine } from "@/types/medicine";
import { loadMedicines, getMedicinesByCategory } from "@/lib/medicines";
import { CATEGORIES } from "@/config/pharmacy";

function CategoriesContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("cat") || "";

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [categoryMedicines, setCategoryMedicines] = useState<Medicine[]>([]);
  const [selected, setSelected] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedicines().then((data) => {
      setMedicines(data);
      setLoading(false);
      if (initialCat) {
        setCategoryMedicines(getMedicinesByCategory(initialCat, data, 48));
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    setCategoryMedicines(getMedicinesByCategory(catId, medicines, 48));
  };

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "#1a2e1c", marginBottom: 8 }}>
          📋 تصفح حسب الفئة العلاجية
        </h1>
        <p style={{ fontSize: 14, color: "#6b7c6e" }}>اختر الفئة لعرض الأدوية المتاحة</p>
      </div>

      {/* Categories grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: "0.75rem",
          marginBottom: "2.5rem",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            style={{
              background: activeCategory === cat.id
                ? "linear-gradient(135deg, #16a34a, #059669)"
                : "white",
              border: `2px solid ${activeCategory === cat.id ? "transparent" : "var(--border)"}`,
              borderRadius: 16,
              padding: "1rem 0.75rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: activeCategory === cat.id
                ? "0 8px 24px rgba(22,163,74,0.3)"
                : "0 2px 8px rgba(22,163,74,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span style={{ fontSize: 26 }}>{cat.icon}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: activeCategory === cat.id ? "white" : "#1a2e1c",
              }}
            >
              {cat.labelAr}
            </span>
          </button>
        ))}
      </div>

      {/* Results */}
      {loading && (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <div style={{ fontSize: 32, marginBottom: "0.5rem" }}>⏳</div>
          <p style={{ color: "#9ca3af" }}>جاري تحميل البيانات...</p>
        </div>
      )}

      {!loading && !activeCategory && (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <div style={{ fontSize: 56, marginBottom: "1rem" }}>👆</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "#6b7c6e" }}>
            اختر فئة لعرض الأدوية
          </h3>
        </div>
      )}

      {!loading && activeCategory && (
        <>
          <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: 24 }}>{activeCat?.icon}</span>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a2e1c" }}>
                {activeCat?.labelAr}
              </h2>
              <p style={{ fontSize: 13, color: "#9ca3af" }}>
                {categoryMedicines.length} دواء متاح
              </p>
            </div>
          </div>

          {categoryMedicines.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <p style={{ color: "#9ca3af" }}>لا توجد أدوية في هذه الفئة حالياً</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
              {categoryMedicines.map((m) => (
                <MedicineCard key={m.commercial_name_en} medicine={m} onClick={setSelected} />
              ))}
            </div>
          )}
        </>
      )}

      {selected && (
        <MedicineModal
          medicine={selected}
          allMedicines={medicines}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}
    </div>
  );
}

export default function CategoriesClient() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "4rem" }}>جاري التحميل...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}
