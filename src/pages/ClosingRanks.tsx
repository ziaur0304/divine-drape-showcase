import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, GraduationCap, Loader2, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Row {
  year: string;
  round: string;
  college: string;
  course: string;
  category: string;
  subcategory: string;
  stateRank: string;
  airRank: string;
}

const MAIN_CATEGORIES = [
  "UR",
  "EWS",
  "SC",
  "ST(P)",
  "ST(H)",
  "OBC/MOBC(NCL)",
  "Ex-Serviceman",
  "Freedom Fighter",
  "Sports",
];

// Minimal RFC 4180-ish CSV parser (handles quoted fields with commas)
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (c === "\r") {
        // skip
      } else {
        field += c;
      }
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((v) => v.trim() !== ""));
}

export default function ClosingRanks() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCollege, setSelectedCollege] = useState<string>("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/data/closing_ranks_2025_round3.csv");
        if (!res.ok) throw new Error("Failed to load data");
        const text = await res.text();
        const parsed = parseCSV(text);
        const [, ...body] = parsed;
        const mapped: Row[] = body.map((r) => ({
          year: r[0] ?? "",
          round: r[1] ?? "",
          college: r[2] ?? "",
          course: r[3] ?? "",
          category: r[4] ?? "",
          subcategory: r[5] ?? "",
          stateRank: r[6] ?? "",
          airRank: r[7] ?? "",
        }));
        if (!cancelled) setRows(mapped);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const colleges = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.college && set.add(r.college));
    return Array.from(set).sort();
  }, [rows]);

  const filteredColleges = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return colleges;
    return colleges.filter((c) => c.toLowerCase().includes(q));
  }, [colleges, query]);

  const collegeRows = useMemo(
    () => rows.filter((r) => r.college === selectedCollege),
    [rows, selectedCollege]
  );

  const course = collegeRows[0]?.course ?? "";

  const mainRows = useMemo(
    () =>
      MAIN_CATEGORIES.map((cat) => {
        const match = collegeRows.find(
          (r) => r.category === cat && !r.subcategory
        );
        return { category: cat, row: match };
      }).filter((x) => x.row),
    [collegeRows]
  );

  const subRows = useMemo(
    () =>
      collegeRows.filter(
        (r) => r.category === "OBC/MOBC(NCL)" && r.subcategory
      ),
    [collegeRows]
  );

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
            <h1 className="text-lg font-bold text-blue-600">RDD Online</h1>
            <p className="text-xs text-slate-500">Rank • Dream • Destination</p>
          </div>
        </div>
      </header>

      <section className="px-4 pt-6 pb-10 max-w-3xl mx-auto space-y-5">
        <div>
          <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-800 border-blue-200 mb-2">
            Last Year Closing Ranks • 2025 Round 3
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            College-wise Closing Ranks
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Select a college to view last year's closing state ranks and All India
            Ranks across all categories.
          </p>
          <p className="text-xs text-amber-600 mt-2 leading-relaxed">
            We can't assure that it is 100% accurate. Please use this as reference
            only.
          </p>
        </div>

        {/* Premium counselling CTA */}
        <Card className="relative overflow-hidden rounded-2xl border-blue-200 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white shadow-lg shadow-blue-900/10">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 rounded-full bg-blue-400/20 blur-2xl" />
          <div className="relative p-5 md:p-6">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                  Need End-to-End Premium Counselling Guidance?
                </h3>
                <p className="text-sm text-blue-100 mt-2 leading-relaxed">
                  Get personalized counselling, choice filling assistance, document guidance, DME portal support, and priority WhatsApp support.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <Button
                asChild
                className="w-full md:w-auto bg-white hover:bg-blue-50 text-blue-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 h-12 px-6"
              >
                <a
                  href="https://wa.me/919365248667?text=Hi%20RDD%20Online,%20I%20want%20to%20enroll%20in%20the%20Premium%20Counselling%20Guidance"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2 fill-current" />
                  Click Here
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Searchable college selector */}
        <Card className="p-4 rounded-2xl border-slate-100 shadow-sm relative">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Select College
          </label>
          <div className="mt-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={open || !selectedCollege ? query : selectedCollege}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => {
                setOpen(true);
                setQuery("");
              }}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="Search for a college..."
              className="w-full pl-10 pr-4 h-12 rounded-xl border border-slate-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
            />
            {open && (
              <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-72 overflow-auto">
                {loading ? (
                  <div className="p-4 text-sm text-slate-500 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading colleges…
                  </div>
                ) : filteredColleges.length === 0 ? (
                  <div className="p-4 text-sm text-slate-500">No colleges found</div>
                ) : (
                  filteredColleges.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSelectedCollege(c);
                        setQuery("");
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 text-slate-700 border-b border-slate-50 last:border-0"
                    >
                      {c}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </Card>

        {/* States */}
        {error && (
          <Card className="p-6 rounded-2xl border-red-100 bg-red-50 text-red-700 text-sm">
            {error}
          </Card>
        )}

        {loading && !error && (
          <Card className="p-8 rounded-2xl border-slate-100 shadow-sm flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading data…
          </Card>
        )}

        {!loading && !error && !selectedCollege && (
          <Card className="p-8 rounded-2xl border-dashed border-slate-200 text-center text-sm text-slate-500">
            Select a college above to view its closing ranks.
          </Card>
        )}

        {!loading && !error && selectedCollege && collegeRows.length === 0 && (
          <Card className="p-8 rounded-2xl border-slate-100 text-center text-sm text-slate-500">
            No data found for this college.
          </Card>
        )}

        {selectedCollege && collegeRows.length > 0 && (
          <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden animate-fade-in">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-white border-b border-slate-100">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center shadow-md">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {selectedCollege}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">Course: {course}</p>
                </div>
              </div>
            </div>

            {mainRows.length > 0 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-blue-50/60">
                    <TableRow>
                      <TableHead className="text-slate-700 font-semibold">
                        Category
                      </TableHead>
                      <TableHead className="text-right text-slate-700 font-semibold">
                        State Rank
                      </TableHead>
                      <TableHead className="text-right text-slate-700 font-semibold">
                        All India Rank
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mainRows.map(({ category, row }) => (
                      <TableRow key={category}>
                        <TableCell className="font-medium text-slate-800">
                          {category}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-blue-700 font-semibold">
                          {row?.stateRank || "—"}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-slate-700">
                          {row?.airRank || "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {subRows.length > 0 && (
              <>
                <div className="px-5 pt-5 pb-2 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800">
                    OBC/MOBC(NCL) Subcategories
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-amber-50/60">
                      <TableRow>
                        <TableHead className="text-slate-700 font-semibold">
                          Subcategory
                        </TableHead>
                        <TableHead className="text-right text-slate-700 font-semibold">
                          State Rank
                        </TableHead>
                        <TableHead className="text-right text-slate-700 font-semibold">
                          All India Rank
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subRows.map((r, i) => (
                        <TableRow key={`${r.subcategory}-${i}`}>
                          <TableCell className="font-medium text-slate-800">
                            {r.subcategory}
                          </TableCell>
                          <TableCell className="text-right tabular-nums text-amber-700 font-semibold">
                            {r.stateRank || "—"}
                          </TableCell>
                          <TableCell className="text-right tabular-nums text-slate-700">
                            {r.airRank || "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </Card>
        )}

        <p className="text-xs text-slate-400 text-center">
          Data source: Assam NEET UG 2025 Round 3 closing ranks. For guidance only.
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
