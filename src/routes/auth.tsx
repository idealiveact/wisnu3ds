import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  validateSearch: zodValidator(z.object({ redirect: fallback(z.string(), "/briefs").default("/briefs") })),
  head: () => ({
    meta: [
      { title: "Sign in — Wisnu Kesuma 3D" },
      { name: "description", content: "Private sign-in for Wisnu Kesuma to read incoming project briefs." },
      { property: "og:title", content: "Sign in — Wisnu Kesuma 3D" },
      { property: "og:description", content: "Private area for incoming project briefs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const field = "w-full rounded-md border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function safePath(p: string) { return p.startsWith("/") && !p.startsWith("//") ? p : "/briefs"; }

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ kind: "error" | "info"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const target = safePath(redirect);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMsg({ kind: "error", text: error.message === "Email not confirmed" ? "Please confirm your email first — check your inbox." : "Wrong email or password." });
      navigate({ to: target });
    } else {
      if (password.length < 8) { setBusy(false); return setMsg({ kind: "error", text: "Use at least 8 characters." }); }
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth?redirect=${encodeURIComponent(target)}` } });
      setBusy(false);
      if (error) return setMsg({ kind: "error", text: error.message });
      setMsg({ kind: "info", text: "Check your inbox and click the confirmation link, then sign in here." });
      setMode("in");
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-28 pb-16">
      <form onSubmit={submit} className="w-full max-w-sm">
        <p className="eyebrow">Private</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-foreground">{mode === "in" ? "Sign in" : "Create account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">For Wisnu, to read incoming project briefs.</p>
        <div className="mt-8 flex flex-col gap-4">
          <input type="email" required autoComplete="email" placeholder="Email" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          <input type="password" required autoComplete={mode === "in" ? "current-password" : "new-password"} placeholder="Password" aria-label="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
          <button type="submit" disabled={busy} className="btn-ember justify-center disabled:opacity-60">{busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}</button>
          {msg && <p role={msg.kind === "error" ? "alert" : "status"} className={`text-sm ${msg.kind === "error" ? "text-destructive" : "text-muted-foreground"}`}>{msg.text}</p>}
          <button type="button" className="text-sm text-muted-foreground underline underline-offset-4" onClick={() => { setMode(mode === "in" ? "up" : "in"); setMsg(null); }}>
            {mode === "in" ? "First time? Create your account" : "Already have an account? Sign in"}
          </button>
        </div>
      </form>
    </section>
  );
}
