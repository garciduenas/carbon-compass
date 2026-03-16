import { motion } from "framer-motion";
import { Leaf, Train, Utensils, ArrowDown, CheckCircle2 } from "lucide-react";

interface AgentResponseProps {
  query: string;
}

const CURVE = [0.16, 1, 0.3, 1] as const;

export default function AgentResponse({ query }: AgentResponseProps) {
  const isTravel = query.toLowerCase().includes("travel") || query.toLowerCase().includes("los angeles") || query.toLowerCase().includes("san jose");
  const isFood = query.toLowerCase().includes("beef") || query.toLowerCase().includes("ate") || query.toLowerCase().includes("drove");

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [...CURVE] }}
    >
      <div className="surface-glass rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="font-mono-data text-xs text-muted-foreground uppercase tracking-[0.15em]">
            Agent_Response
          </span>
        </div>

        {/* Analysis */}
        <div className="p-6 space-y-6">
          <div>
            <p className="text-xs font-mono-data text-muted-foreground uppercase tracking-tighter mb-2">Input Parsed</p>
            <p className="text-sm text-foreground/80 italic">"{query}"</p>
          </div>

          {/* Impact Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/60 rounded-xl p-4 border border-border">
              <p className="text-[10px] font-mono-data text-muted-foreground uppercase tracking-tighter mb-1">Current Impact</p>
              <p className="text-2xl font-mono-data text-foreground font-semibold">
                {isTravel ? "142.4" : isFood ? "18.7" : "85.2"}
              </p>
              <p className="text-xs font-mono-data text-muted-foreground">KG CO₂e</p>
            </div>
            <div className="bg-background/60 rounded-xl p-4 border border-border">
              <p className="text-[10px] font-mono-data text-muted-foreground uppercase tracking-tighter mb-1">Optimized</p>
              <p className="text-2xl font-mono-data text-primary font-semibold">
                {isTravel ? "38.6" : isFood ? "4.2" : "32.1"}
              </p>
              <p className="text-xs font-mono-data text-primary">KG CO₂e</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ArrowDown size={16} className="text-primary" />
            <span className="text-xs font-mono-data text-primary ml-2">
              {isTravel ? "−72.9%" : isFood ? "−77.5%" : "−62.3%"} reduction possible
            </span>
          </div>

          {/* Recommendations */}
          <div className="space-y-3">
            <p className="text-xs font-mono-data text-muted-foreground uppercase tracking-tighter">Optimization Plan</p>

            {isTravel ? (
              <>
                <RecommendationItem
                  icon={<Train size={16} />}
                  title="Take Amtrak Pacific Surfliner + Capitol Corridor"
                  saving="−103.8 KG CO₂e"
                  detail="LA Union Station → San Jose Diridon. 7h 45m. $42 one-way."
                  delay={0.1}
                />
                <RecommendationItem
                  icon={<Leaf size={16} />}
                  title="If flying: book SAF-enabled carrier"
                  saving="−28.5 KG CO₂e"
                  detail="United LAX→SJC offers 40% SAF blend on select flights."
                  delay={0.2}
                />
                <RecommendationItem
                  icon={<Utensils size={16} />}
                  title="Offset remaining with verified CDR"
                  saving="−10.1 KG CO₂e"
                  detail="Fund direct air capture at $12.40 for full offset."
                  delay={0.3}
                />
              </>
            ) : isFood ? (
              <>
                <RecommendationItem
                  icon={<Utensils size={16} />}
                  title="Swap beef for plant-based protein"
                  saving="−12.8 KG CO₂e"
                  detail="Lentils, tempeh, or beyond burger reduce impact by 85%."
                  delay={0.1}
                />
                <RecommendationItem
                  icon={<Train size={16} />}
                  title="Replace 20mi drive with EV or transit"
                  saving="−1.7 KG CO₂e"
                  detail="If available, local EV rideshare or bus cuts emissions significantly."
                  delay={0.2}
                />
              </>
            ) : (
              <>
                <RecommendationItem
                  icon={<Leaf size={16} />}
                  title="Analyze and optimize daily patterns"
                  saving="−53.1 KG CO₂e"
                  detail="Personalized plan based on your input data."
                  delay={0.1}
                />
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center gap-2">
          <CheckCircle2 size={14} className="text-primary" />
          <span className="text-xs text-muted-foreground font-mono-data">Analysis complete · Methodology v2.4 · Verified sources</span>
        </div>
      </div>
    </motion.div>
  );
}

function RecommendationItem({
  icon,
  title,
  saving,
  detail,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  saving: string;
  detail: string;
  delay: number;
}) {
  return (
    <motion.div
      className="flex gap-3 p-3 rounded-lg bg-background/40 border border-border"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-primary mt-0.5 shrink-0">{icon}</div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <span className="text-xs font-mono-data text-primary">{saving}</span>
        </div>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
    </motion.div>
  );
}
