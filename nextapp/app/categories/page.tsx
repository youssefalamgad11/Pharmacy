import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoriesClient from "@/components/CategoriesClient";

export const metadata = {
  title: "الفئات | صيدلية د. أبانوب رمزي",
  description: "تصفح الأدوية حسب الفئة العلاجية",
};

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <CategoriesClient />
      </main>
      <Footer />
    </>
  );
}
