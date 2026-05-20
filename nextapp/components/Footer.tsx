import { MessageCircle, Phone, MapPin, Clock } from "lucide-react";
import { PHARMACY_CONFIG } from "@/config/pharmacy";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #14532d 0%, #15803d 50%, #166534 100%)",
        color: "white",
        padding: "3rem 1.5rem 2rem",
        marginTop: "4rem",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                ✚
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>د. أبانوب رمزي</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>Dr. Abanoub Ramzy Pharmacy</div>
              </div>
            </div>
            <p style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.7 }}>
              صيدليتك الذكية الموثوقة — نوفر أفضل الأدوية بأسرع وقت مع أعلى مستويات الجودة والرعاية.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: "1rem", opacity: 0.9 }}>
              تواصل معنا
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href={`https://wa.me/${PHARMACY_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "white",
                  textDecoration: "none",
                  fontSize: 13,
                  opacity: 0.85,
                  transition: "opacity 0.2s",
                }}
              >
                <MessageCircle size={15} />
                واتساب
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 13, opacity: 0.75 }}>
                <Phone size={15} />
                {PHARMACY_CONFIG.phone}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 13, opacity: 0.75 }}>
                <MapPin size={15} />
                {PHARMACY_CONFIG.addressAr}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 13, opacity: 0.75 }}>
                <Clock size={15} />
                {PHARMACY_CONFIG.workingHoursAr}
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: "1rem", opacity: 0.9 }}>
              اطلب أدويتك الآن
            </h3>
            <p style={{ fontSize: 13, opacity: 0.75, marginBottom: "1rem", lineHeight: 1.6 }}>
              تسليم سريع لباب منزلك — تواصل معنا عبر واتساب وسنرد في أقرب وقت.
            </p>
            <a
              href={`https://wa.me/${PHARMACY_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "white",
                padding: "0.65rem 1.25rem",
                borderRadius: 50,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                transition: "background 0.2s",
              }}
            >
              <MessageCircle size={16} />
              ابدأ المحادثة
            </a>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: 12, opacity: 0.6 }}>
            © 2024 {PHARMACY_CONFIG.name}. جميع الحقوق محفوظة.
          </p>
          <p style={{ fontSize: 12, opacity: 0.6 }}>
            مدعوم بقاعدة بيانات الأدوية المصرية
          </p>
        </div>
      </div>
    </footer>
  );
}
