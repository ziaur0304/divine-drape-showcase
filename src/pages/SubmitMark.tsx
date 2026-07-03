import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, ShieldAlert } from "lucide-react";
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

export default function SubmitMark() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [marks, setMarks] = useState("");
  const [showClosed, setShowClosed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowClosed(true);
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
            Submissions Temporarily Closed
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            We are working on a secure OTP verification system. Kindly stay tuned.
          </p>
        </div>

        <Card className="p-5 rounded-2xl border-amber-200 bg-amber-50 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-100 p-2 shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div className="space-y-2 text-sm text-amber-900 leading-relaxed">
              <p className="font-bold text-amber-800 text-base">Notice</p>
              <p>
                New responses are no longer being accepted at this time. Please check back
                soon.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl border-slate-100 shadow-sm opacity-70">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-slate-700">
                Full Name of the Aspirant <span className="text-red-500">*</span>
              </Label>
              <Input
                id="full_name"
                type="text"
                disabled
                maxLength={100}
                placeholder="Submissions closed"
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
                disabled
                min={0}
                max={720}
                inputMode="numeric"
                placeholder="Submissions closed"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="rounded-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Submit
            </Button>
          </form>
        </Card>
      </section>

      <Dialog
        open={showClosed}
        onOpenChange={(open) => {
          setShowClosed(open);
          if (!open) navigate("/");
        }}
      >
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader className="items-center text-center">
            <div className="rounded-full bg-red-100 p-3 mb-2">
              <ShieldAlert className="h-8 w-8 text-red-600" />
            </div>
            <DialogTitle className="text-xl">Submissions Closed</DialogTitle>
            <DialogDescription className="text-slate-600 leading-relaxed pt-2">
              Sorry, we are not taking responses anymore because of some fatherless
              spammers who deliberately tried to ruin this initiative. Kindly stay tuned.
              We are coming back with a secure OTP verification system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center mt-2">
            <Button
              onClick={() => {
                setShowClosed(false);
                navigate("/");
              }}
              className="rounded-xl h-11 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
