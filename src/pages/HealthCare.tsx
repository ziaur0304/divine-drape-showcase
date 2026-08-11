import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, HeartPulse, Search, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const LOGO_URL = "/d2donline-logo.png";

const schema = z.object({
  problem: z
    .string()
    .trim()
    .min(5, { message: "Please describe the problem in at least 5 characters" })
    .max(2000, { message: "Please keep it under 2000 characters" }),
  district: z
    .string()
    .trim()
    .max(100, { message: "District must be less than 100 characters" }),
});

type Problem = {
  id: string;
  problem: string;
  district: string | null;
  created_at: string;
};

const HealthCare = () => {
  const [problem, setProblem] = useState("");
  const [district, setDistrict] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase
      .from("healthcare_problems")
      .select("id, problem, district, created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    setItems((data as Problem[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.problem.toLowerCase().includes(q) ||
        (i.district ?? "").toLowerCase().includes(q)
    );
  }, [items, query]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ problem, district });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("healthcare_problems").insert({
      problem: parsed.data.problem,
      district: parsed.data.district || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    setProblem("");
    setDistrict("");
    setSubmitted(true);
    load();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      <header className="px-4 py-3 border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <img src={LOGO_URL} alt="D2D Online" className="h-10 sm:h-12" />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <section className="text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5" /> D2DOnline Health Care
          </span>
          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            We will solve every problem in health care of Assam
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Tell us a problem you faced in healthcare anonymously.
          </p>
        </section>

        <Card className="mt-8 p-5 sm:p-6 rounded-2xl border-emerald-100 shadow-lg bg-white">
          {submitted ? (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="mt-4 text-lg font-bold text-slate-900">
                Thank you for contributing to D2DOnline. You are a good human being.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="mt-5 rounded-xl bg-emerald-600 hover:bg-emerald-700"
              >
                Submit another problem
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your problem <span className="text-rose-500">*</span>
                </label>
                <Textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  maxLength={2000}
                  rows={5}
                  placeholder="Describe the healthcare problem you faced..."
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  District (optional)
                </label>
                <Input
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  maxLength={100}
                  placeholder="e.g. Kamrup"
                  className="h-12 rounded-xl"
                />
              </div>
              <p className="text-xs text-slate-500">
                Your submission is completely anonymous — we never ask for your name or number.
              </p>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-xl text-base font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                <Send className="w-4 h-4 mr-2" />
                {submitting ? "Submitting..." : "Submit Anonymously"}
              </Button>
            </form>
          )}
        </Card>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Submitted Problems</h2>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problems..."
              className="h-12 pl-9 rounded-xl bg-white"
            />
          </div>

          <div className="mt-4 space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500">Loading...</p>
            ) : filtered.length === 0 ? (
              <p className="text-sm text-slate-500">
                {items.length === 0
                  ? "No problems submitted yet. Be the first to share."
                  : "No problems match your search."}
              </p>
            ) : (
              filtered.map((item) => (
                <Card key={item.id} className="p-4 rounded-xl border-slate-200 bg-white">
                  <p className="text-sm text-slate-800 whitespace-pre-wrap">{item.problem}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                    {item.district && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                        {item.district}
                      </span>
                    )}
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D2D Online · Dream to Destination
      </footer>
    </div>
  );
};

export default HealthCare;
