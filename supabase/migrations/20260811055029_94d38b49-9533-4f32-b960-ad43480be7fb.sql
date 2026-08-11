CREATE TABLE public.coaching_complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint text NOT NULL,
  institute text,
  district text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.coaching_complaints TO anon;
GRANT SELECT, INSERT ON public.coaching_complaints TO authenticated;
GRANT ALL ON public.coaching_complaints TO service_role;

ALTER TABLE public.coaching_complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit complaints" ON public.coaching_complaints FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can view complaints" ON public.coaching_complaints FOR SELECT TO anon, authenticated USING (true);