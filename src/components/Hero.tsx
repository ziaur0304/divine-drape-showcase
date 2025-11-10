import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpg";

interface HeroProps {
  onEnter: () => void;
}

const Hero = ({ onEnter }: HeroProps) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle py-8"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in">
          
          {/* Heading */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-slide-up">
            Welcome to Ruby's Divine Drape
          </h1>

          {/* Logo */}
          <div className="animate-zoom-in flex justify-center" style={{ animationDelay: "0.2s" }}>
            <img
              src={logo}
              alt="Logo of Ruby's Divine Drape Boutique"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 object-contain"
            />
          </div>

          {/* Tagline */}
          <p
            className="text-lg sm:text-xl md:text-3xl text-primary font-light animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            Customise your style, the ethnic way.
          </p>

          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <Button onClick={onEnter} variant="hero" size="xl" className="group" aria-label="Enter the boutique">
              <span className="relative z-10">Enter Boutique</span>
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-primary/70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;