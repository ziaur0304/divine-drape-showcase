import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Send, CheckCircle2, AlertTriangle, Lock, MessageSquareWarning, MapPin } from "lucide-react";

interface Complaint {
  id: string;
  complaint: string;
  district: string | null;
  created_at: string;
}

const LOGO_URL = "/d2donline-logo.png";

const DISTRICTS = [
  "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo",
  "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao",
  "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup",
  "Kamrup Metro", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur",
  "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "South Salmara",
  "Sonitpur", "Tinsukia", "Udalguri", "West Karbi Angli",
];

const Home = () => {
  const [complaint, setComplaint] = useState("");
  const [district, setDistrict] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const fetchComplaints = useCallback(async () => {
    setLoadingList(true);
    const { data } = await supabase
      .from("coaching_complaints")
      .select("id, complaint, district, created_at")
      .eq("institute", "Ajmal S40")
      .order("created_at", { ascending: false });
    setComplaints(data ?? []);
    setLoadingList(false);
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (complaint.trim().length < 10) {
      setError("Please describe your complaint in at least a few words.");
      return;
    }

    setSubmitting(true);
    const { error: dbError } = await supabase.from("coaching_complaints").insert({
      complaint: complaint.trim(),
      district: district || null,
      institute: "Ajmal S40",
    });

    setSubmitting(false);

    if (dbError) {
      setError("Something went wrong. Please try again in a moment.");
      return;
    }

    setSubmitted(true);
    setComplaint("");
    setDistrict("");
    fetchComplaints();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="px-4 py-4 border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <img src={LOGO_URL} alt="D2D Online — Dream to Destination" className="h-12 sm:h-14" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Notice banner */}
        <section className="mb-8">
          <div className="rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white p-5 sm:p-7 shadow-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-7 h-7 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
                  Grievance Against Ajmal S40
                </h2>
                <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
                  If you have any complaint against Ajmal S40, please do write below
                  anonymously. D2DOnline will file a PIL in Consumer Court and Supreme
                  Court against Ajmal S40.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Grievance box */}
        <section className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="px-5 sm:px-7 py-4 bg-slate-900 text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <h1 className="text-lg sm:text-xl font-bold">Anonymous Grievance Box</h1>
          </div>

          {submitted ? (
            <div className="p-8 sm:p-10 text-center">
              <CheckCircle2 className="w-14 h-14 mx-auto text-emerald-500" />
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Thank you for your submission
              </h3>
              <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                Your grievance has been recorded anonymously. D2DOnline will review all
                complaints before filing the PIL. Your identity remains protected.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
              >
                Submit another complaint
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
              <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm">
                <Lock className="w-4 h-4 shrink-0" />
                <span>
                  100% anonymous — no name, email, or phone number is collected.
                </span>
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Your District <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <select
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select district (optional)</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="complaint" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Your Complaint <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="complaint"
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  rows={6}
                  placeholder="Describe your complaint against Ajmal S40 in detail. Mention dates, amounts, and what happened. The more specific you are, the stronger the PIL case."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                />
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{complaint.trim().length} characters</span>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 text-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-5 py-3.5 text-base shadow-lg transition-all"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Anonymously
                  </>
                )}
              </button>

              <p className="text-xs text-center text-slate-500 leading-relaxed">
                By submitting, you confirm the information is true to the best of your
                knowledge. D2DOnline reserves the right to verify and shortlist complaints
                before legal action.
              </p>
            </form>
          )}
        </section>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D2D Online · Dream to Destination
      </footer>
    </div>
  );
};

export default Home;
