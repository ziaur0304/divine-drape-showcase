import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpg";

interface HeroProps {
  onEnter: () => void;
}

const Hero = ({ onEnter }: HeroProps) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-subtle">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          {/* Welcome Text */}
          <h1 className=
"font-display text-5x1 md:text-6x1 1g:t ext-7x1 font-bold text-primary animate-slide-up bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">
            Welcome to Ruby's Divine Drape
          </h1>
          
          {/* Logo */}
          <div className="animate-zoom-in flex justify-center" style={{ animationDelay: "0.2s" }}>
            <img 
              src={logo} 
              alt="Ruby's Divine Drape Logo" 
              className="w-64 h-64 md:w-80 md:h-80 object-contain"
            />
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-3xl text-primary font-light animate-slide-up" style={{ animationDelay: "0.3s" }}>
            Customise your style, the ethnic way.
          </p>

          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
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
            <ChevronDown className="h-8 w-8 text-primary/70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
