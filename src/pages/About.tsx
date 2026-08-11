import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, HeartPulse, Phone } from "lucide-react";

const LOGO_URL = "/d2donline-logo.png";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="px-4 py-4 border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <img src={LOGO_URL} alt="D2D Online — Dream to Destination" className="h-12 sm:h-14" />
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-center leading-tight">
          What is{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            D2DOnline?
          </span>
        </h1>
        <p className="mt-4 text-center text-slate-600 text-base sm:text-lg">
          Dream to Destination — your one-stop solution for career and community guidance in Assam.
        </p>

        <div className="mt-10 space-y-6 text-slate-700 leading-relaxed">
          <p>
            <strong>D2DOnline</strong> (Dream to Destination) is an independent initiative built to
            guide students and citizens of Assam through some of the most important decisions of
            their lives. We believe that the right information at the right time can turn a dream
            into a destination.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">D2DOnline Education</h3>
              <p className="text-sm text-slate-600">
                Admission guidance, college profiles, closing ranks, document checklists, and
                counselling support for medical and paramedical aspirants in Assam.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <HeartPulse className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">D2DOnline Health Care</h3>
              <p className="text-sm text-slate-600">
                A platform to anonymously report healthcare problems in Assam so they can be
                highlighted and addressed.
              </p>
            </div>
          </div>

          <p>
            We are not affiliated with NTA, MCC, DME Assam, or any government body. All information
            shared here is for guidance and reference only. Our goal is to organize reliable
            resources, create helpful tools, and build a supportive community.
          </p>

          <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white p-6 sm:p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Need More Details?</h3>
            <p className="text-white/90 mb-6 text-sm sm:text-base">
              Call us directly for personalised guidance and support.
            </p>
            <a
              href="tel:+919365248667"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-700 px-6 py-3 font-semibold shadow hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call 93652 48667
            </a>
          </div>
        </div>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D2D Online · Dream to Destination
      </footer>
    </div>
  );
};

export default About;
