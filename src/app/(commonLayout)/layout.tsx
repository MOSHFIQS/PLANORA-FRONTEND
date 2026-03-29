import Footer from "@/components/home/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[98vw] mx-auto min-h-screen flex flex-col space-y-5">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 ">
        {children}
      </main>

      <Footer />
    </div>
  );
}