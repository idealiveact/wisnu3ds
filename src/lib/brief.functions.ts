import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  name: z.string().trim().max(100).optional().default(""),
  notes: z.string().trim().min(20, "Please describe your project in a bit more detail.").max(4000),
});

const SYSTEM = `You help Wisnu Kesuma, a Senior 3D Designer for brand activation, exhibition booths and events, turn a prospective client's rough notes into a clear project brief.
Write in the same language the client used. Use these markdown sections with "## " headings:
Project Overview, Objectives, Deliverables, Space & Technical Details, Style & Brand References, Timeline, Budget, Open Questions.
Only use facts from the notes. Where information is missing write "Not specified" and add a matching question under Open Questions. Be concise and practical.`;

export const generateBrief = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
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
