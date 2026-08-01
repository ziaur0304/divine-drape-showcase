import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Phone, Sprout, GraduationCap } from "lucide-react";

const LOGO_URL = "/d2donline-logo.png";
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/H4nLQWJHM3iCeUHjhRofbM?s=cl&p=a&mlu=4";
const WHATSAPP_NUMBER = "918876901826";
const WHATSAPP_PREFILL = `Hi D2DOnline! I need guidance for Agriculture/Veterinary admission and counselling. Please help me with the admission process.`;

const AgricultureVeterinary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-emerald-50 flex flex-col">
      <header className="px-4 py-4 border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-amber-600 text-sm font-medium transition-colors"
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
              Agriculture & Veterinary<br />
              <span className="bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">
                Admission Guidance
              </span>
            </h1>
            <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
              Get complete guidance for counselling and admission to agriculture, veterinary, and allied courses in Assam.
            </p>
          </section>

          <Card className="relative overflow-hidden border-0 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(245,158,11,0.2)] ring-1 ring-amber-100/60 p-6 sm:p-8">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500" />
            <div className="flex items-start gap-3 mb-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center shadow-md">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Need Admission Guidance?
                </h2>
                <p className="text-sm text-slate-500 mt-1">Join our dedicated WhatsApp community</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
              <p>
                If you want to take admission in <strong>B.V.Sc. & A.H. (Veterinary)</strong> through{" "}
                <strong>NEET-UG score or AAU-CET score</strong>,
              </p>
              <p>
                or want admission in <strong>Agriculture and other agriculture-related courses</strong>, including{" "}
                <strong>Integrated M.Sc. Biotechnology</strong>, through <strong>AAU-CET</strong>,
              </p>
              <p>
                and need guidance regarding the counselling, choice filling, admission process, important dates and updates — join our WhatsApp group or contact our team directly.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => window.open(WHATSAPP_GROUP_URL, "_blank")}
                className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all"
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
                className="w-full h-auto min-h-[3.5rem] py-3 px-4 text-base font-semibold rounded-xl border-2 border-amber-200 hover:bg-amber-50 text-amber-700 transition-all whitespace-normal"
              >
                <Phone className="h-5 w-5 mr-2 shrink-0" />
                <span className="text-center leading-snug">
                  Message on WhatsApp<br className="sm:hidden" />
                  <span className="sm:ml-1">+91 88769 01826</span>
                </span>
              </Button>
            </div>
          </Card>

          <section className="grid gap-4 sm:grid-cols-2">
            <Card className="rounded-2xl border border-amber-100 bg-white/70 p-5 text-center shadow-sm">
              <GraduationCap className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">B.V.Sc. & A.H.</h3>
              <p className="text-sm text-slate-600">Veterinary admissions through NEET-UG or AAU-CET</p>
            </Card>
            <Card className="rounded-2xl border border-emerald-100 bg-white/70 p-5 text-center shadow-sm">
              <Sprout className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">Agriculture & Allied</h3>
              <p className="text-sm text-slate-600">Agriculture, Integrated M.Sc. Biotechnology via AAU-CET</p>
            </Card>
          </section>
        </div>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D2D Online · Dream to Destination
      </footer>
    </div>
  );
};

export default AgricultureVeterinary;
