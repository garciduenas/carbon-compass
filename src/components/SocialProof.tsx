export default function SocialProof() {
  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <p className="text-sm text-muted-foreground mb-8">
          Trusted by sustainability teams at
        </p>
        <div className="flex flex-wrap justify-center gap-x-14 gap-y-4">
          {["VOLTA", "HELIOS", "STRATOS", "ARC-01", "MERIDIAN"].map((name) => (
            <span key={name} className="text-xl font-bold tracking-tight text-foreground/25 hover:text-foreground/40 transition-colors">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
