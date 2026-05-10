import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Templates from "@/components/landing/Templates";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Templates />
      <CTA />
      <footer className="px-8 py-5 border-t border-[#1a1a1a] flex items-center justify-between">
        <span className="text-[#555] text-sm font-medium">FlashFolio</span>
        <span className="text-[#333] text-xs">Built by Aditya Panicker</span>
      </footer>
    </main>
  );
}
