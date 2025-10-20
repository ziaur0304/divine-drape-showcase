import { Search, MessageCircle, Sparkles } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Browse Designs",
      description: "Explore our curated collection of designer and pre-designed ethnic wear",
      color: "from-secondary/20 to-accent/20",
    },
    {
      number: "02",
      icon: MessageCircle,
      title: "Connect on WhatsApp",
      description: "Reach out to us for a personalized video call consultation",
      color: "from-accent/20 to-secondary/20",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "Customize & Order",
      description: "Work with us to customize your perfect drape and place your order",
      color: "from-secondary/20 to-primary/10",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-6 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple steps to your perfect ethnic drape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative group animate-zoom-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connecting Line - Hidden on mobile, shown on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-secondary to-accent/50 -z-10" />
                )}

                <div className="text-center space-y-4">
                  {/* Step Number */}
                  <div className="text-6xl font-playfair font-bold text-secondary/20 group-hover:text-secondary/40 transition-colors">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className={`p-6 bg-gradient-to-br ${step.color} rounded-full group-hover:shadow-glow transition-all duration-300`}>
                      <Icon className="h-10 w-10 text-secondary group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-playfair font-semibold text-primary">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
