import { Home, Sparkles, MessageCircle, Info } from "lucide-react";

interface BottomNavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const BottomNavigation = ({ activeSection, onNavigate }: BottomNavigationProps) => {
  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "collections", label: "Collections", icon: Sparkles },
    { id: "connect", label: "WhatsApp", icon: MessageCircle, isWhatsApp: true },
    { id: "about", label: "About", icon: Info },
  ];

  const handleWhatsAppClick = () => {
    const whatsappNumber = "919394889709";
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
              onClick={() => item.isWhatsApp ? handleWhatsAppClick() : onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "text-secondary scale-105"
                  : "text-muted-foreground hover:text-primary"
              } ${item.isWhatsApp ? "text-[#25D366]" : ""}`}
            >
              <Icon className={`h-6 w-6 ${isActive ? "animate-pulse-soft" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
