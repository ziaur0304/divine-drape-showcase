import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";

const products: Product[] = [
  {
    id: "1",
    name: "Royal Silk Saree",
    price: 2499,
    originalPrice: 4999,
    image: dress1,
    category: "Designer Drapes"
  },
  {
    id: "2",
    name: "Elegant Cotton Blend",
    price: 1799,
    originalPrice: 3599,
    image: dress2,
    category: "Pre-Designed Sarees"
  },
  {
    id: "3",
    name: "Traditional Banarasi",
    price: 3499,
    originalPrice: 6999,
    image: dress3,
    category: "Designer Drapes"
  },
  {
    id: "4",
    name: "Festive Ethnic Wear",
    price: 2199,
    originalPrice: 4399,
    image: dress4,
    category: "Custom Ethnic Wear"
  }
];

interface OurCollectionProps {
  onAddToCart: (product: Product) => void;
}

const OurCollection = ({ onAddToCart }: OurCollectionProps) => {
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
              <div className="relative aspect-[4/9] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground shadow-glow">
                  50% OFF
                </Badge>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {product.category}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
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
    </section>
  );
};

export default OurCollection;
