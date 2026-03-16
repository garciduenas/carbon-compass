import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 font-mono-data text-sm tracking-tighter">
        <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow" />
        STANDARD_CARBON / V1.0
      </div>
      <div className="hidden md:flex gap-8 text-sm text-muted-foreground font-medium">
        <a href="#" className="hover:text-foreground transition-colors duration-300">Methodology</a>
        <a href="#" className="hover:text-foreground transition-colors duration-300">API</a>
        <a href="#" className="hover:text-foreground transition-colors duration-300">Enterprise</a>
      </div>
      <Button variant="outline" className="rounded-full border-border bg-secondary hover:bg-muted text-foreground">
        Sign In
      </Button>
    </nav>
  );
}
