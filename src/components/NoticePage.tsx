import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface NoticePageProps {
  title: string;
  downloadLabel: string;
  fileUrl: string;
  fileName: string;
  children: ReactNode;
}

const NoticePage = ({ title, downloadLabel, fileUrl, fileName, children }: NoticePageProps) => (
  <main className="min-h-screen bg-white text-slate-900">
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link
          to="/"
          className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-700" />
        </Link>
        <img
          src="/d2donline-logo.png"
          alt="D2D Online — Dream to Destination"
          className="h-9 sm:h-10"
        />
      </div>
    </header>

    <section className="px-4 pt-6 pb-14 max-w-3xl mx-auto space-y-5">
      <h1 className="text-2xl md:text-3xl font-bold leading-tight">{title}</h1>

      <Button
        asChild
        className="w-full h-auto min-h-[3.5rem] py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all whitespace-normal"
      >
        <a href={fileUrl} download={fileName} target="_blank" rel="noopener noreferrer">
          <Download className="h-5 w-5 mr-2 shrink-0" />
          {downloadLabel}
        </a>
      </Button>

      <Card className="rounded-2xl border-slate-100 shadow-sm p-5 space-y-3 text-[15px] leading-relaxed text-slate-700">
        {children}
      </Card>

      <p className="text-xs text-slate-400 text-center">
        D2D Online is an independent initiative and is not affiliated with NTA, MCC or DME Assam.
      </p>
    </section>
  </main>
);

export default NoticePage;
