import React, { useState, useMemo } from "react";
import { getExamQuestions, ExamQuestion } from "../data/examQuestions";
import { MathView } from "./MathView";
import { ChevronDown, ChevronUp, AlertCircle, BookOpen, CheckCircle } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

export const ExamDrillsView: React.FC = () => {
  const { lang, t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string>("q1");

  const questions: ExamQuestion[] = useMemo(() => {
    return getExamQuestions(lang);
  }, [lang]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(questions.map((q) => q.category)));
    return ["ALL", ...cats];
  }, [questions]);

  const categoryLabels: Record<string, string> = {
    ALL: lang === "zh" ? "全部题型" : lang === "es" ? "Todos" : lang === "fr" ? "Tous" : lang === "pt" ? "Todos" : "All Examples",
  };

  const filteredQuestions = questions.filter(
    (q) => selectedCategory === "ALL" || q.category === selectedCategory
  );

  const viewHeadings = {
    en: {
      title: "Step-by-Step Example Problems & Best Practices",
      subtitle: "Academic step breakdown · Emphasizing discriminant Δ ≥ 0 constraints and root relationships",
      answerBadge: "Reference Solution",
      trapLabel: "Pitfall Alert & Constraint Check",
      summaryLabel: "Method Summary:",
    },
    es: {
      title: "Ejemplos Típicos Resueltos y Buenas Prácticas",
      subtitle: "Desglose formal paso a paso · Énfasis en la condición Δ ≥ 0 y relaciones entre raíces",
      answerBadge: "Solución de Referencia",
      trapLabel: "Cuidado con la Condición Oculta",
      summaryLabel: "Resumen Metodológico:",
    },
    fr: {
      title: "Exemples Types Résolus et Démarches Rédigées",
      subtitle: "Démonstrations détaillées · Vérification indispensable du discriminant Δ ≥ 0",
      answerBadge: "Solution Détaillée",
      trapLabel: "Piège Fréquent & Condition de Réalité",
      summaryLabel: "Bilan Méthodologique :",
    },
    pt: {
      title: "Exercícios Resolvidos Passo a Passo",
      subtitle: "Desenvolvimento estruturado · Atenção à condição obrigatória de Δ ≥ 0",
      answerBadge: "Gabarito Oficial",
      trapLabel: "Atenção à Condição Oculta",
      summaryLabel: "Síntese do Método:",
    },
    zh: {
      title: "典型例题精析与解题规范",
      subtitle: "典型数学题型步骤拆解 · 专攻易错漏检 Δ 等约束条件",
      answerBadge: "参考答案",
      trapLabel: "易错陷阱提示与约束检验",
      summaryLabel: "考点归纳与规范：",
    },
  }[lang] || {
    title: "Step-by-Step Example Problems & Best Practices",
    subtitle: "Academic step breakdown · Emphasizing discriminant Δ ≥ 0 constraints and root relationships",
    answerBadge: "Reference Solution",
    trapLabel: "Pitfall Alert & Constraint Check",
    summaryLabel: "Method Summary:",
  };

  return (
    <div className="space-y-6">
      {/* Category filter bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>{viewHeadings.title}</span>
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-1">
              {viewHeadings.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filteredQuestions.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-shadow"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? "" : item.id)}
                className="p-5 md:p-6 cursor-pointer hover:bg-slate-50/60 transition-colors flex items-start justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 font-medium">
                    <span className="text-blue-600 font-semibold">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.title}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                    {item.question}
                  </h3>
                  {item.questionTex && (
                    <div className="pt-1">
                      <MathView math={item.questionTex} className="text-sm md:text-base text-slate-800" />
                    </div>
                  )}
                </div>

                <div className="shrink-0 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors mt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Collapsible Solution Area */}
              {isExpanded && (
                <div className="px-5 pb-6 md:px-6 md:pb-6 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-5 text-sm md:text-base text-slate-700">
                  {/* Trap Alert if present */}
                  {item.detailedAnalysis.trapAlert && (
                    <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs md:text-sm flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">{viewHeadings.trapLabel}：</span>
                        <span>{item.detailedAnalysis.trapAlert}</span>
                      </div>
                    </div>
                  )}

                  {/* Steps */}
                  <div className="space-y-3">
                    {item.detailedAnalysis.steps.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-4 bg-white rounded-lg border border-slate-200/90 space-y-2 shadow-2xs"
                      >
                        <div className="font-semibold text-slate-900 text-sm md:text-base flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>{st.title}</span>
                        </div>
                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                          {st.content}
                        </p>
                        {st.tex && (
                          <div className="p-2.5 bg-slate-50 rounded border border-slate-100 font-serif overflow-x-auto text-sm md:text-base">
                            <MathView math={st.tex} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg text-sm text-blue-900 leading-relaxed">
                    <span className="font-bold text-blue-950">{viewHeadings.summaryLabel} </span>
                    <span>{item.detailedAnalysis.summary}</span>
                  </div>

                  {/* Final answer highlight */}
                  <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm md:text-base font-semibold text-emerald-950">
                    <span className="text-emerald-800 text-xs md:text-sm font-medium">{viewHeadings.answerBadge}</span>
                    <span>{item.correctAnswer}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
