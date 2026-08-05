import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Stethoscope, Wheat, Building2, ArrowRight, Eye, MessageCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import DmeUpdatesPopup from "@/components/DmeUpdatesPopup";

const LOGO_URL = "/d2donline-logo.png";


const BUTTONS = [
  {
    title: "Govt MBBS, BAMS and BDS Admissions",
    description: "Rank predictor, closing ranks, college profiles & counselling guidance",
    to: "/govt-medical",
    icon: GraduationCap,
    gradient: "from-blue-600 via-indigo-600 to-violet-600",
  },
  {
    title: "Nursing, Pharmacy and Paramedical Admissions",
    description: "GNM, B.Sc Nursing, D.Pharm, B.Pharm & allied health courses",
    to: "/nursing-paramedical",
    state: { title: "Nursing, Pharmacy and Paramedical Admissions" },
    icon: Stethoscope,
    gradient: "from-emerald-500 via-teal-600 to-cyan-600",
  },
  {
    title: "Agriculture and Veterinary Admissions",
    description: "B.Sc Agriculture, Horticulture, B.V.Sc & AH admissions",
    to: "/agriculture-veterinary",
    state: { title: "Agriculture and Veterinary Admissions" },
    icon: Wheat,
    gradient: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    title: "Private Admissions",
    description: "Private medical, dental and allied college admissions across India",
    to: "/private-admissions",
    state: { title: "Private Admissions" },
    icon: Building2,
    gradient: "from-fuchsia-600 via-purple-600 to-indigo-700",
  },
];

const Landing = () => {
  const [visits, setVisits] = useState<number | null>(null);
  const [selected, setSelected] = useState<string>("");
  const navigate = useNavigate();
  const selectedItem = BUTTONS.find((b) => b.title === selected);


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
      <DmeUpdatesPopup />
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        <section className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Admission Path</span>
          </h1>
        </section>

        <section className="max-w-xl mx-auto mb-10 sm:mb-12">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-lg p-5 sm:p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Select an admission path
            </label>
            <Select value={selected} onValueChange={setSelected}>
              <SelectTrigger className="h-14 rounded-xl text-left text-base">
                <SelectValue placeholder="Choose a category..." />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {BUTTONS.map(({ title, icon: Icon }) => (
                  <SelectItem key={title} value={title} className="py-3">
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-blue-600" />
                      {title}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedItem && (
              <p className="mt-3 text-sm text-slate-600">{selectedItem.description}</p>
            )}

            <button
              disabled={!selectedItem}
              onClick={() =>
                selectedItem && navigate(selectedItem.to, { state: selectedItem.state })
              }
              className={`mt-5 w-full inline-flex items-center justify-center gap-2 h-14 rounded-xl text-white font-bold text-base shadow-lg transition-all ${
                selectedItem
                  ? `bg-gradient-to-r ${selectedItem.gradient} hover:shadow-xl hover:-translate-y-0.5`
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        <section className="max-w-3xl mx-auto text-center rounded-2xl border border-blue-100 bg-white/70 backdrop-blur p-6 sm:p-8 shadow-sm">
          <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed">
            D2DOnline is one stop solution for Career Guidance. It is the most trusted, most popular and most organised platform in Assam for Career Guidance.
          </p>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            If you are confused about your career and stuck in your life click below to message us.
          </p>
          <button
            onClick={() =>
              window.open(
                `https://wa.me/919365248667?text=${encodeURIComponent(
                  "Hi D2DOnline! I am confused about my career and need guidance. Please help me."
                )}`,
                "_blank"
              )
            }
            className="mt-5 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle className="h-5 w-5" />
            Message on WhatsApp
          </button>
        </section>

        <section className="mt-12 sm:mt-16 text-center">
          <p className="text-slate-600 text-base sm:text-lg font-medium mb-4">
            For anything other than that mentioned above click below to send us a message
          </p>
          <button
            onClick={() =>
              window.open(
                `https://wa.me/919365248667?text=${encodeURIComponent(
                  "Hi D2DOnline! I have a query regarding admissions and counselling. Please guide me."
                )}`,
                "_blank"
              )
            }
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle className="h-5 w-5" />
            Message on WhatsApp
          </button>
        </section>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D2D Online · Dream to Destination
      </footer>
    </div>
  );
};

export default Landing;
