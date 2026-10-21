import React, { useState } from "react";
import { Fraction } from "../utils/fraction";
import { MathView } from "./MathView";
import { Sliders } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

interface CustomExpressionEvaluatorProps {
  sumOfRoots: Fraction;
  productOfRoots: Fraction;
  delta: Fraction;
}

export const CustomExpressionEvaluator: React.FC<CustomExpressionEvaluatorProps> = ({
  sumOfRoots,
  productOfRoots,
  delta,
}) => {
  const { lang, t } = useTranslation();
  const [paramK, setParamK] = useState<number>(2);

  const S = sumOfRoots;
  const P = productOfRoots;

  // Compute expressions
  // 1. (x1 - k)(x2 - k) = x1x2 - k(x1+x2) + k^2
  const kFrac = new Fraction(paramK);
  const expr1Val = P.sub(kFrac.mul(S)).add(kFrac.mul(kFrac));

  // 2. x1^2 + k*x1*x2 + x2^2 = (x1+x2)^2 + (k-2)*x1*x2
  const kMinus2 = new Fraction(paramK - 2);
  const expr2Val = S.mul(S).add(kMinus2.mul(P));

  // 3. x1^4 + x2^4 = (x1^2+x2^2)^2 - 2*(x1*x2)^2
  const sqSum = S.mul(S).sub(new Fraction(2).mul(P));
  const expr3Val = sqSum.mul(sqSum).sub(new Fraction(2).mul(P).mul(P));

  // 4. x1^2/x2 + x2^2/x1 = (x1^3 + x2^3)/(x1*x2)
  const cubeSum = S.mul(S.mul(S).sub(new Fraction(3).mul(P)));
  const expr4Val = P.num !== 0 ? cubeSum.div(P) : null;

  // 5. 1/(x1 - k) + 1/(x2 - k) = (x1+x2 - 2k)/((x1-k)(x2-k))
  const num5 = S.sub(new Fraction(2 * paramK));
  const den5 = expr1Val;
  const expr5Val = den5.num !== 0 ? num5.div(den5) : null;

  const cardTitles = {
    en: {
      card1: "Shifted Product (x₁ - k)(x₂ - k)",
      card2: "Parametric Mixed Quadratic",
      card3: "Sum of 4th Powers (x₁⁴ + x₂⁴)",
      card4: "Cross Rational Ratio",
      card5: "Parametric Shifted Reciprocals",
      identityLabel: "Identity Formula:",
      resultLabel: "Result:",
      undefinedLabel: "Undefined (div by 0)",
    },
    es: {
      card1: "Producto Desplazado (x₁ - k)(x₂ - k)",
      card2: "Forma Cuadrática Paramétrica",
      card3: "Suma de Cuartas Potencias (x₁⁴ + x₂⁴)",
      card4: "Cociente Cruzado de Potencias",
      card5: "Recíprocos Desplazados con Parámetro",
      identityLabel: "Fórmula de identidad:",
      resultLabel: "Resultado:",
      undefinedLabel: "Indefinido (división por 0)",
    },
    fr: {
      card1: "Produit Translaté (x₁ - k)(x₂ - k)",
      card2: "Forme Paramétrique Quadratique",
      card3: "Somme des Puissances 4 (x₁⁴ + x₂⁴)",
      card4: "Quotients Croisés",
      card5: "Inverses Translatés",
      identityLabel: "Identité remarquable :",
      resultLabel: "Résultat :",
      undefinedLabel: "Indéfini (division par 0)",
    },
    pt: {
      card1: "Produto Deslocado (x₁ - k)(x₂ - k)",
      card2: "Forma Quadrática Paramétrica",
      card3: "Soma de 4ª Potências (x₁⁴ + x₂⁴)",
      card4: "Quocientes Cruzados",
      card5: "Inversos Deslocados com Parâmetro",
      identityLabel: "Identidade algébrica:",
      resultLabel: "Resultado:",
      undefinedLabel: "Indefinido (divisão por 0)",
    },
    zh: {
      card1: "平移乘积式 (含参数 k)",
      card2: "混合二次齐次式",
      card3: "两根四次方和 (x₁⁴ + x₂⁴)",
      card4: "立方与积的交叉商",
      card5: "含参平移倒数和",
      identityLabel: "恒等变形公式：",
      resultLabel: "计算结果:",
      undefinedLabel: "分母为0无意义",
    },
  }[lang] || {
    card1: "Shifted Product (x₁ - k)(x₂ - k)",
    card2: "Parametric Mixed Quadratic",
    card3: "Sum of 4th Powers (x₁⁴ + x₂⁴)",
    card4: "Cross Rational Ratio",
    card5: "Parametric Shifted Reciprocals",
    identityLabel: "Identity Formula:",
    resultLabel: "Result:",
    undefinedLabel: "Undefined (div by 0)",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-600" />
            <span>{t.paramEvaluatorTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t.paramEvaluatorSub}
          </p>
        </div>

        {/* Parameter k controller */}
        <div className="flex items-center gap-3 p-1.5 bg-slate-50 border border-slate-200 rounded-lg">
          <label className="text-xs sm:text-sm font-semibold text-slate-700">
            {t.paramKLabel}
          </label>
          <input
            type="number"
            value={paramK}
            onChange={(e) => setParamK(parseFloat(e.target.value) || 0)}
            className="w-16 px-2.5 py-1 text-sm font-mono font-bold bg-white border border-slate-200 rounded text-center focus:outline-hidden focus:border-slate-400"
          />
          <div className="flex items-center gap-1">
            {[-2, -1, 1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setParamK(num)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  paramK === num
                    ? "bg-slate-900 text-white font-bold"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 font-medium"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expressions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: (x1 - k)(x2 - k) */}
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2">
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
              {cardTitles.card1}
            </div>
            <div className="text-sm md:text-base font-serif text-slate-900 py-1">
              <MathView math={`(x_1 - ${paramK})(x_2 - ${paramK})`} />
            </div>
            <div className="text-xs text-slate-500 font-serif pt-1 border-t border-slate-200/60 mt-1">
              <span className="text-slate-400 font-sans block text-[11px] font-medium">{cardTitles.identityLabel}</span>
              <MathView math="x_1x_2 - k(x_1+x_2) + k^2" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500">{cardTitles.resultLabel}</span>
            <span className="font-semibold font-serif text-slate-900 text-sm md:text-base">
              <MathView math={expr1Val.toTex()} />
            </span>
          </div>
        </div>

        {/* Card 2: x1^2 + k x1 x2 + x2^2 */}
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2">
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
              {cardTitles.card2}
            </div>
            <div className="text-sm md:text-base font-serif text-slate-900 py-1">
              <MathView math={`x_1^2 + ${paramK}x_1x_2 + x_2^2`} />
            </div>
            <div className="text-xs text-slate-500 font-serif pt-1 border-t border-slate-200/60 mt-1">
              <span className="text-slate-400 font-sans block text-[11px] font-medium">{cardTitles.identityLabel}</span>
              <MathView math="(x_1+x_2)^2 + (k-2)x_1x_2" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500">{cardTitles.resultLabel}</span>
            <span className="font-semibold font-serif text-slate-900 text-sm md:text-base">
              <MathView math={expr2Val.toTex()} />
            </span>
          </div>
        </div>

        {/* Card 3: x1^4 + x2^4 */}
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2">
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
              {cardTitles.card3}
            </div>
            <div className="text-sm md:text-base font-serif text-slate-900 py-1">
              <MathView math="x_1^4 + x_2^4" />
            </div>
            <div className="text-xs text-slate-500 font-serif pt-1 border-t border-slate-200/60 mt-1">
              <span className="text-slate-400 font-sans block text-[11px] font-medium">{cardTitles.identityLabel}</span>
              <MathView math="(x_1^2+x_2^2)^2 - 2(x_1x_2)^2" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500">{cardTitles.resultLabel}</span>
            <span className="font-semibold font-serif text-slate-900 text-sm md:text-base">
              <MathView math={expr3Val.toTex()} />
            </span>
          </div>
        </div>

        {/* Card 4: x1^2/x2 + x2^2/x1 */}
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2">
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
              {cardTitles.card4}
            </div>
            <div className="text-sm md:text-base font-serif text-slate-900 py-1">
              <MathView math="\frac{x_1^2}{x_2} + \frac{x_2^2}{x_1}" />
            </div>
            <div className="text-xs text-slate-500 font-serif pt-1 border-t border-slate-200/60 mt-1">
              <span className="text-slate-400 font-sans block text-[11px] font-medium">{cardTitles.identityLabel}</span>
              <MathView math="\frac{x_1^3+x_2^3}{x_1x_2}" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500">{cardTitles.resultLabel}</span>
            <span className="font-semibold font-serif text-slate-900 text-sm md:text-base">
              {expr4Val ? <MathView math={expr4Val.toTex()} /> : cardTitles.undefinedLabel}
            </span>
          </div>
        </div>

        {/* Card 5: 1/(x1 - k) + 1/(x2 - k) */}
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-2">
          <div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
              {cardTitles.card5}
            </div>
            <div className="text-sm md:text-base font-serif text-slate-900 py-1">
              <MathView math={`\\frac{1}{x_1 - ${paramK}} + \\frac{1}{x_2 - ${paramK}}`} />
            </div>
            <div className="text-xs text-slate-500 font-serif pt-1 border-t border-slate-200/60 mt-1">
              <span className="text-slate-400 font-sans block text-[11px] font-medium">{cardTitles.identityLabel}</span>
              <MathView math="\frac{(x_1+x_2) - 2k}{(x_1-k)(x_2-k)}" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500">{cardTitles.resultLabel}</span>
            <span className="font-semibold font-serif text-slate-900 text-sm md:text-base">
              {expr5Val ? <MathView math={expr5Val.toTex()} /> : cardTitles.undefinedLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
