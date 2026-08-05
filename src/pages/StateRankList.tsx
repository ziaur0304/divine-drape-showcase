import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ListOrdered, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Row {
  rank: number;
  name: string;
  marks: number;
}

function parseCSV(text: string): Row[] {
  return text
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const parts = line.split(",");
      if (parts.length < 3) return null;
      const rank = Number(parts[0]);
      const name = parts[1].trim();
      const marks = Number(parts[2]);
      if (!rank || !name) return null;
      return { rank, name: name.replace(/\.$/, ""), marks };
    })
    .filter(Boolean) as Row[];
}

export default function StateRankList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/data/state_rank_list.csv")
      .then((r) => r.text())
      .then((t) => setRows(parseCSV(t)))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  const LIMIT = 300;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        String(r.rank) === q ||
        String(r.marks) === q,
    );
  }, [rows, query]);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/govt-medical"
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

      <section className="px-4 pt-6 pb-12 max-w-4xl mx-auto space-y-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight flex items-center gap-2">
            <ListOrdered className="h-6 w-6 text-indigo-600" />
            State Rank List
          </h1>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Assam state rank list of top scorers. This list is compiled for reference
            purposes only — D2D Online is an independent initiative and is not affiliated
            with NTA, MCC or DME Assam.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, rank or marks"
            className="pl-9 h-12 rounded-xl"
          />
        </div>

        <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-indigo-50/60">
              <TableRow>
                <TableHead className="w-16 font-semibold text-slate-700">Rank</TableHead>
                <TableHead className="font-semibold text-slate-700">Student Name</TableHead>
                <TableHead className="text-right font-semibold text-slate-700">
                  Marks
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-slate-500 py-8">
                    Loading…
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-slate-500 py-8">
                    No matching records.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.slice(0, LIMIT).map((r) => (
                  <TableRow key={`${r.rank}-${r.name}`}>
                    <TableCell className="font-bold text-indigo-600">#{r.rank}</TableCell>
                    <TableCell className="text-slate-800">{r.name}</TableCell>
                    <TableCell className="text-right font-semibold">{r.marks}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
        {!loading && filtered.length > LIMIT && (
          <p className="text-xs text-slate-500 text-center">
            Showing first {LIMIT} of {filtered.length.toLocaleString()} records — use search to find your rank or name.
          </p>
        )}
      </section>
    </main>
  );
}
