import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Crown,
  Sparkles,
  Loader2,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const PLAN = {
  title: "Premium Plus Membership",
  price: "₹1999",
  priceValue: 1999,
  tagline: "Done-for-you counselling — we handle the portal",
  features: [
    "Our team will fill your Registration Form on the DME Assam portal",
    "Our team will complete your Choice Filling on the DME Assam portal according to your preferences",
    "Personalized college selection strategy based on your rank, category and preferences",
    "Dedicated one-to-one counselling support throughout the admission process",
    "Hassle-free counselling experience with expert assistance",
  ],
  accent: "from-amber-500 via-yellow-500 to-amber-600",
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PremiumMembership() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openCheckout = () => setOpen(true);

  const handlePay = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!/^\+?\d{7,15}$/.test(phone.trim().replace(/\s|-/g, ""))) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setSubmitting(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Failed to load payment gateway");

      const { data, error } = await supabase.functions.invoke(
        "create-razorpay-order",
        {
          body: {
            plan: "premium_plus",
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
          },
        }
      );
      if (error || !data?.orderId) {
        throw new Error(data?.error || error?.message || "Failed to create order");
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "D2D Online",
        description: data.planName,
        order_id: data.orderId,
        prefill: { name: name.trim(), email: email.trim(), contact: phone.trim() },
        theme: { color: "#1d4ed8" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verify = await supabase.functions.invoke(
              "verify-razorpay-payment",
              { body: response }
            );
            if (verify.error || !verify.data?.ok) {
              toast.error("Payment verification failed. Please contact support.");
              return;
            }
            setOpen(false);
            navigate(
              `/payment-success?plan=${encodeURIComponent(data.planName)}&pid=${response.razorpay_payment_id}`
            );
          } catch (e) {
            toast.error("Verification error. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });
      rzp.open();
    } catch (e) {
      toast.error((e as Error).message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 text-slate-900">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </Link>
          <div>
            <img src="/d2donline-logo.png" alt="D2D Online — Dream to Destination" className="h-9 sm:h-10" />
          </div>
        </div>
      </header>

      <section className="px-4 pt-10 pb-6 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-amber-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          Premium Membership
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
          Expert RE-NEET Counselling{" "}
          <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-amber-600 bg-clip-text text-transparent">
            Support
          </span>
        </h2>
        <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-base md:text-lg">
          One-to-one counselling for Assam MBBS, BDS & BAMS admissions.
          Secure payments powered by Razorpay.
        </p>
      </section>

      <section className="px-4 pb-16 max-w-3xl mx-auto">
        <Card className="relative overflow-hidden rounded-3xl border-0 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 bg-gradient-to-br from-white via-amber-50 to-yellow-50 ring-2 ring-amber-400">
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
            <Crown className="h-3 w-3" />
            Most Popular
          </div>
          <div className={`h-2 bg-gradient-to-r ${PLAN.accent}`} />
          <div className="p-7">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${PLAN.accent} flex items-center justify-center shadow-lg`}
              >
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{PLAN.title}</h3>
                <p className="text-xs text-slate-500">{PLAN.tagline}</p>
              </div>
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-amber-700">
                {PLAN.price}
              </span>
              <span className="text-slate-500 text-sm">/ one-time</span>
            </div>

            <ul className="mt-6 space-y-3">
              {PLAN.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center bg-amber-100 text-amber-700">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-slate-700 leading-relaxed">
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              onClick={openCheckout}
              className="w-full mt-7 h-12 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white"
            >
              Buy Premium Plus
            </Button>
          </div>
        </Card>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          256-bit secure payment via Razorpay • UPI, Cards, Netbanking, Wallets
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {PLAN.title} — {PLAN.price}
            </DialogTitle>
            <DialogDescription>
              Enter your details to continue to secure payment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handlePay}
              disabled={submitting}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-semibold"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing…
                </>
              ) : (
                `Pay ${PLAN.price} Securely`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
