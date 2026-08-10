import { Link } from "react-router-dom";
import { ArrowLeft, ListOrdered, School, RefreshCcw, Users, Award, ChevronRight } from "lucide-react";

const ITEMS = [
  { title: "Assam State Rank", to: "/state-rank-list", icon: ListOrdered, gradient: "from-indigo-600 to-blue-600" },
  { title: "Proof of Schooling", to: "/proof-of-schooling", icon: School, gradient: "from-emerald-500 to-teal-600" },
  { title: "Category Change", to: "/category-change", icon: RefreshCcw, gradient: "from-amber-500 to-orange-600" },
  { title: "Three Generation Link Certificate", to: "/three-generation-certificate", icon: Users, gradient: "from-violet-600 to-purple-700" },
  { title: "Special Quota", to: "/special-quota", icon: Award, gradient: "from-rose-600 to-red-700" },
];

const LatestUpdates = () => (
  <main className="min-h-screen bg-white text-slate-900">
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/govt-medical" className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Back">
          <ArrowLeft className="h-5 w-5 text-slate-700" />
        </Link>
        <img src="/d2donline-logo.png" alt="D2D Online — Dream to Destination" className="h-9 sm:h-10" />
      </div>
    </header>

    <section className="px-4 pt-6 pb-14 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-extrabold leading-snug">Latest Updates from DME Assam</h1>
      <p className="text-sm text-slate-500 mt-1.5">Tap any update below to view details and download forms.</p>

      <div className="mt-5 space-y-3">
        {ITEMS.map(({ title, to, icon: Icon, gradient }) => (
          <Link
            key={to}
            to={to}
            className={`w-full flex items-center gap-3 text-left px-4 py-4 rounded-xl bg-gradient-to-r ${gradient} text-white font-bold shadow-md hover:shadow-xl hover:brightness-110 transition-all`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="flex-1 text-sm sm:text-base leading-snug">{title}</span>
            <ChevronRight className="h-5 w-5 shrink-0 opacity-80" />
          </Link>
        ))}
      </div>

      <p className="text-xs text-slate-400 text-center mt-8">
        D2D Online is an independent initiative and is not affiliated with NTA, MCC or DME Assam.
      </p>
    </section>
  </main>
);

export default LatestUpdates;
