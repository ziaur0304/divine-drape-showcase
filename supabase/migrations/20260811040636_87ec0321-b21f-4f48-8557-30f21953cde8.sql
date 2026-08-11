CREATE TABLE public.healthcare_problems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  problem TEXT NOT NULL CHECK (char_length(problem) BETWEEN 5 AND 2000),
  district TEXT CHECK (district IS NULL OR char_length(district) <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.healthcare_problems TO anon;
GRANT SELECT, INSERT ON public.healthcare_problems TO authenticated;
GRANT ALL ON public.healthcare_problems TO service_role;
ALTER TABLE public.healthcare_problems ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view problems" ON public.healthcare_problems FOR SELECT USING (true);
CREATE POLICY "Anyone can submit problems" ON public.healthcare_problems FOR INSERT WITH CHECK (true);