# Vieta's Formulas & Quadratic Equation Calculator (韦达定理与一元二次方程计算器)

A fast, interactive, and educational web application for solving quadratic equations, exploring Vieta's formulas (relations between roots and coefficients), deriving equations from roots, and visualizing algebraic methods.

## ✨ Features

- **Quadratic Equation Solver**: Real-time solving with exact fraction arithmetic, discriminant $\Delta = b^2 - 4ac$ classification, and roots computation.
- **5-Step Completing the Square**: Complete step-by-step mathematical breakdown with interactive geometric area visualization.
- **Vieta's Formulas & Symmetric Polynomials**: Automatic evaluation of classic identities ($x_1^2 + x_2^2$, $1/x_1 + 1/x_2$, $|x_1 - x_2|$, $x_1^3 + x_2^3$, etc.).
- **Roots to Equation (Converse Vieta)**: Reconstruct standard integer-coefficient quadratic equations from rational roots or conjugate radicals ($m \pm \sqrt{n}$).
- **Interactive Parabola Graph**: High-DPI canvas showing vertex, axis of symmetry, roots (x-intercepts), and y-intercept with coordinate hover probe.
- **Printable Practice Worksheets**: Generate randomized test sheets with selectable difficulty and complete step-by-step answer keys for printing or PDF export.
- **Multilingual Support**: Supports English, 简体中文, Español, Français, and Português with instant client-side switching.

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS
- **Math Typesetting**: KaTeX (exact TeX rendering with zero external CDN dependency)
- **Icons**: Lucide React

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## 📄 License

Apache-2.0
