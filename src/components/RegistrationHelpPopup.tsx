import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";

const PHONE = "9365248667";

const RegistrationHelpPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = "d2d_registration_help_seen";
    if (!sessionStorage.getItem(key)) {
      const t = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem(key, "1");
      }, 1200);
      return () => clearTimeout(t);
    }
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close popup"
          className="absolute top-3 right-3 z-10 rounded-full bg-white/80 hover:bg-slate-100 p-1.5 transition-colors"
        >
          <X className="h-4 w-4 text-slate-600" />
        </button>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 px-6 py-6 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-2">
            <Phone className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-lg font-extrabold text-white">
            Need Help with DME Registration?
          </h3>
        </div>

        <div className="px-6 py-5 text-center">
          <p className="text-sm text-slate-700 leading-relaxed">
            If you are facing any problem during your registration for
            counselling in the DME website, call us:
          </p>
          <a
            href={`tel:+${PHONE}`}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-base font-bold text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Phone className="h-5 w-5" />
            {PHONE}
          </a>
          <p className="mt-3 text-xs text-slate-400">
            Tap the number to call directly
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHelpPopup;
