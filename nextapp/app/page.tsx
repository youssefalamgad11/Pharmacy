import Link from "next/link";
import { MessageCircle, Search, Sparkles, Shield, Clock } from "lucide-react";
import { PHARMACY_CONFIG, CATEGORIES } from "@/config/pharmacy";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #14532d 0%, #15803d 40%, #059669 70%, #0d9488 100%)",
          padding: "4rem 1.5rem 5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, right: -60, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              padding: "6px 16px",
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: "1.5rem",
            }}
          >
            <Sparkles size={14} />
            بحث ذكي في +24,000 دواء مصري
          </div>

          <h1
            style={{
              color: "white",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: "1rem",
              textShadow: "0 2px 20px rgba(0,0,0,0.2)",
            }}
          >
            صيدلية د. أبانوب رمزي
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
            }}
          >
            ابحث عن أدويتك بذكاء — اكتشف البدائل الأرخص، قارن الأسعار، واطلب فوراً عبر واتساب
          </p>

          <HomeClient />
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: "white", borderBottom: "1px solid var(--border)", boxShadow: "0 2px 12px rgba(22,163,74,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem" }}>
          {[
            { icon: "💊", value: "+24,000", label: "دواء في قاعدة البيانات" },
            { icon: "⚡", value: "فوري", label: "بحث وتوصية آني" },
            { icon: "💰", value: "أرخص", label: "نجد لك البديل الأوفر" },
            { icon: "📱", value: "واتساب", label: "طلب سهل وسريع" },
          ].map(({ icon, value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#15803d" }}>{value}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section style={{ maxWidth: 1200, margin: "3rem auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "#1a2e1c", marginBottom: 8 }}>
            تصفح حسب الفئة
          </h2>
          <p style={{ fontSize: 14, color: "#6b7c6e" }}>اختر الفئة العلاجية التي تبحث عنها</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem" }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories?cat=${cat.id}`}
              style={{
                textDecoration: "none",
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: "1.25rem 0.75rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 2px 8px rgba(22,163,74,0.05)",
                transition: "all 0.2s ease",
              }}
              className="cat-card"
            >
              <span style={{ fontSize: 28 }}>{cat.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2e1c" }}>{cat.labelAr}</span>
              <span style={{ fontSize: 10, color: "#9ca3af" }}>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, color: "#1a2e1c", marginBottom: "2rem" }}>
            لماذا تختار صيدليتنا؟
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              { icon: <Search size={24} />, title: "بحث ذكي متطور", desc: "ابحث بالاسم التجاري أو العلمي أو العربي — نظامنا يفهم حتى لو كتبت بشكل خاطئ." },
              { icon: <Shield size={24} />, title: "بدائل موثوقة", desc: "نكتشف لك الأدوية البديلة بنفس المادة الفعالة بسعر أقل مباشرةً." },
              { icon: <Clock size={24} />, title: "تسليم سريع", desc: "اطلب عبر واتساب واستلم أدويتك في أسرع وقت ممكن." },
              { icon: <MessageCircle size={24} />, title: "خدمة عملاء متميزة", desc: "فريقنا جاهز 24 ساعة للإجابة على استفساراتك وتوجيهك." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "white", borderRadius: 20, padding: "1.5rem", border: "1px solid var(--border)", boxShadow: "0 4px 16px rgba(22,163,74,0.07)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #dcfce7, #bbf7d0)", display: "flex", alignItems: "center", justifyContent: "center", color: "#15803d", marginBottom: "1rem" }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a2e1c", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#6b7c6e", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", background: "linear-gradient(135deg, #15803d, #059669)", borderRadius: 24, padding: "2.5rem 2rem", boxShadow: "0 16px 48px rgba(22,163,74,0.25)" }}>
          <h2 style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 12 }}>جاهز لتطلب أدويتك؟</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: "1.5rem", fontSize: 15 }}>
            تواصل معنا مباشرة عبر واتساب وسنساعدك في الحصول على ما تحتاج
          </p>
          <a
            href={`https://wa.me/${PHARMACY_CONFIG.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "white",
              color: "#15803d",
              padding: "0.85rem 2rem",
              borderRadius: 50,
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            <MessageCircle size={20} />
            ابدأ المحادثة الآن
          </a>
        </div>
      </section>

      <Footer />

      <style>{`
        .cat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(22,163,74,0.15) !important;
          border-color: #86efac !important;
        }
      `}</style>
    </>
  );
}
