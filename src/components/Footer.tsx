import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-playfair font-bold mb-4">
              Ruby's Divine Drape
            </h3>
            <p className="text-primary-foreground/80">
              Customise your style, the ethnic way.
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#about" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#collections" className="hover:text-secondary transition-colors">Collections</a></li>
              <li><a href="#visit" className="hover:text-secondary transition-colors">Visit Boutique</a></li>
              <li><a href="#connect" className="hover:text-secondary transition-colors">Connect</a></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Lakhipur, Assam 783129</li>
              <li>India</li>
              <li>+91 93948 89709</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/80 flex items-center justify-center gap-2">
            Crafted with <Heart className="h-4 w-4 text-secondary animate-pulse-soft" /> for divine elegance
          </p>
          <p className="text-primary-foreground/60 text-sm mt-2">
            © {new Date().getFullYear()} Ruby's Divine Drape. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
