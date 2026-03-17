import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L12 4.5V9.5L7 13L2 9.5V4.5L7 1Z" fill="hsl(var(--primary-foreground))" />
            </svg>
          </div>
          <span className="font-semibold text-foreground tracking-tight">Carbon Compass</span>
          <span className="text-[10px] font-mono-data text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md ml-1">
            NEMOTRON
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-muted-foreground font-medium">
          <Link to="/" className="hover:text-foreground transition-colors duration-200">
            v1
          </Link>
          <Link to="/v2" className="hover:text-foreground transition-colors duration-200">
            v2
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
            Log in
          </Button>
          <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 text-sm px-5">
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}
