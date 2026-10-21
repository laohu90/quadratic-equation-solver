import React, { useState, useMemo, useEffect } from "react";
import { Fraction, parseNumberOrFraction } from "../utils/fraction";
import { solveQuadratic, QuadraticResult } from "../utils/quadraticSolver";
import { formatSolutionToPlainText } from "../utils/textExporter";
import { parseFreeEquation } from "../utils/equationParser";
import { MathView } from "./MathView";
import { ParabolaCanvas } from "./ParabolaCanvas";
import { CompletingSquareGeometry } from "./CompletingSquareGeometry";
import { CustomExpressionEvaluator } from "./CustomExpressionEvaluator";
import { useTranslation } from "../i18n/LanguageContext";
import {
  Check,
  Copy,
  RotateCcw,
  FileText,
  Sparkles,
  History,
  Trash2,
} from "lucide-react";

interface PresetEquation {
  label: string;
  sub: string;
  a: string;
  b: string;
  c: string;
}

export const EquationSolverView: React.FC = () => {
  const { t, lang } = useTranslation();

  const [inputA, setInputA] = useState<string>("1");
  const [inputB, setInputB] = useState<string>("-5");
  const [inputC, setInputC] = useState<string>("6");
  const [freeTextEq, setFreeTextEq] = useState<string>("");
  const [parseNotice, setParseNotice] = useState<string | null>(null);

  const [activeStepTab, setActiveStepTab] = useState<"completing" | "vieta" | "formula" | "factoring">("completing");
  const [copiedTex, setCopiedTex] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // History & Favorites stored in localStorage
  const [historyList, setHistoryList] = useState<{ a: string; b: string; c: string; tex: string }[]>(() => {
    try {
      const saved = localStorage.getItem("vieta_solver_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const PRESETS: PresetEquation[] = useMemo(() => {
    if (lang === "en") {
      return [
        { label: "Classic Factoring", sub: "Roots: 2, 3", a: "1", b: "-5", c: "6" },
        { label: "Fractional Roots", sub: "Roots: 1/2, -4", a: "2", b: "7", c: "-4" },
        { label: "Radical Roots", sub: "Roots: 2 ± √3", a: "1", b: "-4", c: "1" },
        { label: "Repeated Root", sub: "Δ = 0, Tangent", a: "1", b: "-6", c: "9" },
        { label: "Fraction Coefficient", sub: "Leading a=3", a: "3", b: "-5", c: "1" },
        { label: "No Real Roots", sub: "Δ < 0, Complex", a: "1", b: "2", c: "5" },
      ];
    } else if (lang === "es") {
      return [
        { label: "Factorización Clásica", sub: "Raíces: 2, 3", a: "1", b: "-5", c: "6" },
        { label: "Raíces Fraccionarias", sub: "Raíces: 1/2, -4", a: "2", b: "7", c: "-4" },
        { label: "Raíces Radicales", sub: "Raíces: 2 ± √3", a: "1", b: "-4", c: "1" },
        { label: "Raíz Doble", sub: "Δ = 0, Tangente", a: "1", b: "-6", c: "9" },
        { label: "Coeficiente a > 1", sub: "a=3", a: "3", b: "-5", c: "1" },
        { label: "Sin Raíces Reales", sub: "Δ < 0", a: "1", b: "2", c: "5" },
      ];
    } else if (lang === "fr") {
      return [
        { label: "Factorisation Simple", sub: "Racines : 2, 3", a: "1", b: "-5", c: "6" },
        { label: "Racines Rationnelles", sub: "Racines : 1/2, -4", a: "2", b: "7", c: "-4" },
        { label: "Racines avec Radicaux", sub: "Racines : 2 ± √3", a: "1", b: "-4", c: "1" },
        { label: "Racine Double", sub: "Δ = 0, Tangente", a: "1", b: "-6", c: "9" },
        { label: "Coefficient a > 1", sub: "a=3", a: "3", b: "-5", c: "1" },
        { label: "Aucune Racine Réelle", sub: "Δ < 0", a: "1", b: "2", c: "5" },
      ];
    } else if (lang === "pt") {
      return [
        { label: "Fatoração Simples", sub: "Raízes: 2, 3", a: "1", b: "-5", c: "6" },
        { label: "Raízes Fracionárias", sub: "Raízes: 1/2, -4", a: "2", b: "7", c: "-4" },
        { label: "Raízes Irracionais", sub: "Raízes: 2 ± √3", a: "1", b: "-4", c: "1" },
        { label: "Raiz Dupla", sub: "Δ = 0, Tangente", a: "1", b: "-6", c: "9" },
        { label: "Coeficiente a > 1", sub: "a=3", a: "3", b: "-5", c: "1" },
        { label: "Sem Raízes Reais", sub: "Δ < 0", a: "1", b: "2", c: "5" },
      ];
    }
    return [
      { label: "十字相乘经典", sub: "两根为 2, 3", a: "1", b: "-5", c: "6" },
      { label: "带分数根", sub: "两根为 1/2, -4", a: "2", b: "7", c: "-4" },
      { label: "无理共轭根", sub: "两根为 2 ± √3", a: "1", b: "-4", c: "1" },
      { label: "两根相等 (重根)", sub: "Δ = 0，切于 x 轴", a: "1", b: "-6", c: "9" },
      { label: "带分数二次项", sub: "系数 a=3", a: "3", b: "-5", c: "1" },
      { label: "无实数根 (虚根)", sub: "Δ < 0，全在 x 轴上方", a: "1", b: "2", c: "5" },
    ];
  }, [lang]);

  // Parse fractions
  const fracA = useMemo(() => parseNumberOrFraction(inputA), [inputA]);
  const fracB = useMemo(() => parseNumberOrFraction(inputB), [inputB]);
  const fracC = useMemo(() => parseNumberOrFraction(inputC), [inputC]);

  const isValidInput = fracA !== null && fracB !== null && fracC !== null && fracA.num !== 0;

  const calculationResult: QuadraticResult | null = useMemo(() => {
    if (!isValidInput || !fracA || !fracB || !fracC) return null;
    try {
      return solveQuadratic(fracA, fracB, fracC, lang);
    } catch {
      return null;
    }
  }, [isValidInput, fracA, fracB, fracC, lang]);

  // Save to history when equation is valid
  useEffect(() => {
    if (calculationResult && isValidInput) {
      setHistoryList((prev) => {
        const key = `${inputA}_${inputB}_${inputC}`;
        const filtered = prev.filter((item) => `${item.a}_${item.b}_${item.c}` !== key);
        const next = [{ a: inputA, b: inputB, c: inputC, tex: calculationResult.standardEquationTex }, ...filtered].slice(0, 8);
        try {
          localStorage.setItem("vieta_solver_history", JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    }
  }, [calculationResult, isValidInput, inputA, inputB, inputC]);

  const handleCopyEquation = (tex: string) => {
    try {
      navigator.clipboard?.writeText(tex)?.catch?.(() => {});
    } catch {
      // ignore
    }
    setCopiedTex(tex);
    setTimeout(() => setCopiedTex(null), 1800);
  };

  const handleCopyReport = () => {
    if (!calculationResult) return;
    const text = formatSolutionToPlainText(calculationResult, lang);
    try {
      navigator.clipboard?.writeText(text)?.catch?.(() => {});
    } catch {
      // ignore
    }
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handleApplyPreset = (p: PresetEquation) => {
    setInputA(p.a);
    setInputB(p.b);
    setInputC(p.c);
    setParseNotice(null);
  };

  const handleReset = () => {
    setInputA("1");
    setInputB("-5");
    setInputC("6");
    setFreeTextEq("");
    setParseNotice(null);
  };

  const handleClearHistory = () => {
    setHistoryList([]);
    try {
      localStorage.removeItem("vieta_solver_history");
    } catch {
      // ignore
    }
  };

  // Natural equation parser handler
  const handleParseFreeEquation = () => {
    if (!freeTextEq.trim()) return;
    const parsed = parseFreeEquation(freeTextEq);
    if (parsed) {
      setInputA(parsed.a.toString());
      setInputB(parsed.b.toString());
      setInputC(parsed.c.toString());
      setParseNotice(`${t.naturalParseSuccess} ${parsed.normalizedTex}`);
    } else {
      setParseNotice(t.naturalParseError);
    }
  };

  // Humanized coefficient helpers
  const adjustCoeff = (currentVal: string, delta: number, setter: (val: string) => void) => {
    const parsed = parseFloat(currentVal);
    if (isNaN(parsed)) {
      setter(`${delta}`);
      return;
    }
    const newVal = Math.round((parsed + delta) * 100) / 100;
    setter(`${newVal}`);
  };

  const toggleSign = (currentVal: string, setter: (val: string) => void) => {
    if (!currentVal.trim()) return;
    if (currentVal.startsWith("-")) {
      setter(currentVal.substring(1));
    } else {
      setter("-" + currentVal);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Intelligent Natural Parser Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <label className="text-sm md:text-base font-semibold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{t.naturalInputTitle}</span>
          </label>
          <span className="text-xs text-slate-400">
            {t.naturalInputHelp}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <input
            type="text"
            value={freeTextEq}
            onChange={(e) => setFreeTextEq(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleParseFreeEquation()}
            placeholder={t.naturalInputPlaceholder}
            className="flex-1 px-4 py-2.5 text-sm md:text-base font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
          />
          <button
            type="button"
            onClick={handleParseFreeEquation}
            className="px-5 py-2.5 min-h-[42px] text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            {t.naturalParseBtn}
          </button>
        </div>

        {parseNotice && (
          <div className="mt-3 text-xs md:text-sm text-blue-900 bg-blue-50/70 border border-blue-200/60 p-2.5 rounded-md font-mono">
            {parseNotice}
          </div>
        )}
      </div>

      {/* 2. Structured Coefficient Input & Workspace */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
              {t.solverHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t.solverSubheading}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.resetBtn}</span>
            </button>
          </div>
        </div>

        {/* Input Boxes with Mobile-Friendly Quick Adjusters */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Coefficient a */}
          <div className="space-y-2 p-3.5 bg-slate-50/60 rounded-xl border border-slate-200/60">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                {t.coeffA} <span className="text-red-500 ml-1 font-normal">* (a ≠ 0)</span>
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleSign(inputA, setInputA)}
                  title="Toggle sign"
                  className="px-2 py-1 text-xs font-mono text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  ±
                </button>
                <button
                  type="button"
                  onClick={() => adjustCoeff(inputA, -1, setInputA)}
                  title="-1"
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => adjustCoeff(inputA, 1, setInputA)}
                  title="+1"
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={inputA}
                onChange={(e) => setInputA(e.target.value)}
                placeholder="1"
                className={`w-full px-3.5 py-2.5 text-base font-mono bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 transition-colors ${
                  fracA === null || fracA.num === 0 ? "border-red-300 bg-red-50/30" : "border-slate-200 focus:border-slate-400"
                }`}
              />
              <span className="absolute right-3.5 top-3 text-sm text-slate-400 font-serif italic font-medium">x²</span>
            </div>
            {fracA?.num === 0 && (
              <p className="text-xs text-red-600 font-medium">{t.aNonZeroError}</p>
            )}
          </div>

          {/* Coefficient b */}
          <div className="space-y-2 p-3.5 bg-slate-50/60 rounded-xl border border-slate-200/60">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                {t.coeffB}
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleSign(inputB, setInputB)}
                  title="Toggle sign"
                  className="px-2 py-1 text-xs font-mono text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  ±
                </button>
                <button
                  type="button"
                  onClick={() => adjustCoeff(inputB, -1, setInputB)}
                  title="-1"
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => adjustCoeff(inputB, 1, setInputB)}
                  title="+1"
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={inputB}
                onChange={(e) => setInputB(e.target.value)}
                placeholder="-5"
                className={`w-full px-3.5 py-2.5 text-base font-mono bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 transition-colors ${
                  fracB === null ? "border-red-300 bg-red-50/30" : "border-slate-200 focus:border-slate-400"
                }`}
              />
              <span className="absolute right-3.5 top-3 text-sm text-slate-400 font-serif italic font-medium">x</span>
            </div>
          </div>

          {/* Coefficient c */}
          <div className="space-y-2 p-3.5 bg-slate-50/60 rounded-xl border border-slate-200/60">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                {t.coeffC}
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleSign(inputC, setInputC)}
                  title="Toggle sign"
                  className="px-2 py-1 text-xs font-mono text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  ±
                </button>
                <button
                  type="button"
                  onClick={() => adjustCoeff(inputC, -1, setInputC)}
                  title="-1"
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => adjustCoeff(inputC, 1, setInputC)}
                  title="+1"
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={inputC}
                onChange={(e) => setInputC(e.target.value)}
                placeholder="6"
                className={`w-full px-3.5 py-2.5 text-base font-mono bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 transition-colors ${
                  fracC === null ? "border-red-300 bg-red-50/30" : "border-slate-200 focus:border-slate-400"
                }`}
              />
              <span className="absolute right-3.5 top-3 text-xs text-slate-400 font-serif italic">const</span>
            </div>
          </div>
        </div>

        {/* Quick Presets row */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm text-slate-500 font-medium whitespace-nowrap">{t.presetsLabel}</span>
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(p)}
                className="px-3 py-1.5 min-h-[36px] text-xs sm:text-sm text-slate-700 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors whitespace-nowrap"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Recent History quick buttons */}
          {historyList.length > 0 && (
            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <span className="text-xs sm:text-sm text-slate-400 flex items-center gap-1">
                <History className="w-3.5 h-3.5" />
                <span>{t.recentHistory}</span>
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[280px]">
                {historyList.slice(0, 3).map((h, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputA(h.a);
                      setInputB(h.b);
                      setInputC(h.c);
                    }}
                    className="px-2.5 py-1 text-xs font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 whitespace-nowrap"
                  >
                    {h.a}x²{parseFloat(h.b) >= 0 ? "+" : ""}{h.b}x{parseFloat(h.c) >= 0 ? "+" : ""}{h.c}=0
                  </button>
                ))}
              </div>
              <button
                onClick={handleClearHistory}
                title="Clear history"
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Results Display */}
      {calculationResult ? (
        <div className="space-y-6">
          {/* Top Formula Header with Export Features */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs sm:text-sm text-slate-500 font-medium">{t.targetEquation}</span>
                <div className="mt-1 flex items-center gap-3">
                  <div className="text-2xl md:text-3xl font-serif text-slate-900 font-semibold">
                    <MathView math={calculationResult.standardEquationTex} />
                  </div>
                  <button
                    onClick={() => handleCopyEquation(calculationResult.standardEquationTex)}
                    title="Copy LaTeX"
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {copiedTex === calculationResult.standardEquationTex ? (
                      <Check className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Status summary tag & One-click report export */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyReport}
                  className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 shadow-2xs"
                >
                  {copiedReport ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">{t.reportCopied}</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 text-slate-500" />
                      <span>{t.copyReportBtn}</span>
                    </>
                  )}
                </button>

                <span
                  className={`inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-semibold rounded-lg border ${
                    calculationResult.deltaClassification === "two_distinct_real"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : calculationResult.deltaClassification === "two_equal_real"
                      ? "bg-blue-50 text-blue-800 border-blue-200"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  }`}
                >
                  <span>
                    {calculationResult.deltaClassification === "two_distinct_real"
                      ? t.twoDistinctReal
                      : calculationResult.deltaClassification === "two_equal_real"
                      ? t.twoEqualReal
                      : t.noRealRoots}
                  </span>
                </span>
              </div>
            </div>

            {/* Core 4 KPI Grid (Vieta & Discriminant) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {/* Δ card */}
              <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-xs sm:text-sm text-slate-500 flex items-center justify-between font-medium">
                  <span>{t.discriminantLabel}</span>
                  <span className="font-mono text-xs text-slate-400">{t.discriminantFormula}</span>
                </div>
                <div className="mt-2 text-xl font-bold text-slate-900">
                  <MathView math={`\\Delta = ${calculationResult.deltaTex}`} />
                </div>
                <div className="text-xs text-slate-500 mt-1.5">
                  <MathView math={calculationResult.deltaExplanation} />
                </div>
              </div>

              {/* Sum of roots Card */}
              <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-xs sm:text-sm text-slate-500 flex items-center justify-between font-medium">
                  <span>{t.sumRootsLabel}</span>
                  <span className="font-mono text-xs text-slate-400">-b/a</span>
                </div>
                <div className="mt-2 text-xl font-bold text-slate-900">
                  <MathView math={`x_1 + x_2 = ${calculationResult.sumOfRoots.toTex()}`} />
                </div>
                <div className="text-xs text-slate-500 mt-1.5 font-mono">
                  {t.numValue} {calculationResult.sumOfRoots.toNumber().toFixed(4)}
                </div>
              </div>

              {/* Product of roots Card */}
              <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-xs sm:text-sm text-slate-500 flex items-center justify-between font-medium">
                  <span>{t.prodRootsLabel}</span>
                  <span className="font-mono text-xs text-slate-400">c/a</span>
                </div>
                <div className="mt-2 text-xl font-bold text-slate-900">
                  <MathView math={`x_1 \\cdot x_2 = ${calculationResult.productOfRoots.toTex()}`} />
                </div>
                <div className="text-xs text-slate-500 mt-1.5 font-mono">
                  {t.numValue} {calculationResult.productOfRoots.toNumber().toFixed(4)}
                </div>
              </div>

              {/* Solved Roots Card */}
              <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="text-xs sm:text-sm text-slate-500 flex items-center justify-between font-medium">
                  <span>{t.exactRootsLabel}</span>
                  <span className="font-mono text-xs text-slate-400">Formula</span>
                </div>
                <div className="mt-2 text-base md:text-lg font-bold text-slate-900 space-y-1">
                  <div>
                    <MathView math={calculationResult.roots.exactTex1} />
                  </div>
                  {calculationResult.deltaClassification === "two_distinct_real" && (
                    <div>
                      <MathView math={calculationResult.roots.exactTex2} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column Split: Detailed Step-by-Step Solving vs Function Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 cols: Step-by-step Tabs */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {t.stepsHeading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {t.stepsSubheading}
                  </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
                  <button
                    onClick={() => setActiveStepTab("completing")}
                    className={`px-3 py-1.5 min-h-[36px] text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      activeStepTab === "completing"
                        ? "bg-white text-slate-900 shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t.tabCompleting}
                  </button>
                  <button
                    onClick={() => setActiveStepTab("vieta")}
                    className={`px-3 py-1.5 min-h-[36px] text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      activeStepTab === "vieta"
                        ? "bg-white text-slate-900 shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t.tabVieta}
                  </button>
                  <button
                    onClick={() => setActiveStepTab("formula")}
                    className={`px-3 py-1.5 min-h-[36px] text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      activeStepTab === "formula"
                        ? "bg-white text-slate-900 shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t.tabFormula}
                  </button>
                  <button
                    onClick={() => setActiveStepTab("factoring")}
                    className={`px-3 py-1.5 min-h-[36px] text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      activeStepTab === "factoring"
                        ? "bg-white text-slate-900 shadow-xs font-semibold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t.tabFactoring}
                  </button>
                </div>
              </div>

              {/* Tab 1: Completing the Square */}
              {activeStepTab === "completing" && (
                <div className="mt-5 space-y-4">
                  <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
                    {t.completingMnemonic}
                  </div>

                  <div className="space-y-3">
                    {calculationResult.completingSquareSteps.map((step) => (
                      <div
                        key={step.stepIndex}
                        className="p-4 sm:p-5 bg-slate-50/80 rounded-xl border border-slate-200/70"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-800 text-white text-xs font-bold">
                            {step.stepIndex}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-slate-900">
                            {step.title}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 mb-2 pl-8.5 leading-relaxed">
                          {step.description}
                        </p>
                        <div className="pl-8.5 bg-white p-3 rounded-lg border border-slate-200/60 font-serif text-slate-900 text-sm sm:text-base overflow-x-auto">
                          <MathView math={step.mathTex} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Vieta's Theorem Deduction */}
              {activeStepTab === "vieta" && (
                <div className="mt-5 space-y-4">
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
                    Vieta&apos;s Formulas: For ax² + bx + c = 0 (a ≠ 0) with roots x₁, x₂, the sum of roots is -b/a and the product of roots is c/a.
                  </div>

                  {/* Deduction steps */}
                  <div className="space-y-3">
                    <div className="p-4 sm:p-5 bg-slate-50/80 rounded-xl border border-slate-200/70">
                      <div className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                        1. Sum of Roots from the Quadratic Formula
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mb-2.5">
                        Add the two conjugate radical solutions, cancelling the square root terms:
                      </p>
                      <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-serif text-slate-900 text-xs sm:text-sm overflow-x-auto">
                        <MathView math="x_1 + x_2 = \frac{-b + \sqrt{\Delta}}{2a} + \frac{-b - \sqrt{\Delta}}{2a} = \frac{-2b}{2a} = -\frac{b}{a}" />
                      </div>
                      <div className="mt-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                        Current equation substitution: <MathView math={calculationResult.sumOfRootsTex} />
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 bg-slate-50/80 rounded-xl border border-slate-200/70">
                      <div className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                        2. Product of Roots from the Quadratic Formula
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 mb-2.5">
                        Multiply the solutions using the difference of squares (m+n)(m-n) = m² - n²:
                      </p>
                      <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-serif text-slate-900 text-xs sm:text-sm overflow-x-auto">
                        <MathView math="x_1 \cdot x_2 = \frac{(-b + \sqrt{\Delta})(-b - \sqrt{\Delta})}{4a^2} = \frac{b^2 - (b^2 - 4ac)}{4a^2} = \frac{4ac}{4a^2} = \frac{c}{a}" />
                      </div>
                      <div className="mt-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                        Current equation substitution: <MathView math={calculationResult.productOfRootsTex} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Quadratic Formula */}
              {activeStepTab === "formula" && (
                <div className="mt-5 space-y-4">
                  <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-xl text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                    Quadratic Formula: <MathView math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
                  </div>

                  <div className="space-y-3">
                    {calculationResult.formulaSteps.map((step) => (
                      <div
                        key={step.stepIndex}
                        className="p-4 sm:p-5 bg-slate-50/80 rounded-xl border border-slate-200/70"
                      >
                        <div className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                          Step {step.stepIndex}: {step.title}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 mb-2 leading-relaxed">
                          {step.description}
                        </p>
                        <div className="bg-white p-3 rounded-lg border border-slate-200/60 font-serif text-slate-900 text-xs sm:text-sm overflow-x-auto">
                          <MathView math={step.mathTex} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Factoring Check */}
              {activeStepTab === "factoring" && (
                <div className="mt-5 space-y-4">
                  <div className="p-3.5 bg-slate-100 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    Factoring &amp; Cross Multiplication: Splits quadratic and constant terms into factors and verifies cross products.
                  </div>

                  {calculationResult.factoring.canFactorIntegers && calculationResult.factoring.crossDiagram ? (
                    <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-4">
                      <div className="text-xs sm:text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Integer Factoring Verified Successfully</span>
                      </div>

                      {/* Visual Cross Multiplication Diagram */}
                      <div className="p-5 bg-white rounded-xl border border-slate-200 flex flex-col items-center">
                        <span className="text-xs sm:text-sm text-slate-500 mb-3 font-medium">Cross Multiplication Diagram</span>
                        <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-center font-mono text-base sm:text-lg font-bold text-slate-800">
                          <div>{calculationResult.factoring.crossDiagram.p}x</div>
                          <div className="text-slate-400 font-sans text-xs">Cross</div>
                          <div>{calculationResult.factoring.crossDiagram.q}</div>

                          <div className="col-span-3 flex items-center justify-center text-slate-400">
                            <span className="text-sm font-sans">✕</span>
                          </div>

                          <div>{calculationResult.factoring.crossDiagram.r}x</div>
                          <div className="text-slate-400 font-sans text-xs">Cross</div>
                          <div>{calculationResult.factoring.crossDiagram.s}</div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700 text-center font-mono">
                          {calculationResult.factoring.crossDiagram.p}x · {calculationResult.factoring.crossDiagram.s} + {calculationResult.factoring.crossDiagram.r}x · {calculationResult.factoring.crossDiagram.q} = {calculationResult.factoring.crossDiagram.crossSum}x
                        </div>
                      </div>

                      <div className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm">
                        <span className="text-slate-500">Factored Form:</span>
                        <div className="text-lg font-serif font-bold text-slate-900 mt-1">
                          <MathView math={calculationResult.factoring.factorsTex || ""} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/70 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {calculationResult.factoring.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right 5 cols: Parabola Graph and Geometric Features */}
            <div className="lg:col-span-5 space-y-4">
              <ParabolaCanvas
                a={calculationResult.a}
                b={calculationResult.b}
                c={calculationResult.c}
                roots={calculationResult.parabola.roots}
                vertexX={calculationResult.parabola.vertexX}
                vertexY={calculationResult.parabola.vertexY}
              />

              {/* Parabola Metric Summary */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-3.5">
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  {t.parabolaGeometryTitle}
                </h4>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">{t.parabolaOpening}</span>
                    <span className="font-semibold text-slate-800">
                      {calculationResult.parabola.opensUp ? t.parabolaOpensUp : t.parabolaOpensDown}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">{t.axisOfSymmetry}</span>
                    <span className="font-serif font-semibold text-slate-800">
                      <MathView math={calculationResult.parabola.axisOfSymmetryTex} />
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">{t.vertexCoords}</span>
                    <span className="font-serif font-semibold text-slate-800">
                      <MathView math={calculationResult.parabola.vertexTex} />
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-slate-500">{t.yInterceptPoint}</span>
                    <span className="font-mono text-slate-800 font-medium">
                      (0, {calculationResult.parabola.yIntercept.toFixed(2)})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Completing Square Interactive Geometry Visualizer */}
          <CompletingSquareGeometry
            a={calculationResult.a}
            b={calculationResult.b}
            c={calculationResult.c}
          />

          {/* High-Frequency Symmetric Expressions */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {t.symmetricSectionTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {t.symmetricSectionSub}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {calculationResult.symmetricExpressions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        {item.name}
                      </span>
                    </div>

                    <div className="text-base sm:text-lg font-serif text-slate-900 font-semibold py-1">
                      <MathView math={item.formulaTex} />
                    </div>

                    <div className="text-xs text-slate-500 font-serif my-1 border-t border-slate-200/60 pt-2">
                      <span className="text-slate-400 font-sans block text-[11px] mb-0.5">{t.transformFormula}</span>
                      <MathView math={item.expandedFormulaTex} />
                    </div>

                    <div className="text-xs text-slate-500 font-serif my-1">
                      <span className="text-slate-400 font-sans block text-[11px] mb-0.5">{t.substitutionText}</span>
                      <MathView math={item.substitutionTex} />
                    </div>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-500">{t.calcResultText}</span>
                    <span className="text-sm sm:text-base font-bold font-serif text-slate-900">
                      <MathView math={item.resultTex} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Parameterized Expression Evaluator */}
          <CustomExpressionEvaluator
            sumOfRoots={calculationResult.sumOfRoots}
            productOfRoots={calculationResult.productOfRoots}
            delta={calculationResult.delta}
          />
        </div>
      ) : (
        <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-slate-500 text-sm md:text-base">
          Please enter valid quadratic equation coefficients (leading coefficient a ≠ 0)
        </div>
      )}
    </div>
  );
};
