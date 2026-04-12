import { motion } from "framer-motion";
import { Search, Wand2, Luggage } from "lucide-react";

const steps = [
  { icon: Search, step: "01", title: "Tell Us Your Plans", description: "Enter your destination, travel dates, budget, and preferences." },
  { icon: Wand2, step: "02", title: "AI Builds Your Trip", description: "Our AI crafts a personalized itinerary with flights, hotels, and activities." },
  { icon: Luggage, step: "03", title: "Travel with Confidence", description: "Review, customize, and book—then enjoy your perfectly planned trip." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three simple steps to your perfect trip.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 relative">
                <step.icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 right-0 translate-x-1/2 w-16 border-t-2 border-dashed border-primary/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
