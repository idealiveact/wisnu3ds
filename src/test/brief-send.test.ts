import { describe, expect, it } from "vitest";

import { SendBriefInput } from "@/lib/brief.schema";

const base = {
  name: "PT Contoh",
  email: "client@example.co.id",
  notes: "We need a 6x9m booth for GIIAS next August, open-sided.",
  brief: "## Project Overview\n6x9m open-sided booth for GIIAS.",
};

describe("Send to Wisnu", () => {
  it("needs the client's reply email before a brief can be sent", () => {
    expect(SendBriefInput.safeParse({ ...base, email: "" }).success).toBe(false);
    expect(SendBriefInput.safeParse({ ...base, email: "not-an-email" }).success).toBe(false);
  });

  it("accepts a brief with a valid email and stores the address in lowercase", () => {
    const r = SendBriefInput.parse({ ...base, email: "  Client@Example.CO.ID " });
    expect(r.email).toBe("client@example.co.id");
    expect(r.phone).toBe("");
  });

  it("lets the WhatsApp number be optional but rejects letters in it", () => {
    expect(SendBriefInput.safeParse({ ...base, phone: "+62 812-3456-7890" }).success).toBe(true);
    expect(SendBriefInput.safeParse({ ...base, phone: "call me" }).success).toBe(false);
  });

  it("refuses to send an empty brief", () => {
    expect(SendBriefInput.safeParse({ ...base, brief: "" }).success).toBe(false);
  });
});
