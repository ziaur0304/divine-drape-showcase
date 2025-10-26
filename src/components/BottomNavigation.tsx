import { Home, Sparkles, MessageCircle, Info, ShoppingCart } from "lucide-react";

interface BottomNavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  cartCount: number;
  onCartClick: () => void;
}

const BottomNavigation = ({ activeSection, onNavigate, cartCount, onCartClick }: BottomNavigationProps) => {
  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "collection", label: "Collections", icon: Sparkles },
    { id: "cart", label: "Cart", icon: ShoppingCart, isCart: true },
    { id: "connect", label: "WhatsApp", icon: MessageCircle, isWhatsApp: true },
    { id: "about", label: "About", icon: Info },
  ];

  const handleWhatsAppClick = () => {
    const whatsappNumber = "919957977221";
    const message = encodeURIComponent("Hi! I'm interested in your ethnic wear collection.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-card backdrop-blur-lg border-t border-border shadow-elegant">
      <div className="flex items-center justify-around max-w-md mx-auto py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isWhatsApp) {
                  handleWhatsAppClick();
                } else if (item.isCart) {
                  onCartClick();
                } else {
                  onNavigate(item.id);
                }
              }}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-secondary scale-105"
                  : "text-muted-foreground hover:text-primary"
              } ${item.isWhatsApp ? "text-[#25D366]" : ""}`}
            >
              <div className="relative">
                <Icon className={`h-6 w-6 ${isActive ? "animate-pulse-soft" : ""}`} />
                {item.isCart && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse-soft">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
