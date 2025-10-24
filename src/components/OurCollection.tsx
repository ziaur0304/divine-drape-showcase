import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ZoomIn } from "lucide-react";
import { Product } from "@/types/product";
import { useState } from "react";
import { ImageViewer } from "./ImageViewer";
import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";
import dress5 from "@/assets/dress-5.jpg";
import dress6 from "@/assets/dress-6.jpg";

const products: Product[] = [
  {
    id: "1",
    name: "Peach Tiered Anarkali with Floral Embroidery",
    price: 2374,
    originalPrice: 4749,
    image: dress1,
    category: "Designer Drapes"
  },
  {
    id: "2",
    name: "Pastel Pink Embroidered Anarkali Dress",
    price: 2689,
    originalPrice: 5379,
    image: dress2,
    category: "Pre-Designed Sarees"
  },
  {
    id: "3",
    name: "Grey Floral Print Pleated Maxi Dress with Embellishment",
    price: 1929,
    originalPrice: 3859,
    image: dress3,
    category: "Designer Drapes"
  },
  {
    id: "4",
    name: "Yellow & Green Printed Anarkali Kurta Set with Dupatta - Cloth set in 3 pieces",
    price: 1774,
    originalPrice: 3549,
    image: dress4,
    category: "Custom Ethnic Wear"
  },
  {
    id: "5",
    name: "Lemon Yellow Floral Embroidered Cotton Maxi Dress",
    price: 2689,
    originalPrice: 5379,
    image: dress5,
    category: "Designer Drapes"
  },
  {
    id: "6",
    name: "Lavender Floral Embroidered Cotton Suit Set",
    price: 2389,
    originalPrice: 4779,
    image: dress6,
    category: "Designer Drapes"
  }
];

interface OurCollectionProps {
  onAddToCart: (product: Product) => void;
}

const OurCollection = ({ onAddToCart }: OurCollectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="collection" className="py-16 px-4 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl text-primary mb-4">
            Our Collection
          </h2>
          <p className="text-muted-foreground text-lg">
            Exclusive pieces crafted with tradition and elegance
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden bg-card border-accent/20 hover:shadow-elegant transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/9] overflow-hidden cursor-pointer" onClick={() => setSelectedImage(product.image)}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground shadow-glow">
                  50% OFF
                </Badge>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">
                    {product.name}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-base font-bold text-primary">
                    ₹{product.price}
                  </span>
                </div>

                <Button
                  onClick={() => onAddToCart(product)}
                  variant="luxury"
                  size="sm"
                  className="w-full"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ImageViewer
        src={selectedImage || ""}
        alt="Product fullscreen"
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
};

export default OurCollection;
