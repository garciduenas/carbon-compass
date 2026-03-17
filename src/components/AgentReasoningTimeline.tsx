import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Search, Globe, Database, Cpu, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const REASONING_STEPS = [
  {
    id: "parse",
    icon: <Brain size={16} />,
    label: "Parsing natural language input",
    detail: "Nemotron NLP engine extracting intent, entities & constraints",
    duration: 1800,
  },
  {
    id: "plan",
    icon: <Search size={16} />,
    label: "Planning multi-step workflow",
    detail: "Autonomous reasoning over 12 possible action graphs",
    duration: 2200,
  },
  {
    id: "apis",
    icon: <Globe size={16} />,
    label: "Connecting external APIs",
    detail: "Amtrak · Google Maps · EPA emissions · Weather.gov",
    duration: 2000,
  },
  {
    id: "data",
    icon: <Database size={16} />,
    label: "Aggregating real-time data",
    detail: "Cross-referencing schedules, pricing & carbon factors",
    duration: 1600,
  },
  {
    id: "optimize",
    icon: <Cpu size={16} />,
    label: "Optimizing carbon pathways",
    detail: "Nemotron evaluating 847 route permutations",
    duration: 1400,
  },
];

const CURVE = [0.16, 1, 0.3, 1] as const;

export default function AgentReasoningTimeline({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    if (currentStep >= REASONING_STEPS.length) {
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }

    const step = REASONING_STEPS[currentStep];
    const interval = 30;
    const increments = step.duration / interval;
    let tick = 0;

    setStepProgress(0);
    const timer = setInterval(() => {
      tick++;
      setStepProgress(Math.min((tick / increments) * 100, 100));
      if (tick >= increments) {
        clearInterval(timer);
        setTimeout(() => setCurrentStep((s) => s + 1), 200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  const overallProgress = Math.min(
    ((currentStep + stepProgress / 100) / REASONING_STEPS.length) * 100,
    100
  );

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [...CURVE] }}
    >
      <div className="bg-card rounded-2xl border border-border chat-shadow overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-muted-foreground font-medium">
              Nemotron Agent — Autonomous Reasoning
            </span>
          </div>
          <span className="text-xs font-mono-data text-primary font-medium">
            {Math.round(overallProgress)}%
          </span>
        </div>

        {/* Overall progress */}
        <div className="px-6 pt-4">
          <Progress value={overallProgress} className="h-1.5 bg-muted" />
        </div>

        {/* Steps */}
        <div className="p-6 space-y-1">
          {REASONING_STEPS.map((step, i) => {
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            const isPending = i > currentStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3, ease: [...CURVE] }}
              >
                <div
                  className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    isActive
                      ? "bg-primary/5 border border-primary/15"
                      : isDone
                      ? "opacity-60"
                      : "opacity-30"
                  }`}
                >
                  {/* Icon column */}
                  <div className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckCircle2 size={16} className="text-primary" />
                    ) : (
                      <div className={isActive ? "text-primary" : "text-muted-foreground"}>
                        {step.icon}
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-sm font-medium ${
                          isActive ? "text-foreground" : isDone ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                      {isActive && (
                        <motion.div
                          className="w-1 h-1 rounded-full bg-primary"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        />
                      )}
                    </div>
                    <AnimatePresence>
                      {(isActive || isDone) && (
                        <motion.p
                          className="text-xs text-muted-foreground font-mono-data"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {step.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Step progress */}
                  {isActive && (
                    <span className="text-[10px] font-mono-data text-primary mt-1 shrink-0">
                      {Math.round(stepProgress)}%
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[10px] font-mono-data text-muted-foreground mt-1 shrink-0">
                      done
                    </span>
                  )}
                </div>

                {/* Connector line */}
                {i < REASONING_STEPS.length - 1 && (
                  <div className="ml-[19px] h-2 w-px bg-border" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
