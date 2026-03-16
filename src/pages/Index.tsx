import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import AgentChatBox from "@/components/AgentChatBox";
import AgentResponse from "@/components/AgentResponse";
import FeatureGrid from "@/components/FeatureGrid";
import SocialProof from "@/components/SocialProof";

const CURVE = [0.16, 1, 0.3, 1] as const;

export default function Index() {
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (query: string) => {
    setIsProcessing(true);
    setSubmittedQuery(null);
    setTimeout(() => {
      setSubmittedQuery(query);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [...CURVE] }}
        >
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-balance">
            The logistics of <span className="text-muted-foreground">living.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            An autonomous intelligence layer that routes your life through the lowest carbon pathways. No guilt. Just optimization.
          </p>
        </motion.div>

        <AgentChatBox onSubmit={handleSubmit} isProcessing={isProcessing} />

        {isProcessing && (
          <motion.div
            className="mt-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm font-mono-data text-muted-foreground">Calculating optimal pathways...</span>
          </motion.div>
        )}

        {submittedQuery && <AgentResponse query={submittedQuery} />}
      </main>

      <FeatureGrid />
      <SocialProof />

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-4xl font-medium mb-8 text-foreground">Ready to automate your footprint?</h2>
        <button className="group relative px-8 py-4 bg-foreground text-background rounded-full font-medium overflow-hidden transition-all hover:opacity-90">
          <span className="relative z-10 flex items-center gap-2">
            Get Started for Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </section>
    </div>
  );
}
