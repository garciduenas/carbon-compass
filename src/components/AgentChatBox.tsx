import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Send } from "lucide-react";

const CURVE = [0.16, 1, 0.3, 1] as const;

interface AgentChatBoxProps {
  onSubmit: (query: string) => void;
  isProcessing: boolean;
}

export default function AgentChatBox({ onSubmit, isProcessing }: AgentChatBoxProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() && !isProcessing) {
      onSubmit(input.trim());
    }
  };

  return (
    <motion.div
      className="relative max-w-2xl mx-auto group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [...CURVE] }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur opacity-30 group-focus-within:opacity-100 transition duration-1000" />
      <div className="relative surface-glass rounded-2xl p-2 shadow-2xl">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Command size={16} className="text-muted-foreground" />
          <span className="text-xs font-mono-data text-muted-foreground uppercase tracking-[0.15em]">
            Agent_Query_Input
          </span>
        </div>
        <div className="flex items-center p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="I am traveling to a conference from LA to San Jose tomorrow..."
            className="w-full bg-transparent border-none focus:outline-none text-lg py-4 px-4 placeholder:text-muted-foreground/40"
          />
          <button
            onClick={handleSubmit}
            disabled={isProcessing || !input.trim()}
            className="bg-primary text-primary-foreground p-3 rounded-xl hover:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send size={20} />
          </button>
        </div>

        <AnimatePresence>
          {input.length > 10 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [...CURVE] }}
              className="px-6 py-4 bg-background/50 rounded-b-xl border-t border-border flex items-center justify-between"
            >
              <div className="flex gap-8">
                <div className="text-left">
                  <p className="text-[10px] uppercase text-muted-foreground font-mono-data tracking-tighter">Est. Impact</p>
                  <p className="text-sm font-mono-data text-primary">142.4 KG CO₂e</p>
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase text-muted-foreground font-mono-data tracking-tighter">Optimization</p>
                  <p className="text-sm font-mono-data text-primary">−42% Possible</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground italic hidden sm:block">Press Enter to generate plan</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
