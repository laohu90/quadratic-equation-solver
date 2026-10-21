import { Language } from "../i18n/translations";

export interface ExamQuestion {
  id: string;
  category: string;
  title: string;
  question: string;
  questionTex?: string;
  correctAnswer: string;
  detailedAnalysis: {
    trapAlert?: string;
    steps: {
      title: string;
      content: string;
      tex?: string;
    }[];
    summary: string;
  };
}

export function getExamQuestions(lang: Language = "en"): ExamQuestion[] {
  switch (lang) {
    case "es":
      return [
        {
          id: "q1",
          category: "Fundamentos",
          title: "Hallar la segunda raíz y el parámetro m",
          question: "Dada la ecuación cuadrática x² - 4x + m = 0 con una raíz conocida x₁ = 1, halla la otra raíz x₂ y el valor del parámetro m.",
          questionTex: "x^2 - 4x + m = 0 \\quad (x_1 = 1)",
          correctAnswer: "Segunda raíz x₂ = 3, parámetro m = 3",
          detailedAnalysis: {
            trapAlert: "En lugar de sustituir 1 y resolver de nuevo, usar las relaciones de Vieta simplifica enormemente los cálculos.",
            steps: [
              {
                title: "Paso 1: Suma de raíces por Vieta",
                content: "Por las relaciones de Vieta, la suma de las raíces es x₁ + x₂ = -(-4)/1 = 4. Sabiendo que x₁ = 1:",
                tex: "1 + x_2 = 4 \\implies x_2 = 3",
              },
              {
                title: "Paso 2: Producto de raíces para hallar m",
                content: "El producto de las raíces es x₁ · x₂ = m / 1 = m:",
                tex: "m = x_1 \\cdot x_2 = 1 \\times 3 = 3",
              },
              {
                title: "Paso 3: Verificación del discriminante Δ",
                content: "Comprobar que existen raíces reales:",
                tex: "\\Delta = (-4)^2 - 4 \\times 1 \\times 3 = 16 - 12 = 4 > 0 \\quad (\\text{Válido})",
              },
            ],
            summary: "Las relaciones de Vieta permiten calcular raíces y parámetros desconocidos de forma inmediata sin resolver la ecuación completa.",
          },
        },
        {
          id: "q2",
          category: "Trampas y Errores Típicos",
          title: "Suma de recíprocos y verificación obligatoria de Δ ≥ 0",
          question: "Para la ecuación x² + 2(k - 1)x + k² = 0 con dos raíces reales x₁ y x₂, sabiendo que 1/x₁ + 1/x₂ = -2, determina el valor de k.",
          questionTex: "x^2 + 2(k - 1)x + k^2 = 0, \\quad \\frac{1}{x_1} + \\frac{1}{x_2} = -2",
          correctAnswer: "k = -1/2 (tras verificar Δ ≥ 0 y denominador ≠ 0)",
          detailedAnalysis: {
            trapAlert: "¡Atención a la condición oculta! Siempre que se use Vieta con parámetros, se debe comprobar que el discriminante sea no negativo (Δ ≥ 0).",
            steps: [
              {
                title: "Paso 1: Expresar suma y producto de raíces",
                content: "Identificando coeficientes a = 1, b = 2(k-1), c = k²:",
                tex: "x_1 + x_2 = -2(k - 1), \\quad x_1 x_2 = k^2",
              },
              {
                title: "Paso 2: Reducir la suma de recíprocos",
                content: "Poniendo a común denominador:",
                tex: "\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 x_2} = \\frac{-2(k - 1)}{k^2} = -2",
              },
              {
                title: "Paso 3: Resolver la ecuación y validar con Δ",
                content: "De -2(k - 1) = -2k² obtenemos k² - k + 1 = 0 o restricciones según corresponda, verificando siempre Δ ≥ 0.",
                tex: "\\Delta = 4(k-1)^2 - 4k^2 = -8k + 4 \\ge 0 \\implies k \\le \\frac{1}{2}",
              },
            ],
            summary: "Regla de oro: Al aplicar Vieta, ¡siempre verificar que el discriminante Δ ≥ 0 admita raíces reales!",
          },
        },
        {
          id: "q3",
          category: "Avanzado",
          title: "Relación de multiplicidad x₁ = 2x₂",
          question: "En la ecuación 2x² - 6x + m = 0, las raíces cumplen x₁ = 2x₂. Halla ambas raíces y el parámetro m.",
          questionTex: "2x^2 - 6x + m = 0 \\quad (x_1 = 2x_2)",
          correctAnswer: "x₁ = 2, x₂ = 1, m = 4",
          detailedAnalysis: {
            steps: [
              {
                title: "Paso 1: Plantear la suma y el producto",
                content: "Por el teorema de Vieta:",
                tex: "x_1 + x_2 = -\\frac{-6}{2} = 3, \\quad x_1 x_2 = \\frac{m}{2}",
              },
              {
                title: "Paso 2: Sustituir la relación x₁ = 2x₂",
                content: "Sustituyendo en la suma:",
                tex: "2x_2 + x_2 = 3 \\implies 3x_2 = 3 \\implies x_2 = 1",
              },
              {
                title: "Paso 3: Calcular x₁ y el parámetro m",
                content: "Por lo tanto x₁ = 2, y en el producto:",
                tex: "x_1 x_2 = 2 \\times 1 = 2 = \\frac{m}{2} \\implies m = 4",
              },
            ],
            summary: "Combinar una relación lineal entre raíces con la suma de Vieta permite resolver incógnitas por sustitución inmediata.",
          },
        },
      ];

    case "fr":
      return [
        {
          id: "q1",
          category: "Fondamentaux",
          title: "Trouver la seconde racine et le paramètre m",
          question: "Soit l'équation du second degré x² - 4x + m = 0 avec une racine connue x₁ = 1. Déterminer l'autre racine x₂ ainsi que la valeur de m.",
          questionTex: "x^2 - 4x + m = 0 \\quad (x_1 = 1)",
          correctAnswer: "Seconde racine x₂ = 3, m = 3",
          detailedAnalysis: {
            trapAlert: "Utiliser la somme et le produit de Viète évite des calculs superflus de substitution.",
            steps: [
              {
                title: "Étape 1 : Somme des racines (Viète)",
                content: "D'après les relations de Viète, la somme vaut x₁ + x₂ = -(-4)/1 = 4. Comme x₁ = 1 :",
                tex: "1 + x_2 = 4 \\implies x_2 = 3",
              },
              {
                title: "Étape 2 : Produit des racines pour trouver m",
                content: "Le produit vaut x₁ · x₂ = m / 1 = m :",
                tex: "m = 1 \\times 3 = 3",
              },
              {
                title: "Étape 3 : Vérification du discriminant Δ",
                content: "Existence des racines réelles :",
                tex: "\\Delta = (-4)^2 - 4 \\times 1 \\times 3 = 4 > 0 \\quad (\\text{Vérifié})",
              },
            ],
            summary: "Les relations de Viète permettent de résoudre rapidement les paramètres sans réécrire l'équation.",
          },
        },
        {
          id: "q2",
          category: "Pièges Classiques",
          title: "Somme des inverses et vérification obligatoire de Δ ≥ 0",
          question: "Pour l'équation x² + 2(k - 1)x + k² = 0 admettant deux racines réelles x₁ et x₂, sachant que 1/x₁ + 1/x₂ = -2, trouver k.",
          questionTex: "x^2 + 2(k - 1)x + k^2 = 0, \\quad \\frac{1}{x_1} + \\frac{1}{x_2} = -2",
          correctAnswer: "Validation par le discriminant Δ ≥ 0 indispensable",
          detailedAnalysis: {
            trapAlert: "Attention au piège de l'existence des racines réelles ! Le discriminant doit impérativement être supérieur ou égal à zéro.",
            steps: [
              {
                title: "Étape 1 : Établir somme et produit",
                content: "Avec a = 1, b = 2(k-1), c = k² :",
                tex: "x_1 + x_2 = -2(k - 1), \\quad x_1 x_2 = k^2",
              },
              {
                title: "Étape 2 : Réduction au même dénominateur",
                content: "Transformation de la somme des inverses :",
                tex: "\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 x_2} = \\frac{-2(k - 1)}{k^2} = -2",
              },
              {
                title: "Étape 3 : Condition de réalité Δ ≥ 0",
                content: "Pour que les racines existent dans les réels :",
                tex: "\\Delta = 4(k-1)^2 - 4k^2 = -8k + 4 \\ge 0 \\implies k \\le \\frac{1}{2}",
              },
            ],
            summary: "Règle essentielle : Toujours vérifier la condition d'existence Δ ≥ 0 lors de l'usage des relations coefficients-racines.",
          },
        },
        {
          id: "q3",
          category: "Approfondissement",
          title: "Racines avec rapport multiplicatif x₁ = 2x₂",
          question: "Les racines de l'équation 2x² - 6x + m = 0 vérifient x₁ = 2x₂. Trouver les racines et la valeur de m.",
          questionTex: "2x^2 - 6x + m = 0 \\quad (x_1 = 2x_2)",
          correctAnswer: "x₁ = 2, x₂ = 1, m = 4",
          detailedAnalysis: {
            steps: [
              {
                title: "Étape 1 : Relations de Viète",
                content: "Somme et produit des racines :",
                tex: "x_1 + x_2 = -\\frac{-6}{2} = 3, \\quad x_1 x_2 = \\frac{m}{2}",
              },
              {
                title: "Étape 2 : Remplacement de x₁ = 2x₂",
                content: "En substituant dans la somme :",
                tex: "2x_2 + x_2 = 3 \\implies 3x_2 = 3 \\implies x_2 = 1",
              },
              {
                title: "Étape 3 : Déduction de x₁ et m",
                content: "On trouve x₁ = 2 et on calcule m :",
                tex: "x_1 x_2 = 2 = \\frac{m}{2} \\implies m = 4",
              },
            ],
            summary: "L'association de la relation multiplicatrice et de la somme des racines donne immédiatement les valeurs cherchées.",
          },
        },
      ];

    case "pt":
      return [
        {
          id: "q1",
          category: "Fundamentos",
          title: "Encontrar a outra raiz e o parâmetro m",
          question: "Dada a equação do 2º grau x² - 4x + m = 0 com raiz conhecida x₁ = 1, determine a outra raiz x₂ e o valor do parâmetro m.",
          questionTex: "x^2 - 4x + m = 0 \\quad (x_1 = 1)",
          correctAnswer: "Segunda raiz x₂ = 3, parâmetro m = 3",
          detailedAnalysis: {
            trapAlert: "Usar as relações de Girard / Vieta poupa tempo valioso em vez de recalcular por Bhaskara.",
            steps: [
              {
                title: "Passo 1: Soma das raízes (Girard/Vieta)",
                content: "Pela relação da soma, x₁ + x₂ = -(-4)/1 = 4. Como x₁ = 1:",
                tex: "1 + x_2 = 4 \\implies x_2 = 3",
              },
              {
                title: "Passo 2: Produto das raízes para achar m",
                content: "Pelo produto das raízes, x₁ · x₂ = m / 1 = m:",
                tex: "m = 1 \\times 3 = 3",
              },
              {
                title: "Passo 3: Verificação de Δ ≥ 0",
                content: "Garantir a existência de raízes reais:",
                tex: "\\Delta = (-4)^2 - 4 \\times 1 \\times 3 = 4 > 0 \\quad (\\text{Válido})",
              },
            ],
            summary: "As relações de Girard permitem encontrar raízes e coeficientes desconhecidos diretamente pela soma e produto.",
          },
        },
        {
          id: "q2",
          category: "Pegadinhas Clássicas",
          title: "Soma dos inversos e verificação indispensável de Δ ≥ 0",
          question: "Na equação x² + 2(k - 1)x + k² = 0 com duas raízes reais x₁ e x₂, sabendo que 1/x₁ + 1/x₂ = -2, calcule k.",
          questionTex: "x^2 + 2(k - 1)x + k^2 = 0, \\quad \\frac{1}{x_1} + \\frac{1}{x_2} = -2",
          correctAnswer: "k = -1/2 (com validação estrita de Δ ≥ 0)",
          detailedAnalysis: {
            trapAlert: "Atenção à condição oculta! Sempre que encontrar o parâmetro por soma e produto, confirme se o discriminante Δ ≥ 0.",
            steps: [
              {
                title: "Passo 1: Identificar soma e produto",
                content: "Sendo a = 1, b = 2(k-1), c = k²:",
                tex: "x_1 + x_2 = -2(k - 1), \\quad x_1 x_2 = k^2",
              },
              {
                title: "Passo 2: Reduzir ao mesmo denominador",
                content: "Operando a soma de frações:",
                tex: "\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 x_2} = \\frac{-2(k - 1)}{k^2} = -2",
              },
              {
                title: "Passo 3: Impor condição do discriminante",
                content: "Para haver raízes reais no conjunto ℝ:",
                tex: "\\Delta = 4(k-1)^2 - 4k^2 = -8k + 4 \\ge 0 \\implies k \\le \\frac{1}{2}",
              },
            ],
            summary: "Regra essencial: Nas relações entre raízes e coeficientes, certifique-se sempre de que Δ ≥ 0.",
          },
        },
        {
          id: "q3",
          category: "Avançado",
          title: "Raízes proporcionais x₁ = 2x₂",
          question: "Para a equação 2x² - 6x + m = 0 cujas raízes satisfazem x₁ = 2x₂, calcule as raízes e o valor de m.",
          questionTex: "2x^2 - 6x + m = 0 \\quad (x_1 = 2x_2)",
          correctAnswer: "x₁ = 2, x₂ = 1, m = 4",
          detailedAnalysis: {
            steps: [
              {
                title: "Passo 1: Escrever soma e produto",
                content: "Pelas fórmulas de Girard:",
                tex: "x_1 + x_2 = -\\frac{-6}{2} = 3, \\quad x_1 x_2 = \\frac{m}{2}",
              },
              {
                title: "Passo 2: Substituir a relação x₁ = 2x₂",
                content: "Na equação da soma:",
                tex: "2x_2 + x_2 = 3 \\implies 3x_2 = 3 \\implies x_2 = 1",
              },
              {
                title: "Passo 3: Encontrar x₁ e m",
                content: "Assim, x₁ = 2 e pelo produto:",
                tex: "x_1 x_2 = 2 \\times 1 = 2 = \\frac{m}{2} \\implies m = 4",
              },
            ],
            summary: "Relacionar a proporção dada com a soma das raízes resulta em uma resolução rápida e elegante.",
          },
        },
      ];

    case "zh":
      return [
        {
          id: "q1",
          category: "基础巩固例题",
          title: "已知一根求另一根及待定系数",
          question: "已知关于 x 的一元二次方程 x^2 - 4x + m = 0 的一个根为 1，求方程的另一个根以及 m 的值。",
          questionTex: "x^2 - 4x + m = 0 \\quad (x_1 = 1)",
          correctAnswer: "另一个根 x₂ = 3，m = 3",
          detailedAnalysis: {
            trapAlert: "相比直接把 1 代入算出 m 后再去解方程，利用两根之和与两根之积的韦达关系能大幅简化计算过程。",
            steps: [
              {
                title: "步骤 1：利用两根之和求出另一根",
                content: "根据韦达定理，两根之和 x₁ + x₂ = -(-4)/1 = 4。已知 x₁ = 1：",
                tex: "1 + x_2 = 4 \\implies x_2 = 3",
              },
              {
                title: "步骤 2：利用两根之积求待定系数 m",
                content: "根据韦达定理，两根之积 x₁ · x₂ = m / 1 = m：",
                tex: "m = x_1 \\cdot x_2 = 1 \\times 3 = 3",
              },
              {
                title: "步骤 3：验证判别式 Δ ≥ 0",
                content: "检查方程实数根的存在性：",
                tex: "\\Delta = (-4)^2 - 4 \\times 1 \\times 3 = 16 - 12 = 4 > 0 \\quad (\\text{符合题意})",
              },
            ],
            summary: "利用根与系数关系，省去复杂的代入回解，直接求解一根与系数问题。",
          },
        },
        {
          id: "q2",
          category: "易错辨析例题",
          title: "倒数和求未知参数 (重点检验 Δ ≥ 0)",
          question: "已知关于 x 的方程 x^2 + 2(k - 1)x + k^2 = 0 有两个实数根 x₁、x₂，且满足 1/x₁ + 1/x₂ = -2，求 k 的值。",
          questionTex: "x^2 + 2(k - 1)x + k^2 = 0, \\quad \\frac{1}{x_1} + \\frac{1}{x_2} = -2",
          correctAnswer: "注意判别式检验：必须满足 Δ ≥ 0 且分母不为 0",
          detailedAnalysis: {
            trapAlert: "本题重点考察隐形约束条件！求出待定系数后，必须回代验证判别式 Δ ≥ 0 及分母 x₁x₂ ≠ 0 是否成立。",
            steps: [
              {
                title: "步骤 1：列出两根之和与两根之积",
                content: "方程中 a = 1, b = 2(k-1), c = k²：",
                tex: "x_1 + x_2 = -2(k - 1), \\quad x_1 x_2 = k^2",
              },
              {
                title: "步骤 2：通分代入基本对称式",
                content: "通分代入两根之和与积：",
                tex: "\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 x_2} = \\frac{-2(k - 1)}{k^2} = -2",
              },
              {
                title: "步骤 3：列出判别式约束条件并验证",
                content: "方程存在实数根的前提条件：",
                tex: "\\Delta = [2(k-1)]^2 - 4 \\cdot 1 \\cdot k^2 = 4(k^2 - 2k + 1) - 4k^2 = -8k + 4 \\ge 0 \\implies k \\le \\frac{1}{2}",
              },
            ],
            summary: "解题规范：使用根与系数关系时，切记先核对 Δ ≥ 0 和 a ≠ 0，解出未知数后务必回代检验！",
          },
        },
        {
          id: "q3",
          category: "进阶拓展例题",
          title: "两根满足倍数关系 x₁ = 2x₂ 求待定系数",
          question: "已知一元二次方程 2x^2 - 6x + m = 0 的两根满足 x₁ = 2x₂，求两根及实数 m 的值。",
          questionTex: "2x^2 - 6x + m = 0 \\quad (x_1 = 2x_2)",
          correctAnswer: "x₁ = 2, x₂ = 1, m = 4",
          detailedAnalysis: {
            steps: [
              {
                title: "步骤 1：利用韦达定理建立关于两根的方程组",
                content: "根据韦达定理：",
                tex: "x_1 + x_2 = -\\frac{-6}{2} = 3, \\quad x_1 x_2 = \\frac{m}{2}",
              },
              {
                title: "步骤 2：代入倍数关系 x₁ = 2x₂",
                content: "将 x₁ = 2x₂ 代入两根之和等式中：",
                tex: "2x_2 + x_2 = 3 \\implies 3x_2 = 3 \\implies x_2 = 1",
              },
              {
                title: "步骤 3：求出另一根 x₁ 与参数 m",
                content: "由此求得 x₁ = 2 × 1 = 2，代入两根之积：",
                tex: "x_1 \\cdot x_2 = 2 \\times 1 = 2 = \\frac{m}{2} \\implies m = 4",
              },
              {
                title: "步骤 4：检验判别式",
                content: "计算 Δ：",
                tex: "\\Delta = (-6)^2 - 4 \\times 2 \\times 4 = 36 - 32 = 4 > 0 \\quad (\\text{成立})",
              },
            ],
            summary: "两根倍数关系通常与两根之和联立消元，得出具体数值后迅速算出积与参数。",
          },
        },
        {
          id: "q4",
          category: "基础巩固例题",
          title: "经典对称式：已知平方和求参数",
          question: "已知关于 x 的方程 x^2 - 3x + k = 0 的两实根为 x₁、x₂，若 x₁² + x₂² = 7，求 k 的值。",
          questionTex: "x^2 - 3x + k = 0, \\quad x_1^2 + x_2^2 = 7",
          correctAnswer: "k = 1",
          detailedAnalysis: {
            steps: [
              {
                title: "步骤 1：列出基础和与积",
                content: "由方程系数得：",
                tex: "x_1 + x_2 = 3, \\quad x_1 x_2 = k",
              },
              {
                title: "步骤 2：对平方和进行对称变形",
                content: "利用完全平方公式恒等变形：",
                tex: "x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2",
              },
              {
                title: "步骤 3：代入数据建立方程求解",
                content: "将 x₁ + x₂ = 3 与 x₁x₂ = k 代入：",
                tex: "3^2 - 2k = 7 \\implies 9 - 2k = 7 \\implies 2k = 2 \\implies k = 1",
              },
              {
                title: "步骤 4：严格检验判别式",
                content: "当 k = 1 时：",
                tex: "\\Delta = (-3)^2 - 4 \\times 1 \\times 1 = 9 - 4 = 5 > 0 \\quad (\\text{存在两实根，结果有效})",
              },
            ],
            summary: "平方和变形 x₁² + x₂² = (x₁+x₂)² - 2x₁x₂ 是最常用的基本对称变形公式。",
          },
        },
      ];

    // Default English
    default:
      return [
        {
          id: "q1",
          category: "Fundamentals",
          title: "Given One Root, Find the Other Root and Parameter m",
          question: "Given the quadratic equation x² - 4x + m = 0 with known root x₁ = 1, find the other root x₂ and parameter m.",
          questionTex: "x^2 - 4x + m = 0 \\quad (x_1 = 1)",
          correctAnswer: "Other root x₂ = 3, parameter m = 3",
          detailedAnalysis: {
            trapAlert: "Using Vieta's formulas directly avoids lengthy substitution and re-solving.",
            steps: [
              {
                title: "Step 1: Use Sum of Roots (Vieta)",
                content: "By Vieta's formulas, x₁ + x₂ = -(-4)/1 = 4. Since x₁ = 1:",
                tex: "1 + x_2 = 4 \\implies x_2 = 3",
              },
              {
                title: "Step 2: Use Product of Roots to Find m",
                content: "By Vieta's formulas, x₁ · x₂ = m / 1 = m:",
                tex: "m = x_1 \\cdot x_2 = 1 \\times 3 = 3",
              },
              {
                title: "Step 3: Verify Discriminant Δ ≥ 0",
                content: "Check that real roots exist:",
                tex: "\\Delta = (-4)^2 - 4 \\times 1 \\times 3 = 16 - 12 = 4 > 0 \\quad (\\text{Valid})",
              },
            ],
            summary: "Vieta's relations immediately determine unknown roots and coefficients without full quadratic formula re-derivation.",
          },
        },
        {
          id: "q2",
          category: "Trap Alert Problems",
          title: "Reciprocal Sum and Mandatory Discriminant Check (Δ ≥ 0)",
          question: "For equation x² + 2(k - 1)x + k² = 0 having two real roots x₁, x₂ satisfying 1/x₁ + 1/x₂ = -2, find parameter k.",
          questionTex: "x^2 + 2(k - 1)x + k^2 = 0, \\quad \\frac{1}{x_1} + \\frac{1}{x_2} = -2",
          correctAnswer: "k must satisfy both the equation and Δ ≥ 0 constraint",
          detailedAnalysis: {
            trapAlert: "High-frequency pitfall: always verify that the discriminant Δ ≥ 0 so that real roots actually exist!",
            steps: [
              {
                title: "Step 1: List Sum and Product of Roots",
                content: "Given a = 1, b = 2(k-1), c = k²:",
                tex: "x_1 + x_2 = -2(k - 1), \\quad x_1 x_2 = k^2",
              },
              {
                title: "Step 2: Express Reciprocal Sum in Vieta Terms",
                content: "Combine over common denominator:",
                tex: "\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 x_2} = \\frac{-2(k - 1)}{k^2} = -2",
              },
              {
                title: "Step 3: Test Real Root Discriminant Constraint",
                content: "Equation requires real roots:",
                tex: "\\Delta = 4(k-1)^2 - 4k^2 = -8k + 4 \\ge 0 \\implies k \\le \\frac{1}{2}",
              },
            ],
            summary: "Standard rigor rule: Whenever parameter values are derived via Vieta, always check Δ ≥ 0 and non-zero denominators!",
          },
        },
        {
          id: "q3",
          category: "Advanced Expansion",
          title: "Proportional Roots Relationship x₁ = 2x₂",
          question: "Given equation 2x² - 6x + m = 0 with roots satisfying x₁ = 2x₂, find both roots and parameter m.",
          questionTex: "2x^2 - 6x + m = 0 \\quad (x_1 = 2x_2)",
          correctAnswer: "x₁ = 2, x₂ = 1, m = 4",
          detailedAnalysis: {
            steps: [
              {
                title: "Step 1: Set up Vieta's System",
                content: "By Vieta's formulas:",
                tex: "x_1 + x_2 = -\\frac{-6}{2} = 3, \\quad x_1 x_2 = \\frac{m}{2}",
              },
              {
                title: "Step 2: Substitute Proportional Condition",
                content: "Substitute x₁ = 2x₂ into sum of roots:",
                tex: "2x_2 + x_2 = 3 \\implies 3x_2 = 3 \\implies x_2 = 1",
              },
              {
                title: "Step 3: Solve for x₁ and m",
                content: "Hence x₁ = 2, and substituting into the product:",
                tex: "x_1 \\cdot x_2 = 2 \\times 1 = 2 = \\frac{m}{2} \\implies m = 4",
              },
            ],
            summary: "Pairing linear root relations with the sum of roots allows immediate one-variable elimination.",
          },
        },
        {
          id: "q4",
          category: "Fundamentals",
          title: "Classic Symmetric Identity: Given Sum of Squares",
          question: "For equation x² - 3x + k = 0 with real roots x₁, x₂, if x₁² + x₂² = 7, find the value of k.",
          questionTex: "x^2 - 3x + k = 0, \\quad x_1^2 + x_2^2 = 7",
          correctAnswer: "k = 1",
          detailedAnalysis: {
            steps: [
              {
                title: "Step 1: Extract Vieta Sum and Product",
                content: "From coefficients:",
                tex: "x_1 + x_2 = 3, \\quad x_1 x_2 = k",
              },
              {
                title: "Step 2: Apply Binomial Square Identity",
                content: "Express sum of squares symmetrically:",
                tex: "x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2",
              },
              {
                title: "Step 3: Substitute and Solve for k",
                content: "Substitute into equation:",
                tex: "3^2 - 2k = 7 \\implies 9 - 2k = 7 \\implies k = 1",
              },
              {
                title: "Step 4: Check Discriminant Δ",
                content: "When k = 1:",
                tex: "\\Delta = (-3)^2 - 4(1)(1) = 5 > 0 \\quad (\\text{Real roots exist, valid})",
              },
            ],
            summary: "The identity x₁² + x₂² = (x₁+x₂)² - 2x₁x₂ is the foundation of all quadratic symmetric polynomial tasks.",
          },
        },
      ];
  }
}
