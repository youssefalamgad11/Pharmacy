import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchPageClient from "@/components/SearchPageClient";

export const metadata = {
  title: "بحث عن دواء | صيدلية د. أبانوب رمزي",
  description: "ابحث في قاعدة بيانات 24,000 دواء مصري",
};

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <SearchPageClient />
      </main>
      <Footer />
    </>
  );
}
