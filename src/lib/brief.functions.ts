import { createServerFn } from "@tanstack/react-start";
import { GenerateBriefInput, MAX_BRIEFS_PER_EMAIL_PER_HOUR, SendBriefInput } from "@/lib/brief.schema";

const SYSTEM = `You help Wisnu Kesuma, a Senior 3D Designer for brand activation, exhibition booths and events, turn a prospective client's rough notes into a clear project brief.
Write in the same language the client used. Use these markdown sections with "## " headings:
Project Overview, Objectives, Deliverables, Space & Technical Details, Style & Brand References, Timeline, Budget, Open Questions.
Only use facts from the notes. Where information is missing write "Not specified" and add a matching question under Open Questions. Be concise and practical.`;

export const generateBrief = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => GenerateBriefInput.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { brief: "", error: "The brief assistant is not configured yet." };
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    let failure: unknown;
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: SYSTEM,
      messages: [{ role: "user", content: `Client name: ${data.name || "Not given"}\n\nNotes:\n${data.notes}` }],
      maxRetries: 0,
      onError: ({ error }) => { failure = error; },
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });
    try {
      const text = await result.text;
      if (failure || !text.trim()) throw failure ?? new Error("empty");
      return { brief: text, error: null as string | null };
    } catch (e) {
      console.error("brief generation failed", e);
      const status = (e as { statusCode?: number })?.statusCode;
      const msg =
        status === 429 ? "Too many requests right now — please try again in a minute."
        : status === 402 ? "The brief assistant is temporarily unavailable."
        : "Couldn't create the brief. Please try again or email directly.";
      return { brief: "", error: msg };
    }
  });

const SEND_FAILED = "Your brief couldn't be sent just now. Please try again, or email wisnu3ds@gmail.com directly.";

/** Delivers a finished brief to Wisnu by saving it to his private brief inbox. */
export const sendBrief = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => SendBriefInput.parse(d))
  .handler(async ({ data }): Promise<{ ok: boolean; error: string | null }> => {
    // Bots fill the hidden field; pretend success so they move on.
    if (data.website) return { ok: true, error: null };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabaseAdmin
      .from("brief_requests")
      .select("id", { count: "exact", head: true })
      .eq("client_email", data.email)
      .gte("created_at", since);
    if (countError) {
      console.error("brief send: rate check failed", countError);
      return { ok: false, error: SEND_FAILED };
    }
    if ((count ?? 0) >= MAX_BRIEFS_PER_EMAIL_PER_HOUR) {
      return {
        ok: false,
        error: "You've already sent several briefs in the last hour. Please wait a little, or email wisnu3ds@gmail.com directly.",
      };
    }

    const { error } = await supabaseAdmin.from("brief_requests").insert({
      client_name: data.name,
      client_email: data.email,
      client_phone: data.phone,
      project_type: data.projectType,
      notes: data.notes,
      brief: data.brief,
    });
    if (error) {
      console.error("brief send: save failed", error);
      return { ok: false, error: SEND_FAILED };
    }

    // Forward a copy to Wisnu's Gmail via FormSubmit (free relay). The brief is
    // already saved, so a relay failure is logged but never shown to the client.
    try {
      const res = await fetch("https://formsubmit.co/ajax/wisnu3ds@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Origin: "https://sculpted-world-showcase.lovable.app", Referer: "https://sculpted-world-showcase.lovable.app/start-a-project" },
        body: JSON.stringify({
          _subject: `New project brief from ${data.name}`,
          _replyto: data.email,
          _template: "box",
          _captcha: "false",
          Name: data.name,
          Email: data.email,
          "Phone / WhatsApp": data.phone || "-",
          "Project type": data.projectType,
          Notes: data.notes,
          Brief: data.brief,
        }),
      });
      if (!res.ok) console.error(`brief forward failed [${res.status}]: ${await res.text()}`);
    } catch (e) {
      console.error("brief forward error", e);
    }
    return { ok: true, error: null };
  });
