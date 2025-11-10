import { Card } from "@/components/ui/card";
import { Sparkles, Scissors, Shirt } from "lucide-react";

interface CategoryCardsProps {
  onCategoryClick: (category: string) => void;
}

const CategoryCards = ({ onCategoryClick }: CategoryCardsProps) => {
  const categories = [
    {
      id: "designer",
      title: "Designer Drapes",
      icon: Sparkles,
      description: "Exclusive designer collection with contemporary elegance",
      gradient: "from-secondary/20 to-accent/20",
    },
    {
      id: "pre-designed",
      title: "Pre-Designed Costumes",
      icon: Shirt,
      description: "Curated traditional costumes with timeless appeal",
      gradient: "from-accent/20 to-secondary/20",
    },
    {
      id: "custom",
      title: "Custom Ethnic Wear",
      icon: Scissors,
      description: "Personalized designs crafted to your vision",
      gradient: "from-primary/10 to-secondary/10",
    },
  ];

  return (
    <section id="categories" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each piece crafted with care, tradition, and divine elegance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className="group cursor-pointer bg-gradient-card border-border hover:border-secondary transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 animate-zoom-in overflow-hidden"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative p-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-secondary/10 rounded-full group-hover:bg-secondary/20 transition-colors">
                      <Icon className="h-10 w-10 text-secondary group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-playfair font-semibold text-primary group-hover:text-secondary transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
