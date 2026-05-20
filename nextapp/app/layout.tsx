import type { Metadata } from "next";
import "./globals.css";
import { PHARMACY_CONFIG } from "@/config/pharmacy";

export const metadata: Metadata = {
  title: PHARMACY_CONFIG.name,
  description: PHARMACY_CONFIG.tagline,
  keywords: "pharmacy, egypt, medicine, drug",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen" style={{ background: "var(--bg)" }}>
        {children}
      </body>
    </html>
  );
}
