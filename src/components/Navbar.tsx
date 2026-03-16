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
          <span className="font-semibold text-foreground tracking-tight">Standard Carbon</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-muted-foreground font-medium">
          <a href="#" className="hover:text-foreground transition-colors duration-200">Solutions</a>
          <a href="#" className="hover:text-foreground transition-colors duration-200">Methodology</a>
          <a href="#" className="hover:text-foreground transition-colors duration-200">API</a>
          <a href="#" className="hover:text-foreground transition-colors duration-200">Enterprise</a>
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
