import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, MessageCircle, Phone } from "lucide-react";
import { Product } from "@/types/product";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";
import dress5 from "@/assets/dress-5.jpg";
import dress6 from "@/assets/dress-6.jpg";
import dress7 from "@/assets/dress-7.jpg";
import dress8 from "@/assets/dress-8.jpg";
import dress9 from "@/assets/dress-9.jpg";
import dress10 from "@/assets/dress-10.jpg";
import dress11 from "@/assets/dress-11.jpg";
import dress12 from "@/assets/dress-12.jpg";
import dress13 from "@/assets/dress-13.jpg";
import dress14 from "@/assets/dress-14.jpg";
import dress15 from "@/assets/dress-15.jpg";
import dress16 from "@/assets/dress-16.jpg";
import dress17 from "@/assets/dress-17.jpg";
import dress18 from "@/assets/dress-18.jpg";
import dress19 from "@/assets/dress-19.jpg";
import dress20 from "@/assets/dress-20.jpg";
import dress21 from "@/assets/dress-21.jpg";
import dress22 from "@/assets/dress-22.jpg";
import dress23 from "@/assets/dress-23.jpg";
import dress24 from "@/assets/dress-24.jpg";
import dress23_1 from "@/assets/dress-23-1.jpg";
import dress23_2 from "@/assets/dress-23-2.jpg";
import dress24_1 from "@/assets/dress-24-1.jpg";
import dress24_2 from "@/assets/dress-24-2.jpg";


const products: Product[] = [
  {
    id: "1",
    name: "Peach Tiered Anarkali with Floral Embroidery",
    price: 2370,
    originalPrice: 4740,
    image: dress1,
    category: "Designer Drapes"
  },
  {
    id: "2",
    name: "Pastel Pink Embroidered Anarkali Dress",
    price: 2685,
    originalPrice: 5370,
    image: dress2,
    category: "Pre-Designed Sarees"
  },
  {
    id: "3",
    name: "Grey Floral Print Pleated Maxi Dress with Embellishment",
    price: 1925,
    originalPrice: 3850,
    image: dress3,
    category: "Designer Drapes"
  },
  {
    id: "4",
    name: "Yellow & Green Printed Anarkali Kurta Set with Dupatta - Cloth set in 3 pieces",
    price: 1768,
    originalPrice: 3536,
    image: dress4,
    category: "Custom Ethnic Wear"
  },
  {
    id: "5",
    name: "Lemon Yellow Floral Embroidered Cotton Maxi Dress",
    price: 2685,
    originalPrice: 5370,
    image: dress5,
    category: "Designer Drapes"
  },
  {
    id: "6",
    name: "Lavender Floral Embroidered Cotton Suit Set",
    price: 2385,
    originalPrice: 4770,
    image: dress6,
    category: "Designer Drapes"
  },
  {
    id: "7",
    name: "Fuchsia and Teal Abstract Co-ord",
    price: 2604,
    originalPrice: 5208,
    image: dress7,
    category: "Designer Drapes"
  },
  {
    id: "8",
    name: "Aura Pink Festive Suit",
    price: 2370,
    originalPrice: 4740,
    image: dress8,
    category: "Custom Ethnic Wear"
  },
  {
    id: "9",
    name: "Ethereal Blossom Sundress",
    price: 2370,
    originalPrice: 4740,
    image: dress9,
    category: "Designer Drapes"
  },
  {
    id: "10",
    name: "Artisan Pink Tiered Dress",
    price: 2212,
    originalPrice: 4425,
    image: dress10,
    category: "Designer Drapes"
  },
  {
    id: "11",
    name: "The Floral Yoke Ruffle Dress",
    price: 2212,
    originalPrice: 4425,
    image: dress11,
    category: "Designer Drapes"
  },
  
  {
    id: "13",
    name: "The Empress A-line Dress",
    price: 2055,
    originalPrice: 4110,
    image: dress13,
    category: "Designer Drapes"
  },
  {
    id: "14",
    name: "The Dusty Rose Elegance Set",
    price: 1740,
    originalPrice: 3480,
    image: dress14,
    category: "Custom Ethnic Wear"
  },
  {
    id: "15",
    name: "The Modern Muse Kurta Set",
    price: 1740,
    originalPrice: 3480,
    image: dress15,
    category: "Custom Ethnic Wear"
  },
  {
    id: "16",
    name: "Raspberry Bloom Tunic",
    price: 1740,
    originalPrice: 3480,
    image: dress16,
    category: "Designer Drapes"
  },
  {
    id: "19",
    name: "The Empress A-line Dress - Marigold Bloom",
    price: 2055,
    originalPrice: 4110,
    image: dress19,
    category: "Designer Drapes"
  },
  {
    id: "17",
    name: "The Ivory Garden Floral Tunic",
    price: 1897,
    originalPrice: 3795,
    image: dress17,
    category: "Designer Drapes"
  },
  {
    id: "18",
    name: "The Fuchsia Forest Gathered Dress",
    price: 2055,
    originalPrice: 4110,
    image: dress18,
    category: "Custom Ethnic Wear"
  },

{
    id: "12",
    name: "Rose Garden Volume Dress",
    price: 2212,
    originalPrice: 4425,
    image: dress12,
    category: "Designer Drapes"
  },
  {
    id: "20",
    name: "The Poppy Meadow Dress",
    price: 1110,
    originalPrice: 2220,
    image: dress20,
    category: "Designer Drapes"
  }, 
  {
    id: "21",
    name: "Pastel Garden Vine Kurta Set",
    price: 1110,
    originalPrice: 2220,
    image: dress21,
    category: "Designer Drapes"
  },
  {
    id: "22",
    name: "Pop-Sleeve Printed Lounge Set",
    price: 952,
    originalPrice: 1905,
    image: dress22,
    category: "Custom Ethnic Wear"
  },

{
    id: "23",
    name: "The Serene Sky Embroidered Suit Set",
    price: 1740,
    originalPrice: 3480,
    image: dress23,
    category: "Designer Drapes"
  },
  {
    id: "24",
    name: "The Rose Quartz Textured Suit",
    price: 1110,
    originalPrice: 2220,
    image: dress24,
    category: "Designer Drapes"
  },
  {
    id: "25",
    name: "The Serene Willow Dress",
    price: 3750,
    originalPrice: 7500,
    image: dress23_1,
    images: [dress23_1, dress23_2],
    category: "Designer Drapes",
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: "26",
    name: "Paisley Bloom Kurta",
    price: 1985,
    originalPrice: 3970,
    image: dress24_1,
    images: [dress24_1, dress24_2],
    category: "Custom Ethnic Wear",
    sizes: ["M", "L", "XL", "XXL"]
  }
];

interface OurCollectionProps {
  onAddToCart: (product: Product) => void;
}

const OurCollection = ({ onAddToCart }: OurCollectionProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleWhatsApp = () => {
    const whatsappNumber = "919957977221";
    const productInfo = selectedProduct 
      ? `Hi! I'd like more details about: ${selectedProduct.name} (₹${selectedProduct.price}).`
      : "Hi! I'd like to know more about your collection.";
    const message = encodeURIComponent(productInfo);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+919957977221";
  };

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
              <div 
                className="relative aspect-[4/9] overflow-hidden cursor-pointer" 
                onClick={() => setSelectedProduct(product)}
              >
                {product.images && product.images.length > 1 ? (
                  <Carousel className="w-full h-full absolute inset-0">
                    <CarouselContent className="h-full">
                      {product.images.map((img, idx) => (
                        <CarouselItem key={idx} className="h-full">
                          <img
                            src={img}
                            alt={`${product.name} - ${idx + 1}`}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground shadow-glow">
                  50% OFF
                </Badge>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-display text-lg text-foreground mb-1">
                    {product.name}
                  </h3>
                  {product.sizes && (
                    <p className="text-sm text-muted-foreground">
                      Sizes: {product.sizes.join(", ")}
                    </p>
                  )}
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

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-primary">
              Contact for Details
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              For more information about <span className="font-semibold text-foreground">{selectedProduct?.name}</span>, 
              please reach out to us through WhatsApp or call.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={handleWhatsApp}
              variant="secondary"
              size="lg"
              className="w-full"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Us
            </Button>
            <Button
              onClick={handleCall}
              variant="luxury"
              size="lg"
              className="w-full"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default OurCollection;
