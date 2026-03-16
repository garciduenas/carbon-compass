import { Globe, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Globe size={20} />,
    title: "Global Routing",
    description: "Multi-modal transport analysis including SAF-enabled flights, rail, and EV-first ground transit.",
  },
  {
    icon: <Zap size={20} />,
    title: "Real-time Grid Data",
    description: "We sync with local energy grids to suggest high-energy tasks when the grid is cleanest.",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Precision Offsets",
    description: "Not all trees are equal. We fund high-permanence carbon removal projects with verified telemetry.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-10 h-10 rounded-lg surface-glass flex items-center justify-center text-primary">
              {f.icon}
            </div>
            <h3 className="text-lg font-medium text-foreground">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
