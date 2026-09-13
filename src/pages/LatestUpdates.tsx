import { Link } from "react-router-dom";
import { ArrowLeft, ListOrdered, School, RefreshCcw, Users, Award, ChevronRight, Download, CalendarDays } from "lucide-react";
import annexuresPdf from "@/assets/Annexures.pdf.asset.json";

const ITEMS = [
  { title: "Provisional Merit List", href: "https://dme.assam.gov.in/sites/default/files/swf_utility_folder/departments/dme_lipl_in_oid_8/latest/provisional_assamstate_merit_list_neet-ug-2026.pdf", icon: ListOrdered, gradient: "from-indigo-600 to-blue-600" },
  { title: "Proof of Schooling", to: "/proof-of-schooling", icon: School, gradient: "from-emerald-500 to-teal-600" },
  { title: "Category Change", to: "/category-change", icon: RefreshCcw, gradient: "from-amber-500 to-orange-600" },
  { title: "Three Generation Link Certificate", to: "/three-generation-certificate", icon: Users, gradient: "from-violet-600 to-purple-700" },
  { title: "Special Quota", to: "/special-quota", icon: Award, gradient: "from-rose-600 to-red-700" },
  { title: "Download Annexures", href: annexuresPdf.url, icon: Download, gradient: "from-slate-700 to-slate-900" },
];

const LatestUpdates = () => (
  <main className="min-h-screen bg-white text-slate-900">
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/govt-medical" className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Back">
          <ArrowLeft className="h-5 w-5 text-slate-700" />
        </Link>
        <img src="/d2donline-logo.png" alt="D2D Online — Dream to Destination" className="h-9 sm:h-10" />
      </div>
    </header>

    <section className="px-4 pt-6 pb-14 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-extrabold leading-snug">Latest Updates from DME Assam</h1>
      <p className="text-sm text-slate-500 mt-1.5">Tap any update below to view details and download forms.</p>

      {/* Important outside-Assam document verification update */}
      <Link
        to="/outside-assam-document-verification"
        className="mt-5 block w-full overflow-hidden rounded-xl border-2 border-blue-700 bg-white text-left shadow-xl transition-all hover:border-blue-900 hover:shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 bg-blue-950 px-5 py-3 text-white">
          <span className="inline-flex items-center rounded bg-rose-600 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide">
            Important
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-100">
            <CalendarDays className="h-4 w-4" />
            12 August 2026
          </span>
        </div>
        <div className="p-5">
          <h2 className="text-lg font-extrabold leading-snug text-slate-950">
            Document Verification for Candidates Who Studied Outside Assam
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Offline verification for eligible candidates in the Provisional Assam State Merit List who studied outside Assam between Class I and Class XII.
          </p>
          <div className="mt-3 border-l-4 border-blue-700 bg-blue-50 px-3 py-2 text-sm font-bold text-slate-900">
            20 August 2026 • 10:00 AM onwards • DME Assam, Sixmile
          </div>
          <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-md">
            View Details
            <ChevronRight className="h-4 w-4" />
          </span>
          <p className="mt-3 text-xs font-medium text-slate-500">
            Official Source: DME Assam — www.dme.assam.gov.in
          </p>
        </div>
      </Link>

      {/* New important counselling schedule card */}
      <Link
        to="/counselling-schedule-2026"
        className="mt-5 block w-full text-left rounded-2xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 shadow-lg hover:shadow-xl hover:border-blue-700 transition-all"
      >
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            Important
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            New
          </span>
        </div>
        <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
          1st Round Online Counselling for MBBS/BDS Admission 2026
        </h2>
        <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
          Registration 13–15 Aug • Choice Filling 16–18 Aug • Result 22 Aug 2026. View the full schedule, eligibility & important notes.
        </p>
        <span className="mt-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md">
          View Counselling Schedule
          <ChevronRight className="h-4 w-4" />
        </span>
      </Link>

      <div className="mt-5 space-y-3">
        {ITEMS.map(({ title, to, href, icon: Icon, gradient }) => {
          const className = `w-full flex items-center gap-3 text-left px-4 py-4 rounded-xl bg-gradient-to-r ${gradient} text-white font-bold shadow-md hover:shadow-xl hover:brightness-110 transition-all`;
          const key = to ?? href;
          const content = (
            <>
              <Icon className="h-5 w-5 shrink-0" />
              <span className="flex-1 text-sm sm:text-base leading-snug">{title}</span>
              <ChevronRight className="h-5 w-5 shrink-0 opacity-80" />
            </>
          );
          return href ? (
            <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={className}>
              {content}
            </a>
          ) : (
            <Link key={key} to={to ?? "/latest-updates"} className={className}>
              {content}
            </Link>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 text-center mt-8">
        D2D Online is an independent initiative and is not affiliated with NTA, MCC or DME Assam.
      </p>
    </section>
  </main>
);

export default LatestUpdates;
