import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RoundKey = "Round 1" | "Round 2" | "Round 3";

const DATA: Record<RoundKey, { category: string; air: number }[]> = {
  "Round 1": [
    { category: "UR", air: 62420 },
    { category: "EWS", air: 72667 },
    { category: "Koch Rajbongshi", air: 203821 },
    { category: "OBC/MOBC (NCL)", air: 197182 },
    { category: "Tai-Ahom", air: 201470 },
    { category: "Motak", air: 269210 },
    { category: "Chutia", air: 269264 },
    { category: "TGL/Ex-TGL (Resident of Barak Valley)", air: 342184 },
    { category: "TGL/Ex-TGL (Resident of Brahmaputra Valley)", air: 434459 },
    { category: "Moran", air: 466651 },
    { category: "SC", air: 199432 },
    { category: "ST (P)", air: 262488 },
    { category: "ST (H)", air: 404217 },
  ],
  "Round 2": [
    { category: "UR", air: 74651 },
    { category: "EWS", air: 78818 },
    { category: "Koch Rajbongshi", air: 216675 },
    { category: "OBC/MOBC (NCL)", air: 208143 },
    { category: "Tai-Ahom", air: 212963 },
    { category: "Motak", air: 269210 },
    { category: "Chutia", air: 269264 },
    { category: "TGL/Ex-TGL (Resident of Barak Valley)", air: 370208 },
    { category: "TGL/Ex-TGL (Resident of Brahmaputra Valley)", air: 437433 },
    { category: "Moran", air: 473450 },
    { category: "SC", air: 212077 },
    { category: "ST (P)", air: 276484 },
    { category: "ST (H)", air: 417516 },
  ],
  "Round 3": [
    { category: "UR", air: 80351 },
    { category: "EWS", air: 82435 },
    { category: "Koch Rajbongshi", air: 217309 },
    { category: "OBC/MOBC (NCL)", air: 218442 },
    { category: "Tai-Ahom", air: 239482 },
    { category: "Motak", air: 269210 },
    { category: "Chutia", air: 269264 },
    { category: "TGL/Ex-TGL (Resident of Barak Valley)", air: 370208 },
    { category: "TGL/Ex-TGL (Resident of Brahmaputra Valley)", air: 437433 },
    { category: "Moran", air: 473450 },
    { category: "SC", air: 229252 },
    { category: "ST (P)", air: 287107 },
    { category: "ST (H)", air: 432591 },
  ],
};

export default function RoundwiseAIR() {
  const [round, setRound] = useState<RoundKey | "">("");
  const [shown, setShown] = useState<RoundKey | null>(null);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </Link>
          <div>
            <img src="/d2donline-logo.png" alt="D2D Online — Dream to Destination" className="h-9 sm:h-10" />
          </div>
        </div>
      </header>

      <section className="px-4 pt-6 pb-10 max-w-3xl mx-auto space-y-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            Roundwise Closing AIR of 2025 for Every Category and Subcategory for Admission into MBBS
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Select a counselling round to view the closing All India Rank (AIR)
            for each category and subcategory.
          </p>
        </div>

        <Card className="p-5 rounded-2xl border-slate-100 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Select Counselling Round
            </label>
            <Select value={round} onValueChange={(v) => setRound(v as RoundKey)}>
              <SelectTrigger className="mt-2 h-12 rounded-xl border-slate-200">
                <SelectValue placeholder="Choose a round..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Round 1">Round 1</SelectItem>
                <SelectItem value="Round 2">Round 2</SelectItem>
                <SelectItem value="Round 3">Round 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            disabled={!round}
            onClick={() => round && setShown(round)}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white rounded-xl h-12 font-semibold shadow-md"
          >
            <Layers className="h-5 w-5 mr-2" />
            Show Closing AIR
          </Button>
        </Card>

        {shown && (
          <Card
            key={shown}
            className="rounded-2xl border-slate-100 shadow-sm overflow-hidden animate-fade-in"
          >
            <div className="p-5 bg-gradient-to-br from-blue-50 to-white border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Closing AIR — {shown} (2025)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                MBBS admissions, Assam State Quota
              </p>
            </div>
            <ul className="divide-y divide-slate-100">
              {DATA[shown].map((row) => (
                <li
                  key={row.category}
                  className="flex items-center justify-between gap-3 px-5 py-3.5"
                >
                  <span className="font-bold text-slate-800 text-sm md:text-base">
                    {row.category}
                  </span>
                  <span className="tabular-nums font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1 text-sm">
                    {row.air.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <p className="text-xs text-slate-400 text-center">
          Data source: Assam NEET UG 2025 counselling. For guidance only.
        </p>

        <div className="pt-2">
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
