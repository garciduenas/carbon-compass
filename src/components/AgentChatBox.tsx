import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Plus } from "lucide-react";

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
      className="relative max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [...CURVE] }}
    >
      <div className="bg-card rounded-2xl chat-shadow overflow-hidden border border-border">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Ask about your carbon footprint..."
          rows={3}
          className="w-full bg-transparent border-none focus:outline-none text-base p-5 pb-2 placeholder:text-muted-foreground/50 resize-none text-foreground"
        />
        <div className="flex items-center justify-between px-4 pb-4">
          <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Plus size={16} />
          </button>
          <button
            onClick={handleSubmit}
            disabled={isProcessing || !input.trim()}
            className="w-8 h-8 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-foreground/90 transition-all disabled:opacity-30"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {input.length > 10 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [...CURVE] }}
            className="mt-3 flex items-center justify-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground/60">Est. Impact</span>
              <span className="font-medium text-primary font-mono-data">142.4 KG CO₂e</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground/60">Optimization</span>
              <span className="font-medium text-primary font-mono-data">−42%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
