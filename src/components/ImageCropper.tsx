import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Crop, RotateCcw, Check } from "lucide-react";

type CropPreset = { id: string; label: string; w: number; h: number };

type Rect = { x: number; y: number; w: number; h: number };

interface Props {
  file: File;
  width: number;
  height: number;
  label: string;
  onCropped: (file: File) => void;
}

export default function ImageCropper({ file, width, height, label, onCropped }: Props) {
  const preset: CropPreset = { id: label.toLowerCase().replace(/\s+/g, "-"), label, w: width, h: height };
  const [src, setSrc] = useState<string>("");
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [size, setSize] = useState(80); // % of max fitting box
  const [rect, setRect] = useState<Rect>({ x: 0, y: 0, w: 0, h: 0 });
  const boxRef = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState({ w: 0, h: 0 });
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const layout = useCallback(
    (dw: number, dh: number, pct: number, p: CropPreset) => {
      const ar = p.w / p.h;
      let maxW = dw;
      let maxH = maxW / ar;
      if (maxH > dh) {
        maxH = dh;
        maxW = maxH * ar;
      }
      const w = (maxW * pct) / 100;
      const h = (maxH * pct) / 100;
      return { w, h };
    },
    []
  );

  const reset = useCallback(
    (dw: number, dh: number, pct: number, p: CropPreset) => {
      const { w, h } = layout(dw, dh, pct, p);
      setRect({ x: (dw - w) / 2, y: (dh - h) / 2, w, h });
    },
    [layout]
  );

  const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    const dw = img.clientWidth;
    const dh = img.clientHeight;
    setDisplay({ w: dw, h: dh });
    reset(dw, dh, size, preset);
  };

  useEffect(() => {
    if (display.w) reset(display.w, display.h, size, preset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, width, height, display.w, display.h]);

  const clamp = (r: Rect): Rect => ({
    ...r,
    x: Math.max(0, Math.min(r.x, display.w - r.w)),
    y: Math.max(0, Math.min(r.y, display.h - r.h)),
  });

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const b = boxRef.current!.getBoundingClientRect();
    drag.current = { dx: e.clientX - b.left - rect.x, dy: e.clientY - b.top - rect.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const b = boxRef.current!.getBoundingClientRect();
    setRect((r) => clamp({ ...r, x: e.clientX - b.left - drag.current!.dx, y: e.clientY - b.top - drag.current!.dy }));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const applyCrop = async () => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const scale = natural.w / display.w;
    const canvas = document.createElement("canvas");
    canvas.width = preset.w;
    canvas.height = preset.h;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      rect.x * scale,
      rect.y * scale,
      rect.w * scale,
      rect.h * scale,
      0,
      0,
      preset.w,
      preset.h
    );
    const blob: Blob = await new Promise((res) => canvas.toBlob((b) => res(b!), "image/jpeg", 0.95));
    const name = file.name.replace(/\.[^.]+$/, "") + `-${preset.id}.jpg`;
    onCropped(new File([blob], name, { type: "image/jpeg" }));
  };

  return (
    <div className="mt-4 rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Crop className="h-4 w-4 text-teal-600" />
        <h3 className="font-bold text-sm">Crop to {width} × {height} px</h3>
      </div>

      <div
        ref={boxRef}
        className="relative select-none touch-none mx-auto w-fit bg-slate-100 rounded-lg overflow-hidden"
      >
        {src && (
          <img
            src={src}
            alt="Selected upload preview for cropping"
            onLoad={onImgLoad}
            draggable={false}
            className="block max-h-[320px] w-auto max-w-full"
          />
        )}
        {rect.w > 0 && (
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
            className="absolute cursor-move border-2 border-teal-400 shadow-[0_0_0_9999px_rgba(15,23,42,0.45)]"
          />
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-600 mb-1">
          <span>Crop size</span>
          <span>{size}%</span>
        </div>
        <Slider value={[size]} min={20} max={100} step={1} onValueChange={(v) => setSize(v[0])} />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button
          variant="outline"
          className="h-11 rounded-xl font-semibold"
          onClick={() => reset(display.w, display.h, size, preset)}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Re-center
        </Button>
        <Button
          onClick={applyCrop}
          className="h-11 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold"
        >
          <Check className="h-4 w-4 mr-2" />
          Apply crop
        </Button>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Drag the box to position it, then tap Apply crop. Output: {preset.w} × {preset.h} px.
      </p>
    </div>
  );
}
