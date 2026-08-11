import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, AlertTriangle, Search, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const LOGO_URL = "/d2donline-logo.png";

const schema = z.object({
  complaint: z
    .string()
    .trim()
    .min(5, { message: "Please describe the complaint in at least 5 characters" })
    .max(2000, { message: "Please keep it under 2000 characters" }),
  institute: z
    .string()
    .trim()
    .max(120, { message: "Institute name must be less than 120 characters" }),
  district: z
    .string()
    .trim()
    .max(100, { message: "District must be less than 100 characters" }),
});

type Complaint = {
  id: string;
  complaint: string;
  institute: string | null;
  district: string | null;
  created_at: string;
};

const CoachingComplaint = () => {
  const [complaint, setComplaint] = useState("");
  const [institute, setInstitute] = useState("");
  const [district, setDistrict] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase
      .from("coaching_complaints")
      .select("id, complaint, institute, district, created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    setItems((data as Complaint[]) ?? []);
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
        i.complaint.toLowerCase().includes(q) ||
        (i.institute ?? "").toLowerCase().includes(q) ||
        (i.district ?? "").toLowerCase().includes(q)
    );
  }, [items, query]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ complaint, institute, district });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("coaching_complaints").insert({
      complaint: parsed.data.complaint,
      institute: parsed.data.institute || null,
      district: parsed.data.district || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit. Please try again.");
      return;
    }
    setComplaint("");
    setInstitute("");
    setDistrict("");
    setSubmitted(true);
    load();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-orange-50">
      <header className="px-4 py-3 border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <img src={LOGO_URL} alt="D2D Online" className="h-10 sm:h-12" />
          <Link
            to="/education"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <section className="text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" /> Coaching Complaint Cell
          </span>
          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Report a complaint against a coaching institute of Assam
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Share your experience anonymously. We will take action after proper investigation.
          </p>
        </section>

        <Card className="mt-8 p-5 sm:p-6 rounded-2xl border-rose-100 shadow-lg bg-white">
          {submitted ? (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-rose-600" />
              </div>
              <p className="mt-4 text-lg font-bold text-slate-900">
                Thank you for reporting. Your complaint has been recorded anonymously.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="mt-5 rounded-xl bg-rose-600 hover:bg-rose-700"
              >
                Submit another complaint
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Your complaint <span className="text-rose-500">*</span>
                </label>
                <Textarea
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  maxLength={2000}
                  rows={5}
                  placeholder="Describe the problem you faced with the coaching institute..."
                  className="rounded-xl"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Coaching institute (optional)
                  </label>
                  <Input
                    value={institute}
                    onChange={(e) => setInstitute(e.target.value)}
                    maxLength={120}
                    placeholder="Institute name"
                    className="h-12 rounded-xl"
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
              </div>
              <p className="text-xs text-slate-500">
                Your complaint is completely anonymous — we never ask for your name or number.
              </p>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-xl text-base font-bold bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700"
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
              placeholder="Search complaints..."
              className="h-12 pl-9 rounded-xl bg-white"
            />
          </div>

          <div className="mt-4 space-y-3">
            {loading ? (
              <p className="text-sm text-slate-500">Loading...</p>
            ) : filtered.length === 0 ? (
              <p className="text-sm text-slate-500">
                {items.length === 0
                  ? "No complaints submitted yet."
                  : "No complaints match your search."}
              </p>
            ) : (
              filtered.map((item) => (
                <Card key={item.id} className="p-4 rounded-xl border-slate-200 bg-white">
                  <p className="text-sm text-slate-800 whitespace-pre-wrap">{item.complaint}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    {item.institute && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-medium">
                        {item.institute}
                      </span>
                    )}
                    {item.district && (
                      <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 font-medium">
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

export default CoachingComplaint;
