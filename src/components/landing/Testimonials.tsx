import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "Digital Nomad", quote: "TripPilot AI planned my 3-week Asia trip in minutes. Every hotel, flight, and activity was perfectly coordinated.", rating: 5 },
  { name: "Marcus Johnson", role: "Business Traveler", quote: "I used to spend hours planning trips. Now I just tell the AI my preferences and it handles everything.", rating: 5 },
  { name: "Elena Rodriguez", role: "Solo Traveler", quote: "The smart itinerary optimization saved me so much time and money. My Rome trip was flawless!", rating: 5 },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Loved by <span className="text-gradient">Travelers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See what our users have to say about their experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="p-6 rounded-xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 italic">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
