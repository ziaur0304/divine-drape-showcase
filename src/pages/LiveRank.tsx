import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Users, TrendingDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface Submission {
  id: string;
  full_name: string;
  marks: number;
  category: string | null;
  created_at: string;
}

interface Ranked extends Submission {
  rank: number;
}

// Standard competition ranking: equal marks share the same rank,
// then next rank skips. Tie-break for order shown: name alphabetical.
function rankSubmissions(rows: Submission[]): Ranked[] {
  const sorted = [...rows].sort((a, b) => {
    if (b.marks !== a.marks) return b.marks - a.marks;
    return a.full_name.localeCompare(b.full_name, undefined, { sensitivity: "base" });
  });
  const ranked: Ranked[] = [];
  let lastMarks: number | null = null;
  let lastRank = 0;
  sorted.forEach((row, idx) => {
    const rank = lastMarks !== null && row.marks === lastMarks ? lastRank : idx + 1;
    ranked.push({ ...row, rank });
    lastMarks = row.marks;
    lastRank = rank;
  });
  return ranked;
}

export default function LiveRank() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("neet_submissions")
      .select("id, full_name, marks, category, created_at")
      .order("marks", { ascending: false })
      .limit(1000);
    if (!error && data) {
      setRows(data as Submission[]);
      setLastUpdated(new Date());
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel("neet_submissions_live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "neet_submissions" },
        () => load(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const ranked = rankSubmissions(rows);
  const total = rows.length;
  const highest = total ? Math.max(...rows.map((r) => r.marks)) : 0;
  const lowest = total ? Math.min(...rows.map((r) => r.marks)) : 0;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            to="/"
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-blue-600">RDD Online</h1>
            <p className="text-xs text-slate-500">Rank • Dream • Destination</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={load}
            className="rounded-lg"
            aria-label="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </header>

      <section className="px-4 pt-6 pb-10 max-w-5xl mx-auto space-y-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            Live Assam Unofficial State Rank
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Live rankings based on the responses submitted by NEET aspirants. This is an
            unofficial merit list created to help students estimate their expected state
            rank.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card className="p-4 rounded-2xl border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <Users className="h-4 w-4" /> Responses
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-1">{total}</p>
          </Card>
          <Card className="p-4 rounded-2xl border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <Trophy className="h-4 w-4" /> Highest
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-1">{highest}</p>
          </Card>
          <Card className="p-4 rounded-2xl border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <TrendingDown className="h-4 w-4" /> Lowest
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-1">{lowest}</p>
          </Card>
          <Card className="p-4 rounded-2xl border-slate-100 shadow-sm">
            <div className="text-slate-500 text-xs font-medium">Last Updated</div>
            <p className="text-sm font-semibold text-slate-700 mt-1">
              {lastUpdated.toLocaleTimeString()}
            </p>
            <p className="text-xs text-slate-400">
              {lastUpdated.toLocaleDateString()}
            </p>
          </Card>
        </div>

        {/* Table */}
        <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-blue-50/60">
              <TableRow>
                <TableHead className="w-16 text-slate-700 font-semibold">Rank</TableHead>
                <TableHead className="text-slate-700 font-semibold">Name</TableHead>
                <TableHead className="text-slate-700 font-semibold">Category</TableHead>
                <TableHead className="text-right text-slate-700 font-semibold">
                  Marks
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && ranked.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                    Loading…
                  </TableCell>
                </TableRow>
              ) : ranked.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                    No submissions yet. Be the first to submit!
                  </TableCell>
                </TableRow>
              ) : (
                ranked.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-bold text-blue-600">#{r.rank}</TableCell>
                    <TableCell className="text-slate-800">{r.full_name}</TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      {r.category ?? "—"}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-slate-900">
                      {r.marks}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        <p className="text-xs text-slate-400 text-center">
          Ranks use standard competition ranking. Equal marks share the same rank; order
          shown alphabetically by name.
        </p>
      </section>
    </main>
  );
}
