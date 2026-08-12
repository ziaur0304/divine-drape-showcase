import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  Eye,
  HelpCircle,
  Instagram,
  Youtube,
  MessageCircle,
  MapPin,
  Copy,
  Check,
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
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-center leading-tight">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          D2D Online
        </span>
      </h1>
      <p className="mt-3 text-center text-slate-600 text-base sm:text-lg">
        Choose what you are looking for
      </p>

      <div className="mt-10 space-y-5">
        <Link
          to="/education"
          className="group flex items-center gap-4 rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <span className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </span>
          <span className="flex-1">
            <span className="block text-lg sm:text-xl font-bold">D2DOnline Education</span>
            <span className="block text-sm text-white/85 mt-1">
              Admissions, ranks, colleges & counselling guidance
            </span>
          </span>
          <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>

      <div className="mt-10 flex justify-center">
        <Link
          to="/about"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-md border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:shadow-lg transition-all"
        >
          <HelpCircle className="h-4 w-4 text-blue-600" />
          What is D2DOnline?
        </Link>
      </div>
    </main>

    <footer className="px-4 py-6 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} D2D Online · Dream to Destination
    </footer>
  </div>
);
};

export default Home;
