import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const whatsappNumber = "919394889709";
  const message = encodeURIComponent("Hi! I'm interested in your ethnic wear collection. Can we connect?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-110 animate-pulse-soft"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-8 w-8 text-white" />
    </a>
  );
};

export default FloatingWhatsApp;
