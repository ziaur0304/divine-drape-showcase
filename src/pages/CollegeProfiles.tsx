import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, School, Sparkles, CheckCircle2 } from "lucide-react";

const features = [
  "📊 Previous Years' Closing Ranks",
  "📝 Overview",
  "📅 Year of Establishment",
  "🎓 Availability of PG Courses",
  "🦴 Availability of Cadaver",
  "📚 Attendance Strictness",
  "👨‍🏫 Faculty Support",
  "🏥 Patient Flow (OPD & IPD load, case variety)",
  "🏠 Hostel Conditions",
  "🍽️ Hostel Food Quality",
  "🏅 Availability of Sports Facilities",
  "🎉 College Fests & Student Life",
  "📍 About the Locality",
  "🚗 Distance from Guwahati",
  "👨‍⚕️ Real Student Opinions",
  "📸 Campus Photos",
];

export default function CollegeProfiles() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-blue-600">RDD Online</h1>
            <p className="text-xs text-slate-500">Rank • Dream • Destination</p>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-blue-600 hover:bg-blue-50"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      <section className="px-4 py-8 max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 shadow-lg mb-4">
            <span className="text-3xl">🏥</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            College Profiles
          </h1>
          <p className="text-slate-600 leading-relaxed max-w-xl mx-auto">
            Make an informed decision by exploring detailed profiles of medical colleges in
            Assam. This feature is currently under development and will be available soon.
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="relative overflow-hidden border-0 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-50 via-white to-white p-6 md:p-8">
          {/* Decorative gradient orbs */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl" />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-900 via-blue-600 to-amber-400" />

          <div className="relative space-y-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  Coming Soon
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We are working on a comprehensive College Profiles section to help RE-NEET
                  UG aspirants choose the right medical college with confidence. Each profile
                  will include verified information and real student insights.
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <School className="h-4 w-4 text-blue-600" />
                Each College Profile Will Include
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <div className="shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium badge */}
            <div className="flex justify-center">
              <Badge className="bg-gradient-to-r from-blue-900 to-blue-700 text-white border-0 px-4 py-2 text-sm font-semibold shadow-lg hover:from-blue-950 hover:to-blue-800 transition-all">
                <Sparkles className="h-4 w-4 mr-1.5" />
                Coming Soon
              </Badge>
            </div>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Button
            asChild
            className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white rounded-xl h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Link to="/">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 mt-4 py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h4 className="font-bold text-slate-900">RDD Online</h4>
          <p className="text-sm text-slate-500 mt-1">Rank • Dream • Destination</p>
          <p className="text-sm text-slate-400 mt-1">
            Turning your RE-NEET rank into your medical destination.
          </p>
          <p className="text-xs text-slate-400 mt-4">Made with ❤️ for Assam RE-NEET Aspirants</p>
        </div>
      </footer>
    </main>
  );
}
