import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Package,
  Eye,
  Instagram,
  Youtube,
  MessageCircle,
  MapPin,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const LOGO_URL = "/d2donline-logo.png";

const Home = () => {
  const [visits, setVisits] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="px-4 py-4 border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <img src={LOGO_URL} alt="D2D Online — Dream to Destination" className="h-12 sm:h-14" />
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero */}
        <section className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              D2D Online
            </span>
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Dream to Destination — choose where you'd like to begin
          </p>
        </section>

        {/* Two primary buttons */}
        <section className="space-y-5">
          <Link
            to="/services"
            className="group flex items-center gap-4 rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </span>
            <span className="flex-1 text-left">
              <span className="block text-lg sm:text-xl font-bold">D2DOnline Services</span>
              <span className="block text-sm text-white/85 mt-1">
                Career guidance, counselling & admission support
              </span>
            </span>
            <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/products"
            className="group flex items-center gap-4 rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </span>
            <span className="flex-1 text-left">
              <span className="block text-lg sm:text-xl font-bold">D2DOnline Products</span>
              <span className="block text-sm text-white/85 mt-1">
                Educational tools & resources (launching soon)
              </span>
            </span>
            <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        {/* Social Media & Office */}
        <div className="mt-12 bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6">
          <h4 className="text-base font-bold text-slate-900 mb-4 text-center">Connect With Us</h4>
          <div className="grid grid-cols-3 gap-3">
            <a
              href="https://www.instagram.com/d2donlineofficial?igsh=M3MzMWg5aXk4bjUy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white p-3 font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Instagram className="h-5 w-5" />
              Instagram
            </a>
            <a
              href="https://youtube.com/@d2donlineofficial?si=0WseyJuS_TJMsNTq"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white p-3 font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Youtube className="h-5 w-5" />
              YouTube
            </a>
            <a
              href="https://wa.me/919365248667?text=I'm%20from%20D2DOnline%20Website!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white p-3 font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-start gap-3 mb-3">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Our Office</h4>
                <p className="text-sm text-slate-600">Barpeta, Assam</p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/6fucZNa91XWCVHZ89"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white h-11 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            >
              <MapPin className="h-4 w-4" />
              Get Directions
            </a>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText("Barpeta, Assam");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch {
                  // ignore
                }
              }}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 h-11 text-sm font-semibold shadow-sm hover:shadow-md transition-all mt-3"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Address"}
            </button>
          </div>
        </div>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D2D Online · Dream to Destination
      </footer>
    </div>
  );
};

export default Home;
