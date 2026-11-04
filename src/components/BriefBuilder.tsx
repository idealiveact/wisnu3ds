import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateBrief } from "@/lib/brief.functions";

function renderBrief(md: string) {
  return md.split("\n").map((line, i) => {
    const t = line.replace(/\*\*/g, "");
    if (t.startsWith("## ") || t.startsWith("# "))
      return <h3 key={i} className="mt-6 font-display text-lg font-bold text-primary">{t.replace(/^#+\s/, "")}</h3>;
    if (/^\s*[-*]\s/.test(t)) return <li key={i} className="ml-5 list-disc">{t.replace(/^\s*[-*]\s/, "")}</li>;
    if (!t.trim()) return null;
    return <p key={i} className="mt-2">{t}</p>;
  });
}

export function BriefBuilder() {
  const run = useServerFn(generateBrief);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [brief, setBrief] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (notes.trim().length < 20) { setError("Please describe your project in a bit more detail."); return; }
    setLoading(true); setError(null); setBrief("");
    try {
      const r = await run({ data: { name, notes } });
      if (r.error) setError(r.error); else setBrief(r.brief);
    } catch {
      setError("Couldn't create the brief. Please try again.");
    } finally { setLoading(false); }
  }

  const mailto = `mailto:wisnu3ds@gmail.com?subject=${encodeURIComponent(`Project brief${name ? ` — ${name}` : ""}`)}&body=${encodeURIComponent(brief)}`;

  return (
    <div className="mt-20 max-w-3xl border-t border-border pt-12">
      <p className="eyebrow">Project brief assistant</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">Describe your idea, get a clear brief.</h2>
      <p className="mt-3 text-muted-foreground">Write freely — booth size, event, brand, deadline, budget. AI will organise it into a brief you can send.</p>
      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder="Your name / company (optional)"
          className="rounded-md border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={4000} rows={7} aria-label="Project notes"
          placeholder="e.g. We need a 6x9m booth for GIIAS next August, launching a new EV, open-sided, budget around..."
          className="rounded-md border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
        <button type="submit" disabled={loading} className="btn-outline self-start disabled:opacity-50">
          {loading ? "Writing your brief…" : "Generate brief"}
        </button>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      </form>
      {brief && (
        <div className="mt-10 rounded-lg border border-border bg-card p-6 text-card-foreground">
          <div className="text-sm leading-relaxed">{renderBrief(brief)}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={mailto} className="btn-outline">Send to Wisnu</a>
            <button type="button" className="btn-outline" onClick={() => navigator.clipboard.writeText(brief)}>Copy brief</button>
          </div>
        </div>
      )}
    </div>
  );
}
