export default function SocialProof() {
  return (
    <section className="bg-secondary/30 py-20 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <p className="text-xs font-mono-data text-muted-foreground uppercase tracking-[0.2em] mb-8">
          Trusted by logistics leads at
        </p>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 contrast-125">
          {["VOLTA", "HELIOS", "STRATOS", "ARC-01"].map((name) => (
            <span key={name} className="text-2xl font-bold tracking-tighter text-foreground">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
