import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateBrief, sendBrief } from "@/lib/brief.functions";
import { SendBriefInput } from "@/lib/brief.schema";

function renderBrief(md: string) {
  return md.split("\n").map((line, i) => {
    const t = line.replace(/\*\*/g, "");
    if (t.startsWith("## ") || t.startsWith("# "))
      return <h3 key={i} className="mt-6 font-display text-lg font-bold text-primary first:mt-0">{t.replace(/^#+\s/, "")}</h3>;
    if (/^\s*[-*]\s/.test(t)) return <li key={i} className="ml-5 list-disc">{t.replace(/^\s*[-*]\s/, "")}</li>;
    if (!t.trim()) return null;
    return <p key={i} className="mt-2">{t}</p>;
  });
}

const fieldClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring aria-[invalid=true]:border-destructive";

type FieldErrors = { email?: string | undefined; phone?: string | undefined };

type SendState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent"; email: string }
  | { status: "error"; message: string };

export function BriefBuilder() {
  const runGenerate = useServerFn(generateBrief);
  const runSend = useServerFn(sendBrief);

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [brief, setBrief] = useState("");
  const [genError, setGenError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [send, setSend] = useState<SendState>({ status: "idle" });
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  const briefRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (brief) briefRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [brief]);

  useEffect(() => {
    if (send.status === "sent") statusRef.current?.focus();
  }, [send.status]);

  useEffect(() => {
    if (copied === "idle") return;
    const t = setTimeout(() => setCopied("idle"), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    if (notes.trim().length < 20) { setGenError("Please describe your project in a bit more detail."); return; }
    setGenerating(true); setGenError(null); setBrief(""); setSend({ status: "idle" });
    try {
      const r = await runGenerate({ data: { name, notes } });
      if (r.error) setGenError(r.error); else setBrief(r.brief);
    } catch {
      setGenError("Couldn't create the brief. Please try again.");
    } finally { setGenerating(false); }
  }

  async function submitBrief(e: React.FormEvent) {
    e.preventDefault();
    if (send.status === "sending") return;
    const parsed = SendBriefInput.safeParse({ name, email, phone, notes, brief, website });
    if (!parsed.success) {
      const errs: FieldErrors = {};
      let other: string | null = null;
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "email" && !errs.email) errs.email = issue.message;
        else if (key === "phone" && !errs.phone) errs.phone = issue.message;
        else if (!other) other = issue.message;
      }
      setFieldErrors(errs);
      setSend(other ? { status: "error", message: other } : { status: "idle" });
      return;
    }
    setFieldErrors({});
    setSend({ status: "sending" });
    try {
      const r = await runSend({ data: parsed.data });
      setSend(r.ok ? { status: "sent", email: parsed.data.email } : { status: "error", message: r.error ?? "Something went wrong." });
    } catch {
      setSend({ status: "error", message: "Your brief couldn't be sent just now. Please try again, or email wisnu3ds@gmail.com directly." });
    }
  }

  async function copyBrief() {
    try { await navigator.clipboard.writeText(brief); setCopied("done"); }
    catch { setCopied("failed"); }
  }

  function startOver() {
    setBrief(""); setNotes(""); setSend({ status: "idle" }); setFieldErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const sending = send.status === "sending";
  const fallbackMailto = `mailto:wisnu3ds@gmail.com?subject=${encodeURIComponent(`Project brief${name ? ` — ${name}` : ""}`)}&body=${encodeURIComponent(brief)}`;

  return (
    <div className="mt-20 max-w-3xl border-t border-border pt-12">
      <p className="eyebrow">Project brief assistant</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">Describe your idea, get a clear brief.</h2>
      <p className="mt-3 text-muted-foreground">Write freely — booth size, event, brand, deadline, budget. AI will organise it into a brief you can send straight to Wisnu.</p>

      <form onSubmit={generate} className="mt-8 flex flex-col gap-4">
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder="Your name / company (optional)"
          aria-label="Your name or company" autoComplete="organization" className={fieldClass} />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={4000} rows={7} aria-label="Project notes"
          placeholder="e.g. We need a 6x9m booth for GIIAS next August, launching a new EV, open-sided, budget around..."
          className={fieldClass} />
        <button type="submit" disabled={generating} className="btn-outline self-start disabled:pointer-events-none disabled:opacity-50">
          {generating ? "Writing your brief…" : brief ? "Write the brief again" : "Generate brief"}
        </button>
        {genError && <p role="alert" className="text-sm text-destructive">{genError}</p>}
      </form>

      {brief && (
        <div ref={briefRef} className="mt-10 scroll-mt-28 rounded-lg border border-border bg-card p-6 text-card-foreground md:p-8">
          <div className="text-sm leading-relaxed">{renderBrief(brief)}</div>

          {send.status === "sent" ? (
            <div ref={statusRef} tabIndex={-1} role="status" className="mt-8 border-t border-border pt-6 focus:outline-none">
              <p className="font-display text-xl font-bold text-foreground">Brief sent to Wisnu<span className="text-primary">.</span></p>
              <p className="mt-2 text-sm text-muted-foreground">
                He'll reply to <span className="text-foreground">{send.email}</span>. Keep a copy for yourself if you like.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn-outline" onClick={copyBrief}>
                  {copied === "done" ? "Copied" : copied === "failed" ? "Select the text to copy" : "Copy brief"}
                </button>
                <button type="button" className="btn-outline" onClick={startOver}>Start a new brief</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submitBrief} noValidate className="relative mt-8 border-t border-border pt-6">
              <p className="font-display text-xl font-bold text-foreground">Send it to Wisnu</p>
              <p className="mt-1 text-sm text-muted-foreground">Your brief goes straight to him — no email app needed. Add where he can reply.</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="brief-email" className="mb-1.5 block text-sm text-foreground">Your email</label>
                  <input id="brief-email" type="email" inputMode="email" autoComplete="email" required maxLength={255}
                    value={email} onChange={(e) => { setEmail(e.target.value); if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: undefined })); }}
                    placeholder="you@company.com" aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "brief-email-error" : undefined}
                    className={fieldClass} />
                  {fieldErrors.email && <p id="brief-email-error" className="mt-1.5 text-sm text-destructive">{fieldErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="brief-phone" className="mb-1.5 block text-sm text-foreground">
                    Phone / WhatsApp <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input id="brief-phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40}
                    value={phone} onChange={(e) => { setPhone(e.target.value); if (fieldErrors.phone) setFieldErrors((f) => ({ ...f, phone: undefined })); }}
                    placeholder="+62 812 3456 7890" aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? "brief-phone-error" : undefined}
                    className={fieldClass} />
                  {fieldErrors.phone && <p id="brief-phone-error" className="mt-1.5 text-sm text-destructive">{fieldErrors.phone}</p>}
                </div>
              </div>

              <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="brief-website">Website</label>
                <input id="brief-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="submit" disabled={sending} className="btn-ember disabled:pointer-events-none disabled:opacity-60">
                  {sending ? "Sending…" : "Send to Wisnu"}
                </button>
                <button type="button" className="btn-outline" onClick={copyBrief}>
                  {copied === "done" ? "Copied" : copied === "failed" ? "Select the text to copy" : "Copy brief"}
                </button>
              </div>

              {send.status === "error" && (
                <p role="alert" className="mt-4 text-sm text-destructive">
                  {send.message}{" "}
                  <a href={fallbackMailto} className="underline underline-offset-4">Open it in your email app instead</a>.
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
