import { useEffect, useMemo, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, MessageCircle, Sparkles, Target, Loader2 } from "lucide-react";

const GROUP_URL = "https://chat.whatsapp.com/HsabYdYM41ACoDqpBzh2C1";

type RankMap = Record<number, string>;

export default function RankPredictor() {
  const [rankMap, setRankMap] = useState<RankMap>({});
  const [loaded, setLoaded] = useState(false);
  const [marks, setMarks] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/data/rank_ranges.csv")
      .then((r) => r.text())
      .then((text) => {
        const map: RankMap = {};
        text.split(/\r?\n/).slice(1).forEach((line) => {
          const [m, range] = line.split(",");
          const n = Number(m);
          if (!Number.isNaN(n) && range) map[n] = range.trim();
        });
        setRankMap(map);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    document.title = "Assam State Rank Predictor 2026 | RDD Online";
    const desc = "Estimate your Assam NEET UG 2026 state rank instantly based on your marks and historical counselling data.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const n = Number(marks);
    if (!marks || Number.isNaN(n)) {
      setError("Please enter a valid number.");
      return;
    }
    if (!Number.isInteger(n)) {
      setError("Please enter a whole number (no decimals).");
      return;
    }
    if (n < 300 || n > 700) {
      setError("Marks must be between 300 and 700.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const range = rankMap[n] ?? "Not available";
      setResult(range);
      setLoading(false);
      setOpen(true);
    }, 600);
  };

  const displayRange = useMemo(() => (result ? result.replace(/-/g, "–") : ""), [result]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="text-right">
            <h1 className="text-lg font-bold text-blue-900">RDD Online</h1>
            <p className="text-[10px] text-slate-500 tracking-wider">Rank • Dream • Destination</p>
          </div>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 pt-8 pb-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-4">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">NEET UG 2026</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-blue-950 leading-tight mb-3">
          Assam State Rank<br />Predictor 2026
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Enter your NEET UG 2026 marks to instantly estimate your Assam State Rank.
        </p>
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Disclaimer:</strong> This is an estimated Assam State Rank
          based on collected data compared with historical data and counselling trends. The final Assam
          State Merit Rank may vary.
        </div>
      </section>

      {/* Input Card */}
      <section className="max-w-3xl mx-auto px-4 pb-6">
        <Card className="relative overflow-hidden border-0 bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(30,58,138,0.15)] ring-1 ring-blue-100/60 p-6 md:p-8 animate-fade-in-delay-1">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900" />
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="marks" className="block text-sm font-semibold text-slate-800 mb-2">
                Enter Your NEET Marks
              </label>
              <Input
                id="marks"
                type="number"
                inputMode="numeric"
                min={300}
                max={700}
                placeholder="Example: 612"
                value={marks}
                onChange={(e) => {
                  setMarks(e.target.value);
                  if (error) setError("");
                }}
                className="h-14 text-lg rounded-xl border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 bg-white"
                aria-invalid={!!error}
                aria-describedby={error ? "marks-error" : undefined}
              />
              {error && (
                <p id="marks-error" className="mt-2 text-sm text-red-600 font-medium">
                  {error}
                </p>
              )}
              <p className="mt-2 text-xs text-slate-500">Valid range: 300 – 700</p>
            </div>

            <Button
              type="submit"
              disabled={loading || !loaded}
              className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Calculating…
                </>
              ) : (
                <>
                  <Target className="h-5 w-5 mr-2" />
                  Predict Assam Rank
                </>
              )}
            </Button>
          </form>
        </Card>
      </section>

      {/* CTA Card */}
      <section className="max-w-3xl mx-auto px-4 pb-10 animate-fade-in-delay-2">
        <Card className="relative overflow-hidden border-0 rounded-3xl shadow-[0_20px_60px_-15px_rgba(30,58,138,0.2)] bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white p-6 md:p-8">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 mb-4">
              <span className="text-xs font-semibold text-amber-200 uppercase tracking-wider">Expert Guidance</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 leading-tight">
              Need Expert Guidance for Assam MBBS/BDS Counselling?
            </h3>
            <p className="text-blue-100 mb-4">Join our WhatsApp community to receive:</p>
            <ul className="space-y-2 mb-6 text-sm text-blue-50">
              {[
                "Assam counselling updates",
                "Cut-off analysis",
                "Choice filling guidance",
                "Important notifications",
                "Expert counselling support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => window.open(GROUP_URL, "_blank")}
              className="w-full h-13 py-6 text-base font-bold rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-blue-950 shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Join WhatsApp Group
            </Button>
          </div>
        </Card>
      </section>

      {/* Result Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-3xl border-0 p-0 overflow-hidden bg-white shadow-2xl">
          <div className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-6 pt-8 pb-6 text-white text-center">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-400/30 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-blue-400/30 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-400 text-blue-950 text-2xl mb-3 shadow-lg">
                🎯
              </div>
              <DialogHeader>
                <DialogTitle className="text-center text-white text-lg font-semibold">
                  Estimated Assam State Rank
                </DialogTitle>
              </DialogHeader>
            </div>
          </div>
          <div className="px-6 py-6 text-center animate-fade-in">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-2">
              Your Predicted Rank
            </p>
            <p className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-1 tabular-nums">
              {displayRange}
            </p>
            <p className="text-xs text-slate-400 mb-6">Based on {marks} marks</p>

            <Button
              onClick={() => window.open(GROUP_URL, "_blank")}
              className="w-full h-auto py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg flex flex-col gap-0.5"
            >
              <span className="flex items-center gap-2 font-bold text-base">
                <MessageCircle className="h-5 w-5" />
                Join our WhatsApp group
              </span>
              <span className="text-xs font-normal opacity-90">
                For Updates and Notification regarding counselling
              </span>
            </Button>

            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="w-full mt-3 text-slate-500 hover:text-slate-800"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
