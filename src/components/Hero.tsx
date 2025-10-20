import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-boutique.jpg";

interface HeroProps {
  onEnter: () => void;
}

const Hero = ({ onEnter }: HeroProps) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Ruby's Divine Drape Boutique Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          {/* Logo/Brand Name */}
          <div className="animate-zoom-in">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-primary-foreground mb-4 tracking-tight">
              Ruby's Divine Drape
            </h1>
            <div className="h-1 w-32 bg-gradient-primary mx-auto rounded-full animate-glow" />
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-3xl text-primary-foreground/90 font-light animate-slide-up">
            Customise your style, the ethnic way.
          </p>

          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button
              onClick={onEnter}
              variant="hero"
              size="xl"
              className="group"
            >
              <span className="relative z-10">Enter Boutique</span>
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-primary-foreground/70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
