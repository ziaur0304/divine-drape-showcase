import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Body {
  plan: "premium" | "premium_plus";
  name: string;
  email: string;
  phone: string;
}

const PLANS = {
  premium: { name: "Premium Membership", amount: 29900 },
  premium_plus: { name: "Premium Plus Membership", amount: 199900 },
} as const;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as Body;
    if (!body?.plan || !PLANS[body.plan]) {
      return json({ error: "Invalid plan" }, 400);
    }
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    if (!name || name.length > 120) return json({ error: "Invalid name" }, 400);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "Invalid email" }, 400);
    if (!/^\+?\d{7,15}$/.test(phone.replace(/\s|-/g, ""))) return json({ error: "Invalid phone" }, 400);

    const plan = PLANS[body.plan];
    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keyId || !keySecret) return json({ error: "Payment not configured" }, 500);

    const auth = btoa(`${keyId}:${keySecret}`);
    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: plan.amount,
        currency: "INR",
        receipt: `rdd_${Date.now()}`,
        notes: { plan: body.plan, name, email, phone },
      }),
    });

    if (!rzpRes.ok) {
      const errText = await rzpRes.text();
      console.error("Razorpay order error:", errText);
      return json({ error: "Failed to create order" }, 502);
    }

    const order = await rzpRes.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase.from("premium_payments").insert({
      plan_name: plan.name,
      amount: plan.amount,
      currency: "INR",
      razorpay_order_id: order.id,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      status: "created",
    });

    return json({
      orderId: order.id,
      amount: plan.amount,
      currency: "INR",
      keyId,
      planName: plan.name,
    });
  } catch (e) {
    console.error(e);
    return json({ error: "Server error" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
