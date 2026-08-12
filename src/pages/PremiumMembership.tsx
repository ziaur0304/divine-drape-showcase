import { Link } from "react-router-dom";
import { ArrowLeft, Crown, MessageCircle, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import qrAsset from "@/assets/premium-qr.jpg.asset.json";

export default function PremiumMembership() {
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
          <img src="/d2donline-logo.png" alt="D2D Online — Dream to Destination" className="h-9 sm:h-10" />
        </div>
      </header>

      <section className="px-4 py-8 max-w-xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
            <Crown className="h-3.5 w-3.5" /> Premium Plus
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-3">Scan & Pay</h1>
          <p className="mt-4 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
            Pay ₹1999
          </p>
        </div>

        <Card className="overflow-hidden rounded-3xl border-0 shadow-xl bg-white p-5">
          <img
            src={qrAsset.url}
            alt="D2D Online PhonePe UPI payment QR code"
            className="w-full max-w-sm mx-auto rounded-2xl"
          />

          <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center">
            <p className="text-base font-bold text-slate-900">
              After payment send the screenshot to 9365248667
            </p>
            <p className="text-sm text-slate-700 mt-1">
              You will be added to our premium plus batch.
            </p>
          </div>

          <a
            href="https://wa.me/919365248667?text=Hi%20D2DOnline%21%20I%20have%20made%20the%20payment%20for%20Premium%20Plus%20Membership.%20Here%20is%20my%20screenshot."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:from-emerald-600 hover:to-green-700"
          >
            <MessageCircle className="h-5 w-5" />
            Send Screenshot on WhatsApp
          </a>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Secure UPI payment via BHIM / PhonePe
          </p>
        </Card>
      </section>
    </main>
  );
}
