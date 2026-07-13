import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";

const PREMIUM_URL = "https://wa.me/919365248667?text=Hi%20RDD%20Online,%20I%20want%20to%20enroll%20in%20the%20Premium%20Counselling%20Guidance";

export default function OmrScanner() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <h1 className="text-base font-bold text-slate-900">OMR Scanner</h1>
          <div className="w-14" />
        </div>
      </header>

      <section className="max-w-3xl mx-auto w-full px-4 pt-4 pb-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-5 shadow-lg shadow-blue-200">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-white/10" />
          <div className="relative flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-white">
                Need End-to-End Premium Counselling Guidance?
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-blue-50">
                Get personalized counselling, choice filling assistance, document guidance, DME portal support, and priority WhatsApp support.
              </p>
              <a href={PREMIUM_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block">
                <Button className="gap-2 rounded-full bg-white px-5 text-sm font-bold text-blue-600 shadow-md transition-transform hover:scale-105 hover:bg-blue-50 active:scale-95">
                  <MessageCircle className="h-4 w-4" />
                  Click Here
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1 min-h-0">
        <iframe
          src="https://neetandclear.in/neet-omr-checker"
          title="NEET OMR Checker"
          loading="lazy"
          allowFullScreen
          className="w-full h-full min-h-[calc(100vh-220px)] border-0"
        />
      </div>
    </main>
  );
}
