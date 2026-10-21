/**
 * Fraction and Radical Math Utilities for Exact Quadratic Solutions
 */

export class Fraction {
  num: number;
  den: number;

  constructor(num: number, den: number = 1) {
    if (den === 0) {
      throw new Error("分母不能为0");
    }
    if (!Number.isInteger(num) || !Number.isInteger(den)) {
      // Convert floating point to fraction if close
      const precision = 10000;
      num = Math.round(num * precision);
      den = Math.round(den * precision);
    }
    if (den < 0) {
      num = -num;
      den = -den;
    }
    const g = Fraction.gcd(Math.abs(num), Math.abs(den));
    this.num = num / g;
    this.den = den / g;
  }

  static gcd(a: number, b: number): number {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b > 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a || 1;
  }

  static lcm(a: number, b: number): number {
    return Math.abs(Math.round(a * b)) / Fraction.gcd(a, b);
  }

  add(other: Fraction | number): Fraction {
    const o = typeof other === "number" ? new Fraction(other) : other;
    return new Fraction(this.num * o.den + o.num * this.den, this.den * o.den);
  }

  sub(other: Fraction | number): Fraction {
    const o = typeof other === "number" ? new Fraction(other) : other;
    return new Fraction(this.num * o.den - o.num * this.den, this.den * o.den);
  }

  mul(other: Fraction | number): Fraction {
    const o = typeof other === "number" ? new Fraction(other) : other;
    return new Fraction(this.num * o.num, this.den * o.den);
  }

  div(other: Fraction | number): Fraction {
    const o = typeof other === "number" ? new Fraction(other) : other;
    if (o.num === 0) throw new Error("除数不能为0");
    return new Fraction(this.num * o.den, this.den * o.num);
  }

  abs(): Fraction {
    return new Fraction(Math.abs(this.num), this.den);
  }

  neg(): Fraction {
    return new Fraction(-this.num, this.den);
  }

  toNumber(): number {
    return this.num / this.den;
  }

  toTex(bracketsIfNegative = false): string {
    if (this.den === 1) {
      if (bracketsIfNegative && this.num < 0) {
        return `(${this.num})`;
      }
      return `${this.num}`;
    }
    const sign = this.num < 0 ? "-" : "";
    const absNum = Math.abs(this.num);
    const frac = `${sign}\\frac{${absNum}}{${this.den}}`;
    if (bracketsIfNegative && this.num < 0) {
      return `\\left(${frac}\\right)`;
    }
    return frac;
  }

  toString(): string {
    if (this.den === 1) return `${this.num}`;
    return `${this.num}/${this.den}`;
  }
}

/**
 * Parses user input string (can be integer, decimal like -2.5, or fraction like -3/4)
 */
export function parseNumberOrFraction(input: string | number): Fraction | null {
  if (typeof input === "number") {
    if (isNaN(input)) return null;
    return new Fraction(input);
  }
  const str = input.trim();
  if (!str) return null;

  if (str.includes("/")) {
    const parts = str.split("/");
    if (parts.length === 2) {
      const n = parseFloat(parts[0]);
      const d = parseFloat(parts[1]);
      if (!isNaN(n) && !isNaN(d) && d !== 0) {
        return new Fraction(n, d);
      }
    }
    return null;
  }

  const val = parseFloat(str);
  if (isNaN(val)) return null;

  // Check if it's decimal
  if (str.includes(".")) {
    const decimalPlaces = str.split(".")[1]?.length || 0;
    const factor = Math.pow(10, Math.min(decimalPlaces, 6));
    return new Fraction(Math.round(val * factor), factor);
  }

  return new Fraction(val);
}

/**
 * Simplifies a square root: sqrt(n) -> { outer: k, inner: m } where n = k^2 * m
 */
export function simplifySqrt(n: number): { outer: number; inner: number } {
  if (n <= 0) return { outer: 0, inner: 0 };
  let outer = 1;
  let inner = n;

  for (let i = 2; i * i <= inner; i++) {
    while (inner % (i * i) === 0) {
      outer *= i;
      inner /= i * i;
    }
  }

  return { outer, inner };
}
