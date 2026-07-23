
CREATE TABLE public.flood_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  donor_phone TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  display_publicly BOOLEAN NOT NULL DEFAULT true,
  message TEXT,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  status TEXT NOT NULL DEFAULT 'created',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.flood_donations TO anon, authenticated;
GRANT ALL ON public.flood_donations TO service_role;

ALTER TABLE public.flood_donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view paid public donations"
  ON public.flood_donations FOR SELECT
  USING (status = 'paid' AND display_publicly = true);
