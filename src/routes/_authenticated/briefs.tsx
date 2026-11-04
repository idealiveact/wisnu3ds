import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { queryOptions, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { listBriefs, updateBriefStatus, type BriefRow } from "@/lib/briefs-admin.functions";
import { BRIEF_STATUSES, PROJECT_TYPES, type BriefStatus } from "@/lib/brief.schema";

const briefsQuery = queryOptions({ queryKey: ["briefs"], queryFn: () => listBriefs() });

export const Route = createFileRoute("/_authenticated/briefs")({
  validateSearch: zodValidator(z.object({
    status: fallback(z.string(), "all").default("all"),
    type: fallback(z.string(), "all").default("all"),
  })),
  head: () => ({
    meta: [
      { title: "Incoming briefs — Wisnu Kesuma 3D" },
      { name: "description", content: "Private list of project briefs sent from the Contact page." },
      { property: "og:title", content: "Incoming briefs — Wisnu Kesuma 3D" },
      { property: "og:description", content: "Private list of project briefs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(briefsQuery),
  errorComponent: ({ error }) => {
    const router = useRouter();
    return (
      <section className="px-6 pt-32 md:px-10">
        <p role="alert" className="text-destructive">{error instanceof Error ? error.message : "Couldn't load briefs."}</p>
        <button className="btn-outline mt-4" onClick={() => router.invalidate()}>Try again</button>
      </section>
    );
  },
  notFoundComponent: () => <p className="px-6 pt-32">Not found.</p>,
  component: BriefsPage,
});

const typeLabel = (v: string) => PROJECT_TYPES.find((t) => t.value === v)?.label ?? v;
const fmt = (iso: string) => new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function Filter({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string; count: number }[]; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="eyebrow mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o.value} type="button" onClick={() => onChange(o.value)} aria-pressed={value === o.value}
            className={`chip transition-colors ${value === o.value ? "border-primary text-primary" : "hover:border-primary"}`}>
            {o.label} <span className="text-muted-foreground">{o.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BriefsPage() {
  const { data } = useSuspenseQuery(briefsQuery);
  const { status, type } = Route.useSearch();
  const navigate = useNavigate({ from: "/briefs" });
  const qc = useQueryClient();

  async function signOut() {
    await supabase.auth.signOut();
    qc.removeQueries({ queryKey: ["briefs"] });
    navigate({ to: "/auth", search: { redirect: "/briefs" } });
  }

  if (!data.isAdmin) {
    return (
      <section className="flex min-h-screen flex-col justify-center px-6 md:px-10">
        <h1 className="font-display text-4xl font-bold text-foreground">No access</h1>
        <p className="mt-3 max-w-md text-muted-foreground">You're signed in as {data.email || "this account"}, which can't read briefs. Only Wisnu's account (confirmed email) can.</p>
        <button className="btn-outline mt-6 self-start" onClick={signOut}>Sign out</button>
      </section>
    );
  }

  const all = data.briefs;
  const byType = status === "all" ? all : all.filter((b) => b.status === status);
  const byStatus = type === "all" ? all : all.filter((b) => b.project_type === type);
  const shown = byType.filter((b) => type === "all" || b.project_type === type);

  const statusOpts = [{ value: "all", label: "All", count: byStatus.length }, ...BRIEF_STATUSES.map((s) => ({ ...s, count: byStatus.filter((b) => b.status === s.value).length }))];
  const typeOpts = [{ value: "all", label: "All", count: byType.length }, ...PROJECT_TYPES.map((t) => ({ ...t, count: byType.filter((b) => b.project_type === t.value).length }))];

  return (
    <section className="px-6 pt-28 pb-20 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Private</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground md:text-6xl">Incoming briefs<span className="text-primary">.</span></h1>
          <p className="mt-2 text-sm text-muted-foreground">{all.length} total · {all.filter((b) => b.status === "new").length} new</p>
        </div>
        <button className="btn-outline" onClick={signOut}>Sign out</button>
      </div>

      <div className="mt-10 flex flex-col gap-6">
        <Filter label="Status" value={status} options={statusOpts} onChange={(v) => navigate({ search: (p) => ({ ...p, status: v }) })} />
        <Filter label="Project type" value={type} options={typeOpts} onChange={(v) => navigate({ search: (p) => ({ ...p, type: v }) })} />
      </div>

      <div className="mt-10 flex flex-col gap-4">
        {shown.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
            {all.length === 0 ? <>No briefs yet. They appear here when clients press <span className="text-foreground">Send to Wisnu</span> on the <Link to="/contact" className="underline">Contact</Link> page.</> : "No briefs match these filters."}
          </div>
        ) : shown.map((b) => <BriefCard key={b.id} b={b} />)}
      </div>
    </section>
  );
}

function BriefCard({ b }: { b: BriefRow }) {
  const update = useServerFn(updateBriefStatus);
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(false);

  async function setStatus(s: BriefStatus) {
    setSaving(true); setErr(false);
    try {
      const r = await update({ data: { id: b.id, status: s } });
      if (!r.ok) setErr(true); else await qc.invalidateQueries({ queryKey: ["briefs"] });
    } catch { setErr(true); } finally { setSaving(false); }
  }

  return (
    <article className="rounded-lg border border-border bg-card p-5 text-card-foreground md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{fmt(b.created_at)} · {typeLabel(b.project_type)}</p>
          <h2 className="mt-1 font-display text-xl font-bold">{b.client_name || "Unnamed client"}</h2>
          <p className="mt-1 break-all text-sm">
            <a href={`mailto:${b.client_email}`} className="text-primary underline underline-offset-4">{b.client_email}</a>
            {b.client_phone && <> · <a href={`https://wa.me/${b.client_phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{b.client_phone}</a></>}
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="sr-only">Status</span>
          <select value={b.status} disabled={saving} onChange={(e) => setStatus(e.target.value as BriefStatus)}
            className="rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60">
            {BRIEF_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
      </div>
      {err && <p role="alert" className="mt-2 text-sm text-destructive">Couldn't change the status. Try again.</p>}
      <button type="button" className="mt-4 text-sm text-muted-foreground underline underline-offset-4" onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? "Hide brief" : "Show brief"}
      </button>
      {open && (
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div><p className="eyebrow mb-2">Brief</p><pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{b.brief.replace(/\*\*/g, "")}</pre></div>
          <div><p className="eyebrow mb-2">Client's own notes</p><p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{b.notes}</p></div>
        </div>
      )}
    </article>
  );
}
