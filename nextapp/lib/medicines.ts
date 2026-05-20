import Fuse from "fuse.js";
import type { Medicine } from "@/types/medicine";
import { CATEGORIES } from "@/config/pharmacy";

let cachedMedicines: Medicine[] | null = null;
let fuseInstance: Fuse<Medicine> | null = null;

// Load medicines from public JSON (client-side)
export async function loadMedicines(): Promise<Medicine[]> {
  if (cachedMedicines) return cachedMedicines;

  const res = await fetch("/egyptian-drugs.json");
  const data: Medicine[] = await res.json();
  cachedMedicines = data;
  return data;
}

// Initialize Fuse.js search
export function createFuseSearch(medicines: Medicine[]): Fuse<Medicine> {
  if (fuseInstance) return fuseInstance;

  fuseInstance = new Fuse(medicines, {
    keys: [
      { name: "commercial_name_en", weight: 0.4 },
      { name: "commercial_name_ar", weight: 0.3 },
      { name: "scientific_name", weight: 0.2 },
      { name: "drug_class", weight: 0.1 },
    ],
    threshold: 0.35,
    includeScore: true,
    minMatchCharLength: 2,
  });

  return fuseInstance;
}

// Smart search returning top results
export function searchMedicines(
  query: string,
  fuse: Fuse<Medicine>,
  limit = 20
): Medicine[] {
  if (!query.trim()) return [];
  const results = fuse.search(query, { limit });
  return results.map((r) => r.item);
}

// Get related medicines by same scientific name
export function getRelatedByScientific(
  medicine: Medicine,
  all: Medicine[],
  limit = 6
): Medicine[] {
  return all
    .filter(
      (m) =>
        m.scientific_name === medicine.scientific_name &&
        m.commercial_name_en !== medicine.commercial_name_en
    )
    .slice(0, limit);
}

// Get cheaper alternatives (same drug class, lower price)
export function getCheaperAlternatives(
  medicine: Medicine,
  all: Medicine[],
  limit = 6
): Medicine[] {
  return all
    .filter(
      (m) =>
        m.drug_class === medicine.drug_class &&
        m.price_egp < medicine.price_egp &&
        m.commercial_name_en !== medicine.commercial_name_en
    )
    .sort((a, b) => a.price_egp - b.price_egp)
    .slice(0, limit);
}

// Get medicines by same drug class
export function getRelatedByClass(
  medicine: Medicine,
  all: Medicine[],
  limit = 8
): Medicine[] {
  return all
    .filter(
      (m) =>
        m.drug_class === medicine.drug_class &&
        m.commercial_name_en !== medicine.commercial_name_en
    )
    .sort((a, b) => a.price_egp - b.price_egp)
    .slice(0, limit);
}

// Get popular medicines (curated list of known brands)
export function getPopularMedicines(all: Medicine[], limit = 12): Medicine[] {
  const popularKeywords = [
    "PANADOL",
    "BRUFEN",
    "AUGMENTIN",
    "NEXIUM",
    "LIPITOR",
    "VOLTAREN",
    "AMOXIL",
    "ZITHROMAX",
    "CLARINASE",
    "OMEGA",
    "CONCOR",
    "GLUCOPHAGE",
    "ZANTAC",
    "FLAGYL",
    "CATAFLAM",
  ];

  const popular: Medicine[] = [];
  for (const keyword of popularKeywords) {
    const found = all.find((m) =>
      m.commercial_name_en.toUpperCase().includes(keyword)
    );
    if (found) popular.push(found);
    if (popular.length >= limit) break;
  }

  // Fill remaining slots with affordable well-known medicines
  if (popular.length < limit) {
    const extras = all
      .filter(
        (m) =>
          m.price_egp > 0 &&
          m.price_egp < 200 &&
          !popular.some((p) => p.commercial_name_en === m.commercial_name_en)
      )
      .slice(0, limit - popular.length);
    popular.push(...extras);
  }

  return popular;
}

// Get featured medicines for hero section
export function getFeaturedMedicines(all: Medicine[], limit = 6): Medicine[] {
  return all
    .filter((m) => m.price_egp > 10 && m.price_egp < 500 && m.commercial_name_ar)
    .slice(0, limit);
}

// Filter medicines by category
export function getMedicinesByCategory(
  categoryId: string,
  all: Medicine[],
  limit = 24
): Medicine[] {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return [];

  return all
    .filter((m) => {
      const classUpper = (m.drug_class || "").toUpperCase();
      return category.keywords.some((kw) => classUpper.includes(kw));
    })
    .slice(0, limit);
}

// Format route for display
export function formatRoute(route: string): string {
  const map: Record<string, string> = {
    "ORAL.SOLID": "Oral (Tablet/Capsule)",
    "ORAL.LIQUID": "Oral (Liquid)",
    TOPICAL: "Topical",
    INJECTION: "Injection",
    OPHTHALMIC: "Eye Drops",
    "NASAL.SPRAY": "Nasal Spray",
    INHALATION: "Inhalation",
  };
  return map[route] || route || "—";
}

// Generate WhatsApp message
export function generateWhatsAppMessage(medicine: Medicine, pharmacyName: string): string {
  return encodeURIComponent(
    `مرحباً، أريد أن أطلب:\n\n` +
    `💊 *${medicine.commercial_name_en}*\n` +
    `📦 ${medicine.commercial_name_ar || ""}\n` +
    `💵 السعر: ${medicine.price_egp} جنيه\n\n` +
    `من صيدلية ${pharmacyName}`
  );
}
