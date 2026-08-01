import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";

const LOGO_URL = "/d2donline-logo.png";
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/IgPMiK3XhstEblwii7iXIA?s=cl&p=a&mlu=4";
const WHATSAPP_NUMBER = "919387738853";
const WHATSAPP_PREFILL = `Hello! I need guidance for the counselling process for BSc Nursing / D.Pharm / B.Pharm / Allied Healthcare admissions.`;

const NursingParamedical = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 flex flex-col">
      <header className="px-4 py-4 border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-emerald-600 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <img src={LOGO_URL} alt="D2D Online — Dream to Destination" className="h-10 sm:h-12" />
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <section className="text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Nursing, Pharmacy &<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Paramedical Admissions
              </span>
            </h1>
            <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
              Get complete guidance for counselling and admission to nursing, pharmacy, and allied healthcare courses in Assam.
            </p>
          </section>

          <Card className="relative overflow-hidden border-0 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] ring-1 ring-emerald-100/60 p-6 sm:p-8">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
            <div className="flex items-start gap-3 mb-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Need Counselling Guidance?
                </h2>
                <p className="text-sm text-slate-500 mt-1">Join our dedicated WhatsApp community</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
              <p>
                If you want to take admission in <strong>BSc Nursing</strong> through{" "}
                <strong>NEET, AIIMS Nursing Entrance, or Assam CEE</strong>, or in{" "}
                <strong>D.Pharm, B.Pharm, or Allied Healthcare</strong> through{" "}
                <strong>Assam CEE</strong>, and need guidance for the counselling process —
                then join this group.
              </p>
              <p>
                Get timely updates, document checklists, choice-filling tips, and expert support throughout the admission process.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => window.open(WHATSAPP_GROUP_URL, "_blank")}
                className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Join WhatsApp Group
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`,
                    "_blank"
                  )
                }
                className="w-full h-14 text-base font-semibold rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 text-emerald-700 transition-all"
              >
                <Phone className="h-5 w-5 mr-2" />
                Text on WhatsApp (+91 93877 38853)
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D2D Online · Dream to Destination
      </footer>
    </div>
  );
};

export default NursingParamedical;
