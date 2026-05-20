export interface Medicine {
  commercial_name_en: string;
  commercial_name_ar: string;
  scientific_name: string;
  manufacturer: string;
  drug_class: string;
  route: string;
  price_egp: number;
}

export interface SearchResult {
  item: Medicine;
  score?: number;
}
