import React, { useState } from "react";
import { Fraction } from "../utils/fraction";
import { MathView } from "./MathView";
import { Layers } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

interface CompletingSquareGeometryProps {
  a: Fraction;
  b: Fraction;
  c: Fraction;
}

export const CompletingSquareGeometry: React.FC<CompletingSquareGeometryProps> = ({
  a,
  b,
  c,
}) => {
  const { t, lang } = useTranslation();
  const [isCompleted, setIsCompleted] = useState<boolean>(true);

  // If a is zero or invalid, do not render geometry
  if (!a || a.num === 0) {
    return null;
  }

  // Compute b/2a
  const bDivA = b.div(a);
  const halfB = bDivA.div(2);
  const halfBSq = halfB.mul(halfB);

  const cornerLabel = lang === "zh" ? "补齐小方块" : lang === "es" ? "Esquina añadida" : lang === "fr" ? "Coin ajouté" : lang === "pt" ? "Canto adicionado" : "Added Corner";
  const missingLabel = lang === "zh" ? "缺失角" : lang === "es" ? "Esquina faltante" : lang === "fr" ? "Coin manquant" : lang === "pt" ? "Canto ausente" : "Missing Corner";

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>{t.geomTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.geomSubtitle}
          </p>
        </div>

        {/* Interactive toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`px-3.5 py-1.5 min-h-[38px] text-xs sm:text-sm font-semibold rounded-lg transition-colors border ${
              isCompleted
                ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            }`}
          >
            {isCompleted ? t.geomToggleCompleted : t.geomToggleMissing}
          </button>
        </div>
      </div>

      {/* Interactive Visual Canvas Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left 6 cols: SVG Graphic */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50/70 rounded-xl border border-slate-200/80">
          <svg
            viewBox="0 0 320 320"
            className="w-full max-w-[280px] h-auto transition-all duration-500 ease-out"
          >
            {/* Main square: x * x */}
            <rect
              x="20"
              y="20"
              width="170"
              height="170"
              fill="#dbeafe"
              stroke="#3b82f6"
              strokeWidth="2"
              rx="4"
            />
            <text
              x="105"
              y="110"
              textAnchor="middle"
              className="font-serif text-lg font-bold fill-blue-900"
            >
              x²
            </text>
            <text
              x="105"
              y="130"
              textAnchor="middle"
              className="text-[11px] fill-blue-600"
            >
              x × x
            </text>

            {/* Right rectangle: (b/2a) * x */}
            <rect
              x="195"
              y="20"
              width="70"
              height="170"
              fill="#fef3c7"
              stroke="#f59e0b"
              strokeWidth="2"
              rx="4"
            />
            <text
              x="230"
              y="105"
              textAnchor="middle"
              className="font-serif text-xs font-bold fill-amber-900"
            >
              (b/2a)x
            </text>

            {/* Bottom rectangle: x * (b/2a) */}
            <rect
              x="20"
              y="195"
              width="170"
              height="70"
              fill="#fef3c7"
              stroke="#f59e0b"
              strokeWidth="2"
              rx="4"
            />
            <text
              x="105"
              y="235"
              textAnchor="middle"
              className="font-serif text-xs font-bold fill-amber-900"
            >
              (b/2a)x
            </text>

            {/* Bottom-right Corner: Completed vs Missing */}
            {isCompleted ? (
              <g className="transition-opacity duration-300">
                <rect
                  x="195"
                  y="195"
                  width="70"
                  height="70"
                  fill="#d1fae5"
                  stroke="#10b981"
                  strokeWidth="2"
                  rx="4"
                />
                <text
                  x="230"
                  y="230"
                  textAnchor="middle"
                  className="font-serif text-[11px] font-bold fill-emerald-800"
                >
                  (b/2a)²
                </text>
                <text
                  x="230"
                  y="248"
                  textAnchor="middle"
                  className="text-[9px] fill-emerald-600 font-medium"
                >
                  {cornerLabel}
                </text>
              </g>
            ) : (
              <g className="transition-opacity duration-300">
                <rect
                  x="195"
                  y="195"
                  width="70"
                  height="70"
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  rx="4"
                />
                <text
                  x="230"
                  y="235"
                  textAnchor="middle"
                  className="text-[11px] fill-slate-400 font-medium"
                >
                  {missingLabel}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Right 6 cols: Geometric Explanation */}
        <div className="md:col-span-6 space-y-3.5 text-xs sm:text-sm text-slate-700">
          <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-lg text-blue-950 leading-relaxed">
            <span className="font-bold block mb-1">{t.geomExplanationTitle}</span>
            {t.geomExplanationBody}
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
            <div className="font-bold text-slate-900 text-sm">
              {t.geomWhyAddTitle}
            </div>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {t.geomWhyAddBody}
            </p>
            <div className="bg-white p-2.5 rounded border border-slate-200 font-serif text-slate-900 text-center text-sm md:text-base">
              <MathView math={`x^2 + ${bDivA.toTex()}x + \\left(${halfB.toTex()}\\right)^2 = \\left(x + ${halfB.toTex()}\\right)^2`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
