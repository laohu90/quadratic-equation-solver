import { Language } from "../i18n/translations";

export interface SolverStepText {
  title: string;
  desc: string;
}

export interface SolverLanguageBundle {
  // Delta
  deltaTwoDistinct: string;
  deltaTwoEqual: string;
  deltaNoReal: string;
  deltaTwoDistinctExp: string;
  deltaTwoEqualExp: string;
  deltaNoRealExp: string;

  // Completing the square steps
  step1Title: string;
  step1Desc: string;
  step2TitleNorm: string;
  step2DescNorm: (aTex: string) => string;
  step2TitleAlready: string;
  step2DescAlready: string;
  step3Title: string;
  step3Desc: (bDivATex: string, halfBTex: string, halfBSqTex: string) => string;
  step4Title: string;
  step4Desc: string;
  step5TitleDistinct: string;
  step5DescDistinct: (rhsTex: string) => string;
  step5TitleEqual: string;
  step5DescEqual: string;
  step5TitleNoReal: string;
  step5DescNoReal: (rhsTex: string, rootsTex: string) => string;

  // Formula steps
  formulaStep1Title: string;
  formulaStep1Desc: string;
  formulaStep2Title: string;
  formulaStep2Desc: string;
  formulaStep3Title: string;
  formulaStep3Desc: string;

  // Factoring
  factoringSuccess: (eqTex: string, p: number, q: number, r: number, s: number) => string;
  factoringFail: string;
  factoringNoReal: string;

  // Symmetric expressions
  symSquareSum: { name: string; note: string };
  symReciprocalSum: { name: string; note: string; undefinedNote: string; undefinedText: string };
  symAbsDiff: { name: string; note: string; noRealText: string };
  symDiffSquare: { name: string; note: string };
  symCubeSum: { name: string; note: string };
  symRatioSum: { name: string; note: string };

  // Roots to Equation
  rootsStep1Title: string;
  rootsStep1Desc: string;
  rootsStep2Title: string;
  rootsStep2Desc: string;
  rootsStep3Title: string;
  rootsStep3Desc: (lcm: number) => string;
  rootsStep4Title: string;
  rootsStep4Desc: string;
  rootsStep4Check: string;

  // Radical Conjugate roots
  radStep1Title: string;
  radStep1Desc: string;
  radStep2Title: string;
  radStep2Desc: string;
  radStep3Title: string;
  radStep3Desc: string;
  radStep4Title: string;
  radStep4Desc: string;
  radStep4Check: string;
}

export const SOLVER_I18N: Record<Language, SolverLanguageBundle> = {
  en: {
    deltaTwoDistinct: "Two Distinct Real Roots (Δ > 0)",
    deltaTwoEqual: "Two Equal Real Roots (Δ = 0)",
    deltaNoReal: "No Real Roots / Complex Conjugates (Δ < 0)",
    deltaTwoDistinctExp: "\\Delta > 0, \\text{ two distinct real roots}",
    deltaTwoEqualExp: "\\Delta = 0, \\text{ two equal real roots (tangent to x-axis)}",
    deltaNoRealExp: "\\Delta < 0, \\text{ no real roots (two complex conjugate roots)}",

    step1Title: "Step 1: Move Constant Term to the Right Side",
    step1Desc: "Isolate variable terms on the left side and move the constant term to the right side with opposite sign.",
    step2TitleNorm: "Step 2: Divide by Leading Coefficient a",
    step2DescNorm: (aTex) => `Divide both sides by leading coefficient a = ${aTex} to normalize the x² coefficient to 1.`,
    step2TitleAlready: "Step 2: Leading Coefficient is already 1",
    step2DescAlready: "Leading coefficient a = 1, normalization is already satisfied.",
    step3Title: "Step 3: Complete the Square on Both Sides",
    step3Desc: (bDivA, halfB, halfBSq) =>
      `Linear coefficient is ${bDivA}, half of it is ${halfB}, and its square is \\left(${halfB}\\right)^2 = ${halfBSq}. Add this square to both sides:`,
    step4Title: "Step 4: Factor Left Side into a Perfect Square",
    step4Desc: "Express the left side as (x ± b/2a)² using the binomial square formula and simplify the right side:",
    step5TitleDistinct: "Step 5: Solve by Taking Square Roots",
    step5DescDistinct: (rhsTex) => `The right side ${rhsTex} > 0. Taking the square root on both sides yields two distinct solutions:`,
    step5TitleEqual: "Step 5: Solve by Taking Square Roots (Repeated Root)",
    step5DescEqual: "The right side is 0, so taking square roots yields a repeated root (double root):",
    step5TitleNoReal: "Step 5: Right Side is Negative (No Real Solutions)",
    step5DescNoReal: (rhsTex, rootsTex) =>
      `Since the square of any real number cannot be negative and the right side ${rhsTex} < 0, there are no real roots (complex roots: ${rootsTex}).`,

    formulaStep1Title: "Step 1: Identify Standard Coefficients",
    formulaStep1Desc: "Match equation with standard form ax² + bx + c = 0:",
    formulaStep2Title: "Step 2: Calculate Discriminant Δ",
    formulaStep2Desc: "Evaluate the discriminant formula Δ = b² - 4ac:",
    formulaStep3Title: "Step 3: Substitute into Quadratic Formula",
    formulaStep3Desc: "Apply the quadratic formula x = (-b ± √Δ) / 2a:",

    factoringSuccess: (eqTex, p, q, r, s) =>
      `Factored using cross-multiplication: (${p}x ${q >= 0 ? "+" : ""}${q})(${r}x ${s >= 0 ? "+" : ""}${s}) = 0.`,
    factoringFail: "Discriminant is not a perfect square, irreducible over integers.",
    factoringNoReal: "Discriminant Δ < 0, equation has no real factors.",

    symSquareSum: {
      name: "Sum of Squares of Roots",
      note: "Standard symmetric polynomial transformed via (x₁+x₂)² - 2x₁x₂",
    },
    symReciprocalSum: {
      name: "Sum of Reciprocals of Roots",
      note: "Find common denominator: (x₁+x₂)/(x₁x₂)",
      undefinedNote: "Undefined when one of the roots is 0",
      undefinedText: "\\text{Undefined (one root is 0)}",
    },
    symAbsDiff: {
      name: "Absolute Difference of Roots |x₁ - x₂|",
      note: "Geometrically represents the distance between x-intercepts of the parabola",
      noRealText: "\\text{No real roots}",
    },
    symDiffSquare: {
      name: "Square of Root Difference (x₁ - x₂)²",
      note: "Expressible as (x₁+x₂)² - 4x₁x₂ = Δ/a²",
    },
    symCubeSum: {
      name: "Sum of Cubes of Roots",
      note: "Factored identity: (x₁+x₂)[(x₁+x₂)² - 3x₁x₂]",
    },
    symRatioSum: {
      name: "Sum of Root Ratios x₁/x₂ + x₂/x₁",
      note: "Transformed as (x₁² + x₂²)/(x₁x₂)",
    },

    rootsStep1Title: "Step 1: Calculate Sum & Product with Vieta's Formulas",
    rootsStep1Desc: "According to the converse of Vieta's formulas, find sum S and product P of the given roots:",
    rootsStep2Title: "Step 2: Construct Monic Standard Equation",
    rootsStep2Desc: "Substitute S and P into the monic form x² - Sx + P = 0:",
    rootsStep3Title: "Step 3: Clear Denominators for Lowest Integer Coefficients",
    rootsStep3Desc: (lcm) => `Multiply both sides by the least common denominator (${lcm}) to obtain integers ax² + bx + c = 0:`,
    rootsStep4Title: "Step 4: Reverse Verification Check",
    rootsStep4Desc: "Verify that -b/a equals x₁ + x₂ and c/a equals x₁x₂:",
    rootsStep4Check: "\\checkmark \\text{ Verified successfully}",

    radStep1Title: "Step 1: Add Conjugate Roots to Find Sum",
    radStep1Desc: "Since x₁ = m + √n and x₂ = m - √n are conjugates, radical terms cancel out:",
    radStep2Title: "Step 2: Apply Difference of Squares to Find Product",
    radStep2Desc: "Using (m + √n)(m - √n) = m² - n:",
    radStep3Title: "Step 3: Build Quadratic Equation",
    radStep3Desc: "Substitute sum and product into x² - (x₁ + x₂)x + x₁x₂ = 0:",
    radStep4Title: "Step 4: Verify Discriminant",
    radStep4Desc: "Check discriminant Δ of the resulting equation:",
    radStep4Check: "\\checkmark \\text{ Perfectly matches original roots}",
  },

  es: {
    deltaTwoDistinct: "Dos Raíces Reales Distintas (Δ > 0)",
    deltaTwoEqual: "Dos Raíces Reales Iguales (Δ = 0)",
    deltaNoReal: "Sin Raíces Reales / Complejas Conjugadas (Δ < 0)",
    deltaTwoDistinctExp: "\\Delta > 0, \\text{ dos raíces reales distintas}",
    deltaTwoEqualExp: "\\Delta = 0, \\text{ dos raíces reales iguales (tangente al eje x)}",
    deltaNoRealExp: "\\Delta < 0, \\text{ sin raíces reales (dos raíces complejas conjugadas)}",

    step1Title: "Paso 1: Aislar el Término Constante",
    step1Desc: "Mover el término constante c al lado derecho de la ecuación con signo contrario.",
    step2TitleNorm: "Paso 2: Dividir por el Coeficiente Cuadrático a",
    step2DescNorm: (aTex) => `Dividir ambos miembros por a = ${aTex} para que el coeficiente de x² sea 1.`,
    step2TitleAlready: "Paso 2: El Coeficiente a ya es 1",
    step2DescAlready: "El coeficiente principal a = 1, la ecuación ya está normalizada.",
    step3Title: "Paso 3: Completar el Cuadrado en Ambos Miembros",
    step3Desc: (bDivA, halfB, halfBSq) =>
      `El coeficiente lineal es ${bDivA}, su mitad es ${halfB}, y su cuadrado es \\left(${halfB}\\right)^2 = ${halfBSq}. Sumar dicho valor a ambos lados:`,
    step4Title: "Paso 4: Factorizar el Lado Izquierdo como Binomio al Cuadrado",
    step4Desc: "Escribir el miembro izquierdo como (x ± b/2a)² y simplificar las fracciones del miembro derecho:",
    step5TitleDistinct: "Paso 5: Despejar x Aplicando Raíz Cuadrada",
    step5DescDistinct: (rhsTex) => `El miembro derecho ${rhsTex} > 0. Extrayendo la raíz cuadrada se obtienen dos raíces reales:`,
    step5TitleEqual: "Paso 5: Despejar x (Raíz Real Doble)",
    step5DescEqual: "El miembro derecho es 0, lo que produce una raíz real doble:",
    step5TitleNoReal: "Paso 5: El Miembro Derecho es Negativo (Sin Solución Real)",
    step5DescNoReal: (rhsTex, rootsTex) =>
      `Dado que el cuadrado de un número real no puede ser negativo y ${rhsTex} < 0, no existen raíces reales (soluciones complejas: ${rootsTex}).`,

    formulaStep1Title: "Paso 1: Identificar Coeficientes",
    formulaStep1Desc: "Comparar con la forma estándar ax² + bx + c = 0:",
    formulaStep2Title: "Paso 2: Calcular el Discriminante Δ",
    formulaStep2Desc: "Evaluar la fórmula del discriminante Δ = b² - 4ac:",
    formulaStep3Title: "Paso 3: Sustituir en la Fórmula General",
    formulaStep3Desc: "Aplicar la fórmula cuadrática x = (-b ± √Δ) / 2a:",

    factoringSuccess: (eqTex, p, q, r, s) =>
      `Factorizado por aspa simple: (${p}x ${q >= 0 ? "+" : ""}${q})(${r}x ${s >= 0 ? "+" : ""}${s}) = 0.`,
    factoringFail: "El discriminante no es un cuadrado perfecto, irreducible en los enteros.",
    factoringNoReal: "Discriminante Δ < 0, no admite factorización en los reales.",

    symSquareSum: {
      name: "Suma de Cuadrados de las Raíces",
      note: "Polinomio simétrico clásico transformado mediante (x₁+x₂)² - 2x₁x₂",
    },
    symReciprocalSum: {
      name: "Suma de Inversos de las Raíces",
      note: "Reducción a común denominador: (x₁+x₂)/(x₁x₂)",
      undefinedNote: "Indefinido si una de las raíces es 0",
      undefinedText: "\\text{Indefinido (una raíz es 0)}",
    },
    symAbsDiff: {
      name: "Diferencia Absoluta de Raíces |x₁ - x₂|",
      note: "Representa geométricamente la distancia entre los cortes de la parábola con el eje x",
      noRealText: "\\text{Sin soluciones reales}",
    },
    symDiffSquare: {
      name: "Cuadrado de la Diferencia (x₁ - x₂)²",
      note: "Expresable como (x₁+x₂)² - 4x₁x₂ = Δ/a²",
    },
    symCubeSum: {
      name: "Suma de Cubos de las Raíces",
      note: "Identidad factorizada: (x₁+x₂)[(x₁+x₂)² - 3x₁x₂]",
    },
    symRatioSum: {
      name: "Suma de Razones Cruzadas x₁/x₂ + x₂/x₁",
      note: "Transformado como (x₁² + x₂²)/(x₁x₂)",
    },

    rootsStep1Title: "Paso 1: Calcular Suma y Producto mediante Vieta",
    rootsStep1Desc: "Por el teorema recíproco de Vieta, calcular la suma S y el producto P de las raíces dadas:",
    rootsStep2Title: "Paso 2: Construir la Ecuación Mónica",
    rootsStep2Desc: "Sustituir S y P en la forma mónica x² - Sx + P = 0:",
    rootsStep3Title: "Paso 3: Eliminar Denominadores para Coeficientes Enteros",
    rootsStep3Desc: (lcm) => `Multiplicar por el mínimo común múltiplo (${lcm}) para obtener la ecuación entera ax² + bx + c = 0:`,
    rootsStep4Title: "Paso 4: Verificación Inversa",
    rootsStep4Desc: "Comprobar que -b/a coincida con x₁ + x₂ y c/a coincida con x₁x₂:",
    rootsStep4Check: "\\checkmark \\text{ Verificado correctamente}",

    radStep1Title: "Paso 1: Sumar las Raíces Conjugadas",
    radStep1Desc: "Al ser x₁ = m + √n y x₂ = m - √n conjugadas, los radicales se cancelan:",
    radStep2Title: "Paso 2: Aplicar Diferencia de Cuadrados para el Producto",
    radStep2Desc: "Por la identidad (m + √n)(m - √n) = m² - n:",
    radStep3Title: "Paso 3: Construir la Ecuación Cuadrática",
    radStep3Desc: "Sustituir suma y producto en x² - (x₁ + x₂)x + x₁x₂ = 0:",
    radStep4Title: "Paso 4: Comprobar el Discriminante",
    radStep4Desc: "Verificar el discriminante Δ de la ecuación obtenida:",
    radStep4Check: "\\checkmark \\text{ Coincide con las raíces dadas}",
  },

  fr: {
    deltaTwoDistinct: "Deux Racines Réelles Distinctes (Δ > 0)",
    deltaTwoEqual: "Une Racine Réelle Double (Δ = 0)",
    deltaNoReal: "Aucune Racine Réelle / Racines Complexes (Δ < 0)",
    deltaTwoDistinctExp: "\\Delta > 0, \\text{ deux racines réelles distinctes}",
    deltaTwoEqualExp: "\\Delta = 0, \\text{ une racine réelle double (tangente à l'axe des abscisses)}",
    deltaNoRealExp: "\\Delta < 0, \\text{ aucune racine réelle (deux racines complexes conjuguées)}",

    step1Title: "Étape 1 : Isoler le Terme Constant",
    step1Desc: "Déplacer le terme constant c vers le membre de droite en changeant son signe.",
    step2TitleNorm: "Étape 2 : Diviser par le Coefficient Quadratique a",
    step2DescNorm: (aTex) => `Diviser les deux membres par a = ${aTex} afin que le coefficient de x² vaille 1.`,
    step2TitleAlready: "Étape 2 : Le Coefficient a vaut déjà 1",
    step2DescAlready: "Le coefficient quadratique a = 1, la forme unitaire est déjà satisfaite.",
    step3Title: "Étape 3 : Compléter le Carré des Deux Côtés",
    step3Desc: (bDivA, halfB, halfBSq) =>
      `Le coefficient linéaire est ${bDivA}, sa moitié vaut ${halfB}, et son carré est \\left(${halfB}\\right)^2 = ${halfBSq}. On ajoute ce carré aux deux membres :`,
    step4Title: "Étape 4 : Factoriser le Membre de Gauche en Carré Parfait",
    step4Desc: "Écrire le membre de gauche sous la forme (x ± b/2a)² et réduire le membre de droite :",
    step5TitleDistinct: "Étape 5 : Résoudre par Extraction de la Racine Carrée",
    step5DescDistinct: (rhsTex) => `Le membre de droite ${rhsTex} > 0. L'extraction de la racine carrée donne deux racines réelles :`,
    step5TitleEqual: "Étape 5 : Résoudre (Racine Double)",
    step5DescEqual: "Le membre de droite est nul, ce qui donne une racine double :",
    step5TitleNoReal: "Étape 5 : Membre de Droite Négatif (Pas de Racine Réelle)",
    step5DescNoReal: (rhsTex, rootsTex) =>
      `Le carré d'un nombre réel ne pouvant être négatif et ${rhsTex} < 0, l'équation n'a pas de racine réelle (racines complexes : ${rootsTex}).`,

    formulaStep1Title: "Étape 1 : Identifier les Coefficients",
    formulaStep1Desc: "Associer avec la forme générale ax² + bx + c = 0 :",
    formulaStep2Title: "Étape 2 : Calculer le Discriminant Δ",
    formulaStep2Desc: "Calculer le discriminant Δ = b² - 4ac :",
    formulaStep3Title: "Étape 3 : Appliquer la Formule Quadratique",
    formulaStep3Desc: "Appliquer la formule x = (-b ± √Δ) / 2a :",

    factoringSuccess: (eqTex, p, q, r, s) =>
      `Factorisation obtenue : (${p}x ${q >= 0 ? "+" : ""}${q})(${r}x ${s >= 0 ? "+" : ""}${s}) = 0.`,
    factoringFail: "Le discriminant n'est pas un carré parfait, irréductible sur les entiers.",
    factoringNoReal: "Discriminant Δ < 0, aucune factorisation dans les réels.",

    symSquareSum: {
      name: "Somme des Carrés des Racines",
      note: "Polynôme symétrique classique transformé via (x₁+x₂)² - 2x₁x₂",
    },
    symReciprocalSum: {
      name: "Somme des Inverses des Racines",
      note: "Réduction au même dénominateur : (x₁+x₂)/(x₁x₂)",
      undefinedNote: "Indéfini si l'une des racines est nulle",
      undefinedText: "\\text{Indéfini (une racine est nulle)}",
    },
    symAbsDiff: {
      name: "Différence Absolue des Racines |x₁ - x₂|",
      note: "Mesure la distance entre les points d'intersection de la parabole avec l'axe des x",
      noRealText: "\\text{Aucune racine réelle}",
    },
    symDiffSquare: {
      name: "Carré de la Différence des Racines",
      note: "Égal à (x₁+x₂)² - 4x₁x₂ = Δ/a²",
    },
    symCubeSum: {
      name: "Somme des Cubes des Racines",
      note: "Identité remarquable : (x₁+x₂)[(x₁+x₂)² - 3x₁x₂]",
    },
    symRatioSum: {
      name: "Somme des Rapports x₁/x₂ + x₂/x₁",
      note: "Transformé en (x₁² + x₂²)/(x₁x₂)",
    },

    rootsStep1Title: "Étape 1 : Calculer Somme et Produit (Viète)",
    rootsStep1Desc: "D'après les relations réciproques de Viète, calculer S et P :",
    rootsStep2Title: "Étape 2 : Établir la Forme Unitaire",
    rootsStep2Desc: "Remplacer dans x² - Sx + P = 0 :",
    rootsStep3Title: "Étape 3 : Éliminer les Dénominateurs",
    rootsStep3Desc: (lcm) => `Multiplier par le PPCM (${lcm}) pour obtenir l'équation à coefficients entiers ax² + bx + c = 0 :`,
    rootsStep4Title: "Étape 4 : Vérification Réciproque",
    rootsStep4Desc: "Vérifier que -b/a = x₁ + x₂ et c/a = x₁x₂ :",
    rootsStep4Check: "\\checkmark \\text{ Vérification concluante}",

    radStep1Title: "Étape 1 : Somme des Racines Conjuguées",
    radStep1Desc: "Pour x₁ = m + √n et x₂ = m - √n, les termes radicaux s'annulent :",
    radStep2Title: "Étape 2 : Produit par Différence de Deux Carrés",
    radStep2Desc: "Identité remarquable (m + √n)(m - √n) = m² - n :",
    radStep3Title: "Étape 3 : Écrire l'Équation du Second Degré",
    radStep3Desc: "Insérer dans x² - (x₁ + x₂)x + x₁x₂ = 0 :",
    radStep4Title: "Étape 4 : Vérifier le Discriminant",
    radStep4Desc: "Vérification du discriminant Δ :",
    radStep4Check: "\\checkmark \\text{ Correspond aux racines de départ}",
  },

  pt: {
    deltaTwoDistinct: "Duas Raízes Reais Distintas (Δ > 0)",
    deltaTwoEqual: "Duas Raízes Reais Iguais / Raiz Dupla (Δ = 0)",
    deltaNoReal: "Sem Raízes Reais / Complexas Conjugadas (Δ < 0)",
    deltaTwoDistinctExp: "\\Delta > 0, \\text{ duas raízes reais distintas}",
    deltaTwoEqualExp: "\\Delta = 0, \\text{ duas raízes reais iguais (tangente ao eixo x)}",
    deltaNoRealExp: "\\Delta < 0, \\text{ sem raízes reais (duas raízes complexas conjugadas)}",

    step1Title: "Passo 1: Isolar o Termo Independente",
    step1Desc: "Mover o termo independente c para o lado direito da equação trocando o sinal.",
    step2TitleNorm: "Passo 2: Dividir pelo Coeficiente Quadrático a",
    step2DescNorm: (aTex) => `Dividir ambos os lados por a = ${aTex} para que o coeficiente de x² seja 1.`,
    step2TitleAlready: "Passo 2: Coeficiente a já é 1",
    step2DescAlready: "O coeficiente principal a = 1, a equação já está na forma mônica.",
    step3Title: "Passo 3: Completar o Quadrado em Ambos os Lados",
    step3Desc: (bDivA, halfB, halfBSq) =>
      `O coeficiente linear é ${bDivA}, sua metade é ${halfB}, e seu quadrado é \\left(${halfB}\\right)^2 = ${halfBSq}. Somar este valor a ambos os membros:`,
    step4Title: "Passo 4: Fatorar o Lado Esquerdo como Quadrado Perfeito",
    step4Desc: "Escrever o lado esquerdo como (x ± b/2a)² e simplificar o lado direito:",
    step5TitleDistinct: "Passo 5: Extrair a Raiz Quadrada",
    step5DescDistinct: (rhsTex) => `O lado direito ${rhsTex} > 0. Extraindo a raiz quadrada obtemos duas raízes reais:`,
    step5TitleEqual: "Passo 5: Extrair a Raiz Quadrada (Raiz Dupla)",
    step5DescEqual: "O lado direito é 0, resultando em uma raiz real dupla:",
    step5TitleNoReal: "Passo 5: Lado Direito Negativo (Sem Raiz Real)",
    step5DescNoReal: (rhsTex, rootsTex) =>
      `Como o quadrado de um número real não pode ser negativo e ${rhsTex} < 0, não existem raízes reais (soluções complexas: ${rootsTex}).`,

    formulaStep1Title: "Passo 1: Identificar os Coeficientes",
    formulaStep1Desc: "Comparar com a forma geral ax² + bx + c = 0:",
    formulaStep2Title: "Passo 2: Calcular o Discriminante Δ",
    formulaStep2Desc: "Aplicar a fórmula do discriminante Δ = b² - 4ac:",
    formulaStep3Title: "Passo 3: Aplicar a Fórmula de Bhaskara",
    formulaStep3Desc: "Substituir na fórmula x = (-b ± √Δ) / 2a:",

    factoringSuccess: (eqTex, p, q, r, s) =>
      `Fatoração por produto cruzado: (${p}x ${q >= 0 ? "+" : ""}${q})(${r}x ${s >= 0 ? "+" : ""}${s}) = 0.`,
    factoringFail: "O discriminante não é quadrado perfeito, irredutível nos inteiros.",
    factoringNoReal: "Discriminante Δ < 0, não admite fatoração real.",

    symSquareSum: {
      name: "Soma dos Quadrados das Raízes",
      note: "Polinômio simétrico clássico: (x₁+x₂)² - 2x₁x₂",
    },
    symReciprocalSum: {
      name: "Soma dos Inversos das Raízes",
      note: "Redução ao mesmo denominador: (x₁+x₂)/(x₁x₂)",
      undefinedNote: "Indefinido quando uma das raízes é 0",
      undefinedText: "\\text{Indefinido (uma raiz é 0)}",
    },
    symAbsDiff: {
      name: "Diferença Absoluta das Raízes |x₁ - x₂|",
      note: "Representa a distância entre as raízes no eixo x da parábola",
      noRealText: "\\text{Sem raízes reais}",
    },
    symDiffSquare: {
      name: "Quadrado da Diferença das Raízes",
      note: "Igual a (x₁+x₂)² - 4x₁x₂ = Δ/a²",
    },
    symCubeSum: {
      name: "Soma dos Cubos das Raízes",
      note: "Identidade fatorada: (x₁+x₂)[(x₁+x₂)² - 3x₁x₂]",
    },
    symRatioSum: {
      name: "Soma das Razões x₁/x₂ + x₂/x₁",
      note: "Transformado em (x₁² + x₂²)/(x₁x₂)",
    },

    rootsStep1Title: "Passo 1: Calcular Soma e Produto (Girard / Vieta)",
    rootsStep1Desc: "Pelas relações inversas de Girard / Vieta, encontrar a soma S e o produto P:",
    rootsStep2Title: "Passo 2: Construir a Equação Mônica",
    rootsStep2Desc: "Substituir S e P em x² - Sx + P = 0:",
    rootsStep3Title: "Passo 3: Eliminar Denominadores para Coeficientes Inteiros",
    rootsStep3Desc: (lcm) => `Multiplicar pelo MMC (${lcm}) para obter a equação inteira ax² + bx + c = 0:`,
    rootsStep4Title: "Passo 4: Verificação Inversa",
    rootsStep4Desc: "Verificar se -b/a = x₁ + x₂ e c/a = x₁x₂:",
    rootsStep4Check: "\\checkmark \\text{ Verificado com sucesso}",

    radStep1Title: "Passo 1: Somar as Raízes Conjugadas",
    radStep1Desc: "Para x₁ = m + √n e x₂ = m - √n, os radicais se cancelam:",
    radStep2Title: "Passo 2: Produto pela Diferença de Quadrados",
    radStep2Desc: "Pela identidade (m + √n)(m - √n) = m² - n:",
    radStep3Title: "Passo 3: Construir a Equação do 2º Grau",
    radStep3Desc: "Substituir soma e produto em x² - (x₁ + x₂)x + x₁x₂ = 0:",
    radStep4Title: "Passo 4: Verificar o Discriminante",
    radStep4Desc: "Checar o discriminante Δ da equação:",
    radStep4Check: "\\checkmark \\text{ Corresponde exatamente às raízes}",
  },

  zh: {
    deltaTwoDistinct: "两个不相等实数根 (Δ > 0)",
    deltaTwoEqual: "两个相等实数根 / 重根 (Δ = 0)",
    deltaNoReal: "无实数根 / 共轭虚根 (Δ < 0)",
    deltaTwoDistinctExp: "\\Delta > 0, \\text{ 方程有两个不相等的实数根}",
    deltaTwoEqualExp: "\\Delta = 0, \\text{ 方程有两个相等的实数根 (抛物线与 x 轴相切)}",
    deltaNoRealExp: "\\Delta < 0, \\text{ 方程在实数范围内无解 (复数范围内有一对共轭虚根)}",

    step1Title: "步骤 1：移项 (将常数项移到等号右边)",
    step1Desc: "把方程中的常数项变号移到方程右边，含未知数的项保留在左边。",
    step2TitleNorm: "步骤 2：二次项系数化为 1",
    step2DescNorm: (aTex) => `方程两边同时除以二次项系数 a = ${aTex}，使二次项系数化为 1。`,
    step2TitleAlready: "步骤 2：二次项系数已为 1",
    step2DescAlready: "二次项系数 a = 1，无需两边除以系数。",
    step3Title: "步骤 3：两边配方 (加上一次项系数一半的平方)",
    step3Desc: (bDivA, halfB, halfBSq) =>
      `一次项系数为 ${bDivA}，其一半为 ${halfB}，其平方为 \\left(${halfB}\\right)^2 = ${halfBSq}。方程两边同时加上该值：`,
    step4Title: "步骤 4：写成完全平方式并通分右边",
    step4Desc: "左边利用完全平方公式配成平方形式，右边通分合并同类项：",
    step5TitleDistinct: "步骤 5：直接开平方求解",
    step5DescDistinct: (rhsTex) => `右边数值 ${rhsTex} > 0，两边直接开平方得到两个一元一次方程：`,
    step5TitleEqual: "步骤 5：开平方得出重根",
    step5DescEqual: "右边数值为 0，开平方得一个根（重根）：",
    step5TitleNoReal: "步骤 5：右侧为负数，实数范围内无解",
    step5DescNoReal: (rhsTex, rootsTex) =>
      `任何实数的平方都不可能为负数，右边数值 ${rhsTex} < 0，方程在实数范围内无解 (在复数范围内有虚根：${rootsTex})。`,

    formulaStep1Title: "步骤 1：确定各项系数",
    formulaStep1Desc: "将方程整理为一般形式 ax² + bx + c = 0 并找出对应系数：",
    formulaStep2Title: "步骤 2：计算根的判别式 Δ",
    formulaStep2Desc: "代入判别式公式 Δ = b² - 4ac：",
    formulaStep3Title: "步骤 3：代入求根公式求解",
    formulaStep3Desc: "代入求根公式 x = (-b ± √Δ) / 2a：",

    factoringSuccess: (eqTex, p, q, r, s) =>
      `十字相乘因式分解成功：(${p}x ${q >= 0 ? "+" : ""}${q})(${r}x ${s >= 0 ? "+" : ""}${s}) = 0。`,
    factoringFail: "判别式非完全平方数，无法在整数范围内进行十字相乘分解。",
    factoringNoReal: "判别式 Δ < 0，在实数范围内无法因式分解。",

    symSquareSum: {
      name: "两根平方和",
      note: "经典对称代数式，直接用完全平方恒等式变形",
    },
    symReciprocalSum: {
      name: "两根倒数和",
      note: "通分转化为基本韦达形式",
      undefinedNote: "一根为 0 时倒数无意义",
      undefinedText: "\\text{无意义 (其中一根为 0)}",
    },
    symAbsDiff: {
      name: "两根之差的绝对值 (两根距离)",
      note: "几何意义为二次函数图像与 x 轴交点之间的距离",
      noRealText: "\\text{无实数解}",
    },
    symDiffSquare: {
      name: "两根之差的平方",
      note: "二次函数中常用于求两交点横坐标距离的平方",
    },
    symCubeSum: {
      name: "两根立方和",
      note: "经典三次多项式因式分解恒等变形",
    },
    symRatioSum: {
      name: "两根互倒和",
      note: "通分转化为平方和与积的商",
    },

    rootsStep1Title: "步骤 1：利用韦达定理计算两根之和与两根之积",
    rootsStep1Desc: "由韦达定理逆定理可知，以 x₁、x₂ 为根的一元二次方程各项系数满足与和、积的关系：",
    rootsStep2Title: "步骤 2：建立首项系数为 1 的标准方程",
    rootsStep2Desc: "代入韦达逆定理标准式 x² - (x₁ + x₂)x + x₁x₂ = 0：",
    rootsStep3Title: "步骤 3：去分母化简为整系数最简方程",
    rootsStep3Desc: (lcm) => `方程两边同时乘以分母的最小公倍数 ${lcm} 并约去公因数，得到最简整系数方程：`,
    rootsStep4Title: "步骤 4：反向验算",
    rootsStep4Desc: "检验两根之和与两根之积是否完全匹配：",
    rootsStep4Check: "\\checkmark \\text{ 验算成立}",

    radStep1Title: "步骤 1：利用共轭根对称性质计算两根之和",
    radStep1Desc: "由两根互为共轭根 x₁ = m + √n, x₂ = m - √n，根号项正负相消：",
    radStep2Title: "步骤 2：利用平方差公式计算两根之积",
    radStep2Desc: "由平方差公式 (a + b)(a - b) = a² - b²：",
    radStep3Title: "步骤 3：建立一元二次方程",
    radStep3Desc: "代入韦达逆定理 x² - (x₁ + x₂)x + x₁x₂ = 0：",
    radStep4Title: "步骤 4：检验判别式",
    radStep4Desc: "检验方程的实数根判别式：",
    radStep4Check: "\\checkmark \\text{ 完全吻合原根}",
  },
};
