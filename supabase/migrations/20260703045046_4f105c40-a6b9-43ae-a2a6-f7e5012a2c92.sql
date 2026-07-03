
ALTER TABLE public.neet_submissions
  ADD COLUMN IF NOT EXISTS category TEXT;

ALTER TABLE public.neet_submissions
  DROP CONSTRAINT IF EXISTS neet_submissions_category_check;

ALTER TABLE public.neet_submissions
  ADD CONSTRAINT neet_submissions_category_check
  CHECK (category IS NULL OR category IN ('UR','EWS','OBC','SC','ST(P)','ST(H)'));

-- Allow inserts (used by the private /ziaur admin page)
DROP POLICY IF EXISTS "Anyone can insert submissions" ON public.neet_submissions;
CREATE POLICY "Anyone can insert submissions"
  ON public.neet_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

GRANT INSERT ON public.neet_submissions TO anon, authenticated;
