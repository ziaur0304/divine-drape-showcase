import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Body {
  amount: number; // in rupees
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  displayPublicly?: boolean;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as Body;
    const amountRupees = Number(body?.amount);
    if (!Number.isFinite(amountRupees) || amountRupees < 10 || amountRupees > 500000) {
      return json({ error: "Amount must be between ₹10 and ₹5,00,000" }, 400);
    }
    const name = (body.name || "").trim();
    if (!name || name.length > 120) return json({ error: "Invalid name" }, 400);
    const email = (body.email || "").trim();
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "Invalid email" }, 400);
    const phone = (body.phone || "").trim();
    if (phone && !/^\+?\d{7,15}$/.test(phone.replace(/\s|-/g, ""))) return json({ error: "Invalid phone" }, 400);
    const message = (body.message || "").toString().slice(0, 500);
    const displayPublicly = body.displayPublicly !== false;

    const amountPaise = Math.round(amountRupees * 100);
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
        amount: amountPaise,
        currency: "INR",
        receipt: `flood_${Date.now()}`,
        notes: { purpose: "assam_flood_relief", name, email, phone },
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

    await supabase.from("flood_donations").insert({
      donor_name: name,
      donor_email: email || null,
      donor_phone: phone || null,
      amount: amountPaise,
      currency: "INR",
      display_publicly: displayPublicly,
      message: message || null,
      razorpay_order_id: order.id,
      status: "created",
    });

    return json({
      orderId: order.id,
      amount: amountPaise,
      currency: "INR",
      keyId,
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
