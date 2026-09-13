import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  FileCheck2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DOCUMENTS = [
  "Three (3) Generation Link Certificate",
  "Permanent Residency Certificate (PRC)",
  "Schooling Proof from Class I to Class XII",
];

const OutsideAssamVerification = () => (
  <main className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
        <Link
          to="/latest-updates"
          className="-ml-2 rounded-lg p-2 transition-colors hover:bg-muted"
          aria-label="Back to latest updates"
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </Link>
        <img
          src="/d2donline-logo.png"
          alt="D2D Online — Dream to Destination"
          className="h-9 sm:h-10"
        />
      </div>
    </header>

    <section className="mx-auto max-w-3xl space-y-5 px-4 pb-14 pt-6">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-3 py-1 text-xs font-bold uppercase text-destructive-foreground shadow-sm">
        <AlertTriangle className="h-3.5 w-3.5" />
        Important
      </div>

      <div>
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
          <CalendarDays className="h-4 w-4" />
          12 August 2026
        </p>
        <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
          Document Verification for Candidates Who Studied Outside Assam
        </h1>
      </div>

      <div className="rounded-lg border-l-4 border-primary bg-secondary p-5 text-[15px] leading-relaxed text-secondary-foreground shadow-sm">
        DME Assam has issued an educational notice regarding offline document verification for
        candidates whose Roll Number and Name are included in the Provisional Assam State Merit
        List, Session 2026, and who resided and studied outside Assam during any period between
        Class I and Class XII.
      </div>

      <section aria-labelledby="verification-details" className="space-y-3">
        <h2 id="verification-details" className="text-lg font-bold">Verification Details</h2>
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="grid gap-1 border-b border-border p-4 sm:grid-cols-[9rem_1fr]">
            <span className="font-semibold text-muted-foreground">Date</span>
            <span className="font-bold">20 August 2026</span>
          </div>
          <div className="grid gap-1 border-b border-border p-4 sm:grid-cols-[9rem_1fr]">
            <span className="font-semibold text-muted-foreground">Time</span>
            <span className="font-bold">10:00 AM onwards</span>
          </div>
          <div className="grid gap-1 p-4 sm:grid-cols-[9rem_1fr]">
            <span className="flex items-center gap-1.5 font-semibold text-muted-foreground">
              <MapPin className="h-4 w-4" /> Venue
            </span>
            <span className="font-bold">Office of the DME, Assam, Sixmile, Khanapara, Guwahati-22</span>
          </div>
        </div>
      </section>

      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm font-semibold leading-relaxed text-foreground">
        Candidates must physically appear for document verification. All relevant documents and
        Annexures must be produced in ORIGINAL.
      </div>

      <section aria-labelledby="required-documents" className="space-y-3">
        <h2 id="required-documents" className="flex items-center gap-2 text-lg font-bold">
          <FileCheck2 className="h-5 w-5 text-primary" />
          Documents to be Produced
        </h2>
        <ol className="space-y-2">
          {DOCUMENTS.map((document, index) => (
            <li key={document} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <span className="pt-0.5 text-sm font-semibold leading-relaxed">{document}</span>
            </li>
          ))}
        </ol>
      </section>

      <Button asChild className="h-14 w-full rounded-lg text-base font-bold shadow-md">
        <a href="https://dme.assam.gov.in" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 h-5 w-5" />
          Visit Official DME Assam Website
        </a>
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Official Source: <span className="font-semibold text-foreground">DME Assam — www.dme.assam.gov.in</span>
      </p>
      <p className="text-center text-xs text-muted-foreground">
        D2D Online is an independent initiative and is not affiliated with NTA, MCC or DME Assam.
      </p>
    </section>
  </main>
);

export default OutsideAssamVerification;