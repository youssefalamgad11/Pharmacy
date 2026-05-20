"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import SearchBar from "@/components/SearchBar";
import MedicineCard from "@/components/MedicineCard";
import MedicineModal from "@/components/MedicineModal";
import type { Medicine } from "@/types/medicine";
import {
  loadMedicines,
  createFuseSearch,
  searchMedicines,
  getPopularMedicines,
} from "@/lib/medicines";

export default function HomeClient() {
  const router = useRouter();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [fuse, setFuse] = useState<Fuse<Medicine> | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Medicine[]>([]);
  const [popular, setPopular] = useState<Medicine[]>([]);
  const [selected, setSelected] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadMedicines().then((data) => {
      setMedicines(data);
      const f = createFuseSearch(data);
      setFuse(f);
      setPopular(getPopularMedicines(data, 6));
      setLoading(false);
    });
  }, []);

  const handleQueryChange = useCallback(
    (val: string) => {
      setQuery(val);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (!fuse) return;
        if (val.trim().length < 2) {
          setResults([]);
          return;
        }
        setResults(searchMedicines(val, fuse, 20));
      }, 200);
    },
    [fuse]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}
        onKeyDown={handleKeyDown}
      >
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          placeholder="ابحث عن دواء... (مثال: بنادول، amoxicillin)"
          large
        />
      </div>

      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginBottom: "0.5rem" }}>
        {loading
          ? "جاري تحميل قاعدة البيانات..."
          : "اضغط Enter أو ابحث بالاسم التجاري، العربي، أو العلمي"}
      </p>

      {/* Inline dropdown results */}
      {results.length > 0 && (
        <div
          style={{
            background: "white",
            borderRadius: 20,
            border: "1px solid var(--border)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            marginTop: "0.5rem",
            maxHeight: 380,
            overflowY: "auto",
            textAlign: "right",
          }}
        >
          <div style={{ padding: "0.6rem 1rem", borderBottom: "1px solid #f0fdf4" }}>
            <span style={{ fontSize: 12, color: "#6b7c6e", fontWeight: 600 }}>
              {results.length} نتيجة
            </span>
          </div>
          {results.slice(0, 7).map((m) => (
            <button
              key={m.commercial_name_en}
              onClick={() => { setSelected(m); setQuery(""); setResults([]); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.8rem 1rem",
                background: "none",
                border: "none",
                borderBottom: "1px solid #f8fffe",
                cursor: "pointer",
                width: "100%",
                textAlign: "right",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1a2e1c" }}>
                  {m.commercial_name_en}
                </span>
                {m.commercial_name_ar && (
                  <span style={{ fontSize: 12, color: "#6b7c6e" }}>{m.commercial_name_ar}</span>
                )}
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#15803d", flexShrink: 0, marginRight: 8 }}>
                {m.price_egp > 0 ? `${m.price_egp} ج` : "—"}
              </span>
            </button>
          ))}
          {results.length > 7 && (
            <button
              onClick={() => { router.push(`/search?q=${encodeURIComponent(query)}`); }}
              style={{
                display: "block",
                width: "100%",
                padding: "0.75rem",
                background: "#f0fdf4",
                border: "none",
                borderTop: "1px solid #e2f0e8",
                color: "#15803d",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                borderRadius: "0 0 20px 20px",
              }}
            >
              عرض كل {results.length} نتيجة ←
            </button>
          )}
        </div>
      )}

      {/* Popular medicines */}
      {!query && !loading && popular.length > 0 && (
        <div style={{ marginTop: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ color: "white", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 800, marginBottom: 6 }}>
              ⭐ الأدوية الأكثر طلباً
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>أبرز الأدوية في صيدليتنا</p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1rem",
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {popular.map((m) => (
              <MedicineCard key={m.commercial_name_en} medicine={m} onClick={setSelected} />
            ))}
          </div>
        </div>
      )}

      {selected && (
        <MedicineModal
          medicine={selected}
          allMedicines={medicines}
          onClose={() => setSelected(null)}
          onSelect={setSelected}
        />
      )}
    </>
  );
}
