import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Instagram, Facebook } from "lucide-react";

const Connect = () => {
  const handleWhatsApp = () => {
    const whatsappNumber = "919394889709";
    const message = encodeURIComponent("Hi! I'd like to know more about your collection.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+919394889709";
  };

  return (
    <section id="connect" className="py-20 px-6 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Connect With Us
          </h2>
          <p className="text-lg text-muted-foreground">
            Let's create something divine together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* WhatsApp Card */}
          <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-all duration-300 animate-zoom-in">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-[#25D366]/10 rounded-full">
                  <MessageCircle className="h-10 w-10 text-[#25D366]" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-semibold text-primary mb-2">
                  WhatsApp Us
                </h3>
                <p className="text-muted-foreground mb-4">
                  Chat with us for instant updates and video consultations
                </p>
                <p className="text-lg font-semibold text-primary mb-4">
                  +91 93948 89709
                </p>
              </div>
              <Button onClick={handleWhatsApp} variant="secondary" size="lg" className="w-full">
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Chat
              </Button>
            </div>
          </div>

          {/* Call Card */}
          <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-elegant transition-all duration-300 animate-zoom-in" style={{ animationDelay: "0.1s" }}>
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-secondary/10 rounded-full">
                  <Phone className="h-10 w-10 text-secondary" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-semibold text-primary mb-2">
                  Call Us
                </h3>
                <p className="text-muted-foreground mb-4">
                  Speak directly with our design consultants
                </p>
                <p className="text-lg font-semibold text-primary mb-4">
                  +91 93948 89709
                </p>
              </div>
              <Button onClick={handleCall} variant="luxury" size="lg" className="w-full">
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <p className="text-muted-foreground mb-6">Follow us on social media</p>
          <div className="flex justify-center gap-4">
            <button className="p-3 bg-gradient-card border border-border rounded-full hover:border-secondary hover:shadow-glow transition-all duration-300">
              <Instagram className="h-6 w-6 text-primary" />
            </button>
            <button className="p-3 bg-gradient-card border border-border rounded-full hover:border-secondary hover:shadow-glow transition-all duration-300">
              <Facebook className="h-6 w-6 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
