import React, { useState, useMemo } from "react";
import { Fraction, parseNumberOrFraction } from "../utils/fraction";
import { constructEquationFromRoots, RootsToEquationResult } from "../utils/quadraticSolver";
import { SOLVER_I18N } from "../utils/solverI18n";
import { MathView } from "./MathView";
import { Check, Copy, RotateCcw, FileText, CheckCircle2 } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

interface RootPreset {
  label: string;
  sub: string;
  r1: string;
  r2: string;
}

export const RootsToEquationView: React.FC = () => {
  const { lang, t } = useTranslation();
  const [rootType, setRootType] = useState<"rational" | "radical">("rational");
  const [r1Input, setR1Input] = useState<string>("2");
  const [r2Input, setR2Input] = useState<string>("3");

  // Radical inputs: m ± √n
  const [radicalM, setRadicalM] = useState<string>("2");
  const [radicalN, setRadicalN] = useState<string>("3");

  const [copiedTex, setCopiedTex] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  const ROOT_PRESETS: RootPreset[] = useMemo(() => {
    switch (lang) {
      case "es":
        return [
          { label: "Enteros Positivos", sub: "Raíces: 2, 3", r1: "2", r2: "3" },
          { label: "Fracciones y Negativos", sub: "Raíces: 1/2, -3", r1: "1/2", r2: "-3" },
          { label: "Doble Fracción", sub: "Raíces: -2/3, 3/5", r1: "-2/3", r2: "3/5" },
          { label: "Opuestas (b = 0)", sub: "Raíces: 4, -4", r1: "4", r2: "-4" },
          { label: "Recíprocas (a = c)", sub: "Raíces: 3, 1/3", r1: "3", r2: "1/3" },
          { label: "Con Raíz Cero (c = 0)", sub: "Raíces: 0, -5", r1: "0", r2: "-5" },
        ];
      case "fr":
        return [
          { label: "Entiers Positifs", sub: "Racines : 2, 3", r1: "2", r2: "3" },
          { label: "Fractions & Négatifs", sub: "Racines : 1/2, -3", r1: "1/2", r2: "-3" },
          { label: "Double Fraction", sub: "Racines : -2/3, 3/5", r1: "-2/3", r2: "3/5" },
          { label: "Racines Opposées (b = 0)", sub: "Racines : 4, -4", r1: "4", r2: "-4" },
          { label: "Racines Inverses (a = c)", sub: "Racines : 3, 1/3", r1: "3", r2: "1/3" },
          { label: "Avec Racine Nulle", sub: "Racines : 0, -5", r1: "0", r2: "-5" },
        ];
      case "pt":
        return [
          { label: "Inteiros Positivos", sub: "Raízes: 2, 3", r1: "2", r2: "3" },
          { label: "Frações e Negativos", sub: "Raízes: 1/2, -3", r1: "1/2", r2: "-3" },
          { label: "Duas Frações", sub: "Raízes: -2/3, 3/5", r1: "-2/3", r2: "3/5" },
          { label: "Raízes Opostas (b = 0)", sub: "Raízes: 4, -4", r1: "4", r2: "-4" },
          { label: "Raízes Inversas (a = c)", sub: "Raízes: 3, 1/3", r1: "3", r2: "1/3" },
          { label: "Com Raiz Nula (c = 0)", sub: "Raízes: 0, -5", r1: "0", r2: "-5" },
        ];
      case "zh":
        return [
          { label: "常见正整数", sub: "根为 2, 3", r1: "2", r2: "3" },
          { label: "含负数与分数", sub: "根为 1/2, -3", r1: "1/2", r2: "-3" },
          { label: "双分数交叉", sub: "根为 -2/3, 3/5", r1: "-2/3", r2: "3/5" },
          { label: "互为相反数 (b=0)", sub: "根为 4, -4", r1: "4", r2: "-4" },
          { label: "互为倒数 (a=c)", sub: "根为 3, 1/3", r1: "3", r2: "1/3" },
          { label: "含零根 (c=0)", sub: "根为 0, -5", r1: "0", r2: "-5" },
        ];
      default:
        return [
          { label: "Positive Integers", sub: "Roots: 2, 3", r1: "2", r2: "3" },
          { label: "Fraction & Negative", sub: "Roots: 1/2, -3", r1: "1/2", r2: "-3" },
          { label: "Dual Fractions", sub: "Roots: -2/3, 3/5", r1: "-2/3", r2: "3/5" },
          { label: "Opposite Roots (b = 0)", sub: "Roots: 4, -4", r1: "4", r2: "-4" },
          { label: "Reciprocal Roots (a = c)", sub: "Roots: 3, 1/3", r1: "3", r2: "1/3" },
          { label: "Zero Root (c = 0)", sub: "Roots: 0, -5", r1: "0", r2: "-5" },
        ];
    }
  }, [lang]);

  // Parse rational roots
  const frac1 = useMemo(() => parseNumberOrFraction(r1Input), [r1Input]);
  const frac2 = useMemo(() => parseNumberOrFraction(r2Input), [r2Input]);

  const rationalResult: RootsToEquationResult | null = useMemo(() => {
    if (frac1 === null || frac2 === null) return null;
    try {
      return constructEquationFromRoots(frac1, frac2, lang);
    } catch {
      return null;
    }
  }, [frac1, frac2, lang]);

  // Handle Radical roots m ± √n
  const radicalResult = useMemo(() => {
    const m = parseFloat(radicalM);
    const n = parseFloat(radicalN);
    if (isNaN(m) || isNaN(n) || n < 0) return null;

    const sum = 2 * m;
    const prod = m * m - n;

    const formatRadMid = (s: number) => {
      if (s === 0) return "";
      const sign = s > 0 ? " - " : " + ";
      const abs = Math.abs(s);
      return `${sign}${abs === 1 ? "" : abs}x`;
    };
    const formatRadEnd = (p: number) => {
      if (p === 0) return "";
      const sign = p > 0 ? " + " : " - ";
      return `${sign}${Math.abs(p)}`;
    };

    const equationTex = `x^2${formatRadMid(sum)}${formatRadEnd(prod)} = 0`;
    const i18n = SOLVER_I18N[lang] || SOLVER_I18N.en;

    return {
      m,
      n,
      sum,
      prod,
      equationTex,
      steps: [
        {
          title: i18n.radStep1Title,
          description: i18n.radStep1Desc,
          mathTex: `x_1 + x_2 = (${m} + \\sqrt{${n}}) + (${m} - \\sqrt{${n}}) = 2 \\times ${m} = ${sum}`,
        },
        {
          title: i18n.radStep2Title,
          description: i18n.radStep2Desc,
          mathTex: `x_1 \\cdot x_2 = (${m} + \\sqrt{${n}})(${m} - \\sqrt{${n}}) = (${m})^2 - (\\sqrt{${n}})^2 = ${m * m} - ${n} = ${prod}`,
        },
        {
          title: i18n.radStep3Title,
          description: i18n.radStep3Desc,
          mathTex: `${equationTex}`,
        },
        {
          title: i18n.radStep4Title,
          description: i18n.radStep4Desc,
          mathTex: `\\Delta = (-${sum})^2 - 4 \\cdot 1 \\cdot (${prod}) = ${sum * sum} - ${4 * prod} = ${4 * n} > 0 \\quad (${i18n.radStep4Check})`,
        },
      ],
    };
  }, [radicalM, radicalN, lang]);

  const handleCopy = (tex: string) => {
    navigator.clipboard?.writeText(tex);
    setCopiedTex(tex);
    setTimeout(() => setCopiedTex(null), 1800);
  };

  const handleCopyReport = () => {
    if (rootType === "rational" && rationalResult) {
      const text = [
        `【Roots to Equation Report】`,
        `Roots: x₁ = ${r1Input}, x₂ = ${r2Input}`,
        `Sum of Roots: S = x₁ + x₂ = ${rationalResult.sumTex}`,
        `Product of Roots: P = x₁ · x₂ = ${rationalResult.productTex}`,
        `Monic Form (a=1): ${rationalResult.monicEquationTex}`,
        `Lowest Integer Coefficients: ${rationalResult.standardEquationTex}`,
        `Coefficients: a = ${rationalResult.a}, b = ${rationalResult.b}, c = ${rationalResult.c}`,
        `Verification: -b/a = ${rationalResult.sumTex}, c/a = ${rationalResult.productTex}`,
        `—— Vieta's Formulas & Quadratic Solver ——`,
      ].join("\n");
      navigator.clipboard?.writeText(text);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2000);
    } else if (rootType === "radical" && radicalResult) {
      const text = [
        `【Conjugate Radicals to Equation Report】`,
        `Given Roots: x = ${radicalM} ± √${radicalN}`,
        `Sum: S = 2 × ${radicalM} = ${radicalResult.sum}`,
        `Product: P = (${radicalM})² - ${radicalN} = ${radicalResult.prod}`,
        `Equation: ${radicalResult.equationTex}`,
        `—— Vieta's Formulas & Quadratic Solver ——`,
      ].join("\n");
      navigator.clipboard?.writeText(text);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2000);
    }
  };

  const handleReset = () => {
    if (rootType === "rational") {
      setR1Input("2");
      setR2Input("3");
    } else {
      setRadicalM("2");
      setRadicalN("3");
    }
  };

  return (
    <div className="space-y-8">
      {/* Configuration Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              {t.rootsHeading}
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-1">
              {t.rootsSubheading}
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

        {/* Root Type Toggle Tabs */}
        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={() => setRootType("rational")}
            className={`px-4 py-2 min-h-[40px] text-xs sm:text-sm font-semibold rounded-lg transition-colors border ${
              rootType === "rational"
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {t.tabRationalRoots}
          </button>
          <button
            onClick={() => setRootType("radical")}
            className={`px-4 py-2 min-h-[40px] text-xs sm:text-sm font-semibold rounded-lg transition-colors border ${
              rootType === "radical"
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {t.tabRadicalRoots}
          </button>
        </div>

        {/* Mode 1: Rational Roots */}
        {rootType === "rational" && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 p-3.5 bg-slate-50/60 rounded-xl border border-slate-200/60">
                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                  {t.root1Label}
                </label>
                <input
                  type="text"
                  value={r1Input}
                  onChange={(e) => setR1Input(e.target.value)}
                  placeholder="2"
                  className="w-full px-4 py-2.5 text-base md:text-lg font-mono font-bold bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                />
              </div>

              <div className="space-y-2 p-3.5 bg-slate-50/60 rounded-xl border border-slate-200/60">
                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                  {t.root2Label}
                </label>
                <input
                  type="text"
                  value={r2Input}
                  onChange={(e) => setR2Input(e.target.value)}
                  placeholder="3"
                  className="w-full px-4 py-2.5 text-base md:text-lg font-mono font-bold bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs sm:text-sm text-slate-500 font-medium whitespace-nowrap">{t.quickRootsLabel}</span>
              {ROOT_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setR1Input(p.r1);
                    setR2Input(p.r2);
                  }}
                  className="px-3 py-1.5 min-h-[36px] text-xs sm:text-sm text-slate-700 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors whitespace-nowrap"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mode 2: Radical Roots m ± √n */}
        {rootType === "radical" && (
          <div className="mt-6 space-y-6">
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 text-blue-900 rounded-lg text-xs sm:text-sm leading-relaxed">
              {t.radicalNotice}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2 p-3.5 bg-slate-50/60 rounded-xl border border-slate-200/60">
                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                  {t.radicalM}
                </label>
                <input
                  type="text"
                  value={radicalM}
                  onChange={(e) => setRadicalM(e.target.value)}
                  placeholder="2"
                  className="w-full px-4 py-2.5 text-base md:text-lg font-mono font-bold bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                />
              </div>

              <div className="space-y-2 p-3.5 bg-slate-50/60 rounded-xl border border-slate-200/60">
                <label className="text-xs sm:text-sm font-semibold text-slate-700">
                  {t.radicalN}
                </label>
                <input
                  type="text"
                  value={radicalN}
                  onChange={(e) => setRadicalN(e.target.value)}
                  placeholder="3"
                  className="w-full px-4 py-2.5 text-base md:text-lg font-mono font-bold bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs sm:text-sm text-slate-500 font-medium whitespace-nowrap">{t.quickRadicalsLabel}</span>
              {[
                { label: "2 ± √3", m: "2", n: "3" },
                { label: "1 ± √5", m: "1", n: "5" },
                { label: "-3 ± √2", m: "-3", n: "2" },
                { label: "0 ± √7 (±√7)", m: "0", n: "7" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setRadicalM(item.m);
                    setRadicalN(item.n);
                  }}
                  className="px-3 py-1.5 min-h-[36px] text-xs sm:text-sm text-slate-700 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Display */}
      {rootType === "rational" && rationalResult && (
        <div className="space-y-6">
          {/* Main Equation Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs sm:text-sm text-slate-500 font-medium">
                  {t.resultStandardEq}
                </span>
                <div className="mt-1 flex items-center gap-3">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    <MathView math={rationalResult.standardEquationTex} />
                  </div>
                  <button
                    onClick={() => handleCopy(rationalResult.standardEquationTex)}
                    title={t.copyEquationBtn}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {copiedTex === rationalResult.standardEquationTex ? (
                      <Check className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleCopyReport}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 shadow-2xs whitespace-nowrap"
              >
                {copiedReport ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">{t.derivationCopied}</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>{t.copyDerivationBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-xs sm:text-sm text-slate-500 font-medium">{t.sumRootsLabel}</span>
                <div className="mt-1 text-lg sm:text-xl font-bold font-serif text-slate-900">
                  <MathView math={`S = ${rationalResult.sumTex}`} />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-xs sm:text-sm text-slate-500 font-medium">{t.prodRootsLabel}</span>
                <div className="mt-1 text-lg sm:text-xl font-bold font-serif text-slate-900">
                  <MathView math={`P = ${rationalResult.productTex}`} />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-xs sm:text-sm text-slate-500 font-medium">{t.monicStandardEq}</span>
                <div className="mt-1 text-base sm:text-lg font-bold font-serif text-slate-900">
                  <MathView math={rationalResult.monicEquationTex} />
                </div>
              </div>
            </div>
          </div>

          {/* Derivation Steps */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {t.detailedDerivationTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t.detailedDerivationSub}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {rationalResult.steps.map((st, idx) => (
                <div key={idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{st.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                  <div className="p-3 bg-white rounded-lg border border-slate-200/70 font-serif text-sm sm:text-base overflow-x-auto text-slate-900">
                    <MathView math={st.mathTex} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Radical Mode Results */}
      {rootType === "radical" && radicalResult && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs sm:text-sm text-slate-500 font-medium">
                  {t.resultStandardEq}
                </span>
                <div className="mt-1 flex items-center gap-3">
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                    <MathView math={radicalResult.equationTex} />
                  </div>
                  <button
                    onClick={() => handleCopy(radicalResult.equationTex)}
                    title={t.copyEquationBtn}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {copiedTex === radicalResult.equationTex ? (
                      <Check className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleCopyReport}
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 shadow-2xs whitespace-nowrap"
              >
                {copiedReport ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">{t.derivationCopied}</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>{t.copyDerivationBtn}</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-xs sm:text-sm text-slate-500 font-medium">{t.sumRootsLabel}</span>
                <div className="mt-1 text-lg sm:text-xl font-bold font-serif text-slate-900">
                  <MathView math={`S = 2 \\times (${radicalResult.m}) = ${radicalResult.sum}`} />
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-xs sm:text-sm text-slate-500 font-medium">{t.prodRootsLabel}</span>
                <div className="mt-1 text-lg sm:text-xl font-bold font-serif text-slate-900">
                  <MathView math={`P = (${radicalResult.m})^2 - (${radicalResult.n}) = ${radicalResult.prod}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Derivation Steps */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {t.detailedDerivationTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {t.detailedDerivationSub}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {radicalResult.steps.map((st, idx) => (
                <div key={idx} className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{st.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                  <div className="p-3 bg-white rounded-lg border border-slate-200/70 font-serif text-sm sm:text-base overflow-x-auto text-slate-900">
                    <MathView math={st.mathTex} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
