import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
const LOGO_URL = "/rddonline-logo.png";

const ComingSoon = () => {
  const { state } = useLocation() as { state?: { title?: string } };
  const title = state?.title ?? "Coming Soon";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <header className="px-4 py-4 border-b bg-white/70 backdrop-blur">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-700 hover:text-blue-600 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <img src={logoAsset.url} alt="RDD Online" className="h-8" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full text-center bg-white rounded-3xl shadow-xl border border-slate-200 p-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">{title}</h1>
          <p className="text-lg text-blue-600 font-semibold mb-4">Coming Soon</p>
          <p className="text-slate-600 leading-relaxed">
            We're working hard to bring this section to you. Stay tuned for updates and guidance.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ComingSoon;
