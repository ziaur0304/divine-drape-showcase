import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Download, FileText } from "lucide-react";

import urEws from "@/assets/UR_EWS.pdf.asset.json";
import obcNcl from "@/assets/OBC_NCL.pdf.asset.json";
import sc from "@/assets/SC_1.pdf.asset.json";
import st from "@/assets/ST_P_or_ST_H.pdf.asset.json";

const CATEGORIES = [
  { value: "ur-ews", label: "UR / EWS", url: urEws.url, file: "Annexures-UR-EWS.pdf" },
  { value: "obc", label: "OBC (NCL)", url: obcNcl.url, file: "Annexures-OBC-NCL.pdf" },
  { value: "sc", label: "SC", url: sc.url, file: "Annexures-SC.pdf" },
  { value: "st", label: "ST(P) / ST(H)", url: st.url, file: "Annexures-ST.pdf" },
];

export default function Annexures() {
  const [category, setCategory] = useState<string>("");
  const selected = CATEGORIES.find((c) => c.value === category);

  const handleDownload = () => {
    if (!selected) return;
    const a = document.createElement("a");
    a.href = selected.url;
    a.download = selected.file;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <h1 className="text-base font-bold text-slate-900">Annexures</h1>
          <div className="w-14" />
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100 text-blue-700">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Category-wise Annexures</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Dear D2D Community, we have separated the annexures needed by you according to
            your category.
          </p>
        </div>

        <Card className="p-5 rounded-2xl border-slate-100 shadow-sm space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700">Choose your category</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-xl h-12">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleDownload}
            disabled={!selected}
            className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white rounded-xl h-14 text-base font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            <Download className="h-5 w-5 mr-2" />
            {selected ? `Download Annexures — ${selected.label}` : "Download Annexures"}
          </Button>

          {!selected && (
            <p className="text-xs text-slate-400 text-center">
              Select your category to enable the download.
            </p>
          )}
        </Card>
      </div>
    </main>
  );
}
