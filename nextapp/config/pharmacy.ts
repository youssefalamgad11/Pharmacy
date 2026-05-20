// ============================================================
// PHARMACY CONFIGURATION FILE
// Easy to edit for each pharmacy client
// ============================================================

export const PHARMACY_CONFIG = {
  name: "Dr. Abanoub Ramzy Pharmacy",
  nameAr: "صيدلية د. أبانوب رمزي",
  tagline: "Your trusted health partner in Egypt",
  taglineAr: "شريكك الموثوق للصحة في مصر",
  whatsapp: "201000000000", // Change to actual WhatsApp number
  phone: "+20 100 000 0000",
  address: "Cairo, Egypt",
  addressAr: "القاهرة، مصر",
  email: "info@drabanoub.com",
  workingHours: "Open 24/7",
  workingHoursAr: "مفتوح 24 ساعة",
};

export const CATEGORIES = [
  {
    id: "pain",
    label: "Pain Relief",
    labelAr: "مسكنات الألم",
    icon: "💊",
    keywords: ["NSAID", "ANALGESIC", "PAIN", "PARACETAMOL", "NEUROPATHIC"],
  },
  {
    id: "cold",
    label: "Cold & Flu",
    labelAr: "البرد والإنفلونزا",
    icon: "🤧",
    keywords: ["COLD", "FLU", "COUGH", "NASAL", "ANTIHISTAMINE"],
  },
  {
    id: "antibiotics",
    label: "Antibiotics",
    labelAr: "المضادات الحيوية",
    icon: "🔬",
    keywords: ["ANTIBIOTIC", "ANTIMICROBIAL", "PENICILLIN", "CEPHALOSPORIN", "QUINOLONE"],
  },
  {
    id: "vitamins",
    label: "Vitamins",
    labelAr: "الفيتامينات",
    icon: "⭐",
    keywords: ["VITAMIN", "MULTIVITAMIN", "SUPPLEMENT", "MINERAL", "CALCIUM"],
  },
  {
    id: "skincare",
    label: "Skin Care",
    labelAr: "العناية بالبشرة",
    icon: "✨",
    keywords: ["SKIN", "DERMATOLOGY", "TOPICAL", "CREAM", "OINTMENT"],
  },
  {
    id: "heart",
    label: "Heart & BP",
    labelAr: "القلب وضغط الدم",
    icon: "❤️",
    keywords: ["ANTIHYPERTENSIVE", "CARDIAC", "BETA-BLOCKER", "HEART", "BLOOD PRESSURE"],
  },
  {
    id: "diabetes",
    label: "Diabetes",
    labelAr: "السكري",
    icon: "🩺",
    keywords: ["ANTIDIABETIC", "INSULIN", "DIABETES", "GLUCOSE"],
  },
  {
    id: "stomach",
    label: "Stomach",
    labelAr: "الجهاز الهضمي",
    icon: "🫁",
    keywords: ["GIT", "PEPTIC", "ANTACID", "PROTON PUMP", "ANTISPASMODIC", "PROBIOTIC"],
  },
];
