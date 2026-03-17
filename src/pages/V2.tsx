import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import AgentChatBox from "@/components/AgentChatBox";
import AgentResponseV2 from "@/components/AgentResponseV2";
import AgentReasoningTimeline from "@/components/AgentReasoningTimeline";
import FeatureGrid from "@/components/FeatureGrid";
import AgenticCapabilities from "@/components/AgenticCapabilities";
import { useToast } from "@/hooks/use-toast";

const CURVE = [0.16, 1, 0.3, 1] as const;

export default function V2() {
  const { toast } = useToast();
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [agentResponse, setAgentResponse] = useState<string | null>(null);
  const [agentError, setAgentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [timelineDone, setTimelineDone] = useState(false);
  const [responseReady, setResponseReady] = useState(false);

  const fetchAgentResponse = async (query: string) => {
    setAgentResponse(null);
    setAgentError(null);

    try {
      const base = import.meta.env.VITE_API_BASE ?? "http://localhost:8000";
      const res = await fetch(`${base}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const data = (await res.json()) as { response?: string };
      setAgentResponse(data.response ?? "");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      setAgentError(message);
      toast({
        title: "Agent request failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setResponseReady(true);
    }
  };

  const handleSubmit = (query: string) => {
    setIsProcessing(true);
    setTimelineDone(false);
    setResponseReady(false);
    setShowResponse(false);
    setAgentResponse(null);
    setAgentError(null);
    setSubmittedQuery(query);
    setShowTimeline(true);

    void fetchAgentResponse(query);
  };

  useEffect(() => {
    if (timelineDone && responseReady) {
      setIsProcessing(false);
    }
  }, [timelineDone, responseReady]);

  const handleTimelineComplete = useCallback(() => {
    setTimelineDone(true);
    setShowTimeline(false);
    setShowResponse(true);
  }, []);

  const handleFollowUp = (followUp: string) => {
    handleSubmit(followUp);
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
              V2 — Structured travel analysis UI
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance text-foreground">
              Autonomous carbon <br className="hidden md:block" />
              <span className="text-primary">intelligence (v2).</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed">
              This view renders the agent's output with a cleaner layout and removes placeholder content.
            </p>
          </motion.div>

          <AgentChatBox onSubmit={handleSubmit} isProcessing={isProcessing} />

          {showTimeline && <AgentReasoningTimeline onComplete={handleTimelineComplete} />}

          {showResponse && submittedQuery && (
            <AgentResponseV2 response={agentResponse} isLoading={!responseReady && !agentError} error={agentError} />
          )}
        </main>
      </div>

      <AgenticCapabilities />
      <FeatureGrid />

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
          Ready for autonomous<br />carbon optimization?
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
          Experience agentic AI powered by NVIDIA Nemotron — reasoning, planning, and acting on your behalf.
        </p>
        <button className="group px-8 py-4 bg-foreground text-background rounded-full font-medium text-base hover:bg-foreground/90 transition-all">
          <span className="flex items-center gap-2">
            Get Started for Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </section>
    </div>
  );
}
