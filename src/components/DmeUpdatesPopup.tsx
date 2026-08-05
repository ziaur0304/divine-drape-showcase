import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  ListOrdered,
  School,
  RefreshCcw,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";

const STORAGE_KEY = "d2d_dme_updates_popup_dismissed";

const ITEMS = [
  {
    title: "Assam State Rank",
    to: "/state-rank-list",
    icon: ListOrdered,
    gradient: "from-indigo-600 to-blue-600",
  },
  {
    title: "Proof of Schooling",
    to: "/proof-of-schooling",
    icon: School,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Category Change",
    to: "/category-change",
    icon: RefreshCcw,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Three Generation Link Certificate",
    to: "/three-generation-certificate",
    icon: Users,
    gradient: "from-violet-600 to-purple-700",
  },
  {
    title: "Special Quota",
    to: "/special-quota",
    icon: Award,
    gradient: "from-rose-600 to-red-700",
  },
];

const DmeUpdatesPopup = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Latest Updates from DME Assam"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[500px] sm:w-[500px] max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-5 sm:p-6 animate-scale-in"
        style={{ borderRadius: 16 }}
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 pr-10 leading-snug">
          Latest Updates from DME Assam
        </h2>
        <p className="text-sm text-slate-500 mt-1.5">
          Tap any update below to view details and download forms.
        </p>

        <div className="mt-5 space-y-3">
          {ITEMS.map(({ title, to, icon: Icon, gradient }) => (
            <button
              key={to}
              onClick={() => {
                close();
                navigate(to);
              }}
              className={`w-full flex items-center gap-3 text-left px-4 py-4 rounded-xl bg-gradient-to-r ${gradient} text-white font-bold shadow-md hover:shadow-xl hover:brightness-110 transition-all`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="flex-1 text-sm sm:text-base leading-snug">{title}</span>
              <ChevronRight className="h-5 w-5 shrink-0 opacity-80" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DmeUpdatesPopup;
