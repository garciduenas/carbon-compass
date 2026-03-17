import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Train, Utensils, ArrowDown, CheckCircle2, CalendarPlus, ArrowUp, CloudSun, Calendar, MessageSquare, Bot, CreditCard, MapPin } from "lucide-react";

interface AgentResponseProps {
  query: string;
  onFollowUp?: (query: string) => void;
}

const CURVE = [0.16, 1, 0.3, 1] as const;

export default function AgentResponse({ query, onFollowUp }: AgentResponseProps) {
  const [replyInput, setReplyInput] = useState("");
  const [showReply, setShowReply] = useState(false);

  const isTravel = query.toLowerCase().includes("travel") || query.toLowerCase().includes("los angeles") || query.toLowerCase().includes("san jose");
  const isFood = query.toLowerCase().includes("beef") || query.toLowerCase().includes("ate") || query.toLowerCase().includes("drove");

  const handleReplySubmit = () => {
    if (replyInput.trim() && onFollowUp) {
      onFollowUp(replyInput.trim());
      setReplyInput("");
      setShowReply(false);
    }
  };

  const followUpSuggestions = isTravel
    ? [
        { icon: <CloudSun size={13} />, label: "What's the weather at my destination?", detail: "Get forecast for arrival day to optimize packing & route" },
        { icon: <Calendar size={13} />, label: "I have a meeting at 2pm", detail: "Adjust departure to arrive on time with lowest emissions" },
        { icon: <MessageSquare size={13} />, label: "I prefer window seats & early departures", detail: "Refine booking preferences for comfort + carbon balance" },
      ]
    : isFood
    ? [
        { icon: <CloudSun size={13} />, label: "What local produce is in season?", detail: "Seasonal food has 3x lower transport emissions" },
        { icon: <Calendar size={13} />, label: "Plan my meals for the week", detail: "Optimize grocery list to reduce food waste & emissions" },
        { icon: <MessageSquare size={13} />, label: "I'm allergic to soy & nuts", detail: "Dietary constraints for personalized low-carbon swaps" },
      ]
    : [
        { icon: <CloudSun size={13} />, label: "Factor in today's weather", detail: "Adjust transport & energy recommendations" },
        { icon: <Calendar size={13} />, label: "Share my weekly schedule", detail: "Optimize recurring activities for lower emissions" },
        { icon: <MessageSquare size={13} />, label: "I work from home on Fridays", detail: "Personalize commute and energy patterns" },
      ];

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [...CURVE] }}
    >
      <div className="bg-card rounded-2xl border border-border chat-shadow overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground font-medium">Nemotron Agent — Analysis Complete</span>
        </div>

        {/* Analysis */}
        <div className="p-6 space-y-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-medium">Input Parsed</p>
            <p className="text-sm text-foreground/70 italic">"{query}"</p>
          </div>

          {/* Current Source Breakdown */}
          <div className="bg-muted/50 rounded-xl p-4 border border-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-medium">Current Impact Source</p>
            {isTravel ? (
              <div className="space-y-1.5">
                <p className="text-sm text-foreground">✈️ <span className="font-medium">Flight LAX → SJC</span> — 1h 15m, ~$89 avg one-way</p>
                <p className="text-xs text-muted-foreground">Equivalent to driving a gas car 350 miles. A typical LA–SF corridor commuter generates ~284.8 KG CO₂e per round trip.</p>
              </div>
            ) : isFood ? (
              <div className="space-y-1.5">
                <p className="text-sm text-foreground">🥩 <span className="font-medium">8oz beef steak dinner</span> + <span className="font-medium">20mi gas car drive</span></p>
                <p className="text-xs text-muted-foreground">The average American's weekly beef consumption (~1.7 lbs) produces ~33 KG CO₂e — comparable to driving 80 miles.</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-sm text-foreground">📊 <span className="font-medium">Mixed daily activity</span></p>
                <p className="text-xs text-muted-foreground">The average US adult produces ~44 KG CO₂e per day across transport, food, and energy use.</p>
              </div>
            )}
          </div>

          {/* Impact Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-xl p-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-medium">Current Impact</p>
              <p className="text-2xl font-mono-data text-foreground font-bold">
                {isTravel ? "142.4" : isFood ? "18.7" : "85.2"}
              </p>
              <p className="text-xs text-muted-foreground font-mono-data">KG CO₂e</p>
            </div>
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-medium">Optimized</p>
              <p className="text-2xl font-mono-data text-primary font-bold">
                {isTravel ? "38.6" : isFood ? "4.2" : "32.1"}
              </p>
              <p className="text-xs text-primary font-mono-data">KG CO₂e</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-1">
            <ArrowDown size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">
              {isTravel ? "−72.9%" : isFood ? "−77.5%" : "−62.3%"} reduction possible
            </span>
          </div>

          {/* Recommendations */}
          <div className="space-y-2.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Optimization Plan</p>

            {isTravel ? (
              <>
                <RecommendationItem icon={<Train size={16} />} title="Take Amtrak Pacific Surfliner + Capitol Corridor" saving="−103.8 KG" detail="LA Union Station → San Jose Diridon · 7h 45m · $42 one-way · Wi-Fi available" delay={0.1} />
                <RecommendationItem icon={<Leaf size={16} />} title="If flying: book SAF-enabled carrier" saving="−28.5 KG" detail="United LAX → SJC · 1h 15m · ~$89 · 40% SAF blend on select flights" delay={0.2} />
                <RecommendationItem icon={<Utensils size={16} />} title="Offset remaining with verified CDR" saving="−10.1 KG" detail="Fund direct air capture · $12.40 for full offset · Verified by Gold Standard" delay={0.3} />
              </>
            ) : isFood ? (
              <>
                <RecommendationItem icon={<Utensils size={16} />} title="Swap beef for plant-based protein" saving="−12.8 KG" detail="Lentils, tempeh, or beyond burger · Same protein · 85% less emissions · Saves ~$4/meal" delay={0.1} />
                <RecommendationItem icon={<Train size={16} />} title="Replace 20mi drive with EV or transit" saving="−1.7 KG" detail="Local bus: 45min, $1.75 · EV rideshare: 25min, ~$12 · vs. gas car: 30min, ~$6 in fuel" delay={0.2} />
              </>
            ) : (
              <RecommendationItem icon={<Leaf size={16} />} title="Analyze and optimize daily patterns" saving="−53.1 KG" detail="Personalized plan based on your input data." delay={0.1} />
            )}
          </div>
        </div>

        {/* Agent Actions */}
        <div className="px-6 py-4 border-t border-border space-y-2.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Agent can handle</p>
          <div className="space-y-1.5">
            {[
              { icon: <Bot size={13} />, label: "Book optimal transport via NemoClaw assistant", detail: "Autonomous booking agent handles reservations, seat selection & payment" },
              { icon: <CalendarPlus size={13} />, label: "Sync itinerary to Google Calendar", detail: "Auto-create events with departure times, confirmations & reminders" },
              { icon: <CreditCard size={13} />, label: "Purchase verified carbon offsets", detail: "Gold Standard CDR credits · Automated checkout · Receipt emailed" },
              { icon: <MapPin size={13} />, label: "Find EV charging stops along route", detail: "Plan charging stops with real-time availability & pricing" },
            ].map((action, i) => (
              <motion.button
                key={i}
                className="w-full flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/15 hover:border-primary/40 hover:bg-primary/10 transition-colors text-left group"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-primary mt-0.5 shrink-0">{action.icon}</div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.detail}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Follow-up Suggestions */}
        <div className="px-6 py-4 border-t border-border space-y-2.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Refine with more context</p>
          <div className="space-y-1.5">
            {followUpSuggestions.map((s, i) => (
              <motion.button
                key={i}
                onClick={() => onFollowUp?.(s.label)}
                className="w-full flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors text-left group"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-muted-foreground group-hover:text-primary transition-colors mt-0.5 shrink-0">{s.icon}</div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.detail}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Reply Box */}
        <div className="px-6 py-4 border-t border-border">
          <AnimatePresence>
            {showReply ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-2">
                  <input
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
                    placeholder="Add preferences, constraints, schedule..."
                    className="flex-1 bg-muted border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40"
                  />
                  <button
                    onClick={handleReplySubmit}
                    disabled={!replyInput.trim()}
                    className="w-9 h-9 bg-foreground text-background rounded-xl flex items-center justify-center hover:bg-foreground/90 transition-all disabled:opacity-30 shrink-0"
                  >
                    <ArrowUp size={15} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                onClick={() => setShowReply(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <MessageSquare size={14} />
                Reply to refine this analysis
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-border flex items-center gap-2 bg-muted/50">
          <CheckCircle2 size={13} className="text-primary" />
          <span className="text-xs text-muted-foreground">NVIDIA Nemotron · Autonomous reasoning · Verified sources</span>
        </div>
      </div>
    </motion.div>
  );
}

function RecommendationItem({ icon, title, saving, detail, delay }: { icon: React.ReactNode; title: string; saving: string; detail: string; delay: number }) {
  return (
    <motion.div
      className="flex gap-3 p-3.5 rounded-xl bg-muted/50 border border-border card-hover"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-primary mt-0.5 shrink-0">{icon}</div>
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <span className="text-xs font-mono-data text-primary font-medium">{saving}</span>
        </div>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
    </motion.div>
  );
}
