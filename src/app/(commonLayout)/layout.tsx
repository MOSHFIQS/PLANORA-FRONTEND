import Footer from "@/components/home/footer/Footer";
import { Navbar } from "@/components/home/navbar/Navbar";
import AIAssistantWidget from "@/components/shared/ai/AIAssistantWidget";
import LoginPromptModal from "@/components/shared/auth/LoginPromptModal";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[98vw] mx-auto min-h-screen flex flex-col space-b-5">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 px-2 ">
        {children}
      </main>
      <AIAssistantWidget />
      <LoginPromptModal />
      <Footer />
    </div>
  );
}