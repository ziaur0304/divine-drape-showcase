import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  GraduationCap,
  HeartPulse,
  Leaf,
  Stethoscope,
  Pill,
  Activity,
  Microscope,
  FlaskConical,
  BookOpen,
} from "lucide-react";

const LOGO_URL = "/d2donline-logo.png";
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/FVN6hN1WJI52mLyIIZS6jz?s=cl&p=a&mlu=4";
const WHATSAPP_NUMBER = "919365248667";
const WHATSAPP_PREFILL = `Hi D2DOnline! I am looking for genuine guidance for private admission into medical, dental, AYUSH, nursing, pharmacy, paramedical or allied healthcare courses in India or abroad. Please guide me.`;

const courseCategories = [
  {
    icon: HeartPulse,
    title: "Medical & Dental",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
    courses: [
      "MBBS — Bachelor of Medicine, Bachelor of Surgery",
      "BDS — Bachelor of Dental Surgery",
      "MD — Doctor of Medicine",
      "MS — Master of Surgery",
      "PG Medical Programmes & Specialisations",
      "MDS — Master of Dental Surgery",
    ],
  },
  {
    icon: Leaf,
    title: "AYUSH",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    courses: [
      "BAMS — Bachelor of Ayurvedic Medicine and Surgery",
      "BHMS — Bachelor of Homoeopathic Medicine and Surgery",
      "BUMS — Bachelor of Unani Medicine and Surgery",
      "BSMS — Bachelor of Siddha Medicine and Surgery",
      "BNYS — Bachelor of Naturopathy and Yogic Sciences",
      "MD/MS AYUSH Programmes & Specialisations",
    ],
  },
  {
    icon: Stethoscope,
    title: "Nursing",
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    courses: [
      "ANM — Auxiliary Nurse Midwifery",
      "GNM — General Nursing and Midwifery",
      "B.Sc. Nursing",
      "Post Basic B.Sc. Nursing",
      "M.Sc. Nursing",
      "Other recognised Nursing programmes",
    ],
  },
  {
    icon: Pill,
    title: "Pharmacy",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    courses: [
      "D.Pharm — Diploma in Pharmacy",
      "B.Pharm — Bachelor of Pharmacy",
      "B.Pharm Lateral Entry",
      "Pharm.D — Doctor of Pharmacy",
      "Pharm.D Post Baccalaureate",
      "M.Pharm — Master of Pharmacy",
    ],
  },
  {
    icon: Activity,
    title: "Physiotherapy & Rehabilitation",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    courses: [
      "BPT — Bachelor of Physiotherapy",
      "MPT — Master of Physiotherapy",
      "BOT — Bachelor of Occupational Therapy",
      "MOT — Master of Occupational Therapy",
      "BASLP — Bachelor of Audiology and Speech-Language Pathology",
      "MASLP — Master of Audiology and Speech-Language Pathology",
    ],
  },
  {
    icon: Microscope,
    title: "Allied Health Sciences & Paramedical",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
    courses: [
      "B.Sc. Medical Laboratory Technology / Medical Lab Technology",
      "B.Sc. Medical Imaging Technology",
      "B.Sc. Radiology / Radiological Technology",
      "B.Sc. Operation Theatre Technology",
      "B.Sc. Anaesthesia Technology",
      "B.Sc. Dialysis Technology",
      "B.Sc. Optometry",
      "B.Sc. Cardiac Care Technology",
      "B.Sc. Respiratory Therapy",
      "B.Sc. Emergency Medical Technology",
      "B.Sc. Critical Care Technology",
      "B.Sc. Perfusion Technology",
      "B.Sc. Renal Dialysis Technology",
      "B.Sc. Neurophysiology Technology",
      "B.Sc. Radiotherapy Technology",
      "B.Sc. Health Information Management",
    ],
  },
  {
    icon: FlaskConical,
    title: "Healthcare & Life Sciences",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    courses: [
      "BHA — Bachelor of Hospital Administration",
      "Bachelor of Healthcare Management",
      "BPH — Bachelor of Public Health",
      "Bachelor of Medical Administration",
      "Bachelor of Medical Record Technology",
      "Bachelor of Clinical Research",
      "B.Sc. Nutrition & Dietetics",
      "B.Sc. Clinical Nutrition",
      "B.Sc. Biotechnology",
      "B.Sc. Microbiology",
      "B.Sc. Biomedical Science",
      "B.Sc. Forensic Science",
      "B.Sc. Genetics",
      "B.Sc. Biochemistry",
      "B.Sc. Psychology / relevant healthcare-related Psychology programmes",
    ],
  },
  {
    icon: BookOpen,
    title: "Other Related Programmes",
    color: "text-slate-600",
    bg: "bg-slate-50",
    border: "border-slate-100",
    courses: [
      "And other recognised undergraduate, postgraduate, diploma and certificate programmes related to Medicine, Dentistry, AYUSH, Nursing, Pharmacy, Physiotherapy, Allied Health Sciences, Paramedical Sciences, Healthcare and Life Sciences.",
    ],
  },
];

const PrivateAdmissions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50 flex flex-col">
      <header className="px-4 py-4 border-b bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-violet-600 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <img src={LOGO_URL} alt="D2D Online — Dream to Destination" className="h-10 sm:h-12" />
        </div>
      </header>

      <main className="flex-1 px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <section className="text-center">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Private Admission Guidance<br />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                India & Abroad
              </span>
            </h1>
            <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-xl mx-auto">
              Get 100% genuine guidance for private admissions into medical, dental, AYUSH, nursing, pharmacy, and allied healthcare programmes.
            </p>
          </section>

          <Card className="relative overflow-hidden border-0 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(139,92,246,0.2)] ring-1 ring-violet-100/60 p-6 sm:p-8">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500" />
            <div className="flex items-start gap-3 mb-5">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Need Private Admission Guidance?
                </h2>
                <p className="text-sm text-slate-500 mt-1">Join our dedicated WhatsApp community</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
              <p>
                If you want to take <strong>100% genuine guidance</strong> for admission into private medical, dental, AYUSH, nursing, pharmacy, physiotherapy, paramedical, allied healthcare, healthcare or life-science programmes in <strong>India or abroad</strong>, join our WhatsApp group or contact our team directly.
              </p>
              <p>
                Get guidance regarding college selection, eligibility, admission process, counselling, documentation, fees, choice filling and other important admission-related matters.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => window.open(WHATSAPP_GROUP_URL, "_blank")}
                className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Join WhatsApp Group
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`,
                    "_blank"
                  )
                }
                className="w-full h-auto min-h-[3.5rem] py-3 px-4 text-base font-semibold rounded-xl border-2 border-violet-200 hover:bg-violet-50 text-violet-700 transition-all whitespace-normal"
              >
                <Phone className="h-5 w-5 mr-2 shrink-0" />
                <span className="text-center leading-snug">
                  WhatsApp Us<br className="sm:hidden" />
                  <span className="sm:ml-1">+91 93652 48667</span>
                </span>
              </Button>
            </div>
          </Card>

          <section>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 text-center mb-4">
              Courses & Degrees We Cover
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {courseCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={index}
                    className={`rounded-2xl border ${category.border} bg-white/70 p-5 shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`shrink-0 w-9 h-9 rounded-full ${category.bg} flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${category.color}`} />
                      </div>
                      <h4 className="font-bold text-slate-900">{category.title}</h4>
                    </div>
                    <ul className="space-y-2">
                      {category.courses.map((course, courseIndex) => (
                        <li
                          key={courseIndex}
                          className="text-sm text-slate-600 leading-relaxed pl-3 border-l-2 border-slate-200"
                        >
                          {course}
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </section>

          <p className="text-xs text-slate-500 text-center leading-relaxed px-2">
            Course availability, eligibility, recognition, admission requirements and regulatory approvals vary by institution, programme and country. Guidance is provided based on the applicable admission rules and available options.
          </p>
        </div>
      </main>

      <footer className="px-4 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} D2D Online · Dream to Destination
      </footer>
    </div>
  );
};

export default PrivateAdmissions;
