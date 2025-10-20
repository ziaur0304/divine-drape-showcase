import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";
import saree5 from "@/assets/saree-5.jpg";
import saree6 from "@/assets/saree-6.jpg";

const ProductShowcase = () => {
  const products = [
    { id: 1, image: saree1, name: "Emerald Elegance", category: "Designer" },
    { id: 2, image: saree2, name: "Teal Tradition", category: "Pre-Designed" },
    { id: 3, image: saree3, name: "Ivory Grace", category: "Custom" },
    { id: 4, image: saree4, name: "Royal Red", category: "Designer" },
    { id: 5, image: saree5, name: "Pastel Dream", category: "Pre-Designed" },
    { id: 6, image: saree6, name: "Burgundy Bliss", category: "Designer" },
  ];

  const handleWhatsAppClick = (productName: string) => {
    const whatsappNumber = "919394889709";
    const message = encodeURIComponent(`Hi! I'm interested in the ${productName} from your collection. Can we schedule a video call?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="collections" className="py-20 px-6 bg-gradient-subtle">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Our Divine Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each drape tells a story of tradition, craftsmanship, and timeless beauty
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden bg-card border-border hover:border-secondary hover:shadow-elegant transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[4/9] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-2">
                    <h3 className="text-lg font-playfair font-semibold text-primary-foreground">
                      {product.name}
                    </h3>
                    <p className="text-sm text-primary-foreground/80 mb-3">
                      {product.category}
                    </p>
                    <Button
                      onClick={() => handleWhatsAppClick(product.name)}
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      View on Video Call
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-slide-up">
          <Button
            onClick={() => handleWhatsAppClick("your collection")}
            variant="luxury"
            size="lg"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Connect for More Designs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
