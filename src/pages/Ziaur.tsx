import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const CATEGORIES = ["UR", "EWS", "OBC", "SC", "ST(P)", "ST(H)"] as const;

const schema = z.object({
  full_name: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or fewer"),
  expected_score: z
    .number({ invalid_type_error: "Expected score must be a number" })
    .int("Expected score must be a whole number")
    .min(300, "Expected score must be at least 300")
    .max(720, "Expected score cannot exceed 720"),
  category: z.enum(CATEGORIES, {
    errorMap: () => ({ message: "Please select a category" }),
  }),
});

export default function Ziaur() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [score, setScore] = useState("");
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const parsed = schema.safeParse({
      full_name: fullName,
      expected_score: score === "" ? NaN : Number(score),
      category,
    });

    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? "Please check your inputs");
      return;
    }

    setSaving(true);
    const { error: insertError } = await supabase
      .from("neet_submissions")
      .insert({
        full_name: parsed.data.full_name,
        marks: parsed.data.expected_score,
        category: parsed.data.category,
      });
    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSaved(true);
    setFullName("");
    setScore("");
    setCategory("");
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            to="/"
            className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-blue-600">RDD Online</h1>
            <p className="text-xs text-slate-500">Admin · Merit List Entry</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg"
            onClick={() => navigate("/live-rank")}
          >
            View Live Rank
          </Button>
        </div>
      </header>

      <section className="px-4 pt-6 pb-10 max-w-xl mx-auto space-y-5">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-blue-100 p-2 shrink-0">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              Admin Mark Entry
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Private page. Entries submitted here are stored directly and appear in the
              Live State Rank instantly.
            </p>
          </div>
        </div>

        <Card className="p-6 rounded-2xl border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-slate-700">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="full_name"
                type="text"
                maxLength={100}
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="score" className="text-slate-700">
                Expected Score (300 – 720) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="score"
                type="number"
                min={300}
                max={720}
                inputMode="numeric"
                placeholder="e.g. 620"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-700">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="rounded-lg">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {saved && (
              <div className="flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
                <p className="leading-relaxed">
                  Entry added to the Live State Rank successfully.
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {saving ? "Saving…" : "Submit Entry"}
            </Button>
          </form>
        </Card>
      </section>
    </main>
  );
}
