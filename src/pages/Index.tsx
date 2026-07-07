import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Trophy,
  Share2,
  Eye,
  GraduationCap,
  ShieldCheck,
  Check,
  Phone,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { supabase } from "@/integrations/supabase/client";

const SITE_URL = "https://rddonline.in";
const SHARE_MESSAGE = `Check out RDD Online — Assam RE-NEET 2026 Unofficial Merit List. Submit your marks and see your expected state rank: ${SITE_URL}`;

const openWhatsApp = () => window.open(WHATSAPP_URL, "_blank");
const shareOnWhatsApp = () =>
  window.open(`https://wa.me/?text=${encodeURIComponent(SHARE_MESSAGE)}`, "_blank");

export default function Index() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-in");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const key = "rdd_visit_logged";
        if (!sessionStorage.getItem(key)) {
          await supabase.from("page_visits").insert({});
          sessionStorage.setItem(key, "1");
        }
      } catch {
        // ignore
      }
      const { count } = await supabase
        .from("page_visits")
        .select("*", { count: "exact", head: true });
      if (!cancelled) setVisits(count ?? 0);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-blue-600">RDD Online</h1>
            <p className="text-xs text-slate-500">Rank • Dream • Destination</p>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
              Total Visits
            </span>
            <div className="flex items-center gap-1.5 text-blue-600 font-bold">
              <Eye className="h-3.5 w-3.5" />
              <span className="text-sm tabular-nums">
                {visits === null ? "…" : visits.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Top Action Buttons */}
      <section className="px-4 pt-6 pb-2 max-w-3xl mx-auto space-y-3">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all"
        >
          <Link to="/check-rank">
            <Trophy className="h-5 w-5 mr-2" />
            Check State Rank
          </Link>
        </Button>


        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-5 rounded-2xl shadow-lg">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />
          <div className="flex items-start gap-3 mb-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <span className="text-white text-sm">📢</span>
            </div>
            <h4 className="text-base font-bold text-amber-900 pt-1">Special Notice</h4>
          </div>
          <p className="text-sm text-amber-950/80 leading-relaxed mb-4">
            Share this to your friends who is anxious about his assam state rank in RE-NEET 2026
          </p>
          <Button
            onClick={shareOnWhatsApp}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share on WhatsApp
          </Button>
          <p className="text-xs text-center text-amber-900/60 mt-3">
            Share this website on WhatsApp by clicking the button above
          </p>
        </Card>

        {/* Join WhatsApp Group */}
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 rounded-2xl shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <h4 className="text-base font-bold text-slate-900 pt-1">
              Join Assam Future Doctors 2026
            </h4>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Join our WhatsApp group, "Assam Future Doctors 2026 🩺," to receive all the latest
            updates, important announcements, and complete guidance regarding RE-NEET counselling
            for admission to MBBS, BDS, and BAMS courses in Assam.
          </p>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            We'll support and guide you throughout the counselling process until you secure your
            medical college.
          </p>
          <Button
            onClick={() => window.open("https://chat.whatsapp.com/HsabYdYM41ACoDqpBzh2C1", "_blank")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Join WhatsApp Group
          </Button>
        </Card>
      </section>

      {/* Premium Counselling Advertisement */}
      <section className="px-4 pt-4 pb-6 max-w-3xl mx-auto reveal opacity-0">
        <Card className="relative overflow-hidden border-0 rounded-3xl shadow-2xl bg-white/70 backdrop-blur-xl">
          {/* Decorative gradient orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl" />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-900 via-blue-600 to-amber-400" />

          <div className="relative p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <Badge className="bg-amber-100 hover:bg-amber-100 text-amber-800 border-amber-200 mb-2">
                  Premium Counselling Support
                </Badge>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                  Need Help with RE-NEET UG Counselling for admission into MBBS/BDS/BAMS?
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed">
              Confused about registration, choice filling, seat allotment, documents or the
              counselling process? Get complete personalized counselling support for just{" "}
              <span className="font-bold text-amber-600">₹299</span>. Our expert team will
              guide you through every stage of the admission process—from registration to final
              college admission.
            </p>

            {/* What's Included */}
            <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                What's Included
              </h3>
              <ul className="space-y-3">
                {[
                  "Personalized counselling guidance",
                  "College and choice filling assistance",
                  "Document verification support",
                  "24×7 WhatsApp & call support",
                  "Dedicated guidance until your admission is complete",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <Button
                onClick={() =>
                  window.open(
                    "https://wa.me/919365248667?text=Hello%21%20I%20would%20like%20to%20enroll%20in%20the%20%E2%82%B9299%20RE-NEET%20UG%20Paid%20Counselling.%20Please%20guide%20me%20with%20the%20next%20steps.",
                    "_blank"
                  )
                }
                className="w-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 hover:from-blue-950 hover:via-blue-800 hover:to-blue-950 text-white rounded-2xl h-14 text-base font-bold shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5 mr-2" />
                Get Counselling – ₹299
              </Button>
              <p className="text-xs text-center text-slate-400">
                Trusted guidance for Assam RE-NEET aspirants. Limited slots available.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Disclaimer */}
      <section className="px-4 py-6 max-w-3xl mx-auto reveal opacity-0">
        <Card className="bg-slate-50 border-slate-200 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
            Disclaimer
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This is an independent community initiative by <strong>RDD Online</strong>{" "}
            (Rank • Dream • Destination). It is <strong>not affiliated</strong> with NTA,
            MCC, DME Assam, or any government authority. The unofficial merit list and
            cutoff analysis are created using voluntarily submitted student data and are
            intended only for guidance.
          </p>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 mt-4 py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h4 className="font-bold text-slate-900">RDD Online</h4>
          <p className="text-sm text-slate-500 mt-1">Rank • Dream • Destination</p>
          <p className="text-sm text-slate-400 mt-1">
            Turning your RE-NEET rank into your medical destination.
          </p>
          <p className="text-xs text-slate-400 mt-4">Made with ❤️ for Assam RE-NEET Aspirants</p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-md border-t border-slate-100 md:hidden z-50">
        <Button
          onClick={openWhatsApp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-semibold shadow-lg"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Join WhatsApp Group
        </Button>
      </div>

      <div className="h-20 md:hidden" />
    </main>
  );
}
