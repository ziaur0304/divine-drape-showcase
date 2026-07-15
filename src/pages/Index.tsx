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
  Building2,
  BarChart3,
  ScanLine,
  FileText,
  Download,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/config";
import { supabase } from "@/integrations/supabase/client";

const SITE_URL = "https://rddonline.in";
const SHARE_MESSAGE = `Check out RDD Online — The biggest and most organised platform in Assam for NEET UG Counselling Guidance: ${SITE_URL}`;

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
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all"
        >
          <Link to="/check-rank">
            <Trophy className="h-5 w-5 mr-2" />
            Check State Rank
          </Link>
        </Button>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all"
        >
          <Link to="/college-profiles">
            <Building2 className="h-5 w-5 mr-2" />
            College Profiles
          </Link>
        </Button>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all"
        >
          <Link to="/closing-ranks">
            <BarChart3 className="h-5 w-5 mr-2" />
            Last Year's Closing Rank
          </Link>
        </Button>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all"
        >
          <Link to="/omr-scanner">
            <ScanLine className="h-5 w-5 mr-2" />
            OMR Scanner
          </Link>
        </Button>

        <Button
          asChild
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all"
        >
          <Link to="/documents-required">
            <FileText className="h-5 w-5 mr-2" />
            <span className="flex flex-col items-start leading-tight">
              <span>List of Documents</span>
              <span className="text-sm font-medium opacity-95">required for counselling</span>
            </span>
          </Link>
        </Button>

        <Button
          onClick={() =>
            window.open(
              "https://dme.assam.gov.in/sites/default/files/swf_utility_folder/departments/dme_lipl_in_oid_8/menu/document/mbbs_bds_annexures_bond.pdf",
              "_blank"
            )
          }
          className="w-full bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all"
        >
          <Download className="h-5 w-5 mr-2" />
          Download Annexures
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
            Kindly share this with your friends who scored good marks in Re-NEET 2026.
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
