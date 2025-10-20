import { Sparkles } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <div className="p-4 bg-secondary/10 rounded-full">
              <Sparkles className="h-12 w-12 text-secondary animate-pulse-soft" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary">
            About Ruby's Divine Drape
          </h2>

          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p className="animate-slide-up">
              Ruby's Divine Drape is a premium clothing hub where you get designers and pre-designed clothing — 
              each piece crafted with care, tradition, and divine elegance.
            </p>
            
            <p className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Discover timeless ethnic drapes, custom styles, and one-on-one design consultations. 
              We bring together the finest craftsmanship of traditional Indian ethnic wear with contemporary 
              design sensibilities.
            </p>

            <p className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              Every saree in our collection is a celebration of heritage, meticulously curated to make you 
              feel divine. Whether you're looking for a classic pre-designed piece or a bespoke creation 
              tailored to your vision, we're here to make your ethnic wear dreams come true.
            </p>
          </div>

          <div className="pt-8 border-t border-border animate-zoom-in" style={{ animationDelay: "0.6s" }}>
            <p className="text-xl font-playfair text-primary italic">
              "Where tradition meets elegance, and every drape tells a story."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
