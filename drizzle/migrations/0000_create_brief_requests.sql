CREATE TABLE public.brief_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  client_name TEXT NOT NULL DEFAULT '',
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL,
  brief TEXT NOT NULL,
  CONSTRAINT brief_requests_name_len CHECK (char_length(client_name) <= 100),
  CONSTRAINT brief_requests_email_len CHECK (char_length(client_email) BETWEEN 3 AND 255),
  CONSTRAINT brief_requests_phone_len CHECK (char_length(client_phone) <= 40),
  CONSTRAINT brief_requests_notes_len CHECK (char_length(notes) BETWEEN 1 AND 4000),
  CONSTRAINT brief_requests_brief_len CHECK (char_length(brief) BETWEEN 1 AND 12000)
);

-- Only trusted server code (service role) reads or writes briefs; visitors never touch the table directly.
GRANT ALL ON public.brief_requests TO service_role;

ALTER TABLE public.brief_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX brief_requests_created_at_idx ON public.brief_requests (created_at DESC);
CREATE INDEX brief_requests_email_created_idx ON public.brief_requests (lower(client_email), created_at DESC);