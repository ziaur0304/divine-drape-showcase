import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const plan = params.get("plan") || "Premium Membership";
  const pid = params.get("pid") || "";

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">
      <Card className="max-w-lg w-full rounded-3xl border-0 shadow-2xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-blue-600 to-amber-500" />
        <div className="p-8 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg animate-fade-in">
            <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="mt-6 text-2xl md:text-3xl font-bold text-slate-900">
            Payment Successful!
          </h1>
          <p className="mt-2 text-slate-600">
            Welcome to RDD Online Premium Membership.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-4 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Plan</span>
              <span className="font-semibold text-slate-900">{plan}</span>
            </div>
            {pid && (
              <div className="flex justify-between text-sm mt-2">
                <span className="text-slate-500">Payment ID</span>
                <span className="font-mono text-xs text-slate-700">{pid}</span>
              </div>
            )}
          </div>

          <p className="mt-6 text-sm text-slate-600">
            Our team will reach out on WhatsApp shortly. For immediate help, message us:
          </p>

          <Button
            asChild
            className="w-full mt-4 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-lg"
          >
            <a
              href="https://wa.me/919365248667?text=Hi%20RDD%20Online,%20I%20just%20purchased%20Premium%20Membership"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Message us on WhatsApp
            </a>
          </Button>

          <Button asChild variant="outline" className="w-full mt-3 rounded-xl h-11">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
