import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";

import OurCollection from "@/components/OurCollection";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import VisitBoutique from "@/components/VisitBoutique";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/BottomNavigation";
import CartDrawer from "@/components/CartDrawer";
import CheckoutForm from "@/components/CheckoutForm";
import { Product, CartItem } from "@/types/product";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [showHero, setShowHero] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
    const collectionSection = document.getElementById("collection");
    collectionSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        toast({
          title: "Already in cart",
          description: `${product.name} is already in your cart`,
        });
        return prev;
      }
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
    });
  };

  const handleProceedToOrder = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (data: { name: string; address: string; note: string }) => {
    const whatsappNumber = "919394889709";
    
    const productList = cartItems
      .map((item, index) => `${index + 1}. ${item.name} - ₹${item.price}`)
      .join("%0A");
    
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const message = encodeURIComponent(
      `🛍️ *New Order from ${data.name}*\n\n` +
      `📦 *Products:*\n${cartItems.map((item, index) => `${index + 1}. ${item.name} - ₹${item.price}`).join("\n")}\n\n` +
      `💰 *Total Amount:* ₹${total}\n\n` +
      `📍 *Delivery Address:*\n${data.address}\n\n` +
      (data.note ? `📝 *Special Note:*\n${data.note}\n\n` : "") +
      `Thank you for choosing Ruby's Divine Drape! 🌟`
    );
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    
    setIsCheckoutOpen(false);
    setCartItems([]);
    toast({
      title: "Order sent!",
      description: "Your order has been sent via WhatsApp. We'll contact you soon!",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "categories", "collection", "about", "how-it-works", "visit", "connect"];
      
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
        <OurCollection onAddToCart={handleAddToCart} />
        <About />
        <HowItWorks />
        <VisitBoutique />
        <Connect />
        <Footer />
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onProceedToOrder={handleProceedToOrder}
      />

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onSubmit={handleCheckoutSubmit}
      />

      <BottomNavigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cartCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
      />
    </main>
  );
};

export default Index;
