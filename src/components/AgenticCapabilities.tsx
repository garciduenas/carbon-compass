import { motion } from "framer-motion";
import { Brain, GitBranch, Plug, Target, Cpu } from "lucide-react";

const capabilities = [
  {
    icon: <Brain size={20} />,
    title: "Autonomous Reasoning",
    description:
      "Nemotron doesn't wait for prompts — it anticipates needs, decomposes complex sustainability problems, and reasons through trade-offs autonomously before presenting optimized solutions.",
    highlight: "Thinks before it acts",
  },
  {
    icon: <GitBranch size={20} />,
    title: "Multi-Step Workflows",
    description:
      "Plans and executes complex, chained tasks: analyzing your travel itinerary, cross-referencing transit schedules, calculating emissions per segment, and booking the lowest-carbon route — all in one flow.",
    highlight: "End-to-end execution",
  },
  {
    icon: <Plug size={20} />,
    title: "Tool Integration",
    description:
      "Connects to real-time energy grids, transit APIs, SAF availability databases, and carbon registries. The agent decides which tools to invoke and orchestrates them intelligently.",
    highlight: "Live data, real APIs",
  },
  {
    icon: <Target size={20} />,
    title: "Real-World Applicability",
    description:
      "Not a toy demo. Solves actual problems: commute optimization, dietary impact analysis, corporate travel policies, and supply chain emissions — with verifiable, actionable outputs.",
    highlight: "Production-grade solutions",
  },
  {
    icon: <Cpu size={20} />,
    title: "Why NVIDIA Nemotron",
    description:
      "Purpose-built for agentic workloads with superior instruction following, structured output generation, and tool-calling accuracy. Nemotron's architecture enables reliable multi-turn reasoning at scale.",
    highlight: "Built for agents",
  },
];

export default function AgenticCapabilities() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
          <Cpu size={12} />
          NVIDIA Nemotron
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
          Agentic AI, not just a chatbot
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Carbon Compass is powered by NVIDIA Nemotron — a model architecture designed from the ground up for autonomous, multi-step agent workflows.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.title}
            className={`relative p-7 rounded-2xl border border-border bg-card card-hover overflow-hidden ${
              i === 4 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.08,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                {cap.icon}
              </div>
              <span className="text-[10px] font-mono-data text-primary font-medium uppercase tracking-wider">
                {cap.highlight}
              </span>
              <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">
                {cap.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {cap.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
