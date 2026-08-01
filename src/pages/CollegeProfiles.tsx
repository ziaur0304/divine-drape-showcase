import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  ArrowLeft,
  ArrowUp,
  Check,
  ChevronsUpDown,
  Star,
  Calendar,
  GraduationCap,
  BookOpen,
  Microscope,
  ClipboardCheck,
  Users,
  Stethoscope,
  Home,
  UtensilsCrossed,
  Trophy,
  PartyPopper,
  MapPin,
  Car,
  Quote,
  Images,
  ExternalLink,
  Info,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { colleges, type College, type Rating } from "@/data/colleges";

function StarRating({ score }: { score: number }) {
  const rounded = Math.round(score);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i <= rounded
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200",
            )}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-slate-700">
        ({score}/5)
      </span>
    </div>
  );
}

type RatingCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  rating: Rating;
  accent: string;
};

function RatingCard({ icon: Icon, title, rating, accent }: RatingCardProps) {
  return (
    <Card className="group relative overflow-hidden border border-slate-100 bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className={cn("absolute top-0 left-0 right-0 h-1", accent)} />
      <div className="flex items-start gap-3 mb-3">
        <div
          className={cn(
            "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
            accent,
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-900 leading-tight">
            {title}
          </h4>
          <div className="mt-1.5">
            <StarRating score={rating.score} />
          </div>
        </div>
      </div>
      {rating.description && (
        <p className="text-xs text-slate-600 leading-relaxed">
          {rating.description}
        </p>
      )}
    </Card>
  );
}

type InfoCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  accent: string;
};

function InfoCard({ icon: Icon, title, value, accent }: InfoCardProps) {
  return (
    <Card className="border border-slate-100 bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
            accent,
          )}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
            {title}
          </p>
          <p className="text-sm font-semibold text-slate-900 leading-snug">
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}

function CollegeProfile({ college }: { college: College }) {
  const ratingCards: RatingCardProps[] = [
    {
      icon: Microscope,
      title: "Availability of Cadaver",
      rating: college.cadaver,
      accent: "bg-gradient-to-br from-rose-500 to-pink-600",
    },
    {
      icon: ClipboardCheck,
      title: "Attendance Strictness",
      rating: college.attendanceStrictness,
      accent: "bg-gradient-to-br from-indigo-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Faculty Support",
      rating: college.facultySupport,
      accent: "bg-gradient-to-br from-violet-500 to-purple-600",
    },
    {
      icon: Stethoscope,
      title: "Patient Flow",
      rating: college.patientFlow,
      accent: "bg-gradient-to-br from-teal-500 to-cyan-600",
    },
    {
      icon: Home,
      title: "Hostel Conditions",
      rating: college.hostelConditions,
      accent: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    {
      icon: UtensilsCrossed,
      title: "Hostel Food Quality",
      rating: college.hostelFood,
      accent: "bg-gradient-to-br from-lime-500 to-emerald-600",
    },
    {
      icon: Trophy,
      title: "Sports Facilities",
      rating: college.sportsFacilities,
      accent: "bg-gradient-to-br from-sky-500 to-blue-600",
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Hero */}
      <Card className="relative overflow-hidden border-0 rounded-3xl shadow-xl bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 p-8 text-white">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            College Profile
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            {college.name}
          </h2>
          <p className="mt-2 text-blue-100 text-sm md:text-base">
            {college.shortName}
          </p>
        </div>
      </Card>

      {/* Overview */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Overview
        </h3>
        <Card className="border border-slate-100 bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-slate-700 leading-relaxed text-[15px]">
            {college.overview}
          </p>
        </Card>
      </section>

      {/* Quick Info */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Calendar}
          title="Year of Establishment"
          value={college.established}
          accent="bg-gradient-to-br from-blue-600 to-indigo-700"
        />
        <InfoCard
          icon={GraduationCap}
          title="PG Courses"
          value={college.pgCourses}
          accent="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <InfoCard
          icon={BookOpen}
          title="Library"
          value={college.libraryAvailable}
          accent="bg-gradient-to-br from-fuchsia-500 to-pink-600"
        />
        <InfoCard
          icon={PartyPopper}
          title="College Fest"
          value={college.collegeFest}
          accent="bg-gradient-to-br from-orange-500 to-red-600"
        />
      </section>

      {/* Ratings */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
          Ratings & Insights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ratingCards.map((card) => (
            <RatingCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      {/* Locality */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-rose-500" />
          About the Locality
        </h3>
        <Card className="border border-slate-100 bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-slate-700 leading-relaxed text-[15px]">
            {college.locality}
          </p>
        </Card>
      </section>

      <InfoCard
        icon={Car}
        title="Distance from Guwahati"
        value={college.distanceFromGuwahati}
        accent="bg-gradient-to-br from-slate-700 to-slate-900"
      />

      {/* Student Opinion */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Quote className="h-5 w-5 text-blue-600" />
          Real Student Opinion
        </h3>
        <Card className="relative overflow-hidden border-0 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 md:p-8 shadow-md">
          <Quote className="absolute top-4 right-4 h-20 w-20 text-blue-100" />
          <div className="relative">
            <p className="text-slate-800 leading-relaxed text-[15px] md:text-base italic">
              "{college.studentOpinion.quote}"
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold shadow-md">
                {college.studentOpinion.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  {college.studentOpinion.name}
                </p>
                <p className="text-xs text-slate-500">
                  {college.studentOpinion.designation}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Campus Photos */}
      {college.campusPhotosLink && (
        <section>
          <Card className="relative overflow-hidden border-0 rounded-3xl bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600 p-6 md:p-8 text-white shadow-xl">
            <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Images className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">Campus Photos</h3>
                  <p className="text-white/85 text-sm mt-1">
                    Explore the campus, hostels & student life.
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-white text-cyan-700 hover:bg-white/90 rounded-xl font-bold shadow-lg"
              >
                <a
                  href={college.campusPhotosLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Gallery
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </Card>
        </section>
      )}
    </div>
  );
}

export default function CollegeProfiles() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [viewedCollege, setViewedCollege] = useState<College | null>(null);
  const [showTop, setShowTop] = useState(false);

  const options = useMemo(
    () =>
      colleges.map((c) => ({
        value: c.id,
        label: `${c.name} (${c.shortName})`,
      })),
    [],
  );

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleViewProfile = () => {
    if (!selectedId) return;
    const college = colleges.find((c) => c.id === selectedId) ?? null;
    setViewedCollege(college);
    setTimeout(() => {
      document
        .getElementById("college-profile")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const selectedLabel = options.find((o) => o.value === selectedId)?.label;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <img src="/d2donline-logo.png" alt="D2D Online — Dream to Destination" className="h-9 sm:h-10" />
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

      <section className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Page title */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 shadow-lg mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            College Profiles
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-xl mx-auto">
            Explore verified profiles of medical colleges in Assam and choose
            the college that fits your dream best.
          </p>
        </div>

        {/* Stay tuned box */}
        <Card className="relative overflow-hidden border border-amber-200 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl p-5 shadow-sm animate-fade-in-delay-1">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <Info className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">Stay Tuned</h3>
              <p className="text-sm text-amber-900/85 mt-0.5">
                Other colleges are also being added.
              </p>
            </div>
          </div>
        </Card>

        {/* Selector */}
        <Card className="border border-slate-100 bg-white rounded-3xl p-6 md:p-8 shadow-lg animate-fade-in-delay-2">
          <label className="block text-sm font-bold text-slate-900 mb-3">
            Select a Medical College
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="flex-1 justify-between h-12 rounded-xl border-slate-200 bg-white text-left font-normal hover:bg-slate-50"
                >
                  <span className={cn(!selectedLabel && "text-slate-400")}>
                    {selectedLabel ?? "Search & select a college..."}
                  </span>
                  <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-[--radix-popover-trigger-width]"
                align="start"
              >
                <Command>
                  <CommandInput placeholder="Search colleges..." />
                  <CommandList>
                    <CommandEmpty>No college found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={opt.label}
                          onSelect={() => {
                            setSelectedId(opt.value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedId === opt.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {opt.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              onClick={handleViewProfile}
              disabled={!selectedId}
              className="h-12 px-8 rounded-xl bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-950 hover:to-blue-800 text-white font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              View Profile
            </Button>
          </div>
        </Card>

        {/* Profile */}
        <div id="college-profile">
          {viewedCollege && <CollegeProfile college={viewedCollege} />}
        </div>
      </section>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-100 mt-8 py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h4 className="font-bold text-slate-900">D2D Online</h4>
          <p className="text-sm text-slate-500 mt-1">
            Dream to Destination
          </p>
          <p className="text-xs text-slate-400 mt-4">
            Made with ❤️ for Assam RE-NEET Aspirants
          </p>
        </div>
      </footer>
    </main>
  );
}
