import React, { useState, useMemo } from "react";
import { Fraction } from "../utils/fraction";
import { solveQuadratic, QuadraticResult } from "../utils/quadraticSolver";
import { MathView } from "./MathView";
import { Printer, RefreshCw, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

interface GeneratedProblem {
  id: number;
  a: number;
  b: number;
  c: number;
  equationTex: string;
  result: QuadraticResult;
}

export const WorksheetGenerator: React.FC = () => {
  const { t, lang } = useTranslation();
  const [difficulty, setDifficulty] = useState<"basic" | "intermediate" | "advanced">("basic");
  const [count, setCount] = useState<number>(5);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [refreshSeed, setRefreshSeed] = useState<number>(1);

  // Generate randomized problems based on seed & difficulty
  const problems: GeneratedProblem[] = useMemo(() => {
    const list: GeneratedProblem[] = [];

    // Pre-curated pools of clean integer/fraction pairs
    const basicPool = [
      { a: 1, b: -5, c: 6 },
      { a: 1, b: -7, c: 12 },
      { a: 1, b: 3, c: -10 },
      { a: 1, b: -2, c: -8 },
      { a: 1, b: 6, c: 8 },
      { a: 1, b: -4, c: 3 },
      { a: 1, b: 1, c: -12 },
      { a: 1, b: -8, c: 15 },
      { a: 1, b: -6, c: 9 },
      { a: 1, b: 5, c: 4 },
    ];

    const interPool = [
      { a: 2, b: -5, c: -3 },
      { a: 2, b: 7, c: 3 },
      { a: 3, b: -10, c: 3 },
      { a: 2, b: 5, c: -12 },
      { a: 3, b: 5, c: -2 },
      { a: 2, b: -7, c: 6 },
      { a: 4, b: -4, c: -3 },
      { a: 3, b: -8, c: 4 },
      { a: 2, b: 3, c: -5 },
      { a: 3, b: 7, c: 2 },
    ];

    const advPool = [
      { a: 1, b: -4, c: 1 },
      { a: 1, b: -6, c: 2 },
      { a: 1, b: 2, c: -4 },
      { a: 2, b: -4, c: -1 },
      { a: 1, b: -8, c: 11 },
      { a: 3, b: -6, c: 1 },
      { a: 1, b: 4, c: -2 },
      { a: 2, b: 6, c: 1 },
      { a: 1, b: -10, c: 13 },
      { a: 1, b: 2, c: -6 },
    ];

    const pool = difficulty === "basic" ? basicPool : difficulty === "intermediate" ? interPool : advPool;

    // Shuffle based on seed
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    selected.forEach((p, idx) => {
      const fracA = new Fraction(p.a);
      const fracB = new Fraction(p.b);
      const fracC = new Fraction(p.c);
      const res = solveQuadratic(fracA, fracB, fracC, lang);
      list.push({
        id: idx + 1,
        a: p.a,
        b: p.b,
        c: p.c,
        equationTex: res.standardEquationTex,
        result: res,
      });
    });

    return list;
  }, [difficulty, count, refreshSeed, lang]);

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      console.warn("Print not supported in current environment", e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel (Hidden during print) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              {t.worksheetHeading}
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-1">
              {t.worksheetSubheading}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRefreshSeed((s) => s + 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.refreshProblemsBtn}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printWorksheetBtn}</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          {/* Difficulty */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500">{t.difficultyLabel}</span>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setDifficulty("basic")}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                  difficulty === "basic" ? "bg-white text-slate-900 shadow-2xs font-semibold" : "text-slate-600"
                }`}
              >
                {t.diffBasic}
              </button>
              <button
                onClick={() => setDifficulty("intermediate")}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                  difficulty === "intermediate" ? "bg-white text-slate-900 shadow-2xs font-semibold" : "text-slate-600"
                }`}
              >
                {t.diffIntermediate}
              </button>
              <button
                onClick={() => setDifficulty("advanced")}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                  difficulty === "advanced" ? "bg-white text-slate-900 shadow-2xs font-semibold" : "text-slate-600"
                }`}
              >
                {t.diffAdvanced}
              </button>
            </div>
          </div>

          {/* Problem Count */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-slate-500">{t.questionCountLabel}</span>
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {[3, 5, 8].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                    count === n ? "bg-white text-slate-900 shadow-2xs font-semibold" : "text-slate-600"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle answers */}
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border transition-colors ${
              showAnswers
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {showAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showAnswers ? t.hideAnswersBtn : t.showAnswersBtn}</span>
          </button>
        </div>
      </div>

      {/* Printable Paper Canvas */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-10 shadow-xs print:border-none print:shadow-none print:p-0">
        {/* Printable Header */}
        <div className="text-center pb-6 border-b-2 border-slate-900 space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {t.worksheetPaperTitle}
          </h1>
          <div className="flex items-center justify-center gap-6 pt-2 text-xs sm:text-sm font-medium text-slate-600 flex-wrap">
            <span>{t.studentName}</span>
            <span>{t.studentClass}</span>
            <span>{t.studentScore}</span>
            <span>{t.studentDate}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="py-4 text-xs sm:text-sm text-slate-500 italic border-b border-slate-100">
          {t.problemPrompt}
        </div>

        {/* Problems List */}
        <div className="divide-y divide-slate-100 space-y-6 pt-4">
          {problems.map((prob) => (
            <div key={prob.id} className="pt-6 space-y-4">
              <div className="flex items-baseline gap-3 text-base sm:text-lg font-semibold text-slate-900">
                <span className="font-mono text-blue-600 font-bold">{prob.id}.</span>
                <div className="font-serif">
                  <MathView math={prob.equationTex} />
                </div>
              </div>

              {/* Working space for students when printing */}
              <div className="min-h-[140px] border border-dashed border-slate-200 rounded-lg p-4 bg-slate-50/30 flex flex-col justify-end text-xs text-slate-400">
                <span className="print:hidden">（{lang === "zh" ? "作答区域 / 答题留白" : "Work / Scratch Space"}）</span>
              </div>

              {/* Answers & Detailed Breakdown */}
              {showAnswers && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-lg space-y-3 text-xs sm:text-sm text-emerald-950">
                  <div className="font-bold flex items-center justify-between">
                    <span className="text-sm font-semibold">{t.referenceAnswer}</span>
                    <span className="font-mono font-medium">
                      {prob.result.roots.exactTex1}, {prob.result.roots.exactTex2}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-emerald-900">
                    <div>
                      • <span className="font-semibold">Δ = b² - 4ac:</span> {prob.result.delta.toString()} ({prob.result.deltaExplanation})
                    </div>
                    <div>
                      • <span className="font-semibold">Vieta:</span> {prob.result.sumOfRootsTex}, {prob.result.productOfRootsTex}
                    </div>
                  </div>

                  {/* Completing the square mini steps */}
                  <div className="pt-2 border-t border-emerald-200/60 text-xs space-y-1">
                    <span className="font-semibold block">{lang === "zh" ? "配方法核心过程：" : "Completing the Square Key Steps:"}</span>
                    {prob.result.completingSquareSteps.map((st) => (
                      <div key={st.stepIndex} className="font-mono text-emerald-900 pl-2">
                        {st.stepIndex}. {st.title} → <MathView math={st.mathTex} className="inline text-xs" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
