
import Footer from "@/components/home/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";


export default function CommonLayout({
     children,
}: {
     children: React.ReactNode;
}) {
     return (
          <div className="max-w-[90vw] mx-auto space-y-5">
               <Navbar />
               {children}
               <Footer />
          </div>
     );
}