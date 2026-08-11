import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Play } from "lucide-react";

const videos = [
  {
    part: "Part 1",
    title: "Complete Counselling Process — Part 1",
    embedId: "nNUUA0V9c58",
  },
  {
    part: "Part 2",
    title: "Complete Counselling Process — Part 2",
    embedId: "pDAKk3xZ0tw",
  },
  {
    part: "Part 3",
    title: "Complete Counselling Process — Part 3",
    embedId: "MELNOw93f-I",
  },
  {
    part: "Part 4",
    title: "Complete Counselling Process — Part 4",
    embedId: "PX_DsHk0o4I",
  },
];

export default function CounsellingProcess() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <img
            src="/d2donline-logo.png"
            alt="D2D Online — Dream to Destination"
            className="h-10 sm:h-12"
          />
          <Link
            to="/govt-medical"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold transition-colors"
          >
            <Home className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="px-4 py-8 max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Complete Counselling Process
            <span className="block text-blue-600 mt-1">(Simplified): Video Illustration</span>
          </h1>
          <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
            Watch all four parts to understand the RE-NEET UG counselling process step by step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.embedId}
              className="group bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                    <Play className="h-3 w-3 fill-current" />
                    {video.part}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 mt-8 py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h4 className="font-bold text-slate-900">D2D Online</h4>
          <p className="text-sm text-slate-500 mt-1">Dream to Destination</p>
          <p className="text-sm text-slate-400 mt-1">
            Turning your RE-NEET rank into your medical destination.
          </p>
          <p className="text-xs text-slate-400 mt-4">Made with ❤️ for Assam RE-NEET Aspirants</p>
        </div>
      </footer>
    </main>
  );
}
