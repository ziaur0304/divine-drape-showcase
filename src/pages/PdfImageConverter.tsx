import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, FileDown, ImageDown, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const kb = (bytes: number) => `${(bytes / 1024).toFixed(0)} KB`;

const isIOS = () =>
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && (navigator as never as { maxTouchPoints: number }).maxTouchPoints > 1));

async function saveBlob(blob: Blob, filename: string) {
  // iOS Safari ignores the download attribute for blob URLs, so use the
  // native share sheet when possible (lets the user Save to Files / Photos).
  const file = new File([blob], filename, { type: blob.type });
  const nav = navigator as Navigator & {
    canShare?: (d: { files: File[] }) => boolean;
    share?: (d: { files: File[]; title?: string }) => Promise<void>;
  };
  if (isIOS() && nav.canShare?.({ files: [file] }) && nav.share) {
    try {
      await nav.share({ files: [file], title: filename });
      return "shared";
    } catch (e) {
      if ((e as DOMException)?.name === "AbortError") return "shared";
      // fall through to download
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
  return "downloaded";
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (canvas.toBlob) {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob failed"))), "image/jpeg", quality);
    } else {
      // Very old Safari fallback
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      const bin = atob(dataUrl.split(",")[1]);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      resolve(new Blob([arr], { type: "image/jpeg" }));
    }
  });
}

// iOS Safari has a hard canvas memory cap (~16.7 MP); keep well below it.
const MAX_PIXELS = 4_000_000;

async function loadImage(file: File): Promise<{ width: number; height: number; draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void }> {
  // createImageBitmap can fail on iOS for HEIC/large photos — fall back to <img>.
  try {
    if (typeof createImageBitmap === "function") {
      const bitmap = await createImageBitmap(file);
      return {
        width: bitmap.width,
        height: bitmap.height,
        draw: (ctx, w, h) => ctx.drawImage(bitmap, 0, 0, w, h),
      };
    }
  } catch {
    /* fall through */
  }
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Unsupported image format"));
      el.src = url;
    });
    return {
      width: img.naturalWidth,
      height: img.naturalHeight,
      draw: (ctx, w, h) => ctx.drawImage(img, 0, 0, w, h),
    };
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  }
}


async function compressPdf(file: File, targetBytes: number): Promise<Blob> {
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: data.slice(0) }).promise;

  const attempts: { scale: number; quality: number }[] = [
    { scale: 1.5, quality: 0.8 },
    { scale: 1.2, quality: 0.65 },
    { scale: 1.0, quality: 0.5 },
    { scale: 0.85, quality: 0.4 },
    { scale: 0.7, quality: 0.32 },
    { scale: 0.55, quality: 0.25 },
    { scale: 0.45, quality: 0.2 },
  ];

  let last: Blob | null = null;

  for (const attempt of attempts) {
    const out = await PDFDocument.create();
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const base = page.getViewport({ scale: attempt.scale });
      const capped = Math.min(1, Math.sqrt(MAX_PIXELS / (base.width * base.height)));
      const viewport = page.getViewport({ scale: attempt.scale * capped });
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport, canvas } as never).promise;


      const jpegBlob = await canvasToBlob(canvas, attempt.quality);
      const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
      const img = await out.embedJpg(jpegBytes);
      const p = out.addPage([img.width, img.height]);
      p.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }
    const bytes = await out.save();
    last = new Blob([bytes as BlobPart], { type: "application/pdf" });
    if (last.size <= targetBytes) return last;
  }
  return last!;
}

async function compressImage(file: File, targetBytes: number): Promise<Blob> {
  const src = await loadImage(file);
  let scale = Math.min(1, Math.sqrt(MAX_PIXELS / (src.width * src.height)));
  let best: Blob | null = null;

  for (let s = 0; s < 10; s++) {
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(src.width * scale));
    canvas.height = Math.max(1, Math.round(src.height * scale));
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    src.draw(ctx, canvas.width, canvas.height);

    for (let q = 0.92; q >= 0.15; q -= 0.07) {
      const blob = await canvasToBlob(canvas, q);
      best = blob;
      if (blob.size <= targetBytes) return blob;
    }
    scale *= 0.8;
  }
  return best!;
}


export default function PdfImageConverter() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgBusy, setImgBusy] = useState<number | null>(null);

  const handlePdf = async () => {
    if (!pdfFile) return toast.error("Please select a PDF file first");
    setPdfBusy(true);
    try {
      const blob = await compressPdf(pdfFile, 250 * 1024);
      const how = await saveBlob(blob, pdfFile.name.replace(/\.pdf$/i, "") + "-compressed.pdf");
      toast.success(
        (blob.size <= 250 * 1024
          ? `Done — compressed to ${kb(blob.size)}`
          : `Smallest possible: ${kb(blob.size)} (could not reach 250 KB)`) +
          (how === "shared" ? " — choose “Save to Files”" : "")
      );

    } catch (e) {
      console.error(e);
      toast.error("Could not process this PDF. Please try another file.");
    } finally {
      setPdfBusy(false);
    }
  };

  const handleImage = async (targetKb: number) => {
    if (!imgFile) return toast.error("Please select an image first");
    setImgBusy(targetKb);
    try {
      const blob = await compressImage(imgFile, targetKb * 1024);
      const how = await saveBlob(blob, imgFile.name.replace(/\.[^.]+$/, "") + `-${targetKb}kb.jpg`);
      toast.success(
        (blob.size <= targetKb * 1024
          ? `Done — compressed to ${kb(blob.size)}`
          : `Smallest possible: ${kb(blob.size)}`) +
          (how === "shared" ? " — choose “Save to Files”" : "")
      );

    } catch (e) {
      console.error(e);
      toast.error("Could not process this image. Please try another file.");
    } finally {
      setImgBusy(null);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <img src="/d2donline-logo.png" alt="D2D Online — Dream to Destination" className="h-10 sm:h-12" />
          <Link
            to="/govt-medical"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold transition-colors"
          >
            <Home className="h-4 w-4" />
            Back
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 pt-6 pb-3">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
          PDF and Image converter for DME
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Resize your documents to meet the DME Assam website upload limits. Everything is processed
          on your own device — nothing is uploaded to any server.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-24 space-y-5">
        {/* PDF Compressor */}
        <Card className="border-slate-200 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <FileDown className="h-5 w-5 text-rose-600" />
            <h2 className="text-lg font-bold">PDF Compressor</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Upload a PDF and download a version under 250 KB.
          </p>

          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-rose-300 transition-colors">
            <Upload className="h-6 w-6 text-slate-400" />
            <span className="text-sm text-slate-600 text-center break-all">
              {pdfFile ? `${pdfFile.name} (${kb(pdfFile.size)})` : "Tap to choose a PDF file"}
            </span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <Button
            onClick={handlePdf}
            disabled={pdfBusy}
            className="w-full mt-4 h-12 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white font-bold"
          >
            {pdfBusy ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <FileDown className="h-5 w-5 mr-2" />}
            {pdfBusy ? "Compressing…" : "Compress & Download (under 250 KB)"}
          </Button>
        </Card>

        {/* Image Resizer */}
        <Card className="border-slate-200 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <ImageDown className="h-5 w-5 text-teal-600" />
            <h2 className="text-lg font-bold">Image Resizer</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Upload any photo or scan and download it under 30 KB or 50 KB.
          </p>

          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-teal-300 transition-colors">
            <Upload className="h-6 w-6 text-slate-400" />
            <span className="text-sm text-slate-600 text-center break-all">
              {imgFile ? `${imgFile.name} (${kb(imgFile.size)})` : "Tap to choose an image"}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImgFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <Button
              onClick={() => handleImage(30)}
              disabled={imgBusy !== null}
              className="h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold"
            >
              {imgBusy === 30 ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <ImageDown className="h-5 w-5 mr-2" />}
              Download under 30 KB
            </Button>
            <Button
              onClick={() => handleImage(50)}
              disabled={imgBusy !== null}
              className="h-12 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white font-bold"
            >
              {imgBusy === 50 ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <ImageDown className="h-5 w-5 mr-2" />}
              Download under 50 KB
            </Button>
          </div>
        </Card>

        <p className="text-xs text-slate-500 text-center">
          On iPhone, the share sheet opens after processing — tap "Save to Files" to keep the
          compressed file.
        </p>

        <p className="text-xs text-slate-400 text-center">

      </section>
    </main>
  );
}
