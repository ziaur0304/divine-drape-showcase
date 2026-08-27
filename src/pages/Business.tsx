import { Link } from "react-router-dom";
import { ArrowLeft, Music2, Youtube, Clock, Headphones } from "lucide-react";

const LOGO_URL = "/d2donline-logo.png";
const CHANNEL_URL = "https://youtube.com/@alonemuzic1?si=LKYftOc-Trz2vEzo";

// Latest uploads from the Alone Muzic channel — embedded as a playable playlist.
const VIDEO_IDS = [
  "pKdF9uPlyAk",
  "457-oXMesVs",
  "7fivuITUQV4",
  "AKadcq8M-gw",
  "H3oirZma-Xg",
  "HoemG5Eq_Uo",
  "LFGe5ZhkNds",
  "R0kS2md7f9I",
  "RJ2dYelD5rI",
  "SfI2hh5doCo",
  "WoE9DHuDQ70",
];

const EMBED_SRC = `https://www.youtube.com/embed/${VIDEO_IDS[0]}?playlist=${VIDEO_IDS.join(
  ","
)}&autoplay=0&rel=0&modestbranding=1`;

const Business = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <header className="px-4 py-4 border-b bg-white/70 backdrop-blur sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-blue-600 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <img src={LOGO_URL} alt="D2D Online" className="h-8" />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14">
        {/* Coming soon badge */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Music2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            D2DOnline Business
          </h1>
          <p className="mt-2 inline-flex items-center gap-2 text-blue-600 font-semibold">
            <Clock className="w-4 h-4" /> Coming Soon
          </p>
          <p className="mt-3 text-slate-600 max-w-lg mx-auto leading-relaxed">
            We're working on something special. In the meantime, enjoy music from
            our featured channel <span className="font-semibold text-slate-800">Alone Muzic</span> 🎵
          </p>
        </div>

        {/* Music player */}
        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-3">
            <Headphones className="w-5 h-5 text-white" />
            <h2 className="text-white font-bold text-lg">Music Lounge</h2>
          </div>
          <div className="aspect-video w-full bg-black">
            <iframe
              className="w-full h-full"
              src={EMBED_SRC}
              title="Alone Muzic — Music Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="p-5 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <p className="text-sm text-slate-600 text-center sm:text-left">
              Tap play to listen. More tracks load automatically as you go.
            </p>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition w-full sm:w-auto justify-center"
            >
              <Youtube className="w-5 h-5" /> Visit Channel
            </a>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D2D Online · Dream to Destination
      </footer>
    </div>
  );
};

export default Business;
