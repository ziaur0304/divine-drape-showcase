import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Body {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as Body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body || ({} as Body);
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return json({ ok: false, error: "Missing fields" }, 400);
    }

    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keySecret) return json({ ok: false, error: "Not configured" }, 500);

    const encoder = new TextEncoder();
    const keyData = encoder.encode(keySecret);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signed = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(`${razorpay_order_id}|${razorpay_payment_id}`)
    );
    const expected = Array.from(new Uint8Array(signed))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (expected !== razorpay_signature) {
      return json({ ok: false, error: "Invalid signature" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase
      .from("premium_payments")
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: "paid",
        updated_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", razorpay_order_id);

    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: "Server error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
