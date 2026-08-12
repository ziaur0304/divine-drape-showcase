import { Crown, Check, Sparkles, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BENEFITS = [
  "Our team collects and verifies your documents.",
  "Our team completes your registration on the DME website.",
  "We curate a fully customized college preference list based on your interests and needs.",
  "During admission, our team welcomes and assists you at the medical college.",
  "You receive complimentary guidance for your medical career.",
  "24×7 one-on-one query support.",
];

const PremiumTopBanner = () => {
  const { pathname } = useLocation();
  if (pathname === "/premium-membership") return null;

  return (
    <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 justify-center mb-2.5">
          <Crown className="h-4 w-4 shrink-0 text-amber-900" />
          <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-amber-950 text-center">
            Premium Plus Batch — Complete DME Assam Counselling & Admission Support
          </h3>
        </div>

        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <Sparkles className="h-4 w-4 text-amber-900" />
            <span className="text-xs sm:text-sm font-bold text-amber-950">
              What you get in the Premium Plus Batch
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BENEFITS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 text-[12px] sm:text-[13px] font-semibold leading-snug text-amber-950"
              >
                <Check className="h-4 w-4 shrink-0 mt-0.5 text-amber-900" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs sm:text-sm font-bold text-amber-950">
              One-time payment of{" "}
              <span className="font-extrabold underline decoration-amber-900/40">
                ₹1999
              </span>
            </span>
            <Link
              to="/premium-membership"
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-950 px-5 py-2 text-xs font-bold text-amber-50 shadow-sm hover:bg-amber-900 transition-colors"
            >
              Join Now
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumTopBanner;
