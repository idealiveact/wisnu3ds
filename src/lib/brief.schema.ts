import { z } from "zod";

// Shared by the Contact page form (instant feedback) and the server (final check).

/** How many briefs one reply address may send to Wisnu within an hour. */
export const MAX_BRIEFS_PER_EMAIL_PER_HOUR = 3;

export const GenerateBriefInput = z.object({
  name: z.string().trim().max(100).optional().default(""),
  notes: z.string().trim().min(20, "Please describe your project in a bit more detail.").max(4000),
});

export const SendBriefInput = z.object({
  name: z.string().trim().max(100, "Name is too long.").optional().default(""),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please add your email so Wisnu can reply.")
    .max(255, "Email is too long.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(40, "Phone number is too long.")
    .regex(/^[0-9+()\-.\s]*$/, "Use only numbers, spaces, + or -.")
    .optional()
    .default(""),
  notes: z.string().trim().min(20, "Your project notes are too short.").max(4000),
  brief: z.string().trim().min(20, "The brief is empty — please generate it again.").max(12000),
  // Hidden field real visitors never see; bots that fill it are ignored.
  website: z.string().max(500).optional().default(""),
});

export type SendBriefValues = z.input<typeof SendBriefInput>;
