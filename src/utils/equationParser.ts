import { Fraction } from "./fraction";

/**
 * Intelligent Quadratic Equation String Parser
 * Supports formats like:
 * - "2x^2 + 5x - 3 = 0"
 * - "x^2 - 4x = 5"
 * - "3x^2 = 7x + 2"
 * - "x(x - 3) = 10"
 * - "(x - 2)^2 = 9"
 * - "-x^2 + 6x - 9 = 0"
 */

export interface ParsedEquationResult {
  a: Fraction;
  b: Fraction;
  c: Fraction;
  normalizedTex: string;
  originalText: string;
}

export function parseFreeEquation(input: string): ParsedEquationResult | null {
  const cleaned = input.trim().replace(/\s+/g, "").replace(/X/g, "x");
  if (!cleaned) return null;

  try {
    // Check if contains '='
    let lhs = cleaned;
    let rhs = "0";
    if (cleaned.includes("=")) {
      const parts = cleaned.split("=");
      if (parts.length === 2) {
        lhs = parts[0];
        rhs = parts[1];
      }
    }

    // Expand products like x(x-3) or (x-2)^2
    const expandSide = (expr: string): string => {
      let s = expr;
      // Handle (x+a)^2 or (x-a)^2 or (ax+b)^2
      const squareRegex = /\(([+-]?\d*)x([+-]\d+)\)\^2/g;
      s = s.replace(squareRegex, (_, leadCoeff, constCoeff) => {
        const p = leadCoeff === "" || leadCoeff === "+" ? 1 : leadCoeff === "-" ? -1 : parseInt(leadCoeff);
        const q = parseInt(constCoeff);
        const aVal = p * p;
        const bVal = 2 * p * q;
        const cVal = q * q;
        return `+${aVal}x^2${bVal >= 0 ? "+" : ""}${bVal}x+${cVal}`;
      });

      // Handle x(ax+b) or ax(bx+c)
      const parenRegex = /([+-]?\d*)x\(([+-]?\d*)x([+-]\d+)\)/g;
      s = s.replace(parenRegex, (_, outerCoeff, innerLead, innerConst) => {
        const m = outerCoeff === "" || outerCoeff === "+" ? 1 : outerCoeff === "-" ? -1 : parseInt(outerCoeff);
        const p = innerLead === "" || innerLead === "+" ? 1 : innerLead === "-" ? -1 : parseInt(innerLead);
        const q = parseInt(innerConst);
        const aVal = m * p;
        const bVal = m * q;
        return `+${aVal}x^2${bVal >= 0 ? "+" : ""}${bVal}x`;
      });

      return s;
    };

    const expandedLhs = expandSide(lhs);
    const expandedRhs = expandSide(rhs);

    // Parse polynomial terms: ax^2 + bx + c
    // We compute totalA, totalB, totalC
    const extractCoeffs = (expr: string, multiplier: number = 1) => {
      let curA = 0;
      let curB = 0;
      let curC = 0;

      // Tokenize by + and - signs
      const formatted = expr.replace(/-/g, "+-");
      const tokens = formatted.split("+").filter(Boolean);

      for (const tok of tokens) {
        if (tok.includes("x^2") || tok.includes("x²")) {
          const lead = tok.replace(/x\^2|x²/g, "");
          const val = lead === "" || lead === "+" ? 1 : lead === "-" ? -1 : parseFloat(lead);
          if (!isNaN(val)) curA += val * multiplier;
        } else if (tok.includes("x")) {
          const lead = tok.replace("x", "");
          const val = lead === "" || lead === "+" ? 1 : lead === "-" ? -1 : parseFloat(lead);
          if (!isNaN(val)) curB += val * multiplier;
        } else {
          const val = parseFloat(tok);
          if (!isNaN(val)) curC += val * multiplier;
        }
      }

      return { a: curA, b: curB, c: curC };
    };

    const left = extractCoeffs(expandedLhs, 1);
    const right = extractCoeffs(expandedRhs, -1); // moved to left

    let netA = left.a + right.a;
    let netB = left.b + right.b;
    let netC = left.c + right.c;

    if (Math.abs(netA) < 0.00001) {
      return null; // Not a quadratic equation
    }

    // Convert to Fraction
    const fracA = new Fraction(netA);
    const fracB = new Fraction(netB);
    const fracC = new Fraction(netC);

    const normTex = `${fracA.toTex()}x^2 ${netB >= 0 ? "+" : ""} ${fracB.toTex()}x ${netC >= 0 ? "+" : ""} ${fracC.toTex()} = 0`;

    return {
      a: fracA,
      b: fracB,
      c: fracC,
      normalizedTex: normTex,
      originalText: input,
    };
  } catch {
    return null;
  }
}
