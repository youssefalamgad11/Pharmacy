"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import SearchBar from "@/components/SearchBar";
import MedicineCard from "@/components/MedicineCard";
import MedicineModal from "@/components/MedicineModal";
import type { Medicine } from "@/types/medicine";
import { loadMedicines, createFuseSearch, searchMedicines } from "@/lib/medicines";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [fuse, setFuse] = useState<Fuse<Medicine> | null>(null);
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<Medicine[]>([]);
  const [selected, setSelected] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadMedicines().then((data) => {
      setMedicines(data);
      const f = createFuseSearch(data);
      setFuse(f);
      setLoading(false);
      if (initialQ.trim().length >= 2) {
        setResults(searchMedicines(initialQ, f, 48));
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleQueryChange = useCallback(
    (val: string) => {
      setQuery(val);
      setSearching(true);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (!fuse) { setSearching(false); return; }
        if (val.trim().length < 2) {
          setResults([]);
          setSearching(false);
          return;
        }
        setResults(searchMedicines(val, fuse, 48));
        setSearching(false);
      }, 250);
    },
    [fuse]
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "#1a2e1c", marginBottom: 8 }}>
          🔍 البحث الذكي عن الأدوية
        </h1>
        <p style={{ fontSize: 14, color: "#6b7c6e" }}>
          ابحث في قاعدة بيانات تضم أكثر من 24,000 دواء مصري
        </p>
      </div>

      {/* Search bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          placeholder="ابحث بالاسم التجاري، العلمي، أو العربي..."
          large
        />
      </div>

      {/* Filters hint */}
      {!loading && (
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>
            {query.trim().length < 2
              ? "اكتب حرفين على الأقل للبدء في البحث"
              : searching
              ? "جاري البحث..."
              : `${results.length} نتيجة`}
          </span>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 180,
                borderRadius: 16,
                background: "linear-gradient(90deg, #e8f5e9 25%, #f0fdf4 50%, #e8f5e9 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
          ))}
          <style>{`@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }`}</style>
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {results.map((m) => (
            <MedicineCard key={m.commercial_name_en} medicine={m} onClick={setSelected} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && query.trim().length >= 2 && results.length === 0 && !searching && (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <div style={{ fontSize: 48, marginBottom: "1rem" }}>🔍</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a2e1c", marginBottom: 8 }}>
            لم نجد نتائج لـ &quot;{query}&quot;
          </h3>
          <p style={{ color: "#9ca3af", fontSize: 14 }}>
            حاول البحث باسم مختلف أو المادة الفعالة
          </p>
        </div>
      )}

      {/* Initial empty state */}
      {!loading && query.trim().length < 2 && (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <div style={{ fontSize: 56, marginBottom: "1rem" }}>💊</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "#6b7c6e", marginBottom: 8 }}>
            ابدأ بكتابة اسم الدواء
          </h3>
          <p style={{ color: "#9ca3af", fontSize: 13 }}>
            مثال: panadol، أموكسيسيلين، amoxicillin
          </p>
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
    </div>
  );
}

export default function SearchPageClient() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "4rem" }}>جاري التحميل...</div>}>
      <SearchContent />
    </Suspense>
  );
}
