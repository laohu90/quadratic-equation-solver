import React from "react";
import { MathView } from "./MathView";
import { BookOpen, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

interface VietaCheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VietaCheatSheet: React.FC<VietaCheatSheetProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useTranslation();

  if (!isOpen) return null;

  const data = {
    en: {
      modalHeader: "Vieta's Formulas & Quadratic Methods Core Handbook",
      sec1Title: "01. Vieta's Formulas (Root-Coefficient Relations)",
      sec1Desc: "For any quadratic equation ax² + bx + c = 0 (a ≠ 0) with roots x₁ and x₂:",
      sumLabel: "Sum of Roots:",
      prodLabel: "Product of Roots:",
      sec2Title: "02. Converse Vieta Theorem (Roots to Equation)",
      sec2Desc: "The monic quadratic equation having roots x₁ and x₂ is given by:",
      sec3Title: "03. Top 8 High-Frequency Symmetric Polynomial Identities",
      identities: [
        { name: "Sum of Squares", f1: "x_1^2 + x_2^2", f2: "(x_1+x_2)^2 - 2x_1x_2" },
        { name: "Sum of Reciprocals", f1: "\\frac{1}{x_1} + \\frac{1}{x_2}", f2: "\\frac{x_1+x_2}{x_1x_2}" },
        { name: "Absolute Difference", f1: "|x_1 - x_2|", f2: "\\frac{\\sqrt{\\Delta}}{|a|}" },
        { name: "Square of Difference", f1: "(x_1 - x_2)^2", f2: "(x_1+x_2)^2 - 4x_1x_2" },
        { name: "Sum of Cubes", f1: "x_1^3 + x_2^3", f2: "(x_1+x_2)[(x_1+x_2)^2 - 3x_1x_2]" },
        { name: "Sum of Cross Ratios", f1: "\\frac{x_1}{x_2} + \\frac{x_2}{x_1}", f2: "\\frac{(x_1+x_2)^2 - 2x_1x_2}{x_1x_2}" },
        { name: "Shifted Product", f1: "(x_1-1)(x_2-1)", f2: "x_1x_2 - (x_1+x_2) + 1" },
        { name: "Alternating Products", f1: "x_1^2 x_2 + x_1 x_2^2", f2: "x_1x_2(x_1+x_2)" },
      ],
      sec4Title: "04. Three Essential Rules to Avoid Deduction",
      rule1: "Rule 1: Always verify a ≠ 0. If leading coefficient contains a variable (e.g. kx²), explicitly state k ≠ 0.",
      rule2: "Rule 2: Real roots require Δ = b² - 4ac ≥ 0. After solving for parameters, always test if Δ ≥ 0 holds.",
      rule3: "Rule 3: Reciprocal expressions require non-zero denominators: x₁x₂ = c/a ≠ 0 (i.e. c ≠ 0).",
      closeBtn: "Got it",
    },
    es: {
      modalHeader: "Manual de Fórmulas: Teorema de Vieta y Métodos Cuadráticos",
      sec1Title: "01. Fórmulas de Vieta (Relaciones Raíces-Coeficientes)",
      sec1Desc: "Para toda ecuación cuadrática ax² + bx + c = 0 (a ≠ 0) con raíces x₁ y x₂:",
      sumLabel: "Suma de Raíces:",
      prodLabel: "Producto de Raíces:",
      sec2Title: "02. Teorema Recíproco de Vieta (De Raíces a Ecuación)",
      sec2Desc: "La ecuación mónica cuyas raíces son x₁ y x₂ viene dada por:",
      sec3Title: "03. 8 Identidades Simétricas Fundamentales",
      identities: [
        { name: "Suma de Cuadrados", f1: "x_1^2 + x_2^2", f2: "(x_1+x_2)^2 - 2x_1x_2" },
        { name: "Suma de Recíprocos", f1: "\\frac{1}{x_1} + \\frac{1}{x_2}", f2: "\\frac{x_1+x_2}{x_1x_2}" },
        { name: "Diferencia Absoluta", f1: "|x_1 - x_2|", f2: "\\frac{\\sqrt{\\Delta}}{|a|}" },
        { name: "Cuadrado de la Diferencia", f1: "(x_1 - x_2)^2", f2: "(x_1+x_2)^2 - 4x_1x_2" },
        { name: "Suma de Cubos", f1: "x_1^3 + x_2^3", f2: "(x_1+x_2)[(x_1+x_2)^2 - 3x_1x_2]" },
        { name: "Suma de Razones Cruzadas", f1: "\\frac{x_1}{x_2} + \\frac{x_2}{x_1}", f2: "\\frac{(x_1+x_2)^2 - 2x_1x_2}{x_1x_2}" },
        { name: "Producto Desplazado", f1: "(x_1-1)(x_2-1)", f2: "x_1x_2 - (x_1+x_2) + 1" },
        { name: "Términos Mixtos", f1: "x_1^2 x_2 + x_1 x_2^2", f2: "x_1x_2(x_1+x_2)" },
      ],
      sec4Title: "04. Tres Reglas Críticas para Evitar Errores",
      rule1: "Regla 1: Comprobar siempre que a ≠ 0. Si el coeficiente cuadrático tiene incógnita, especificar a ≠ 0.",
      rule2: "Regla 2: La existencia de raíces reales exige Δ = b² - 4ac ≥ 0. Al hallar un parámetro, verificar que Δ ≥ 0 sea válido.",
      rule3: "Regla 3: Las expresiones con recíprocos exigen denominadores no nulos: x₁x₂ = c/a ≠ 0 (es decir, c ≠ 0).",
      closeBtn: "Entendido",
    },
    fr: {
      modalHeader: "Mémento Mathématique : Relations de Viète & Méthodes Quadratiques",
      sec1Title: "01. Relations de Viète (Somme et Produit)",
      sec1Desc: "Pour toute équation ax² + bx + c = 0 (a ≠ 0) de racines x₁ et x₂ :",
      sumLabel: "Somme des racines :",
      prodLabel: "Produit des racines :",
      sec2Title: "02. Réciproque du Théorème de Viète",
      sec2Desc: "L'équation unitaire admettant x₁ et x₂ pour racines s'écrit :",
      sec3Title: "03. Les 8 Identités Symétriques Clés",
      identities: [
        { name: "Somme des Carrés", f1: "x_1^2 + x_2^2", f2: "(x_1+x_2)^2 - 2x_1x_2" },
        { name: "Somme des Inverses", f1: "\\frac{1}{x_1} + \\frac{1}{x_2}", f2: "\\frac{x_1+x_2}{x_1x_2}" },
        { name: "Différence Absolue", f1: "|x_1 - x_2|", f2: "\\frac{\\sqrt{\\Delta}}{|a|}" },
        { name: "Carré de la Différence", f1: "(x_1 - x_2)^2", f2: "(x_1+x_2)^2 - 4x_1x_2" },
        { name: "Somme des Cubes", f1: "x_1^3 + x_2^3", f2: "(x_1+x_2)[(x_1+x_2)^2 - 3x_1x_2]" },
        { name: "Somme des Quotients", f1: "\\frac{x_1}{x_2} + \\frac{x_2}{x_1}", f2: "\\frac{(x_1+x_2)^2 - 2x_1x_2}{x_1x_2}" },
        { name: "Produit Décalé", f1: "(x_1-1)(x_2-1)", f2: "x_1x_2 - (x_1+x_2) + 1" },
        { name: "Produit Croisé", f1: "x_1^2 x_2 + x_1 x_2^2", f2: "x_1x_2(x_1+x_2)" },
      ],
      sec4Title: "04. Trois Règles Fondamentales de Rigueur",
      rule1: "Règle 1 : Toujours vérifier que a ≠ 0 pour que l'équation soit bien du second degré.",
      rule2: "Règle 2 : L'existence de racines réelles impose Δ = b² - 4ac ≥ 0. Tout paramètre trouvé doit être vérifié avec Δ ≥ 0.",
      rule3: "Règle 3 : Les fractions imposent des dénominateurs non nuls : x₁x₂ = c/a ≠ 0 (c ≠ 0).",
      closeBtn: "Compris",
    },
    pt: {
      modalHeader: "Manual de Fórmulas: Relações de Girard / Vieta",
      sec1Title: "01. Relações de Girard / Vieta (Soma e Produto)",
      sec1Desc: "Para toda equação do 2º grau ax² + bx + c = 0 (a ≠ 0) de raízes x₁ e x₂:",
      sumLabel: "Soma das raízes:",
      prodLabel: "Produto das raízes:",
      sec2Title: "02. Relações Inversas (Das Raízes para a Equação)",
      sec2Desc: "A equação mônica de raízes x₁ e x₂ é dada por:",
      sec3Title: "03. 8 Identidades Simétricas Mais Importantes",
      identities: [
        { name: "Soma de Quadrados", f1: "x_1^2 + x_2^2", f2: "(x_1+x_2)^2 - 2x_1x_2" },
        { name: "Soma de Inversos", f1: "\\frac{1}{x_1} + \\frac{1}{x_2}", f2: "\\frac{x_1+x_2}{x_1x_2}" },
        { name: "Diferença Absoluta", f1: "|x_1 - x_2|", f2: "\\frac{\\sqrt{\\Delta}}{|a|}" },
        { name: "Quadrado da Diferença", f1: "(x_1 - x_2)^2", f2: "(x_1+x_2)^2 - 4x_1x_2" },
        { name: "Soma de Cubos", f1: "x_1^3 + x_2^3", f2: "(x_1+x_2)[(x_1+x_2)^2 - 3x_1x_2]" },
        { name: "Soma das Razões", f1: "\\frac{x_1}{x_2} + \\frac{x_2}{x_1}", f2: "\\frac{(x_1+x_2)^2 - 2x_1x_2}{x_1x_2}" },
        { name: "Produto Deslocado", f1: "(x_1-1)(x_2-1)", f2: "x_1x_2 - (x_1+x_2) + 1" },
        { name: "Termos Cruzados", f1: "x_1^2 x_2 + x_1 x_2^2", f2: "x_1x_2(x_1+x_2)" },
      ],
      sec4Title: "04. Três Cuidados Fundamentais",
      rule1: "Regra 1: Confirmar sempre que a ≠ 0 para garantir que a equação seja do 2º grau.",
      rule2: "Regra 2: A existência de raízes reais exige Δ = b² - 4ac ≥ 0. Sempre valide o parâmetro encontrado.",
      rule3: "Regra 3: Expressões com inversos exigem denominadores não nulos: x₁x₂ = c/a ≠ 0 (c ≠ 0).",
      closeBtn: "Entendido",
    },
    zh: {
      modalHeader: "韦达定理与配方法核心方法速查手册",
      sec1Title: "01. 韦达定理核心内容 (Vieta's Formulas)",
      sec1Desc: "若一元二次方程 ax² + bx + c = 0 (a ≠ 0) 有两根 x₁、x₂，则：",
      sumLabel: "两根之和：",
      prodLabel: "两根之积：",
      sec2Title: "02. 韦达定理逆定理（已知两根求方程）",
      sec2Desc: "以两个数 x₁、x₂ 为根的一元二次方程（首项系数为 1 时）为：",
      sec3Title: "03. 常见 8 种对称代数式变形速查清单",
      identities: [
        { name: "平方和", f1: "x_1^2 + x_2^2", f2: "(x_1+x_2)^2 - 2x_1x_2" },
        { name: "倒数和", f1: "\\frac{1}{x_1} + \\frac{1}{x_2}", f2: "\\frac{x_1+x_2}{x_1x_2}" },
        { name: "差的绝对值", f1: "|x_1 - x_2|", f2: "\\frac{\\sqrt{\\Delta}}{|a|}" },
        { name: "差的平方", f1: "(x_1 - x_2)^2", f2: "(x_1+x_2)^2 - 4x_1x_2" },
        { name: "立方和", f1: "x_1^3 + x_2^3", f2: "(x_1+x_2)[(x_1+x_2)^2 - 3x_1x_2]" },
        { name: "两根互倒和", f1: "\\frac{x_1}{x_2} + \\frac{x_2}{x_1}", f2: "\\frac{(x_1+x_2)^2 - 2x_1x_2}{x_1x_2}" },
        { name: "平移乘积式", f1: "(x_1-1)(x_2-1)", f2: "x_1x_2 - (x_1+x_2) + 1" },
        { name: "交替乘积和", f1: "x_1^2 x_2 + x_1 x_2^2", f2: "x_1x_2(x_1+x_2)" },
      ],
      sec4Title: "04. 解题三大关键警戒要点（谨记！）",
      rule1: "要点一：一元二次方程前提是 a ≠ 0。若二次项系数含字母（如 kx²），务必限制 k ≠ 0！",
      rule2: "要点二：题目提到“实数根”，必须验证判别式 Δ = b² - 4ac ≥ 0。算出参数后一定要代入 Δ 检验是否合法！",
      rule3: "要点三：涉及倒数和 1/x₁ + 1/x₂ 或商时，需确保两根之积 x₁x₂ = c/a ≠ 0（即常数项 c ≠ 0）。",
      closeBtn: "我知道了",
    },
  }[lang] || {
    modalHeader: "Vieta's Formulas & Quadratic Methods Core Handbook",
    sec1Title: "01. Vieta's Formulas (Root-Coefficient Relations)",
    sec1Desc: "For any quadratic equation ax² + bx + c = 0 (a ≠ 0) with roots x₁ and x₂:",
    sumLabel: "Sum of Roots:",
    prodLabel: "Product of Roots:",
    sec2Title: "02. Converse Vieta Theorem (Roots to Equation)",
    sec2Desc: "The monic quadratic equation having roots x₁ and x₂ is given by:",
    sec3Title: "03. Top 8 High-Frequency Symmetric Polynomial Identities",
    identities: [
      { name: "Sum of Squares", f1: "x_1^2 + x_2^2", f2: "(x_1+x_2)^2 - 2x_1x_2" },
      { name: "Sum of Reciprocals", f1: "\\frac{1}{x_1} + \\frac{1}{x_2}", f2: "\\frac{x_1+x_2}{x_1x_2}" },
      { name: "Absolute Difference", f1: "|x_1 - x_2|", f2: "\\frac{\\sqrt{\\Delta}}{|a|}" },
      { name: "Square of Difference", f1: "(x_1 - x_2)^2", f2: "(x_1+x_2)^2 - 4x_1x_2" },
      { name: "Sum of Cubes", f1: "x_1^3 + x_2^3", f2: "(x_1+x_2)[(x_1+x_2)^2 - 3x_1x_2]" },
      { name: "Sum of Cross Ratios", f1: "\\frac{x_1}{x_2} + \\frac{x_2}{x_1}", f2: "\\frac{(x_1+x_2)^2 - 2x_1x_2}{x_1x_2}" },
      { name: "Shifted Product", f1: "(x_1-1)(x_2-1)", f2: "x_1x_2 - (x_1+x_2) + 1" },
      { name: "Alternating Products", f1: "x_1^2 x_2 + x_1 x_2^2", f2: "x_1x_2(x_1+x_2)" },
    ],
    sec4Title: "04. Three Essential Rules to Avoid Deduction",
    rule1: "Rule 1: Always verify a ≠ 0. If leading coefficient contains a variable (e.g. kx²), explicitly state k ≠ 0.",
    rule2: "Rule 2: Real roots require Δ = b² - 4ac ≥ 0. After solving for parameters, always test if Δ ≥ 0 holds.",
    rule3: "Rule 3: Reciprocal expressions require non-zero denominators: x₁x₂ = c/a ≠ 0 (i.e. c ≠ 0).",
    closeBtn: "Got it",
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl shadow-xl max-w-3xl w-full max-h-[88vh] overflow-y-auto">
        <div className="sticky top-0 bg-white/95 backdrop-blur-xs border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {data.modalHeader}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <div>
            <h4 className="font-bold text-base text-slate-900 mb-2">
              {data.sec1Title}
            </h4>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2.5">
              <p className="text-slate-600">
                {data.sec1Desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-white rounded border border-slate-200">
                  <div className="font-semibold text-slate-900 mb-1">{data.sumLabel}</div>
                  <MathView math="x_1 + x_2 = -\frac{b}{a}" className="text-base" />
                </div>
                <div className="p-3 bg-white rounded border border-slate-200">
                  <div className="font-semibold text-slate-900 mb-1">{data.prodLabel}</div>
                  <MathView math="x_1 \cdot x_2 = \frac{c}{a}" className="text-base" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h4 className="font-bold text-base text-slate-900 mb-2">
              {data.sec2Title}
            </h4>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <p className="text-slate-600">
                {data.sec2Desc}
              </p>
              <div className="p-3 bg-white rounded border border-slate-200 text-center font-serif">
                <MathView math="x^2 - (x_1 + x_2)x + x_1 x_2 = 0" className="text-base" />
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h4 className="font-bold text-base text-slate-900 mb-2">
              {data.sec3Title}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {data.identities.map((item, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <div className="font-semibold text-slate-800 text-xs sm:text-sm">{item.name}</div>
                  <div className="font-serif text-sm">
                    <MathView math={`${item.f1} = ${item.f2}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h4 className="font-bold text-base text-slate-900 mb-2">
              {data.sec4Title}
            </h4>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-2.5 text-amber-950 text-sm">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>{data.rule1}</div>
              </div>
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>{data.rule2}</div>
              </div>
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>{data.rule3}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-100 px-6 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 min-h-[40px] text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
          >
            {data.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
