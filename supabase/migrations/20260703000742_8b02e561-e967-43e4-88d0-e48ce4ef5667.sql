-- Lock down inserts at the database layer
DROP POLICY IF EXISTS "Anyone can insert submissions" ON public.neet_submissions;

-- Delete out-of-range marks (spam/unrealistic)
DELETE FROM public.neet_submissions WHERE marks > 691 OR marks < 320;

-- Deduplicate: keep earliest entry per (normalized name, marks)
DELETE FROM public.neet_submissions a
USING public.neet_submissions b
WHERE a.ctid <> b.ctid
  AND lower(btrim(a.full_name)) = lower(btrim(b.full_name))
  AND a.marks = b.marks
  AND a.created_at > b.created_at;
