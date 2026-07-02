
CREATE TABLE public.neet_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  marks INTEGER NOT NULL CHECK (marks >= 0 AND marks <= 720),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.neet_submissions TO anon;
GRANT SELECT, INSERT ON public.neet_submissions TO authenticated;
GRANT ALL ON public.neet_submissions TO service_role;

ALTER TABLE public.neet_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view submissions"
  ON public.neet_submissions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert submissions"
  ON public.neet_submissions FOR INSERT
  WITH CHECK (
    length(trim(full_name)) > 0
    AND length(full_name) <= 100
    AND marks >= 0
    AND marks <= 720
  );

CREATE INDEX idx_neet_submissions_marks ON public.neet_submissions (marks DESC, full_name ASC);
