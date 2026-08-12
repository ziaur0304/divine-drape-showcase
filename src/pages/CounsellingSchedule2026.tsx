import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, CheckCircle2, AlertTriangle, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SCHEDULE = [
  { step: "Online Registration", dates: "13 Aug 2026 to 15 Aug 2026", time: "up to 11:55 PM" },
  { step: "Online Choice Filling", dates: "16 Aug 2026 to 18 Aug 2026", time: "up to 10:00 PM" },
  { step: "Online Choice Locking", dates: "18 August 2026", time: "5:00 PM to 11:55 PM" },
  { step: "Processing of Seat Allotment", dates: "19 Aug 2026 to 21 Aug 2026", time: "—" },
  { step: "Result", dates: "22 August 2026", time: "—" },
];

const CounsellingSchedule2026 = () => (
  <main className="min-h-screen bg-white text-slate-900">
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/latest-updates" className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Back">
          <ArrowLeft className="h-5 w-5 text-slate-700" />
        </Link>
        <img src="/d2donline-logo.png" alt="D2D Online — Dream to Destination" className="h-9 sm:h-10" />
      </div>
    </header>

    <section className="px-4 pt-6 pb-14 max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
          Important
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
          New
        </span>
      </div>

      <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
        1st Round Online Counselling for MBBS/BDS Admission 2026
      </h1>

      <Card className="rounded-2xl border-slate-100 shadow-sm p-5 space-y-3 text-[15px] leading-relaxed text-slate-700">
        <p>
          DME Assam has announced the schedule for <span className="font-semibold text-slate-900">1st Round Online Counselling</span> for admission to 1st Year <span className="font-semibold text-slate-900">MBBS/BDS</span> courses in Government Medical & Dental Colleges of Assam for Session 2026.
        </p>
      </Card>

      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <Calendar className="h-5 w-5 text-blue-600" />
          Counselling Schedule
        </h2>
        <div className="mt-3 space-y-3">
          {SCHEDULE.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-gradient-to-r from-blue-50 to-white p-4 shadow-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {idx + 1}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">{item.step}</p>
                <p className="text-sm text-slate-700">{item.dates}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-blue-700">
                  <Clock className="h-3.5 w-3.5" />
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          Eligibility
        </h2>
        <Card className="mt-3 rounded-2xl border-slate-100 shadow-sm p-5 text-[15px] leading-relaxed text-slate-700">
          Candidates who have qualified <span className="font-semibold text-slate-900">NEET (UG) 2026</span> and are eligible under the applicable Assam MBBS/BDS admission rules can participate.
        </Card>
      </div>

      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Important Note
        </h2>
        <Card className="mt-3 rounded-2xl border-amber-200 bg-amber-50 shadow-sm p-5 space-y-2 text-[15px] leading-relaxed text-amber-950">
          <p>
            Candidates belonging to <span className="font-semibold">General, PwD and reserved categories</span> including SC/ST/OBC-MOBC (NCL), Moran/Motok, Tai Ahom, Chutia, Koch Rajbongshi, TGL/Ex-TGL and other specified special categories must register and fill choices through the online counselling process.
          </p>
          <p className="font-semibold">No separate offline counselling will be held for these seats.</p>
          <p>
            Candidates should keep all required <span className="font-semibold">Annexures and documents</span> ready as per the MBBS/BDS Admission Rules.
          </p>
        </Card>
      </div>

      <Button asChild className="w-full h-auto min-h-[3.5rem] py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all">
        <a href="https://dme.assam.gov.in" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-5 w-5 mr-2 shrink-0" />
          View Counselling Schedule
        </a>
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
        <FileText className="h-4 w-4" />
        Official Source: <span className="font-semibold text-slate-700">DME Assam — www.dme.assam.gov.in</span>
      </div>

      <p className="text-xs text-slate-400 text-center">
        D2D Online is an independent initiative and is not affiliated with NTA, MCC or DME Assam.
      </p>
    </section>
  </main>
);

export default CounsellingSchedule2026;
