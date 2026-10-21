import React, { useRef, useEffect, useState } from "react";
import { Fraction } from "../utils/fraction";
import { useTranslation } from "../i18n/LanguageContext";

interface ParabolaCanvasProps {
  a: Fraction;
  b: Fraction;
  c: Fraction;
  roots: number[];
  vertexX: number;
  vertexY: number;
}

export const ParabolaCanvas: React.FC<ParabolaCanvasProps> = ({
  a,
  b,
  c,
  roots,
  vertexX,
  vertexY,
}) => {
  const { t, lang } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number; px: number; py: number } | null>(null);

  const aVal = a.toNumber();
  const bVal = b.toNumber();
  const cVal = c.toNumber();

  const vertexWord = lang === "zh" ? "顶点" : lang === "es" ? "Vértice" : lang === "fr" ? "Sommet" : lang === "pt" ? "Vértice" : "Vertex";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!Number.isFinite(vertexX) || !Number.isFinite(vertexY) || !Number.isFinite(aVal) || !Number.isFinite(bVal) || !Number.isFinite(cVal) || aVal === 0) {
      return;
    }

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 480;
    const height = rect.height || 320;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Determine coordinate bounds
    let minX = vertexX - 5;
    let maxX = vertexX + 5;
    if (roots.length > 0) {
      minX = Math.min(minX, ...roots) - 1.5;
      maxX = Math.max(maxX, ...roots) + 1.5;
    }
    minX = Math.min(minX, -2);
    maxX = Math.max(maxX, 2);

    const yAtMin = aVal * minX * minX + bVal * minX + cVal;
    const yAtMax = aVal * maxX * maxX + bVal * maxX + cVal;
    let minY = Math.min(vertexY, 0, cVal, yAtMin, yAtMax);
    let maxY = Math.max(vertexY, 0, cVal, yAtMin, yAtMax);

    // Add padding to Y
    const yPadding = Math.max(Math.abs(maxY - minY) * 0.25, 4);
    minY -= yPadding;
    maxY += yPadding;

    const spanX = maxX - minX || 1;
    const spanY = maxY - minY || 1;

    const toCanvasX = (x: number) => ((x - minX) / spanX) * width;
    const toCanvasY = (y: number) => height - ((y - minY) / spanY) * height;

    // Clear background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#f1f5f9"; // Slate 100
    const stepX = Math.max(1, Math.round(spanX / 10));
    const startGridX = Math.floor(minX / stepX) * stepX;
    for (let gx = startGridX; gx <= maxX; gx += stepX) {
      const cx = toCanvasX(gx);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
    }

    const stepY = Math.max(1, Math.round(spanY / 8));
    const startGridY = Math.floor(minY / stepY) * stepY;
    for (let gy = startGridY; gy <= maxY; gy += stepY) {
      const cy = toCanvasY(gy);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();
    }

    // Draw Axes (X and Y)
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#94a3b8"; // Slate 400

    // X Axis
    const originY = toCanvasY(0);
    if (originY >= 0 && originY <= height) {
      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
      ctx.stroke();
      // Arrow
      ctx.fillStyle = "#64748b";
      ctx.beginPath();
      ctx.moveTo(width - 6, originY - 3);
      ctx.lineTo(width, originY);
      ctx.lineTo(width - 6, originY + 3);
      ctx.fill();
      ctx.font = "bold 11px system-ui";
      ctx.fillText("x", width - 12, originY - 6);
    }

    // Y Axis
    const originX = toCanvasX(0);
    if (originX >= 0 && originX <= width) {
      ctx.beginPath();
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, height);
      ctx.stroke();
      // Arrow
      ctx.fillStyle = "#64748b";
      ctx.beginPath();
      ctx.moveTo(originX - 3, 6);
      ctx.lineTo(originX, 0);
      ctx.lineTo(originX + 3, 6);
      ctx.fill();
      ctx.font = "bold 11px system-ui";
      ctx.fillText("y", originX + 8, 12);
    }

    // Draw Axis of Symmetry
    const axisCanvasX = toCanvasX(vertexX);
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#f87171"; // Red 400
    ctx.beginPath();
    ctx.moveTo(axisCanvasX, 0);
    ctx.lineTo(axisCanvasX, height);
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash

    // Plot Parabola curve
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#2563eb"; // Blue 600
    ctx.beginPath();

    const segments = 120;
    for (let i = 0; i <= segments; i++) {
      const curX = minX + (i / segments) * spanX;
      const curY = aVal * curX * curX + bVal * curX + cVal;
      const cX = toCanvasX(curX);
      const cY = toCanvasY(curY);

      if (i === 0) {
        ctx.moveTo(cX, cY);
      } else {
        ctx.lineTo(cX, cY);
      }
    }
    ctx.stroke();

    // Draw vertex
    const cvx = toCanvasX(vertexX);
    const cvy = toCanvasY(vertexY);
    ctx.fillStyle = "#dc2626"; // Crimson
    ctx.beginPath();
    ctx.arc(cvx, cvy, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1e293b";
    ctx.font = "11px system-ui";
    ctx.textAlign = "center";
    const vOffset = aVal > 0 ? 14 : -8;
    ctx.fillText(`${vertexWord} (${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`, cvx, cvy + vOffset);

    // Draw roots (x-intercepts)
    roots.forEach((r, idx) => {
      const rx = toCanvasX(r);
      const ry = toCanvasY(0);
      ctx.fillStyle = "#059669"; // Emerald
      ctx.beginPath();
      ctx.arc(rx, ry, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#065f46";
      ctx.font = "bold 11px system-ui";
      ctx.fillText(`x${idx + 1}=${r.toFixed(2)}`, rx, ry - 8);
    });

    // Draw y-intercept (0, c)
    const yIntX = toCanvasX(0);
    const yIntY = toCanvasY(cVal);
    if (Math.abs(cVal) > 0.001 || roots.length === 0) {
      ctx.fillStyle = "#d97706"; // Amber
      ctx.beginPath();
      ctx.arc(yIntX, yIntY, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#78350f";
      ctx.font = "10px system-ui";
      ctx.textAlign = "left";
      ctx.fillText(`(0, ${cVal.toFixed(2)})`, yIntX + 6, yIntY + 4);
    }
  }, [aVal, bVal, cVal, roots, vertexX, vertexY, vertexWord]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    let minX = vertexX - 5;
    let maxX = vertexX + 5;
    if (roots.length > 0) {
      minX = Math.min(minX, ...roots) - 1.5;
      maxX = Math.max(maxX, ...roots) + 1.5;
    }
    minX = Math.min(minX, -2);
    maxX = Math.max(maxX, 2);
    const spanX = maxX - minX;

    const xVal = minX + (px / rect.width) * spanX;
    const yVal = aVal * xVal * xVal + bVal * xVal + cVal;

    setHoverCoord({ x: xVal, y: yVal, px, py });
  };

  const handleMouseLeave = () => {
    setHoverCoord(null);
  };

  return (
    <div className="relative border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
      <div className="px-3.5 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500 bg-slate-50/70">
        <span className="font-semibold text-slate-800">{t.parabolaCardTitle}</span>
        <div className="flex items-center gap-3 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600" />
            <span>{t.parabolaVertex}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>{t.parabolaRoots}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span>{t.parabolaYIntercept}</span>
          </span>
        </div>
      </div>
      <div className="relative w-full h-64">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full block cursor-crosshair"
        />
        {hoverCoord && (
          <div
            className="absolute pointer-events-none bg-slate-900/90 text-white text-xs px-2.5 py-1 rounded shadow-md transform -translate-x-1/2 -translate-y-8 font-mono"
            style={{ left: hoverCoord.px, top: hoverCoord.py }}
          >
            x: {hoverCoord.x.toFixed(2)}, y: {hoverCoord.y.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};
