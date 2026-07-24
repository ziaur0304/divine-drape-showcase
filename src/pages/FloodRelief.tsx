import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Users,
  Target,
  IndianRupee,
  Droplets,
  Utensils,
  Pill,
  Shirt,
  Sparkles,
  Baby,
  BedDouble,
  ShieldCheck,
  Check,
  Loader2,
  HandHeart,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const GOAL_AMOUNT = 500000; // ₹5,00,000 goal
const WHATSAPP_URL = "https://wa.me/919365248667?text=Hi%20RDD%20Online,%20I%20want%20to%20volunteer%20for%20Assam%20Flood%20Relief";

const SUGGESTED = [100, 250, 500, 1000, 2500, 5000];

const PROVIDES = [
  { icon: Utensils, label: "Food Supplies", color: "from-orange-400 to-red-500" },
  { icon: Droplets, label: "Clean Drinking Water", color: "from-cyan-400 to-blue-500" },
  { icon: Pill, label: "Essential Medicines", color: "from-emerald-400 to-green-600" },
  { icon: Shirt, label: "Clothing", color: "from-violet-400 to-purple-600" },
  { icon: Sparkles, label: "Hygiene Kits", color: "from-pink-400 to-rose-500" },
  { icon: Baby, label: "Baby Care Essentials", color: "from-amber-400 to-yellow-500" },
  { icon: BedDouble, label: "Blankets & Emergency Supplies", color: "from-indigo-400 to-blue-700" },
];

const UPDATES = [
  {
    date: "24 July 2026",
    title: "Relief supplies distributed in Sivasagar",
    desc: "Distributed 300+ food packets, drinking water and essential medicines to families sheltered in relief camps across Sivasagar district.",
  },
  {
    date: "22 July 2026",
    title: "Emergency response initiated",
    desc: "RDD Online kicked off coordinated flood relief efforts with local volunteers in Upper Assam.",
  },
];

const FAQS = [
  { q: "Is my donation secure?", a: "Yes. All payments are securely processed through Razorpay with end-to-end encryption." },
  { q: "Will I receive a receipt?", a: "Yes. A payment receipt is generated automatically after every successful donation." },
  { q: "Can I donate anonymously?", a: "Absolutely. Simply uncheck the 'Display my name publicly' box during donation." },
  { q: "How will I know where my money is used?", a: "We publish regular relief updates, photographs and expenditure reports directly on this page." },
];

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

type Donation = {
  id: string;
  donor_name: string;
  amount: number;
  display_publicly: boolean;
  message: string | null;
  created_at: string;
};

export default function FloodRelief() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [displayPublicly, setDisplayPublicly] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [thanks, setThanks] = useState<{ paymentId: string; amount: number } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const fetchDonations = async () => {
    const { data } = await supabase
      .from("flood_donations")
      .select("id, donor_name, amount, display_publicly, message, created_at")
      .eq("status", "paid")
      .order("created_at", { ascending: false })
      .limit(200);
    if (data) setDonations(data as any);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const stats = useMemo(() => {
    const totalPaise = donations.reduce((s, d) => s + (d.amount || 0), 0);
    const total = Math.round(totalPaise / 100);
    return {
      total,
      donors: donations.length,
      goal: GOAL_AMOUNT,
      progress: Math.min(100, Math.round((total / GOAL_AMOUNT) * 100)),
    };
  }, [donations]);

  const effectiveAmount = customAmount ? Number(customAmount) : amount;

  const handleDonate = async () => {
    if (!Number.isFinite(effectiveAmount) || effectiveAmount < 10) {
      toast.error("Please enter an amount of at least ₹10");
      return;
    }
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      toast.error("Please enter a valid email");
      return;
    }

    setSubmitting(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Failed to load payment gateway");

      const { data, error } = await supabase.functions.invoke("create-donation-order", {
        body: {
          amount: effectiveAmount,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          displayPublicly,
        },
      });
      if (error || !data?.orderId) {
        throw new Error(data?.error || error?.message || "Failed to create order");
      }

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "RDD Online — Assam Flood Relief",
        description: "Donation for flood-affected families in Assam",
        order_id: data.orderId,
        prefill: { name: name.trim(), email: email.trim(), contact: phone.trim() },
        theme: { color: "#1d4ed8" },
        handler: async (response: any) => {
          try {
            const verify = await supabase.functions.invoke("verify-donation-payment", {
              body: response,
            });
            if (verify.error || !verify.data?.ok) {
              toast.error("Payment verification failed. Please contact support.");
              return;
            }
            setThanks({ paymentId: response.razorpay_payment_id, amount: effectiveAmount });
            fetchDonations();
          } catch {
            toast.error("Verification error. Please contact support.");
          }
        },
        modal: { ondismiss: () => setSubmitting(false) },
      });
      rzp.open();
    } catch (e) {
      toast.error((e as Error).message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const visibleDonations = showAll ? donations : donations.slice(0, 6);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-slate-900 scroll-smooth">
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
            <h1 className="text-lg font-bold text-blue-700">RDD Online</h1>
            <p className="text-xs text-slate-500">Assam Flood Relief Fund</p>
          </div>
        </div>
      </header>

      {/* Donate */}
      <section id="donate" className="max-w-5xl mx-auto px-4 py-10">
        <Card className="rounded-3xl border-0 shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-700 via-cyan-500 to-emerald-500" />
          <div className="p-6 md:p-8">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <Heart className="h-3.5 w-3.5" /> Donate Now
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold">Every contribution counts</h3>
              <p className="mt-2 text-slate-600 text-sm">
                Secure payments via UPI, Cards, Net Banking & Wallets — powered by Razorpay.
              </p>

              <div className="mt-5">
                <Label className="text-sm">Choose an amount</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {SUGGESTED.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => { setAmount(v); setCustomAmount(""); }}
                      className={`h-11 rounded-xl border-2 font-bold transition-all ${
                        !customAmount && amount === v
                          ? "border-blue-600 bg-blue-600 text-white shadow-md"
                          : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                      }`}
                    >
                      ₹{v.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <Input
                    inputMode="numeric"
                    placeholder="Custom amount (₹)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value.replace(/[^\d]/g, ""))}
                    className="h-11 rounded-xl"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <div>
                  <Label htmlFor="name" className="text-sm">Full Name *</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-11 rounded-xl" placeholder="Your name" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 h-11 rounded-xl" placeholder="Optional" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">Phone</Label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 h-11 rounded-xl" placeholder="Optional" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="msg" className="text-sm">Message of support (optional)</Label>
                  <Textarea id="msg" value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 rounded-xl" placeholder="A short note for the community" rows={2} />
                </div>
                <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                  <Checkbox
                    checked={displayPublicly}
                    onCheckedChange={(v) => setDisplayPublicly(Boolean(v))}
                    className="mt-0.5"
                  />
                  <span>Display my name publicly on the donors list</span>
                </label>
              </div>

              <Button
                onClick={handleDonate}
                disabled={submitting}
                className="mt-5 w-full h-14 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white text-base font-bold shadow-lg"
              >
                {submitting ? (
                  <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Processing…</>
                ) : (
                  <><Heart className="h-5 w-5 mr-2" /> Donate ₹{(effectiveAmount || 0).toLocaleString("en-IN")}</>
                )}
              </Button>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Secured by Razorpay · SSL Encrypted
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-16 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur border border-white/25 text-xs font-bold uppercase tracking-wider animate-pulse">
            🚨 Urgent Crisis
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            Assam Flood Relief Fund
          </h2>
          <p className="mt-4 text-blue-50 max-w-2xl text-base md:text-lg leading-relaxed">
            The devastating floods in Upper Assam have affected hundreds of thousands of lives, leaving families without shelter, food, clean drinking water, and essential supplies. Many communities remain cut off and are in urgent need of assistance.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: "🌊", label: "8,00,000+ People Affected" },
              { icon: "🏕️", label: "24,000+ In Relief Camps" },
              { icon: "🏡", label: "900+ Villages Inundated" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4"
              >
                <div className="text-2xl">{s.icon}</div>
                <div className="mt-1 text-sm font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#donate"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white text-blue-700 font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <Heart className="h-5 w-5" /> Donate Now
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white/10 border border-white/30 text-white font-bold hover:bg-white/20 transition-all"
            >
              <BookOpen className="h-5 w-5" /> Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 -mt-8 md:-mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { icon: IndianRupee, label: "Total Raised", value: `₹${stats.total.toLocaleString("en-IN")}`, color: "from-emerald-500 to-green-600" },
            { icon: Users, label: "Total Donors", value: stats.donors.toLocaleString("en-IN"), color: "from-blue-500 to-indigo-600" },
            { icon: Target, label: "Goal", value: `₹${stats.goal.toLocaleString("en-IN")}`, color: "from-amber-500 to-orange-600" },
            { icon: Heart, label: "Progress", value: `${stats.progress}%`, color: "from-rose-500 to-pink-600" },
          ].map((s) => (
            <Card key={s.label} className="rounded-2xl border-0 shadow-lg p-4 bg-white">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{s.label}</div>
              <div className="text-lg md:text-xl font-extrabold text-slate-900">{s.value}</div>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <Progress value={stats.progress} className="h-3 bg-slate-200" />
          <p className="mt-2 text-xs text-slate-500 text-center">
            ₹{stats.total.toLocaleString("en-IN")} raised of ₹{stats.goal.toLocaleString("en-IN")} goal
          </p>
        </div>
      </section>

      {/* Donors */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Heart className="h-3.5 w-3.5" /> Our Generous Donors
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-bold">Thank You to Our Donors</h3>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            Every donation represents kindness, compassion, and hope. We are deeply grateful to everyone standing with the people of Assam during this difficult time.
          </p>
        </div>

        {donations.length === 0 ? (
          <Card className="mt-6 p-8 rounded-2xl border-0 shadow-sm text-center bg-white">
            <p className="text-slate-500">
              Be the <span className="font-semibold text-blue-700">first donor</span> to stand with Assam. Your name will appear here.
            </p>
          </Card>
        ) : (
          <>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {visibleDonations.map((d) => (
                <Card key={d.id} className="p-4 rounded-2xl border-0 shadow-sm bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {(d.display_publicly ? d.donor_name : "A").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 truncate">
                        {d.display_publicly ? d.donor_name : "Anonymous"}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(d.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                    <div className="text-emerald-700 font-bold text-sm">
                      ₹{Math.round(d.amount / 100).toLocaleString("en-IN")}
                    </div>
                  </div>
                  {d.message && d.display_publicly && (
                    <p className="mt-2 text-xs text-slate-600 italic">"{d.message}"</p>
                  )}
                </Card>
              ))}
            </div>
            {donations.length > 6 && (
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => setShowAll((v) => !v)} className="rounded-xl">
                  {showAll ? "Show Less" : "View All Donors"}
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* About */}
      <section id="about" className="max-w-5xl mx-auto px-4 py-6">
        <Card className="rounded-3xl border-0 shadow-lg overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-slate-900">Why We Started This Campaign</h3>
            <p className="mt-3 text-slate-700 leading-relaxed">
              RDD Online believes that true education goes hand in hand with humanity. Through this initiative, we aim to provide emergency relief to flood-affected families across Upper Assam with the support of generous donors and volunteers.
            </p>
          </div>
        </Card>
      </section>

      {/* Provides */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold">What Your Donation Provides</h3>
          <p className="mt-2 text-slate-600 text-sm">Every rupee turns into essential supplies for a family in need.</p>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {PROVIDES.map((p) => (
            <Card key={p.label} className="p-4 rounded-2xl border-0 shadow-sm bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all text-center">
              <div className={`mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-md`}>
                <p.icon className="h-6 w-6 text-white" />
              </div>
              <div className="mt-3 text-sm font-semibold text-slate-900">{p.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Transparency */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <Card className="rounded-3xl border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-white overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-green-600" />
          <div className="p-6 md:p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              💯 Transparency Promise
            </div>
            <h3 className="mt-3 text-2xl font-bold">Every Rupee Makes a Difference</h3>
            <p className="mt-3 text-slate-700 leading-relaxed">
              100% of every donation will be used directly to support people affected by the floods in Assam.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
              {["Food", "Drinking Water", "Medicines", "Clothing", "Hygiene Kits", "Emergency Relief Materials"].map((x) => (
                <div key={x} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600" /> {x}
                </div>
              ))}
            </div>
            <p className="mt-4 text-slate-700 text-sm">
              We are committed to complete transparency by regularly publishing relief distribution photographs, bills and invoices, donation utilization reports, and progress updates.
            </p>
          </div>
        </Card>
      </section>

      {/* Updates */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center">Relief Updates</h3>
        <div className="mt-6 space-y-3">
          {UPDATES.map((u) => (
            <Card key={u.date} className="p-5 rounded-2xl border-0 shadow-sm bg-white flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-md">
                <CalendarDays className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">{u.date}</div>
                <div className="font-bold text-slate-900 mt-0.5">{u.title}</div>
                <p className="text-sm text-slate-600 mt-1">{u.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Volunteer */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <Card className="rounded-3xl border-0 shadow-xl overflow-hidden bg-gradient-to-br from-blue-700 to-cyan-600 text-white">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-xs font-bold uppercase tracking-wider">
                <HandHeart className="h-3.5 w-3.5" /> Become a Volunteer
              </div>
              <h3 className="mt-3 text-2xl font-bold">Join us on the ground</h3>
              <p className="mt-2 text-blue-50 text-sm">
                Help with Relief Distribution, Fundraising, Logistics or Awareness Campaigns.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white text-blue-700 font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="h-5 w-5" /> Become a Volunteer
            </a>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h3 className="text-2xl md:text-3xl font-bold text-center">Frequently Asked Questions</h3>
        <div className="mt-6 space-y-3">
          {FAQS.map((f, i) => {
            const open = openFaq === i;
            return (
              <Card key={f.q} className="rounded-2xl border-0 shadow-sm bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left"
                >
                  <span className="font-semibold text-slate-900">{f.q}</span>
                  {open ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                </button>
                {open && <div className="px-4 pb-4 text-sm text-slate-600">{f.a}</div>}
              </Card>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-6 py-10 px-4 text-center bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-3xl mx-auto">
          <h4 className="text-xl font-extrabold">Together, We Can Bring Hope to Assam</h4>
          <p className="text-blue-100 mt-3 text-sm md:text-base italic">
            "Every act of kindness creates a ripple of hope. Your generosity can help families recover, rebuild, and look toward a better tomorrow."
          </p>
          <p className="mt-4 font-bold">❤️ Donate Today. Stand With Assam.</p>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-100 md:hidden z-40">
        <a
          href="#donate"
          className="flex items-center justify-center w-full h-12 rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-bold shadow-lg"
        >
          <Heart className="h-5 w-5 mr-2" /> Donate Now
        </a>
      </div>
      <div className="h-20 md:hidden" />

      {/* Thanks dialog */}
      <Dialog open={!!thanks} onOpenChange={(v) => !v && setThanks(null)}>
        <DialogContent className="rounded-3xl border-0 overflow-hidden p-0 max-w-md">
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-blue-600 to-cyan-500" />
          <div className="p-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
              <Check className="h-8 w-8 text-white" strokeWidth={3} />
            </div>
            <DialogHeader className="mt-4">
              <DialogTitle className="text-2xl">Thank You for Your Kindness!</DialogTitle>
              <DialogDescription className="text-slate-600 mt-2">
                You've proved that you are a human with a heart. Your donation of{" "}
                <span className="font-bold text-emerald-700">₹{thanks?.amount.toLocaleString("en-IN")}</span>{" "}
                will directly help flood-affected families in Assam.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-3 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Payment ID</span>
                <span className="font-mono text-xs text-slate-800 truncate max-w-[60%]">{thanks?.paymentId}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-slate-500">Date</span>
                <span className="text-slate-800">{new Date().toLocaleString("en-IN")}</span>
              </div>
            </div>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="mt-4 w-full rounded-xl h-11"
            >
              Download / Print Receipt
            </Button>
            <Button
              onClick={() => setThanks(null)}
              className="mt-2 w-full rounded-xl h-11 bg-blue-700 hover:bg-blue-800"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
