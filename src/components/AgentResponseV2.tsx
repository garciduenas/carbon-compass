import { useMemo } from "react";
import { Loader2, MapPin, Train, Bus, Car, Airplay } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Option = {
  mode: string;
  co2?: number;
  cost?: number;
  time?: string;
};

type Flight = {
  label: string;
  departure?: string;
};

type ParsedResponse = {
  route?: string;
  distance?: string;
  constraints?: {
    budget?: number;
    maxTime?: string;
  };
  options: Option[];
  meets: string[];
  recommended?: Option & { reason?: string };
  alternatives: Option[];
  flights: Flight[];
  raw: string;
};

function parseNumber(value: string | undefined) {
  if (!value) return undefined;
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : undefined;
}

function findFirstMatch(regex: RegExp, text: string, group = 1) {
  const m = regex.exec(text);
  return m?.[group];
}

function parseAgentResponse(text: string): ParsedResponse {
  const raw = text.trim();
  const route = findFirstMatch(/Route:\s*([^\n]+?)\s+Travel Analysis/i, raw)?.trim();
  const distance = findFirstMatch(/Travel Analysis for\s*([0-9.]+\s*miles)/i, raw)?.trim();

  const options: Option[] = [];
  const optionsSection = findFirstMatch(/All Options:\s*(.+?)Considering your constraints/sim, raw);
  if (optionsSection) {
    const bullets = optionsSection.split("•").map((p) => p.trim()).filter(Boolean);
    bullets.forEach((bul) => {
      const [modePart, rest] = bul.split(":", 2);
      if (!rest) return;
      const mode = modePart.trim();
      const co2 = parseNumber(findFirstMatch(/([0-9.]+)\s*kg\s*CO2/i, rest));
      const cost = parseNumber(findFirstMatch(/\$\s*([0-9.]+)/, rest));
      const time = findFirstMatch(/([0-9.]+\s*(?:h|hrs|hours))/i, rest);
      options.push({ mode, co2, cost, time });
    });
  }

  const flights: Flight[] = [];
  const flightsSection = findFirstMatch(/Available Flights\s*\(.*?\):\s*(.+?)Considering your constraints/sim, raw);
  if (flightsSection) {
    const bullets = flightsSection.split("•").map((p) => p.trim()).filter(Boolean);
    bullets.forEach((bul) => {
      const parts = bul.split(":", 2);
      if (parts.length < 2) return;
      flights.push({ label: parts[0].trim(), departure: parts[1].trim() });
    });
  }

  const constraints: ParsedResponse["constraints"] = {};
  const constraintsMatch = findFirstMatch(/Considering your constraints\s*\(([^)]+)\)/i, raw);
  if (constraintsMatch) {
    const parts = constraintsMatch.split(",").map((p) => p.trim());
    parts.forEach((p) => {
      if (/budget/i.test(p)) {
        constraints.budget = parseNumber(p);
      }
      if (/max[_ ]?time/i.test(p)) {
        const timeMatch = p.match(/([0-9.]+\s*(?:h|hrs|hours))/i);
        if (timeMatch) constraints.maxTime = timeMatch[1];
      }
    });
  }

  const meets: string[] = [];
  const meetsSection = findFirstMatch(/Considering your constraints[^:]*:\s*([^\n]+)\s*🌱?\s*Recommended/i, raw, 1);
  if (meetsSection) {
    meetsSection.split(/\s*•\s*/).forEach((part) => {
      const m = part.match(/([A-Za-z]+)\s*:/);
      if (m) meets.push(m[1].trim());
    });
  } else {
    // fallback: try to collect "X: meets all constraints" occurrences
    const meetsAll = Array.from(raw.matchAll(/([A-Za-z]+):\s*meets all constraints/gi));
    meetsAll.forEach((m) => meets.push(m[1]));
  }

  let recommended: ParsedResponse["recommended"] = undefined;
  const recSection = findFirstMatch(/🌱\s*Recommended:([\s\S]*)Alternatives that also meet constraints:/i, raw);
  if (recSection) {
    const mode = findFirstMatch(/🌱\s*Recommended:\s*([A-Za-z]+)/i, raw)?.trim();
    const co2 = parseNumber(findFirstMatch(/Carbon emissions:\s*([0-9.]+)/i, recSection));
    const cost = parseNumber(findFirstMatch(/Estimated cost:\s*\$\s*([0-9.]+)/i, recSection));
    const time = findFirstMatch(/Travel time:\s*([0-9.]+\s*(?:h|hrs|hours))/i, recSection);
    const reason = findFirstMatch(/Why\s*[^?]*\?\s*(.+)/i, recSection);
    if (mode) {
      recommended = { mode, co2, cost, time, reason };
    }
  }

  const alternatives: Option[] = [];
  const altSection = findFirstMatch(/Alternatives that also meet constraints:\s*(.+)$/is, raw);
  if (altSection) {
    const bullets = altSection.split("•").map((p) => p.trim()).filter(Boolean);
    bullets.forEach((bul) => {
      const [modePart, rest] = bul.split(":", 2);
      if (!rest) return;
      const mode = modePart.trim();
      const co2 = parseNumber(findFirstMatch(/([0-9.]+)\s*kg\s*CO2/i, rest));
      const cost = parseNumber(findFirstMatch(/\$\s*([0-9.]+)/, rest));
      const time = findFirstMatch(/([0-9.]+\s*(?:h|hrs|hours))/i, rest);
      alternatives.push({ mode, co2, cost, time });
    });
  }

  return {
    route,
    distance,
    constraints,
    options,
    meets,
    recommended,
    alternatives,
    flights,
    raw,
  };
}

function modeIcon(mode: string) {
  const key = mode.toLowerCase();
  if (key.includes("train")) return <Train className="h-4 w-4" />;
  if (key.includes("bus")) return <Bus className="h-4 w-4" />;
  if (key.includes("car")) return <Car className="h-4 w-4" />;
  if (key.includes("flight") || key.includes("plane")) return <Airplay className="h-4 w-4" />;
  return <MapPin className="h-4 w-4" />;
}

export default function AgentResponseV2({ response, isLoading, error }: { response?: string | null; isLoading?: boolean; error?: string | null }) {
  const parsed = useMemo(() => {
    if (!response) return null;
    return parseAgentResponse(response);
  }, [response]);

  if (isLoading) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <CardTitle className="text-base">Waiting for agent response…</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">The agent is analyzing your travel request and building a low-carbon plan.</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-8 border-destructive">
        <CardHeader>
          <CardTitle className="text-base">Error fetching response</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!parsed) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Route analysis</CardTitle>
          <CardDescription>{parsed.route || "Travel plan"}</CardDescription>
        </CardHeader>
        <CardContent>
          {parsed.distance && (
            <div className="text-sm text-muted-foreground">Distance: {parsed.distance}</div>
          )}

          {parsed.constraints && ( 
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {parsed.constraints.budget !== undefined && (
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Budget</p>
                  <p className="text-sm font-semibold">${parsed.constraints.budget}</p>
                </div>
              )}
              {parsed.constraints.maxTime && (
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Max travel time</p>
                  <p className="text-sm font-semibold">{parsed.constraints.maxTime}</p>
                </div>
              )}
            </div>
          )}

          {parsed.meets.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Options meeting constraints</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {parsed.meets.map((mode) => (
                  <span key={mode} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-foreground">
                    {modeIcon(mode)}
                    {mode}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {parsed.recommended && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-base">Recommended</CardTitle>
            <CardDescription>
              {parsed.recommended.mode} — {parsed.recommended.reason ?? "Best balance of carbon, cost, and time."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Carbon</p>
                <p className="text-lg font-semibold">{parsed.recommended.co2 ?? "—"} kg CO₂</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Cost</p>
                <p className="text-lg font-semibold">${parsed.recommended.cost?.toFixed(2) ?? "—"}</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Travel time</p>
                <p className="text-lg font-semibold">{parsed.recommended.time ?? "—"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {parsed.alternatives.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Other options</CardTitle>
            <CardDescription>Alternatives that still meet your constraints.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {parsed.alternatives.map((opt) => (
                <div key={opt.mode} className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-center gap-2">
                    {modeIcon(opt.mode)}
                    <div>
                      <p className="text-sm font-medium">{opt.mode}</p>
                      <p className="text-xs text-muted-foreground">
                        {opt.co2 ? `${opt.co2} kg CO₂` : "—"} • {opt.time ?? "—"} • ${opt.cost?.toFixed(2) ?? "—"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {parsed.flights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Available flights</CardTitle>
            <CardDescription>These flights were extracted from the agent response.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {parsed.flights.map((flight, idx) => (
                <div key={idx} className="rounded-lg border border-border bg-muted/50 p-4">
                  <p className="text-sm font-medium">{flight.label}</p>
                  {flight.departure ? <p className="text-xs text-muted-foreground">{flight.departure}</p> : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Raw agent output</CardTitle>
          <CardDescription>For debugging and transparency.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-xs text-muted-foreground">{parsed.raw}</pre>
        </CardContent>
      </Card>
    </div>
  );
}
