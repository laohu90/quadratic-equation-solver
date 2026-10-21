import { Fraction, simplifySqrt } from "./fraction";
import { Language } from "../i18n/translations";
import { SOLVER_I18N } from "./solverI18n";

export interface QuadraticResult {
  a: Fraction;
  b: Fraction;
  c: Fraction;
  standardEquationTex: string;
  delta: Fraction;
  deltaTex: string;
  deltaClassification: "two_distinct_real" | "two_equal_real" | "no_real_roots";
  deltaExplanation: string;
  
  // Vieta Relations
  sumOfRoots: Fraction;
  sumOfRootsTex: string;
  productOfRoots: Fraction;
  productOfRootsTex: string;

  // Root details
  roots: {
    exactTex1: string;
    exactTex2: string;
    approx1: number;
    approx2: number;
    isComplex: boolean;
  };

  // Step-by-step completing the square (配方法)
  completingSquareSteps: {
    stepIndex: number;
    title: string;
    description: string;
    mathTex: string;
  }[];

  // Step-by-step quadratic formula (公式法)
  formulaSteps: {
    stepIndex: number;
    title: string;
    description: string;
    mathTex: string;
  }[];

  // Factoring / Cross-multiplication (因式分解/十字相乘)
  factoring: {
    canFactorIntegers: boolean;
    factorsTex?: string;
    crossDiagram?: {
      p: number;
      q: number;
      r: number;
      s: number;
      pr: number;
      qs: number;
      crossSum: number;
    };
    explanation: string;
  };

  // High Frequency Symmetric Expressions (对称代数式)
  symmetricExpressions: {
    name: string;
    formulaTex: string;
    expandedFormulaTex: string;
    substitutionTex: string;
    resultTex: string;
    resultValue: number | null;
    isDefined: boolean;
    note?: string;
  }[];

  // Parabola key points for graphing
  parabola: {
    vertexX: number;
    vertexY: number;
    vertexTex: string;
    axisOfSymmetry: number;
    axisOfSymmetryTex: string;
    yIntercept: number;
    roots: number[];
    opensUp: boolean;
  };
}

export function solveQuadratic(
  aInput: Fraction,
  bInput: Fraction,
  cInput: Fraction,
  lang: Language = "en"
): QuadraticResult {
  const i18n = SOLVER_I18N[lang] || SOLVER_I18N.en;

  if (aInput.num === 0) {
    throw new Error(lang === "zh" ? "二次项系数 a 不能为 0" : "Leading coefficient 'a' cannot be 0");
  }

  // To make standard form clean, normalize by multiplying by LCM of denominators
  const l = Fraction.lcm(aInput.den, Fraction.lcm(bInput.den, cInput.den));
  let intA = aInput.num * (l / aInput.den);
  let intB = bInput.num * (l / bInput.den);
  let intC = cInput.num * (l / cInput.den);

  if (intA < 0) {
    intA = -intA;
    intB = -intB;
    intC = -intC;
  }
  const commonGcd = Fraction.gcd(Math.abs(intA), Fraction.gcd(Math.abs(intB), Math.abs(intC)));
  const normA = new Fraction(intA / commonGcd);
  const normB = new Fraction(intB / commonGcd);
  const normC = new Fraction(intC / commonGcd);

  const a = aInput;
  const b = bInput;
  const c = cInput;

  // Build standard equation Tex
  const formatCoeffX2 = (val: Fraction) => {
    if (val.num === val.den) return "x^2";
    if (val.num === -val.den) return "-x^2";
    return `${val.toTex()}x^2`;
  };
  const formatCoeffX = (val: Fraction) => {
    if (val.num === 0) return "";
    const isNeg = val.num < 0;
    const absVal = val.abs();
    const sign = isNeg ? " - " : " + ";
    if (absVal.num === absVal.den) return `${sign}x`;
    return `${sign}${absVal.toTex()}x`;
  };
  const formatConst = (val: Fraction) => {
    if (val.num === 0) return "";
    const isNeg = val.num < 0;
    const absVal = val.abs();
    const sign = isNeg ? " - " : " + ";
    return `${sign}${absVal.toTex()}`;
  };

  const standardEquationTex = `${formatCoeffX2(a)}${formatCoeffX(b)}${formatConst(c)} = 0`;

  // Discriminant Delta = b^2 - 4ac
  const delta = b.mul(b).sub(new Fraction(4).mul(a).mul(c));
  const deltaNum = delta.toNumber();

  let deltaClassification: QuadraticResult["deltaClassification"];
  let deltaExplanation = "";

  if (deltaNum > 0) {
    deltaClassification = "two_distinct_real";
    deltaExplanation = i18n.deltaTwoDistinctExp;
  } else if (deltaNum === 0) {
    deltaClassification = "two_equal_real";
    deltaExplanation = i18n.deltaTwoEqualExp;
  } else {
    deltaClassification = "no_real_roots";
    deltaExplanation = i18n.deltaNoRealExp;
  }

  // Vieta relations
  // sum = -b / a
  const sumOfRoots = b.neg().div(a);
  // product = c / a
  const productOfRoots = c.div(a);

  const sumOfRootsTex = `x_1 + x_2 = -\\frac{b}{a} = -\\frac{${b.toTex(true)}}{${a.toTex(true)}} = ${sumOfRoots.toTex()}`;
  const productOfRootsTex = `x_1 \\cdot x_2 = \\frac{c}{a} = \\frac{${c.toTex(true)}}{${a.toTex(true)}} = ${productOfRoots.toTex()}`;

  // Root calculations
  let exactTex1 = "";
  let exactTex2 = "";
  let approx1 = 0;
  let approx2 = 0;
  let isComplex = false;

  const nA = normA.num;
  const nB = normB.num;
  const nC = normC.num;
  const intDelta = nB * nB - 4 * nA * nC;

  if (intDelta >= 0) {
    const sqrtIntDelta = Math.sqrt(intDelta);
    const isPerfSquare = Number.isInteger(sqrtIntDelta);

    if (isPerfSquare) {
      // Rational roots
      const root1Frac = new Fraction(-nB + sqrtIntDelta, 2 * nA);
      const root2Frac = new Fraction(-nB - sqrtIntDelta, 2 * nA);
      exactTex1 = `x_1 = ${root1Frac.toTex()}`;
      exactTex2 = `x_2 = ${root2Frac.toTex()}`;
      approx1 = root1Frac.toNumber();
      approx2 = root2Frac.toNumber();
    } else {
      // Radical roots: simplify sqrt(intDelta)
      const { outer, inner } = simplifySqrt(intDelta);
      const denom = 2 * nA;
      const g = Fraction.gcd(Math.abs(nB), Fraction.gcd(outer, denom));
      const redB = -nB / g;
      const redOuter = outer / g;
      const redDenom = denom / g;

      const outerStr = redOuter === 1 ? "" : `${redOuter}`;
      const radicalStr = `${outerStr}\\sqrt{${inner}}`;

      if (redDenom === 1) {
        exactTex1 = `x_1 = ${redB} + ${radicalStr}`;
        exactTex2 = `x_2 = ${redB} - ${radicalStr}`;
      } else {
        exactTex1 = `x_1 = \\frac{${redB} + ${radicalStr}}{${redDenom}}`;
        exactTex2 = `x_2 = \\frac{${redB} - ${radicalStr}}{${redDenom}}`;
      }
      approx1 = (-nB + Math.sqrt(intDelta)) / (2 * nA);
      approx2 = (-nB - Math.sqrt(intDelta)) / (2 * nA);
    }
  } else {
    isComplex = true;
    const { outer, inner } = simplifySqrt(-intDelta);
    const denom = 2 * nA;
    const g = Fraction.gcd(Math.abs(nB), Fraction.gcd(outer, denom));
    const redB = -nB / g;
    const redOuter = outer / g;
    const redDenom = denom / g;

    const outerStr = redOuter === 1 ? "" : `${redOuter}`;
    const radicalStr = `${outerStr}\\sqrt{${inner}}i`;

    if (redDenom === 1) {
      exactTex1 = `x_1 = ${redB} + ${radicalStr}`;
      exactTex2 = `x_2 = ${redB} - ${radicalStr}`;
    } else {
      exactTex1 = `x_1 = \\frac{${redB} + ${radicalStr}}{${redDenom}}`;
      exactTex2 = `x_2 = \\frac{${redB} - ${radicalStr}}{${redDenom}}`;
    }
    approx1 = -nB / (2 * nA);
    approx2 = -nB / (2 * nA);
  }

  // --- Step-by-step Completing the Square ---
  const completingSquareSteps: QuadraticResult["completingSquareSteps"] = [];
  
  // Step 1: Move constant
  const negC = c.neg();
  completingSquareSteps.push({
    stepIndex: 1,
    title: i18n.step1Title,
    description: i18n.step1Desc,
    mathTex: `${formatCoeffX2(a)}${formatCoeffX(b)} = ${negC.toTex()}`,
  });

  // Step 2: Normalize coefficient a
  const bDivA = b.div(a);
  const negCDivA = negC.div(a);
  const step2Math = `x^2${formatCoeffX(bDivA)} = ${negCDivA.toTex()}`;
  if (a.num !== a.den || a.den !== 1) {
    completingSquareSteps.push({
      stepIndex: 2,
      title: i18n.step2TitleNorm,
      description: i18n.step2DescNorm(a.toTex()),
      mathTex: step2Math,
    });
  } else {
    completingSquareSteps.push({
      stepIndex: 2,
      title: i18n.step2TitleAlready,
      description: i18n.step2DescAlready,
      mathTex: step2Math,
    });
  }

  // Step 3: Complete square on both sides
  const halfB = bDivA.div(2);
  const halfBSq = halfB.mul(halfB);
  const rhsSum = negCDivA.add(halfBSq);

  completingSquareSteps.push({
    stepIndex: 3,
    title: i18n.step3Title,
    description: i18n.step3Desc(bDivA.toTex(), halfB.toTex(), halfBSq.toTex()),
    mathTex: `x^2${formatCoeffX(bDivA)} + \\left(${halfB.toTex()}\\right)^2 = ${negCDivA.toTex()} + ${halfBSq.toTex()}`,
  });

  // Step 4: Write as perfect square
  const halfBSign = halfB.num >= 0 ? "+" : "-";
  const absHalfB = halfB.abs();
  const squareLhs = `\\left(x ${halfBSign} ${absHalfB.toTex()}\\right)^2`;

  completingSquareSteps.push({
    stepIndex: 4,
    title: i18n.step4Title,
    description: i18n.step4Desc,
    mathTex: `${squareLhs} = ${rhsSum.toTex()}`,
  });

  // Step 5: Solve by taking square roots
  if (rhsSum.num > 0) {
    completingSquareSteps.push({
      stepIndex: 5,
      title: i18n.step5TitleDistinct,
      description: i18n.step5DescDistinct(rhsSum.toTex()),
      mathTex: `x ${halfBSign} ${absHalfB.toTex()} = \\pm \\sqrt{${rhsSum.toTex()}} \\implies ${exactTex1}, \\quad ${exactTex2}`,
    });
  } else if (rhsSum.num === 0) {
    completingSquareSteps.push({
      stepIndex: 5,
      title: i18n.step5TitleEqual,
      description: i18n.step5DescEqual,
      mathTex: `x ${halfBSign} ${absHalfB.toTex()} = 0 \\implies x_1 = x_2 = ${halfB.neg().toTex()}`,
    });
  } else {
    completingSquareSteps.push({
      stepIndex: 5,
      title: i18n.step5TitleNoReal,
      description: i18n.step5DescNoReal(rhsSum.toTex(), `${exactTex1}, \\, ${exactTex2}`),
      mathTex: `\\left(x ${halfBSign} ${absHalfB.toTex()}\\right)^2 < 0`,
    });
  }

  // --- Step-by-step Quadratic Formula ---
  const formulaSteps: QuadraticResult["formulaSteps"] = [
    {
      stepIndex: 1,
      title: i18n.formulaStep1Title,
      description: i18n.formulaStep1Desc,
      mathTex: `a = ${a.toTex()}, \\quad b = ${b.toTex()}, \\quad c = ${c.toTex()}`,
    },
    {
      stepIndex: 2,
      title: i18n.formulaStep2Title,
      description: i18n.formulaStep2Desc,
      mathTex: `\\Delta = (${b.toTex()})^2 - 4 \\cdot (${a.toTex()}) \\cdot (${c.toTex()}) = ${delta.toTex()} \\quad (${deltaExplanation})`,
    },
    {
      stepIndex: 3,
      title: i18n.formulaStep3Title,
      description: i18n.formulaStep3Desc,
      mathTex: `x = \\frac{-(${b.toTex()}) \\pm \\sqrt{${delta.toTex()}}}{2 \\cdot (${a.toTex()})} \\implies ${exactTex1}, \\quad ${exactTex2}`,
    },
  ];

  // --- Cross-multiplication / Factoring check ---
  let canFactorIntegers = false;
  let factorsTex: string | undefined;
  let crossDiagram: QuadraticResult["factoring"]["crossDiagram"] | undefined;
  let factoringExplanation = "";

  if (intDelta >= 0 && Number.isInteger(Math.sqrt(intDelta))) {
    const aFactors: [number, number][] = [];
    for (let i = 1; i * i <= normA.num; i++) {
      if (normA.num % i === 0) {
        aFactors.push([i, normA.num / i]);
      }
    }

    const cFactors: [number, number][] = [];
    const absC = Math.abs(normC.num);
    if (absC === 0) {
      cFactors.push([0, 0]);
    } else {
      for (let i = 1; i * i <= absC; i++) {
        if (absC % i === 0) {
          const j = absC / i;
          if (normC.num > 0) {
            cFactors.push([i, j]);
            cFactors.push([-i, -j]);
          } else {
            cFactors.push([i, -j]);
            cFactors.push([-i, j]);
          }
        }
      }
    }

    outerLoop:
    for (const [p, r] of aFactors) {
      for (const [q, s] of cFactors) {
        if (p * s + q * r === normB.num) {
          canFactorIntegers = true;
          crossDiagram = {
            p,
            q,
            r,
            s,
            pr: p * r,
            qs: q * s,
            crossSum: p * s + q * r,
          };
          const part1 = p === 1 ? "x" : `${p}x`;
          const part2 = r === 1 ? "x" : `${r}x`;
          const qSign = q >= 0 ? `+ ${q}` : `- ${Math.abs(q)}`;
          const sSign = s >= 0 ? `+ ${s}` : `- ${Math.abs(s)}`;
          factorsTex = `(${part1} ${qSign})(${part2} ${sSign}) = 0`;
          factoringExplanation = i18n.factoringSuccess(standardEquationTex, p, q, r, s);
          break outerLoop;
        }
      }
    }
    if (!canFactorIntegers) {
      factoringExplanation = i18n.factoringFail;
    }
  } else if (intDelta < 0) {
    factoringExplanation = i18n.factoringNoReal;
  } else {
    factoringExplanation = i18n.factoringFail;
  }

  // --- Symmetric Polynomial Expressions ---
  const S = sumOfRoots;
  const P = productOfRoots;
  const symmetricExpressions: QuadraticResult["symmetricExpressions"] = [];

  // 1. x1^2 + x2^2 = (x1+x2)^2 - 2x1x2
  const expr1Val = S.mul(S).sub(new Fraction(2).mul(P));
  symmetricExpressions.push({
    name: i18n.symSquareSum.name,
    formulaTex: "x_1^2 + x_2^2",
    expandedFormulaTex: "(x_1 + x_2)^2 - 2x_1x_2",
    substitutionTex: `\\left(${S.toTex()}\\right)^2 - 2 \\cdot \\left(${P.toTex()}\\right)`,
    resultTex: expr1Val.toTex(),
    resultValue: expr1Val.toNumber(),
    isDefined: true,
    note: i18n.symSquareSum.note,
  });

  // 2. 1/x1 + 1/x2 = (x1+x2)/(x1*x2)
  if (P.num !== 0) {
    const expr2Val = S.div(P);
    symmetricExpressions.push({
      name: i18n.symReciprocalSum.name,
      formulaTex: "\\frac{1}{x_1} + \\frac{1}{x_2}",
      expandedFormulaTex: "\\frac{x_1 + x_2}{x_1x_2}",
      substitutionTex: `\\frac{${S.toTex()}}{${P.toTex()}}`,
      resultTex: expr2Val.toTex(),
      resultValue: expr2Val.toNumber(),
      isDefined: true,
      note: i18n.symReciprocalSum.note,
    });
  } else {
    symmetricExpressions.push({
      name: i18n.symReciprocalSum.name,
      formulaTex: "\\frac{1}{x_1} + \\frac{1}{x_2}",
      expandedFormulaTex: "\\frac{x_1 + x_2}{x_1x_2}",
      substitutionTex: "\\text{Denominator } x_1x_2 = 0",
      resultTex: i18n.symReciprocalSum.undefinedText,
      resultValue: null,
      isDefined: false,
      note: i18n.symReciprocalSum.undefinedNote,
    });
  }

  // 3. |x1 - x2| = sqrt(Delta) / |a|
  if (deltaNum >= 0) {
    const expr3Val = Math.sqrt(deltaNum) / Math.abs(a.toNumber());
    const diffSq = S.mul(S).sub(new Fraction(4).mul(P));
    symmetricExpressions.push({
      name: i18n.symAbsDiff.name,
      formulaTex: "|x_1 - x_2|",
      expandedFormulaTex: "\\sqrt{(x_1+x_2)^2 - 4x_1x_2} = \\frac{\\sqrt{\\Delta}}{|a|}",
      substitutionTex: `\\sqrt{\\left(${S.toTex()}\\right)^2 - 4 \\cdot \\left(${P.toTex()}\\right)} = \\sqrt{${diffSq.toTex()}}`,
      resultTex: Number.isInteger(Math.sqrt(diffSq.toNumber()))
        ? new Fraction(Math.sqrt(diffSq.num), Math.sqrt(diffSq.den)).toTex()
        : `${expr3Val.toFixed(4)}`,
      resultValue: expr3Val,
      isDefined: true,
      note: i18n.symAbsDiff.note,
    });
  } else {
    symmetricExpressions.push({
      name: i18n.symAbsDiff.name,
      formulaTex: "|x_1 - x_2|",
      expandedFormulaTex: "\\frac{\\sqrt{\\Delta}}{|a|}",
      substitutionTex: "\\Delta < 0",
      resultTex: i18n.symAbsDiff.noRealText,
      resultValue: null,
      isDefined: false,
      note: i18n.symAbsDiff.note,
    });
  }

  // 4. (x1 - x2)^2 = (x1+x2)^2 - 4x1x2
  const expr4Val = S.mul(S).sub(new Fraction(4).mul(P));
  symmetricExpressions.push({
    name: i18n.symDiffSquare.name,
    formulaTex: "(x_1 - x_2)^2",
    expandedFormulaTex: "(x_1 + x_2)^2 - 4x_1x_2 = \\frac{\\Delta}{a^2}",
    substitutionTex: `\\left(${S.toTex()}\\right)^2 - 4 \\cdot \\left(${P.toTex()}\\right)`,
    resultTex: expr4Val.toTex(),
    resultValue: expr4Val.toNumber(),
    isDefined: true,
    note: i18n.symDiffSquare.note,
  });

  // 5. x1^3 + x2^3 = (x1+x2)[(x1+x2)^2 - 3x1x2]
  const expr5Val = S.mul(S.mul(S).sub(new Fraction(3).mul(P)));
  symmetricExpressions.push({
    name: i18n.symCubeSum.name,
    formulaTex: "x_1^3 + x_2^3",
    expandedFormulaTex: "(x_1+x_2)[(x_1+x_2)^2 - 3x_1x_2]",
    substitutionTex: `(${S.toTex()}) \\cdot \\left[\\left(${S.toTex()}\\right)^2 - 3 \\cdot \\left(${P.toTex()}\\right)\\right]`,
    resultTex: expr5Val.toTex(),
    resultValue: expr5Val.toNumber(),
    isDefined: true,
    note: i18n.symCubeSum.note,
  });

  // 6. x1/x2 + x2/x1 = (x1^2 + x2^2)/(x1x2)
  if (P.num !== 0) {
    const expr6Val = expr1Val.div(P);
    symmetricExpressions.push({
      name: i18n.symRatioSum.name,
      formulaTex: "\\frac{x_1}{x_2} + \\frac{x_2}{x_1}",
      expandedFormulaTex: "\\frac{x_1^2 + x_2^2}{x_1x_2} = \\frac{(x_1+x_2)^2 - 2x_1x_2}{x_1x_2}",
      substitutionTex: `\\frac{${expr1Val.toTex()}}{${P.toTex()}}`,
      resultTex: expr6Val.toTex(),
      resultValue: expr6Val.toNumber(),
      isDefined: true,
      note: i18n.symRatioSum.note,
    });
  }

  // --- Parabola Key Points ---
  const vertexXFrac = b.neg().div(new Fraction(2).mul(a));
  const vertexYFrac = delta.neg().div(new Fraction(4).mul(a));
  const vertexX = vertexXFrac.toNumber();
  const vertexY = vertexYFrac.toNumber();
  const vertexTex = `\\left(${vertexXFrac.toTex()}, \\, ${vertexYFrac.toTex()}\\right)`;
  const axisOfSymmetry = vertexX;
  const axisOfSymmetryTex = `x = ${vertexXFrac.toTex()}`;
  const yIntercept = c.toNumber();
  const realRoots = !isComplex ? (deltaNum === 0 ? [approx1] : [approx1, approx2]) : [];

  return {
    a,
    b,
    c,
    standardEquationTex,
    delta,
    deltaTex: delta.toTex(),
    deltaClassification,
    deltaExplanation,
    sumOfRoots,
    sumOfRootsTex,
    productOfRoots,
    productOfRootsTex,
    roots: {
      exactTex1,
      exactTex2,
      approx1,
      approx2,
      isComplex,
    },
    completingSquareSteps,
    formulaSteps,
    factoring: {
      canFactorIntegers,
      factorsTex,
      crossDiagram,
      explanation: factoringExplanation,
    },
    symmetricExpressions,
    parabola: {
      vertexX,
      vertexY,
      vertexTex,
      axisOfSymmetry,
      axisOfSymmetryTex,
      yIntercept,
      roots: realRoots,
      opensUp: a.toNumber() > 0,
    },
  };
}

/**
 * Given two roots x1 and x2, construct the quadratic equation
 */
export interface RootsToEquationResult {
  x1Input: string;
  x2Input: string;
  sumFrac: Fraction;
  productFrac: Fraction;
  sumTex: string;
  productTex: string;
  monicEquationTex: string;
  standardEquationTex: string;
  a: number;
  b: number;
  c: number;
  steps: {
    title: string;
    description: string;
    mathTex: string;
  }[];
}

export function constructEquationFromRoots(
  x1: Fraction,
  x2: Fraction,
  lang: Language = "en"
): RootsToEquationResult {
  const i18n = SOLVER_I18N[lang] || SOLVER_I18N.en;

  const S = x1.add(x2);
  const P = x1.mul(x2);

  // Monic equation: x^2 - Sx + P = 0
  const formatS = (val: Fraction) => {
    if (val.num === 0) return "";
    const isNeg = val.num < 0;
    const absVal = val.abs();
    const sign = isNeg ? " + " : " - ";
    if (absVal.num === absVal.den) return `${sign}x`;
    return `${sign}${absVal.toTex()}x`;
  };

  const formatP = (val: Fraction) => {
    if (val.num === 0) return "";
    const isNeg = val.num < 0;
    const absVal = val.abs();
    const sign = isNeg ? " + " : " - ";
    return `${sign}${absVal.toTex()}`;
  };

  const monicEquationTex = `x^2${formatS(S)}${formatP(P)} = 0`;

  // To find integer coefficients:
  const l = Fraction.lcm(S.den, P.den);
  let a = l;
  let b = -S.num * (l / S.den);
  let c = P.num * (l / P.den);

  const g = Fraction.gcd(a, Fraction.gcd(Math.abs(b), Math.abs(c)));
  a = a / g;
  b = b / g;
  c = c / g;

  const leadA = a === 1 ? "x^2" : `${a}x^2`;
  const midB = b === 0 ? "" : (b > 0 ? (b === 1 ? " + x" : ` + ${b}x`) : (b === -1 ? " - x" : ` - ${Math.abs(b)}x`));
  const endC = c === 0 ? "" : (c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`);

  const standardEquationTex = `${leadA}${midB}${endC} = 0`;

  const steps = [
    {
      title: i18n.rootsStep1Title,
      description: i18n.rootsStep1Desc,
      mathTex: `S = x_1 + x_2 = ${x1.toTex()} + ${x2.toTex(true)} = ${S.toTex()}, \\quad P = x_1 \\cdot x_2 = (${x1.toTex()}) \\cdot (${x2.toTex()}) = ${P.toTex()}`,
    },
    {
      title: i18n.rootsStep2Title,
      description: i18n.rootsStep2Desc,
      mathTex: `x^2 - (${S.toTex()})x + (${P.toTex()}) = 0 \\implies ${monicEquationTex}`,
    },
    {
      title: i18n.rootsStep3Title,
      description: i18n.rootsStep3Desc(l),
      mathTex: `${standardEquationTex} \\quad (a = ${a}, \\, b = ${b}, \\, c = ${c})`,
    },
    {
      title: i18n.rootsStep4Title,
      description: i18n.rootsStep4Desc,
      mathTex: `-\\frac{b}{a} = -\\frac{${b}}{${a}} = ${S.toTex()} = x_1 + x_2, \\quad \\frac{c}{a} = \\frac{${c}}{${a}} = ${P.toTex()} = x_1 x_2 \\quad (${i18n.rootsStep4Check})`,
    },
  ];

  return {
    x1Input: x1.toString(),
    x2Input: x2.toString(),
    sumFrac: S,
    productFrac: P,
    sumTex: S.toTex(),
    productTex: P.toTex(),
    monicEquationTex,
    standardEquationTex,
    a,
    b,
    c,
    steps,
  };
}
