import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

const VisitBoutique = () => {
  const handleGetDirections = () => {
    const address = "Ruby's Divine Drape, Lakhipur, Assam 783129, India";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank");
  };

  return (
    <section id="visit" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <div className="p-4 bg-secondary/10 rounded-full">
              <MapPin className="h-12 w-12 text-secondary animate-pulse-soft" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary">
            Visit Our Boutique
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
            Experience Ruby's Divine Drape in person. Feel the fabric, see the craftsmanship, 
            and let us help you find your perfect ethnic ensemble.
          </p>

          <div className="bg-gradient-card border border-border rounded-2xl p-8 shadow-soft animate-zoom-in">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-playfair font-semibold text-primary">
                  Ruby's Divine Drape
                </h3>
                <p className="text-lg text-muted-foreground">
                  Lakhipur, Assam 783129, India
                </p>
              </div>

              <Button
                onClick={handleGetDirections}
                variant="hero"
                size="lg"
                className="group"
              >
                <Navigation className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                Get Directions
              </Button>
            </div>
          </div>

          <p className="text-muted-foreground italic animate-slide-up" style={{ animationDelay: "0.3s" }}>
            Walk in to discover a world of divine drapes and personalized styling
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisitBoutique;
