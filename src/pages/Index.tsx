import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import ProductShowcase from "@/components/ProductShowcase";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import VisitBoutique from "@/components/VisitBoutique";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [showHero, setShowHero] = useState(true);

  const handleEnterBoutique = () => {
    setShowHero(false);
    const categoriesSection = document.getElementById("categories");
    categoriesSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigate = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (category: string) => {
    const collectionsSection = document.getElementById("collections");
    collectionsSection?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "categories", "collections", "about", "how-it-works", "visit", "connect"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {showHero && <Hero onEnter={handleEnterBoutique} />}
      
      <div className={showHero ? "hidden" : ""}>
        <CategoryCards onCategoryClick={handleCategoryClick} />
        <ProductShowcase />
        <About />
        <HowItWorks />
        <VisitBoutique />
        <Connect />
        <Footer />
      </div>

      <FloatingWhatsApp />
      <BottomNavigation activeSection={activeSection} onNavigate={handleNavigate} />
    </main>
  );
};

export default Index;
