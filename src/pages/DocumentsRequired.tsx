import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Download,
  Phone,
  ShieldCheck,
  Info,
} from "lucide-react";

const PREMIUM_URL =
  "https://wa.me/919365248667?text=Hi%20RDD%20Online,%20I%20want%20to%20enroll%20in%20the%20Premium%20Counselling%20Guidance";

const ANNEXURE_URL =
  "https://dme.assam.gov.in/sites/default/files/swf_utility_folder/departments/dme_lipl_in_oid_8/menu/document/mbbs_bds_annexures_bond.pdf";

const DOCUMENTS = [
  "PRC (Permanent Resident Certificate)",
  "NEET UG 2026 Admit Card",
  "NEET Score Card",
  "Class 10 Admit Card",
  "Class 10 Mark Sheet and Pass Certificate",
  "Class 12 Mark Sheet and Pass Certificate",
  "Recent Passport-size Photographs",
  "Aadhaar Card/Voter ID",
  "Declaration by the Parent/Guardian",
  "Annexures",
  "Certificate for Reservation (EWS Certificate / Caste Certificate)",
  "Signature",
];

export default function DocumentsRequired() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <h1 className="text-base font-bold text-slate-900">Documents</h1>
          <div className="w-14" />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Premium Guidance Card */}
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 p-5 rounded-2xl shadow-lg animate-fade-in">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400" />
          <div className="flex items-start gap-3 mb-3">
            <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-900 leading-tight">
                Need End-to-End Premium Counselling Guidance?
              </h2>
            </div>
          </div>
          <p className="text-sm text-emerald-950/80 leading-relaxed mb-4">
            Get personalized counselling, choice filling assistance, document guidance,
            DME portal support, and priority WhatsApp support.
          </p>
          <Button
            onClick={() => window.open(PREMIUM_URL, "_blank")}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-xl h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <Phone className="h-5 w-5 mr-2" />
            Click Here
          </Button>
        </Card>

        {/* Download Annexure Button */}
        <Button
          onClick={() => window.open(ANNEXURE_URL, "_blank")}
          className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all animate-fade-in-delay-1"
        >
          <Download className="h-5 w-5 mr-2" />
          📄 Download Annexures
        </Button>

        {/* Page Title */}
        <div className="text-center space-y-2 animate-fade-in-delay-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mb-2">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Documents Required for Counselling
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
            The following documents are generally required during the counselling process.
            Keep both the original documents and multiple self-attested photocopies ready
            before document verification.
          </p>
        </div>

        {/* Required Documents */}
        <section className="space-y-3 animate-fade-in-delay-3">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Required Documents
          </h3>
          <div className="grid gap-3">
            {DOCUMENTS.map((doc, index) => (
              <Card
                key={doc}
                className="flex items-start gap-4 p-4 rounded-xl border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-sm font-medium text-slate-800 leading-snug pt-1.5">
                  {doc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Note */}
        <Card className="bg-blue-50 border-blue-100 p-5 rounded-2xl animate-fade-in-delay-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-900 mb-1">Important Note</h3>
              <p className="text-sm text-blue-900/80 leading-relaxed">
                Character Certificate and Gap Certificate are not required during the
                counselling process. However, you may be required to submit them at the
                time of admission/reporting to the allotted college, depending on the
                requirements of the respective college.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom spacer for mobile */}
      <div className="h-8" />
    </main>
  );
}
