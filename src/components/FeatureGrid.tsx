import { Globe, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    step: "01",
    icon: <Globe size={22} />,
    title: "Global Routing",
    description: "Multi-modal transport analysis including SAF-enabled flights, rail, and EV-first ground transit across 190+ countries.",
  },
  {
    step: "02",
    icon: <Zap size={22} />,
    title: "Real-time Grid Data",
    description: "Syncs with local energy grids to suggest high-energy tasks when the grid is cleanest. Reduce emissions without changing habits.",
  },
  {
    step: "03",
    icon: <BarChart3 size={22} />,
    title: "Precision Offsets",
    description: "Not all trees are equal. We fund high-permanence carbon removal projects with verified telemetry and full transparency.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">How it works</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three layers of intelligence working together to minimize your environmental impact.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="relative p-8 rounded-2xl border border-border bg-card card-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs font-mono-data text-muted-foreground/40 font-medium">{f.step}</span>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mt-4 mb-5">
              {f.icon}
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
