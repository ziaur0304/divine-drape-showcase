import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft, Download, FileImage, FileText, Loader2, Upload } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import pdfWorkerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { jsPDF } from "jspdf";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

type Result = { url: string; size: number; name: string; preview?: string };

/* ---------------- Image Resizer ---------------- */
function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [targetKb, setTargetKb] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const onPick = (f: File | null) => {
    setResult(null);
    setFile(f);
    if (f) {
      const img = new Image();
      img.onload = () => {
        setWidth(String(img.naturalWidth));
        setHeight(String(img.naturalHeight));
      };
      img.src = URL.createObjectURL(f);
    }
  };

  const run = async () => {
    if (!file) return toast.error("Please choose an image first.");
    setBusy(true);
    try {
      const bitmap = await createImageBitmap(file);
      let w = parseInt(width) || bitmap.width;
      let h = parseInt(height) || bitmap.height;
      w = Math.max(1, Math.min(w, 10000));
      h = Math.max(1, Math.min(h, 10000));

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(bitmap, 0, 0, w, h);

      const toBlob = (q: number) =>
        new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/jpeg", q));

      let blob = await toBlob(0.92);
      const target = parseInt(targetKb);
      if (target > 0) {
        const limit = target * 1024;
        let lo = 0.05;
        let hi = 0.95;
        for (let i = 0; i < 8; i++) {
          const mid = (lo + hi) / 2;
          const b = await toBlob(mid);
          if (b.size > limit) hi = mid;
          else {
            lo = mid;
            blob = b;
          }
        }
        if (blob.size > limit) {
          // downscale further to hit the target
          let scale = 0.85;
          while (blob.size > limit && scale > 0.15) {
            canvas.width = Math.max(1, Math.round(w * scale));
            canvas.height = Math.max(1, Math.round(h * scale));
            const c2 = canvas.getContext("2d")!;
            c2.fillStyle = "#ffffff";
            c2.fillRect(0, 0, canvas.width, canvas.height);
            c2.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
            blob = await toBlob(0.7);
            scale -= 0.15;
          }
        }
      }

      const url = URL.createObjectURL(blob);
      setResult({
        url,
        size: blob.size,
        name: file.name.replace(/\.[^.]+$/, "") + "-resized.jpg",
        preview: url,
      });
      toast.success("Image resized successfully.");
    } catch {
      toast.error("Could not process this image. Try a JPG or PNG file.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-semibold text-slate-700">Choose an image</Label>
        <label className="mt-2 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-6 cursor-pointer hover:bg-blue-50 transition-colors">
          <Upload className="h-6 w-6 text-blue-600" />
          <span className="text-sm text-slate-600 text-center break-all">
            {file ? file.name : "Tap to select a JPG or PNG"}
          </span>
          {file && <span className="text-xs text-slate-400">{formatSize(file.size)}</span>}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs font-semibold text-slate-600">Width (px)</Label>
          <Input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="e.g. 800"
            className="mt-1 rounded-xl h-12"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold text-slate-600">Height (px)</Label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 1000"
            className="mt-1 rounded-xl h-12"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold text-slate-600">
          Target file size in KB (optional)
        </Label>
        <Input
          type="number"
          value={targetKb}
          onChange={(e) => setTargetKb(e.target.value)}
          placeholder="e.g. 100"
          className="mt-1 rounded-xl h-12"
        />
        <p className="mt-1 text-xs text-slate-400">
          Useful for counselling portals that ask for photos under a fixed size.
        </p>
      </div>

      <Button
        onClick={run}
        disabled={busy || !file}
        className="w-full h-14 rounded-xl text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg"
      >
        {busy ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <FileImage className="h-5 w-5 mr-2" />}
        Resize Image
      </Button>

      {result && (
        <Card className="p-4 rounded-2xl border-slate-100 shadow-sm space-y-3">
          {result.preview && (
            <img
              src={result.preview}
              alt="Resized preview"
              className="w-full max-h-64 object-contain rounded-xl bg-slate-50"
            />
          )}
          <p className="text-sm text-slate-600 text-center">
            New size: <span className="font-bold text-slate-900">{formatSize(result.size)}</span>
          </p>
          <Button asChild className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold">
            <a href={result.url} download={result.name}>
              <Download className="h-5 w-5 mr-2" /> Download Image
            </a>
          </Button>
        </Card>
      )}
    </div>
  );
}

/* ---------------- PDF Resizer ---------------- */
function PdfResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [targetKb, setTargetKb] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const build = async (scale: number, quality: number) => {
    const pdfjs = await import("pdfjs-dist");
    const workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    const { jsPDF } = await import("jspdf");

    const data = await file!.arrayBuffer();
    const doc = await pdfjs.getDocument({ data }).promise;
    let out: InstanceType<typeof jsPDF> | null = null;

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport, canvas } as never).promise;
      const img = canvas.toDataURL("image/jpeg", quality);
      const orientation = canvas.width > canvas.height ? "landscape" : "portrait";
      if (!out) {
        out = new jsPDF({ orientation, unit: "px", format: [canvas.width, canvas.height] });
      } else {
        out.addPage([canvas.width, canvas.height], orientation);
      }
      out.addImage(img, "JPEG", 0, 0, canvas.width, canvas.height);
    }
    return out!.output("blob") as Blob;
  };

  const run = async () => {
    if (!file) return toast.error("Please choose a PDF first.");
    setBusy(true);
    try {
      const target = parseInt(targetKb);
      const steps: Array<[number, number]> = [
        [1.5, 0.8],
        [1.2, 0.65],
        [1.0, 0.55],
        [0.8, 0.45],
        [0.6, 0.35],
      ];
      let blob = await build(steps[0][0], steps[0][1]);
      if (target > 0) {
        const limit = target * 1024;
        for (let i = 1; i < steps.length && blob.size > limit; i++) {
          blob = await build(steps[i][0], steps[i][1]);
        }
        if (blob.size > limit) {
          toast.warning(
            `Smallest achievable size is ${formatSize(blob.size)} without losing readability.`
          );
        }
      }
      const url = URL.createObjectURL(blob);
      setResult({
        url,
        size: blob.size,
        name: file.name.replace(/\.[^.]+$/, "") + "-compressed.pdf",
      });
      toast.success("PDF compressed successfully.");
    } catch {
      toast.error("Could not process this PDF. It may be password protected.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-semibold text-slate-700">Choose a PDF</Label>
        <label className="mt-2 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/50 p-6 cursor-pointer hover:bg-rose-50 transition-colors">
          <Upload className="h-6 w-6 text-rose-600" />
          <span className="text-sm text-slate-600 text-center break-all">
            {file ? file.name : "Tap to select a PDF file"}
          </span>
          {file && <span className="text-xs text-slate-400">{formatSize(file.size)}</span>}
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              setResult(null);
              setFile(e.target.files?.[0] ?? null);
            }}
          />
        </label>
      </div>

      <div>
        <Label className="text-xs font-semibold text-slate-600">
          Target file size in KB (optional)
        </Label>
        <Input
          type="number"
          value={targetKb}
          onChange={(e) => setTargetKb(e.target.value)}
          placeholder="e.g. 500"
          className="mt-1 rounded-xl h-12"
        />
        <p className="mt-1 text-xs text-slate-400">
          Leave empty for a standard compression pass.
        </p>
      </div>

      <Button
        onClick={run}
        disabled={busy || !file}
        className="w-full h-14 rounded-xl text-base font-bold bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 shadow-lg"
      >
        {busy ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <FileText className="h-5 w-5 mr-2" />}
        Compress PDF
      </Button>

      {result && (
        <Card className="p-4 rounded-2xl border-slate-100 shadow-sm space-y-3">
          <p className="text-sm text-slate-600 text-center">
            New size: <span className="font-bold text-slate-900">{formatSize(result.size)}</span>
          </p>
          <Button asChild className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold">
            <a href={result.url} download={result.name}>
              <Download className="h-5 w-5 mr-2" /> Download PDF
            </a>
          </Button>
        </Card>
      )}
    </div>
  );
}

export default function Tools() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-blue-600 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <h1 className="text-base font-bold text-slate-900">File Tools</h1>
          <div className="w-14" />
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Photo &amp; PDF Resizer</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Resize and compress documents for counselling uploads. Everything runs in your browser —
            your files are never uploaded anywhere.
          </p>
        </div>

        <Card className="p-5 rounded-2xl border-slate-100 shadow-sm">
          <Tabs defaultValue="photo">
            <TabsList className="grid grid-cols-2 w-full rounded-xl h-11 mb-5">
              <TabsTrigger value="photo" className="rounded-lg text-sm font-semibold">
                Photo
              </TabsTrigger>
              <TabsTrigger value="pdf" className="rounded-lg text-sm font-semibold">
                PDF
              </TabsTrigger>
            </TabsList>
            <TabsContent value="photo">
              <ImageResizer />
            </TabsContent>
            <TabsContent value="pdf">
              <PdfResizer />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  );
}
