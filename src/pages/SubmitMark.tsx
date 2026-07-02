import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle2, MessageCircle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_URL } from "@/lib/config";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter a valid name").max(100),
  marks: z
    .number({ invalid_type_error: "Marks must be a number" })
    .int("Marks must be a whole number")
    .min(0, "Marks cannot be less than 0")
    .max(720, "Marks cannot exceed 720"),
});

export default function SubmitMark() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [marks, setMarks] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({
      full_name: fullName,
      marks: marks === "" ? NaN : Number(marks),
    });
    if (!parsed.success) {
      toast({
        title: "Invalid input",
        description: parsed.error.issues[0]?.message ?? "Please check your inputs.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("neet_submissions").insert({
      full_name: parsed.data.full_name,
      marks: parsed.data.marks,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setFullName("");
    setMarks("");
    setShowSuccess(true);
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
          <div>
            <h1 className="text-lg font-bold text-blue-600">RDD Online</h1>
            <p className="text-xs text-slate-500">Rank • Dream • Destination</p>
          </div>
        </div>
      </header>

      <section className="px-4 pt-6 pb-10 max-w-2xl mx-auto space-y-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            Submit Your Mark or Someone You Know
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Help build a more accurate Assam NEET 2026 unofficial merit list.
          </p>
        </div>

        {/* Warning card */}
        <Card className="p-5 rounded-2xl border-amber-200 bg-amber-50 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-100 p-2 shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div className="space-y-2 text-sm text-amber-900 leading-relaxed">
              <p className="font-bold text-amber-800 text-base">⚠️ Important</p>
              <p>Do not spam here. Please submit the marks only if they are genuine.</p>
              <p className="italic">
                NEET ki kasam, koi ulta bulta response mat dalna please. 😄
              </p>
              <p>
                It takes a lot of effort to create such a platform. Your honest response
                will help thousands of NEET aspirants estimate the Assam merit list more
                accurately.
              </p>
            </div>
          </div>
        </Card>

        {/* Form */}
        <Card className="p-6 rounded-2xl border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-slate-700">
                Full Name of the Aspirant <span className="text-red-500">*</span>
              </Label>
              <Input
                id="full_name"
                type="text"
                required
                maxLength={100}
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marks" className="text-slate-700">
                Expected NEET Marks <span className="text-red-500">*</span>
              </Label>
              <Input
                id="marks"
                type="number"
                required
                min={0}
                max={720}
                inputMode="numeric"
                placeholder="0 – 720"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="rounded-lg"
              />
              <p className="text-xs text-slate-500">Value must be between 0 and 720.</p>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Card>
      </section>

      {/* Success dialog */}
      <Dialog
        open={showSuccess}
        onOpenChange={(open) => {
          setShowSuccess(open);
          if (!open) navigate("/");
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader className="items-center text-center">
            <div className="rounded-full bg-green-100 p-3 mb-2">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl">✅ Thank You!</DialogTitle>
            <DialogDescription className="text-slate-600 leading-relaxed pt-2">
              Thank you for your response. Your submission has been received successfully.
              Every genuine response helps improve the accuracy of the unofficial Assam
              NEET merit list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center gap-2 mt-2">
            <Button
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 font-semibold"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Join WhatsApp Group
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccess(false);
                navigate("/");
              }}
              className="rounded-xl h-11"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
