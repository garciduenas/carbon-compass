import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import AgentChatBox from "@/components/AgentChatBox";
import AgentResponse from "@/components/AgentResponse";
import FeatureGrid from "@/components/FeatureGrid";
import SocialProof from "@/components/SocialProof";
import AgenticCapabilities from "@/components/AgenticCapabilities";

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

      {/* Hero with gradient background */}
      <div className="hero-gradient">
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [...CURVE] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Powered by NVIDIA Nemotron Agentic AI
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance text-foreground">
              Autonomous carbon <br className="hidden md:block" />
              <span className="text-primary">intelligence.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed">
              An agentic AI that autonomously reasons, plans multi-step workflows, and integrates real-world tools to route your life through the lowest carbon pathways.
            </p>
          </motion.div>

          <AgentChatBox onSubmit={handleSubmit} isProcessing={isProcessing} />

          {isProcessing && (
            <motion.div
              className="mt-8 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Nemotron agent reasoning through optimal pathways...</span>
            </motion.div>
          )}

          {submittedQuery && <AgentResponse query={submittedQuery} />}
        </main>
      </div>

      <SocialProof />
      <AgenticCapabilities />
      <FeatureGrid />

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Ready for autonomous<br />carbon optimization?</h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">Experience agentic AI powered by NVIDIA Nemotron — reasoning, planning, and acting on your behalf.</p>
        <button className="group px-8 py-4 bg-foreground text-background rounded-full font-medium text-base hover:bg-foreground/90 transition-all">
          <span className="flex items-center gap-2">
            Get Started for Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </section>
    </div>
  );
}
