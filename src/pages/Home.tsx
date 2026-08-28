import { Link } from "react-router-dom";
import {
  GraduationCap,
  HeartPulse,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const LOGO_URL = "/d2donline-logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="px-4 py-4 border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={LOGO_URL} alt="D2D Online — Dream to Destination" className="h-12 sm:h-14" />
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
            You just dream it, we will turn it into your destination
          </p>
        </section>

        {/* Three primary buttons */}
        <section className="space-y-5">
          <Link
            to="/education"
            className="group flex items-center gap-4 rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </span>
            <span className="flex-1 text-left">
              <span className="block text-lg sm:text-xl font-bold">D2DOnline Education</span>
              <span className="block text-sm text-white/85 mt-1">
                Admissions, ranks, colleges & counselling guidance
              </span>
            </span>
            <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/healthcare"
            className="group flex items-center gap-4 rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <HeartPulse className="w-6 h-6" />
            </span>
            <span className="flex-1 text-left">
              <span className="block text-lg sm:text-xl font-bold">D2DOnline Health Care</span>
              <span className="block text-sm text-white/85 mt-1">
                Healthcare services & support (launching soon)
              </span>
            </span>
            <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/business"
            className="group flex items-center gap-4 rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <span className="shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </span>
            <span className="flex-1 text-left">
              <span className="block text-lg sm:text-xl font-bold">D2DOnline Business</span>
              <span className="block text-sm text-white/85 mt-1">
                Business services & solutions (launching soon)
              </span>
            </span>
            <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D2D Online · Dream to Destination
      </footer>
    </div>
  );
};

export default Home;
