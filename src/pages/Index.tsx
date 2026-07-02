import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, BarChart3, Stethoscope, Users, TrendingUp } from "lucide-react";

const WHATSAPP_URL = "https://chat.whatsapp.com/HsabYdYM41ACoDqpBzh2C1?s=cl&p=a&mlu=2&amv=2";

const openWhatsApp = () => window.open(WHATSAPP_URL, "_blank");

export default function Index() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-600">RDD Online</h1>
            <p className="text-xs text-slate-500">Rank • Dream • Destination</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-10 pb-6 max-w-3xl mx-auto">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 p-6 md:p-8 shadow-sm rounded-2xl">
          <Badge className="bg-blue-600 hover:bg-blue-600 text-white mb-4">
            Community Initiative
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight">
            Assam NEET 2026<br />Unofficial Merit List
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            The NEET exam is over, but the wait for the official Assam State Merit List can feel stressful. Many students are wondering:
          </p>
          <ul className="space-y-2 mb-6 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">›</span>
              <span>Will I get MBBS?</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">›</span>
              <span>What will be the cutoff?</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">›</span>
              <span>What could be my Assam state rank?</span>
            </li>
          </ul>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Instead of waiting anxiously, let's estimate it together. We are creating an <strong>Unofficial Assam NEET 2026 Merit List</strong> by collecting NEET scores from students across Assam. The larger our database, the more accurate the expected state rank and cutoff analysis will be.
          </p>
          <Button
            onClick={openWhatsApp}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Join WhatsApp Group
          </Button>
        </Card>
      </section>

      {/* Who Can Participate */}
      <section className="px-4 py-6 max-w-3xl mx-auto reveal opacity-0">
        <Card className="border-slate-100 p-6 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Who Can Participate?</h3>
          <p className="text-sm text-slate-500 mb-4">
            Only Assam NEET 2026 aspirants who expect the following scores or above:
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { cat: "UR", score: "490+" },
              { cat: "EWS", score: "480+" },
              { cat: "OBC", score: "410+" },
              { cat: "SC", score: "400+" },
              { cat: "ST (P)", score: "360+" },
              { cat: "ST (H)", score: "310+" },
            ].map((item) => (
              <div key={item.cat} className="flex justify-between items-center bg-slate-50 rounded-lg px-4 py-3">
                <span className="font-semibold text-slate-700 text-sm">{item.cat}</span>
                <span className="text-blue-600 font-bold text-sm">{item.score}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            These are only participation criteria for this community initiative. They are NOT official cutoff marks and do not guarantee admission.
          </p>
        </Card>
      </section>

      {/* Join the Community */}
      <section className="px-4 py-6 max-w-3xl mx-auto text-center reveal opacity-0">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Join the Community</h3>
        <Button
          onClick={openWhatsApp}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 px-8 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Join WhatsApp Group
        </Button>
        <p className="text-sm text-slate-500 mt-4 max-w-md mx-auto">
          The Google Form for submitting your NEET details will be shared in the WhatsApp group.
        </p>
      </section>

      {/* How It Will Work */}
      <section className="px-4 py-6 max-w-3xl mx-auto reveal opacity-0">
        <h3 className="text-xl font-bold text-slate-900 mb-5 text-center">How It Will Work</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { step: "Step 1", title: "Join the WhatsApp Group", desc: "Connect with fellow aspirants and stay updated." },
            { step: "Step 2", title: "Fill the Google Form", desc: "Submit your NEET details securely." },
            { step: "Step 3", title: "We Verify Responses", desc: "Duplicate entries are removed for accuracy." },
            { step: "Step 4", title: "Get Your Merit List", desc: "Unofficial list with expected cutoff & state rank." },
          ].map((item) => (
            <Card key={item.step} className="border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">{item.step}</span>
              <h4 className="font-bold text-slate-900 mt-1 mb-1">{item.title}</h4>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Participate */}
      <section className="px-4 py-6 max-w-3xl mx-auto reveal opacity-0">
        <h3 className="text-xl font-bold text-slate-900 mb-5 text-center">Why Participate?</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: BarChart3, title: "Better Cutoff Estimation", desc: "Data-driven predictions" },
            { icon: Stethoscope, title: "Admission Chances", desc: "Know where you stand" },
            { icon: Users, title: "Help Aspirants", desc: "Support thousands in Assam" },
            { icon: TrendingUp, title: "Accurate Analysis", desc: "More data = better results" },
          ].map((item) => (
            <Card key={item.title} className="border-slate-100 p-5 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
              <item.icon className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-4 py-6 max-w-3xl mx-auto reveal opacity-0">
        <Card className="bg-slate-50 border-slate-200 p-6 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Disclaimer</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            This is an independent community initiative by <strong>RDD Online</strong> (Rank • Dream • Destination).
            It is <strong>not affiliated</strong> with NTA, MCC, DME Assam, or any government authority.
            The unofficial merit list and cutoff analysis are created using voluntarily submitted student data and are intended only for guidance.
          </p>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 mt-4 py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h4 className="font-bold text-slate-900">RDD Online</h4>
          <p className="text-sm text-slate-500 mt-1">Rank • Dream • Destination</p>
          <p className="text-sm text-slate-400 mt-1">Turning your NEET rank into your medical destination.</p>
          <p className="text-xs text-slate-400 mt-4">Made with ❤️ for Assam NEET Aspirants</p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-md border-t border-slate-100 md:hidden z-50">
        <Button
          onClick={openWhatsApp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-semibold shadow-lg"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Join WhatsApp Group
        </Button>
      </div>

      {/* Mobile bottom spacing for sticky CTA */}
      <div className="h-20 md:hidden" />
    </main>
  );
}
