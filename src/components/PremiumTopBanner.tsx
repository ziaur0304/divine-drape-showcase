import { Crown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PremiumTopBanner = () => {
  const { pathname } = useLocation();
  if (pathname === "/premium-membership") return null;

  return (
    <Link
      to="/premium-membership"
      className="group block w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600"
    >
      <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
        <Crown className="h-3.5 w-3.5 shrink-0 text-white" />
        <span className="text-[11px] sm:text-xs font-bold text-white leading-tight">
          Premium Plus Batch — Complete DME Assam counselling support
        </span>
        <span className="hidden sm:inline text-[11px] font-semibold text-amber-50">
          ₹1999
        </span>
        <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-amber-700 bg-white rounded-full px-2 py-0.5 shrink-0 group-hover:bg-amber-50 transition-colors">
          Join
          <ChevronRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
};

export default PremiumTopBanner;
