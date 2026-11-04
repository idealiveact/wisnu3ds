import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { BriefStatusSchema } from "@/lib/brief.schema";

export interface BriefRow {
  id: string;
  created_at: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  project_type: string;
  status: string;
  notes: string;
  brief: string;
}

/** All briefs for Wisnu. Non-admins get isAdmin=false and no rows. */
export const listBriefs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ isAdmin: boolean; email: string; briefs: BriefRow[] }> => {
    const { supabase, userId, claims } = context;
    const email = String((claims as { email?: string }).email ?? "");
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) return { isAdmin: false, email, briefs: [] };
    const { data, error } = await supabase
      .from("brief_requests")
      .select("id, created_at, client_name, client_email, client_phone, project_type, status, notes, brief")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) { console.error("listBriefs", error); throw new Error("Couldn't load briefs."); }
    return { isAdmin: true, email, briefs: data ?? [] };
  });

export const updateBriefStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), status: BriefStatusSchema }).parse(d))
  .handler(async ({ data, context }) => {
    const { error, count } = await context.supabase
      .from("brief_requests")
      .update({ status: data.status }, { count: "exact" })
      .eq("id", data.id);
    if (error || !count) { console.error("updateBriefStatus", error); return { ok: false }; }
    return { ok: true };
  });
