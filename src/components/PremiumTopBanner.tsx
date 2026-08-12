import { useState } from "react";
import { Crown, ChevronDown, Check, Sparkles } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  if (pathname === "/premium-membership") return null;

  return (
    <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4">
        {/* Collapsed bar */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-center"
          aria-expanded={open}
        >
          <Crown className="h-4 w-4 shrink-0 text-white" />
          <span className="text-xs sm:text-sm font-bold leading-tight">
            Premium Plus Batch — Complete DME Assam counselling & admission support
          </span>
          <span className="hidden sm:inline text-xs font-semibold text-amber-50/90">
            ₹1999
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-white rounded-full px-2 py-0.5 shrink-0">
            {open ? "Hide" : "Details"}
            <ChevronDown
              className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>

        {/* Expanded content */}
        {open && (
          <div className="pb-4 pt-1">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-white" />
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                  What you get in the Premium Plus Batch
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BENEFITS.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-[12px] sm:text-[13px] font-medium leading-snug text-amber-50"
                  >
                    <Check className="h-4 w-4 shrink-0 mt-0.5 text-white" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-semibold text-amber-50/90">
                  One-time payment of{" "}
                  <span className="font-extrabold text-white">₹1999</span>
                </span>
                <Link
                  to="/premium-membership"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold text-amber-700 shadow-sm hover:bg-amber-50 transition-colors"
                >
                  Join Now
                  <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumTopBanner;
