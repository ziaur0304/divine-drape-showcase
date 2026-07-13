import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
      <div className="flex-1">
        <iframe
          src="https://neetandclear.in/neet-omr-checker"
          title="NEET OMR Checker"
          loading="lazy"
          allowFullScreen
          className="w-full h-[calc(100vh-57px)] border-0"
        />
      </div>
    </main>
  );
}
