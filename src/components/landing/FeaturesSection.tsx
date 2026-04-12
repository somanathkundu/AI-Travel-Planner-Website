import { motion } from "framer-motion";
import { Brain, Route, LayoutDashboard, MessageSquare, FolderHeart } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Trip Planner", description: "Input your destination, dates, budget, and preferences—AI generates a full itinerary instantly." },
  { icon: Route, title: "Smart Optimization", description: "Dynamically adjust plans with better routes, timings, and activity suggestions." },
  { icon: LayoutDashboard, title: "Booking Dashboard", description: "A central hub to view all trip details—flights, hotels, and activities in one place." },
  { icon: MessageSquare, title: "Travel Assistant", description: "Chat with AI for trip queries, real-time suggestions, and instant changes." },
  { icon: FolderHeart, title: "Saved Trips", description: "Save, revisit, and edit past trips. Your travel history, always accessible." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="text-gradient">Travel Smart</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Powerful AI features that transform how you plan, book, and experience travel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
