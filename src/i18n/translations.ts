export type Language = "en" | "es" | "fr" | "pt" | "zh";

export interface TranslationData {
  appName: string;
  appTitle: string;
  appSubtitle: string;
  metaDescription: string;
  metaKeywords: string;

  // Hero section
  heroTags: string[];
  heroStat1Title: string;
  heroStat1Sub: string;
  heroStat2Title: string;
  heroStat2Sub: string;
  heroStat3Title: string;
  heroStat3Sub: string;

  // Nav
  navSolver: string;
  navRoots: string;
  navWorksheet: string;
  navGuide: string;
  navDrills: string;
  handbookBtn: string;

  // Solver Tab
  solverHeading: string;
  solverSubheading: string;
  resetBtn: string;
  coeffA: string;
  coeffB: string;
  coeffC: string;
  aNonZeroError: string;
  presetsLabel: string;
  recentHistory: string;
  naturalInputTitle: string;
  naturalInputHelp: string;
  naturalInputPlaceholder: string;
  naturalParseBtn: string;
  naturalParseSuccess: string;
  naturalParseError: string;

  // Equation KPI
  targetEquation: string;
  twoDistinctReal: string;
  twoEqualReal: string;
  noRealRoots: string;
  discriminantLabel: string;
  discriminantFormula: string;
  sumRootsLabel: string;
  prodRootsLabel: string;
  exactRootsLabel: string;
  numValue: string;

  // Step Tabs
  stepsHeading: string;
  stepsSubheading: string;
  tabCompleting: string;
  tabVieta: string;
  tabFormula: string;
  tabFactoring: string;
  copyReportBtn: string;
  reportCopied: string;
  completingMnemonic: string;

  // Parabola
  parabolaCardTitle: string;
  parabolaVertex: string;
  parabolaRoots: string;
  parabolaYIntercept: string;
  parabolaGeometryTitle: string;
  parabolaOpening: string;
  parabolaOpensUp: string;
  parabolaOpensDown: string;
  axisOfSymmetry: string;
  vertexCoords: string;
  yInterceptPoint: string;

  // Completing Geometry
  geomTitle: string;
  geomSubtitle: string;
  geomToggleCompleted: string;
  geomToggleMissing: string;
  geomExplanationTitle: string;
  geomExplanationBody: string;
  geomWhyAddTitle: string;
  geomWhyAddBody: string;

  // Symmetric expressions
  symmetricSectionTitle: string;
  symmetricSectionSub: string;
  transformFormula: string;
  substitutionText: string;
  calcResultText: string;

  // Parameter evaluator
  paramEvaluatorTitle: string;
  paramEvaluatorSub: string;
  paramKLabel: string;

  // Roots to Equation
  rootsHeading: string;
  rootsSubheading: string;
  tabRationalRoots: string;
  tabRadicalRoots: string;
  root1Label: string;
  root2Label: string;
  quickRootsLabel: string;
  radicalM: string;
  radicalN: string;
  radicalNotice: string;
  quickRadicalsLabel: string;
  resultStandardEq: string;
  copyEquationBtn: string;
  copyDerivationBtn: string;
  derivationCopied: string;
  monicStandardEq: string;
  detailedDerivationTitle: string;
  detailedDerivationSub: string;

  // Worksheet
  worksheetHeading: string;
  worksheetSubheading: string;
  refreshProblemsBtn: string;
  printWorksheetBtn: string;
  difficultyLabel: string;
  diffBasic: string;
  diffIntermediate: string;
  diffAdvanced: string;
  questionCountLabel: string;
  showAnswersBtn: string;
  hideAnswersBtn: string;
  worksheetPaperTitle: string;
  studentName: string;
  studentClass: string;
  studentScore: string;
  studentDate: string;
  problemPrompt: string;
  referenceAnswer: string;

  // Footer & Modal
  footerTitle: string;
  footerDesc: string;
  footerFast: string;
  modalTitle: string;
  modalClose: string;
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  en: {
    appName: "Vieta's Formulas & Quadratic Solver",
    appTitle: "Vieta's Formulas & Quadratic Equation Calculator",
    appSubtitle: "Step-by-step Completing the Square, Roots-to-Equation & Symmetric Polynomial Evaluator",
    metaDescription: "Free online Vieta's formulas and quadratic equation calculator. Features step-by-step completing the square, quadratic formula, roots-to-equation derivation, symmetric expressions, and parabola visualizer.",
    metaKeywords: "vieta formulas calculator, completing the square steps, quadratic equation solver, roots to equation, sum and product of roots, discriminant calculator, parabola vertex, quadratic factoring, vieta theorem online, math worksheet generator",

    heroTags: ["Free Online Math Tool", "Completing the Square", "Vieta's Formulas", "Quadratic Equation Solver"],
    heroStat1Title: "5-Step Solution",
    heroStat1Sub: "Completing the square",
    heroStat2Title: "Roots to Equation",
    heroStat2Sub: "Reverse Vieta deduction",
    heroStat3Title: "Worksheet PDF",
    heroStat3Sub: "With full answers",

    navSolver: "Equation & Steps",
    navRoots: "Roots to Equation",
    navWorksheet: "Worksheet Generator",
    navGuide: "Guide & FAQ",
    navDrills: "Example Analysis",
    handbookBtn: "Core Handbook",

    solverHeading: "Quadratic Equation Coefficients & Live Solver",
    solverSubheading: "Enter coefficients for ax² + bx + c = 0 (supports integers, decimals, and fractions like 3/4)",
    resetBtn: "Reset",
    coeffA: "Leading Coefficient a",
    coeffB: "Linear Coefficient b",
    coeffC: "Constant Term c",
    aNonZeroError: "Leading coefficient 'a' cannot be 0 in a quadratic equation",
    presetsLabel: "Classic Presets:",
    recentHistory: "Recent:",
    naturalInputTitle: "Smart Natural Equation Input (supports unsimplified & parentheses)",
    naturalInputHelp: "e.g., 2x^2 + 5x = 3 or x(x - 3) = 10",
    naturalInputPlaceholder: "Paste or type any equation directly, e.g.: 3x^2 = 5x + 2 or (x - 2)^2 = 9",
    naturalParseBtn: "Auto-Parse & Simplify",
    naturalParseSuccess: "Successfully identified! Normalized to standard form:",
    naturalParseError: "Could not identify a valid quadratic equation. Please check format (e.g. 2x^2 + 5x = 3).",

    targetEquation: "Standard Form Equation",
    twoDistinctReal: "Two Distinct Real Roots",
    twoEqualReal: "Two Equal Real Roots (Repeated)",
    noRealRoots: "No Real Roots (Complex Conjugates)",
    discriminantLabel: "Discriminant Δ",
    discriminantFormula: "b² - 4ac",
    sumRootsLabel: "Sum of Roots (Vieta)",
    prodRootsLabel: "Product of Roots (Vieta)",
    exactRootsLabel: "Exact Solutions",
    numValue: "Value:",

    stepsHeading: "Detailed Step-by-Step Solutions",
    stepsSubheading: "Rigorous academic step-by-step breakdown",
    tabCompleting: "Completing the Square",
    tabVieta: "Vieta's Relations",
    tabFormula: "Quadratic Formula",
    tabFactoring: "Factoring Check",
    copyReportBtn: "Copy Full Solution Report",
    reportCopied: "Solution report copied to clipboard!",
    completingMnemonic: "Five-Step Completing the Square Rule: 1. Move constant; 2. Normalize a=1; 3. Add (b/2a)² to both sides; 4. Factor LHS into square; 5. Take square roots.",

    parabolaCardTitle: "Parabola & Geometric Points",
    parabolaVertex: "Vertex",
    parabolaRoots: "Real Roots",
    parabolaYIntercept: "y-Intercept",
    parabolaGeometryTitle: "Geometric Attributes",
    parabolaOpening: "Parabola Orientation",
    parabolaOpensUp: "Opens Upward (a > 0, minimum)",
    parabolaOpensDown: "Opens Downward (a < 0, maximum)",
    axisOfSymmetry: "Axis of Symmetry",
    vertexCoords: "Vertex Coordinates",
    yInterceptPoint: "y-Intercept Point",

    geomTitle: "Geometric Meaning of Completing the Square",
    geomSubtitle: "Ancient algebra geometric dissection: completing rectangles into a perfect square",
    geomToggleCompleted: "Show Assembled Perfect Square",
    geomToggleMissing: "Show Missing Corner State",
    geomExplanationTitle: "Geometric Puzzle Concept:",
    geomExplanationBody: "The quadratic term x² is represented by the blue square. The linear term (b/a)x is halved into two rectangles (b/2a)x flanking the right and bottom.",
    geomWhyAddTitle: "Why must we add (b/2a)²?",
    geomWhyAddBody: "Notice the bottom-right corner lacks a square of side b/2a. Adding this exact area completes the whole geometry into a full square of side (x + b/2a).",

    symmetricSectionTitle: "Classic Symmetric Polynomial Evaluator",
    symmetricSectionSub: "Key algebraic method: transform expressions into terms of sum (x₁ + x₂) and product (x₁x₂)",
    transformFormula: "Identity formula:",
    substitutionText: "Substitution:",
    calcResultText: "Result:",

    paramEvaluatorTitle: "Parameterized Expression Dynamic Evaluator",
    paramEvaluatorSub: "Evaluate advanced symmetric expressions with custom parameter k in real time",
    paramKLabel: "Parameter k =",

    rootsHeading: "Construct Quadratic Equation from Known Roots",
    rootsSubheading: "Fast coefficient verification · Derive standard monic and integer coefficient equations",
    tabRationalRoots: "Rational / Fraction Roots",
    tabRadicalRoots: "Conjugate Radical Roots (m ± √n)",
    root1Label: "First Root x₁",
    root2Label: "Second Root x₂",
    quickRootsLabel: "Preset Roots:",
    radicalM: "Rational Part m",
    radicalN: "Radicand n (≥ 0)",
    radicalNotice: "For conjugate quadratic radicals x = m ± √n, enter m and n to instantly construct the rational-coefficient equation!",
    quickRadicalsLabel: "Common Radicals:",
    resultStandardEq: "Lowest Integer Standard Equation",
    copyEquationBtn: "Copy Equation",
    copyDerivationBtn: "Copy Derivation Report",
    derivationCopied: "Derivation report copied!",
    monicStandardEq: "Monic Standard Form (a = 1)",
    detailedDerivationTitle: "Detailed Derivation & Verification Steps",
    detailedDerivationSub: "Step-by-step reverse algebraic deduction",

    worksheetHeading: "Quadratic Equation Printable Worksheet Generator",
    worksheetSubheading: "One-click printable problem sheets with full step-by-step solutions for teachers & students",
    refreshProblemsBtn: "Generate New Problems",
    printWorksheetBtn: "Print Worksheet / PDF",
    difficultyLabel: "Difficulty:",
    diffBasic: "Basic (Integer roots)",
    diffIntermediate: "Intermediate (a > 1)",
    diffAdvanced: "Advanced (Radicals)",
    questionCountLabel: "Count:",
    showAnswersBtn: "Show Answers & Steps",
    hideAnswersBtn: "Hide Answers",
    worksheetPaperTitle: "Quadratic Equations & Completing the Square Worksheet",
    studentName: "Name: ___________",
    studentClass: "Class: ___________",
    studentScore: "Score: ___________",
    studentDate: "Date: ___________",
    problemPrompt: "Solve the following quadratic equation with full steps:",
    referenceAnswer: "Reference Solution:",

    footerTitle: "Vieta's Formulas & Quadratic Solver",
    footerDesc: "Free online educational math calculator for quadratic equations, completing the square, and Vieta's formulas.",
    footerFast: "Optimized for Google Search · Instant Client-Side Computation",
    modalTitle: "Vieta's Formulas & Completing the Square Core Handbook",
    modalClose: "Got it",
  },

  es: {
    appName: "Fórmulas de Vieta y Calculadora Cuadrática",
    appTitle: "Calculadora del Teorema de Vieta y Ecuaciones Cuadráticas",
    appSubtitle: "Completar el Cuadrado Paso a Paso, Reconstruir Ecuación desde Raíces y Polinomios Simétricos",
    metaDescription: "Calculadora online gratuita de las fórmulas de Vieta y ecuaciones cuadráticas. Incluye método de completar el cuadrado paso a paso, fórmula general, reconstrucción desde raíces y gráfica de parábola.",
    metaKeywords: "calculadora teorema de vieta, completar el cuadrado paso a paso, relacion raices y coeficientes, resolver ecuacion cuadratica, formula cuadratica, suma y producto de raices, vertice de parabola, generador ejercicios ecuaciones segundo grado",

    heroTags: ["Herramienta Matemática Online", "Completar el Cuadrado", "Teorema de Vieta", "Ecuaciones Cuadráticas"],
    heroStat1Title: "Solución en 5 Pasos",
    heroStat1Sub: "Completar el cuadrado",
    heroStat2Title: "De Raíces a Ecuación",
    heroStat2Sub: "Deducción inversa de Vieta",
    heroStat3Title: "Hojas de Ejercicios PDF",
    heroStat3Sub: "Con respuestas paso a paso",

    navSolver: "Ecuación y Pasos",
    navRoots: "Raíces a Ecuación",
    navWorksheet: "Generador de Ejercicios",
    navGuide: "Guía y Preguntas",
    navDrills: "Ejemplos Guiados",
    handbookBtn: "Manual de Fórmulas",

    solverHeading: "Coeficientes de la Ecuación Cuadrática y Solución en Vivo",
    solverSubheading: "Introduce los coeficientes para ax² + bx + c = 0 (soporta enteros, decimales y fracciones como 3/4)",
    resetBtn: "Restablecer",
    coeffA: "Coeficiente cuadrático a",
    coeffB: "Coeficiente lineal b",
    coeffC: "Término independiente c",
    aNonZeroError: "El coeficiente 'a' no puede ser 0 en una ecuación de segundo grado",
    presetsLabel: "Ecuaciones Clásicas:",
    recentHistory: "Recientes:",
    naturalInputTitle: "Entrada Inteligente de Ecuación (soporta paréntesis y sin simplificar)",
    naturalInputHelp: "ej., 2x^2 + 5x = 3 o x(x - 3) = 10",
    naturalInputPlaceholder: "Escribe o pega cualquier ecuación: 3x^2 = 5x + 2 o (x - 2)^2 = 9",
    naturalParseBtn: "Identificar y Simplificar",
    naturalParseSuccess: "¡Identificado con éxito! Forma estándar normalizada:",
    naturalParseError: "No se reconoció una ecuación cuadrática válida. Revisa el formato.",

    targetEquation: "Ecuación en Forma General",
    twoDistinctReal: "Dos Raíces Reales Distintas",
    twoEqualReal: "Dos Raíces Reales Iguales (Doble)",
    noRealRoots: "Sin Raíces Reales (Complejas Conjugadas)",
    discriminantLabel: "Discriminante Δ",
    discriminantFormula: "b² - 4ac",
    sumRootsLabel: "Suma de Raíces (Vieta)",
    prodRootsLabel: "Producto de Raíces (Vieta)",
    exactRootsLabel: "Soluciones Exactas",
    numValue: "Valor:",

    stepsHeading: "Resolución Detallada Paso a Paso",
    stepsSubheading: "Desglose algebraico formal y estructurado",
    tabCompleting: "Completar el Cuadrado",
    tabVieta: "Relaciones de Vieta",
    tabFormula: "Fórmula Cuadrática",
    tabFactoring: "Factorización",
    copyReportBtn: "Copiar Informe de Solución",
    reportCopied: "¡Informe copiado al portapapeles!",
    completingMnemonic: "Método de Completar el Cuadrado en 5 Pasos: 1. Aislar término independiente; 2. Normalizar a=1; 3. Sumar (b/2a)² en ambos lados; 4. Expresar como binomio al cuadrado; 5. Aplicar raíz cuadrada.",

    parabolaCardTitle: "Gráfica de la Parábola y Puntos Notables",
    parabolaVertex: "Vértice",
    parabolaRoots: "Raíces Reales",
    parabolaYIntercept: "Corte eje y",
    parabolaGeometryTitle: "Propiedades Geométricas",
    parabolaOpening: "Apertura de la Parábola",
    parabolaOpensUp: "Hacia Arriba (a > 0, mínimo)",
    parabolaOpensDown: "Hacia Abajo (a < 0, máximo)",
    axisOfSymmetry: "Eje de Simetría",
    vertexCoords: "Coordenadas del Vértice",
    yInterceptPoint: "Punto de Intersección y",

    geomTitle: "Significado Geométrico de Completar el Cuadrado",
    geomSubtitle: "Disección geométrica clásica: cómo completar rectángulos en un cuadrado perfecto",
    geomToggleCompleted: "Ver Cuadrado Perfecto Completo",
    geomToggleMissing: "Ver Estado con Esquina Faltante",
    geomExplanationTitle: "Concepto Geométrico:",
    geomExplanationBody: "El término cuadrático x² es el cuadrado azul. El término (b/a)x se divide en dos rectángulos iguales de (b/2a)x ubicados a la derecha y abajo.",
    geomWhyAddTitle: "¿Por qué sumamos (b/2a)²?",
    geomWhyAddBody: "En la esquina inferior derecha falta un cuadrado de lado b/2a. Sumar dicha área completa el cuadrado de lado (x + b/2a).",

    symmetricSectionTitle: "Evaluador de Expresiones Simétricas Clásicas",
    symmetricSectionSub: "Transformación en función de la suma (x₁ + x₂) y el producto (x₁x₂)",
    transformFormula: "Fórmula de identidad:",
    substitutionText: "Sustitución:",
    calcResultText: "Resultado:",

    paramEvaluatorTitle: "Evaluador Dinámico de Expresiones con Parámetro k",
    paramEvaluatorSub: "Calcula expresiones algebraicas avanzadas ajustando el parámetro k en tiempo real",
    paramKLabel: "Parámetro k =",

    rootsHeading: "Reconstruir Ecuación a partir de sus Raíces",
    rootsSubheading: "Verificación rápida de coeficientes · Deducción de la ecuación entera irreducible",
    tabRationalRoots: "Raíces Racionales / Fracciones",
    tabRadicalRoots: "Raíces Radicales Conjugadas (m ± √n)",
    root1Label: "Primera Raíz x₁",
    root2Label: "Segunda Raíz x₂",
    quickRootsLabel: "Raíces de Ejemplo:",
    radicalM: "Parte Racional m",
    radicalN: "Radicando n (≥ 0)",
    radicalNotice: "Para raíces cuadráticas conjugadas x = m ± √n, ¡calcula al instante la ecuación de coeficientes enteros!",
    quickRadicalsLabel: "Radicales Comunes:",
    resultStandardEq: "Ecuación Entera Simplificada",
    copyEquationBtn: "Copiar Ecuación",
    copyDerivationBtn: "Copiar Deducción",
    derivationCopied: "¡Informe de deducción copiado!",
    monicStandardEq: "Forma Mónica (a = 1)",
    detailedDerivationTitle: "Deducción Detallada y Pasos de Verificación",
    detailedDerivationSub: "Demostración inversa del Teorema de Vieta",

    worksheetHeading: "Generador de Hojas de Ejercicios Imprimibles",
    worksheetSubheading: "Crea hojas de ejercicios con soluciones paso a paso listas para imprimir o PDF",
    refreshProblemsBtn: "Nuevos Ejercicios",
    printWorksheetBtn: "Imprimir Hoja / PDF",
    difficultyLabel: "Dificultad:",
    diffBasic: "Básica (Enteros)",
    diffIntermediate: "Intermedia (a > 1)",
    diffAdvanced: "Avanzada (Radicales)",
    questionCountLabel: "Cantidad:",
    showAnswersBtn: "Mostrar Respuestas",
    hideAnswersBtn: "Ocultar Respuestas",
    worksheetPaperTitle: "Hoja de Ejercicios: Ecuaciones Cuadráticas y Completar Cuadrados",
    studentName: "Nombre: ___________",
    studentClass: "Clase: ___________",
    studentScore: "Calificación: ___________",
    studentDate: "Fecha: ___________",
    problemPrompt: "Resuelve la siguiente ecuación cuadrática detallando el procedimiento:",
    referenceAnswer: "Solución de Referencia:",

    footerTitle: "Fórmulas de Vieta y Calculadora Cuadrática",
    footerDesc: "Herramienta online educativa gratuita para resolver ecuaciones de segundo grado y fórmulas de Vieta.",
    footerFast: "Optimizado para Google · Cálculo Instantáneo en el Cliente",
    modalTitle: "Manual de Fórmulas: Vieta y Completar el Cuadrado",
    modalClose: "Entendido",
  },

  fr: {
    appName: "Formules de Viète et Résolveur Quadratique",
    appTitle: "Calculateur des Relations de Viète et Équations du Second Degré",
    appSubtitle: "Complétion du Carré Étape par Étape, Équation depuis Racines et Polynômes Symétriques",
    metaDescription: "Calculateur gratuit des relations de Viète et équations du second degré. Complétion du carré étape par étape, formule quadratique, reconstruction d'équation et graphique de parabole.",
    metaKeywords: "calculateur relations de viete, completion du carre pas a pas, discriminant equation second degre, somme et produit des racines, formule quadratique, sommet parabole, generateur exercices second degre",

    heroTags: ["Outil Mathématique Gratuit", "Complétion du Carré", "Relations de Viète", "Équations du Second Degré"],
    heroStat1Title: "Résolution en 5 Étapes",
    heroStat1Sub: "Complétion du carré",
    heroStat2Title: "Racines vers Équation",
    heroStat2Sub: "Réciproque de Viète",
    heroStat3Title: "Fiches d'Exercices PDF",
    heroStat3Sub: "Avec corrigé complet",

    navSolver: "Équation et Étapes",
    navRoots: "Racines vers Équation",
    navWorksheet: "Fiche d'Exercices",
    navGuide: "Guide et FAQ",
    navDrills: "Exemples Types",
    handbookBtn: "Mémento",

    solverHeading: "Coefficients de l'Équation du Second Degré et Résolution",
    solverSubheading: "Entrez les coefficients de ax² + bx + c = 0 (supporte entiers, décimaux et fractions comme 3/4)",
    resetBtn: "Réinitialiser",
    coeffA: "Coefficient quadratique a",
    coeffB: "Coefficient linéaire b",
    coeffC: "Terme constant c",
    aNonZeroError: "Le coefficient 'a' ne peut pas être nul dans une équation du second degré",
    presetsLabel: "Exemples Classiques :",
    recentHistory: "Récents :",
    naturalInputTitle: "Saisie Intelligente Libre (parenthèses et formes non simplifiées)",
    naturalInputHelp: "ex. : 2x^2 + 5x = 3 ou x(x - 3) = 10",
    naturalInputPlaceholder: "Tapez ou collez une équation quelconque : 3x^2 = 5x + 2 ou (x - 2)^2 = 9",
    naturalParseBtn: "Identifier et Réduire",
    naturalParseSuccess: "Équation reconnue ! Forme canonique standardisée :",
    naturalParseError: "Impossible de reconnaître une équation du second degré valide.",

    targetEquation: "Équation sous Forme Standard",
    twoDistinctReal: "Deux Racines Réelles Distinctes",
    twoEqualReal: "Une Racine Réelle Double",
    noRealRoots: "Aucune Racine Réelle (Racines Complexes Conjuguées)",
    discriminantLabel: "Discriminant Δ",
    discriminantFormula: "b² - 4ac",
    sumRootsLabel: "Somme des Racines (Viète)",
    prodRootsLabel: "Produit des Racines (Viète)",
    exactRootsLabel: "Solutions Exactes",
    numValue: "Valeur :",

    stepsHeading: "Résolution Détaillée Étape par Étape",
    stepsSubheading: "Démontration mathématique structurée et rédigée",
    tabCompleting: "Complétion du Carré",
    tabVieta: "Relations de Viète",
    tabFormula: "Formule Quadratique",
    tabFactoring: "Factorisation",
    copyReportBtn: "Copier le Rapport Complet",
    reportCopied: "Rapport copié dans le presse-papier !",
    completingMnemonic: "Règle de Complétion du Carré en 5 étapes : 1. Isoler la constante ; 2. Normaliser a=1 ; 3. Ajouter (b/2a)² des deux côtés ; 4. Factoriser en carré parfait ; 5. Prendre la racine carrée.",

    parabolaCardTitle: "Tracé de la Parabole et Points Remarquables",
    parabolaVertex: "Sommet",
    parabolaRoots: "Racines Réelles",
    parabolaYIntercept: "Intersection y",
    parabolaGeometryTitle: "Propriétés Géométriques",
    parabolaOpening: "Sens de la Parabole",
    parabolaOpensUp: "Orientée vers le haut (a > 0, minimum)",
    parabolaOpensDown: "Orientée vers le bas (a < 0, maximum)",
    axisOfSymmetry: "Axe de Symétrie",
    vertexCoords: "Coordonnées du Sommet",
    yInterceptPoint: "Point d'Intersection y",

    geomTitle: "Interprétation Géométrique de la Complétion du Carré",
    geomSubtitle: "Dissection géométrique classique : compléter des rectangles en un carré parfait",
    geomToggleCompleted: "Voir le Carré Parfait Assemblé",
    geomToggleMissing: "Voir l'État avec Coin Manquant",
    geomExplanationTitle: "Principe Géométrique :",
    geomExplanationBody: "Le terme quadratique x² correspond au carré bleu. Le terme (b/a)x est divisé en deux rectangles (b/2a)x placés sur les côtés.",
    geomWhyAddTitle: "Pourquoi ajouter (b/2a)² ?",
    geomWhyAddBody: "Le coin inférieur droit nécessite une aire de côté b/2a. L'ajouter complète un grand carré de côté (x + b/2a).",

    symmetricSectionTitle: "Calculateur de Polynômes Symétriques",
    symmetricSectionSub: "Transformation en fonction de la somme (x₁ + x₂) et du produit (x₁x₂)",
    transformFormula: "Identité remarquable :",
    substitutionText: "Remplacement :",
    calcResultText: "Résultat :",

    paramEvaluatorTitle: "Évaluateur Dynamique avec Paramètre k",
    paramEvaluatorSub: "Calculez des expressions symétriques avancées en temps réel avec le paramètre k",
    paramKLabel: "Paramètre k =",

    rootsHeading: "Trouver l'Équation à partir de Deux Racines",
    rootsSubheading: "Vérification instantanée · Déduction de l'équation à coefficients entiers",
    tabRationalRoots: "Racines Rationnelles / Fractions",
    tabRadicalRoots: "Racines Conjuguées (m ± √n)",
    root1Label: "Première Racine x₁",
    root2Label: "Deuxième Racine x₂",
    quickRootsLabel: "Racines Prédéfinies :",
    radicalM: "Partie Rationnelle m",
    radicalN: "Radicande n (≥ 0)",
    radicalNotice: "Pour des racines quadratiques conjuguées x = m ± √n, obtenez immédiatement l'équation exacte !",
    quickRadicalsLabel: "Radicaux Fréquents :",
    resultStandardEq: "Équation Entière Irréductible",
    copyEquationBtn: "Copier l'Équation",
    copyDerivationBtn: "Copier la Démonstration",
    derivationCopied: "Démonstration copiée !",
    monicStandardEq: "Forme Unitaire (a = 1)",
    detailedDerivationTitle: "Démonstration et Vérification",
    detailedDerivationSub: "Application inverse du théorème de Viète",

    worksheetHeading: "Générateur de Fiches d'Exercices à Imprimer",
    worksheetSubheading: "Fiches d'exercices avec corrigé détaillé prêtes pour l'impression ou PDF",
    refreshProblemsBtn: "Générer de Nouveaux Exercices",
    printWorksheetBtn: "Imprimer la Fiche / PDF",
    difficultyLabel: "Difficulté :",
    diffBasic: "Base (Entiers)",
    diffIntermediate: "Intermédiaire (a > 1)",
    diffAdvanced: "Avancé (Radicaux)",
    questionCountLabel: "Nombre :",
    showAnswersBtn: "Afficher le Corrigé",
    hideAnswersBtn: "Masquer le Corrigé",
    worksheetPaperTitle: "Fiche d'Exercices : Équations du Second Degré et Forme Canonique",
    studentName: "Nom : ___________",
    studentClass: "Classe : ___________",
    studentScore: "Note : ___________",
    studentDate: "Date : ___________",
    problemPrompt: "Résoudre l'équation du second degré suivante en détaillant les étapes :",
    referenceAnswer: "Corrigé Détaillé :",

    footerTitle: "Formules de Viète et Résolveur Quadratique",
    footerDesc: "Outil éducatif gratuit pour la résolution d'équations du second degré et relations de Viète.",
    footerFast: "Optimisé pour Google · Calcul Client Ultra-Rapide",
    modalTitle: "Mémento Mathématique : Viète et Complétion du Carré",
    modalClose: "Compris",
  },

  pt: {
    appName: "Fórmulas de Vieta / Girard e Calculadora Quadrática",
    appTitle: "Calculadora de Relações de Vieta e Equações do 2º Grau",
    appSubtitle: "Completar Quadrados Passo a Passo, Raízes para Equação e Polinômios Simétricos",
    metaDescription: "Calculadora online gratuita de relações de Girard / Vieta e equações quadráticas. Passo a passo para completar quadrados, fórmula de Bhaskara, reconstrução de equação e gráfico de parábola.",
    metaKeywords: "calculadora relacoes de girard vieta, completar quadrados passo a passo, formula de bhaskara com passos, soma e produto de raizes, equacao segundo grau, vertice da parabola, gerador de lista de exercicios bhaskara",

    heroTags: ["Calculadora Matemática Grátis", "Completar Quadrados", "Relações de Girard / Vieta", "Equações do 2º Grau"],
    heroStat1Title: "Resolução em 5 Passos",
    heroStat1Sub: "Completar quadrados",
    heroStat2Title: "Raízes para Equação",
    heroStat2Sub: "Dedução inversa de Girard",
    heroStat3Title: "Lista de Exercícios PDF",
    heroStat3Sub: "Com gabarito detalhado",

    navSolver: "Equação e Resolução",
    navRoots: "Raízes para Equação",
    navWorksheet: "Gerador de Exercícios",
    navGuide: "Guia e Dúvidas",
    navDrills: "Exercícios Resolvidos",
    handbookBtn: "Manual de Fórmulas",

    solverHeading: "Coeficientes da Equação do 2º Grau e Resolução em Tempo Real",
    solverSubheading: "Insira os coeficientes para ax² + bx + c = 0 (aceita inteiros, decimais e frações como 3/4)",
    resetBtn: "Redefinir",
    coeffA: "Coeficiente quadrático a",
    coeffB: "Coeficiente linear b",
    coeffC: "Termo independente c",
    aNonZeroError: "O coeficiente 'a' não pode ser 0 em uma equação do segundo grau",
    presetsLabel: "Exemplos Clássicos:",
    recentHistory: "Recentes:",
    naturalInputTitle: "Entrada Inteligente de Equação (aceita parênteses e sem simplificar)",
    naturalInputHelp: "ex.: 2x^2 + 5x = 3 ou x(x - 3) = 10",
    naturalInputPlaceholder: "Cole ou digite qualquer equação: 3x^2 = 5x + 2 ou (x - 2)^2 = 9",
    naturalParseBtn: "Identificar e Simplificar",
    naturalParseSuccess: "Identificada com sucesso! Forma canônica normalizada:",
    naturalParseError: "Não foi possível reconhecer uma equação do 2º grau válida.",

    targetEquation: "Equação na Forma Geral",
    twoDistinctReal: "Duas Raízes Reais Distintas",
    twoEqualReal: "Duas Raízes Reais Iguais (Dupla)",
    noRealRoots: "Sem Raízes Reais (Complexas Conjugadas)",
    discriminantLabel: "Discriminante Δ",
    discriminantFormula: "b² - 4ac",
    sumRootsLabel: "Soma das Raízes (Girard/Vieta)",
    prodRootsLabel: "Produto das Raízes (Girard/Vieta)",
    exactRootsLabel: "Soluções Exatas",
    numValue: "Valor:",

    stepsHeading: "Resolução Detalhada Passo a Passo",
    stepsSubheading: "Desenvolvimento algébrico completo e estruturado",
    tabCompleting: "Completar Quadrados",
    tabVieta: "Relações de Vieta",
    tabFormula: "Fórmula de Bhaskara",
    tabFactoring: "Fatoração",
    copyReportBtn: "Copiar Relatório Completo",
    reportCopied: "Relatório copiado para a área de transferência!",
    completingMnemonic: "Regra dos 5 Passos para Completar Quadrados: 1. Isolar termo independente; 2. Normalizar a=1; 3. Somar (b/2a)² em ambos os lados; 4. Agrupar em quadrado perfeito; 5. Extrair a raiz quadrada.",

    parabolaCardTitle: "Gráfico da Parábola e Pontos Principais",
    parabolaVertex: "Vértice",
    parabolaRoots: "Raízes Reais",
    parabolaYIntercept: "Interseção y",
    parabolaGeometryTitle: "Propriedades Geométricas",
    parabolaOpening: "Abertura da Parábola",
    parabolaOpensUp: "Para Cima (a > 0, ponto mínimo)",
    parabolaOpensDown: "Para Baixo (a < 0, ponto máximo)",
    axisOfSymmetry: "Eixo de Simetria",
    vertexCoords: "Coordenadas do Vértice",
    yInterceptPoint: "Ponto no Eixo y",

    geomTitle: "Significado Geométrico de Completar Quadrados",
    geomSubtitle: "Dissecação geométrica clássica: como completar retângulos em um quadrado perfeito",
    geomToggleCompleted: "Ver Quadrado Perfeito Montado",
    geomToggleMissing: "Ver Estado com Canto Faltando",
    geomExplanationTitle: "Princípio Geométrico:",
    geomExplanationBody: "O termo quadrático x² é o quadrado azul. O termo (b/a)x é dividido em dois retângulos iguais (b/2a)x posicionados nas bordas.",
    geomWhyAddTitle: "Por que somar (b/2a)²?",
    geomWhyAddBody: "Falta exatamente um quadrado de lado b/2a no canto inferior direito. Adicioná-lo fecha a figura em um grande quadrado de lado (x + b/2a).",

    symmetricSectionTitle: "Avaliador de Polinômios Simétricos",
    symmetricSectionSub: "Transformação em termos da soma (x₁ + x₂) e do produto (x₁x₂)",
    transformFormula: "Fórmula de identidade:",
    substitutionText: "Substituição:",
    calcResultText: "Resultado:",

    paramEvaluatorTitle: "Avaliador Dinâmico com Parâmetro k",
    paramEvaluatorSub: "Calcule expressões simétricas avançadas em tempo real ajustando o parâmetro k",
    paramKLabel: "Parâmetro k =",

    rootsHeading: "Construir Equação a partir de suas Raízes",
    rootsSubheading: "Verificação rápida · Dedução da equação inteira irredutível",
    tabRationalRoots: "Raízes Racionais / Frações",
    tabRadicalRoots: "Raízes Radicais Conjugadas (m ± √n)",
    root1Label: "Primeira Raiz x₁",
    root2Label: "Segunda Raiz x₂",
    quickRootsLabel: "Raízes Exemplos:",
    radicalM: "Parte Racional m",
    radicalN: "Radicando n (≥ 0)",
    radicalNotice: "Para raízes quadráticas conjugadas x = m ± √n, encontre na hora a equação de coeficientes inteiros!",
    quickRadicalsLabel: "Radicais Comuns:",
    resultStandardEq: "Equação Inteira Simplificada",
    copyEquationBtn: "Copiar Equação",
    copyDerivationBtn: "Copiar Dedução",
    derivationCopied: "Relatório de dedução copiado!",
    monicStandardEq: "Forma Mônica (a = 1)",
    detailedDerivationTitle: "Dedução Detalhada e Verificação",
    detailedDerivationSub: "Aplicação inversa das relações de Vieta / Girard",

    worksheetHeading: "Gerador de Listas de Exercícios para Impressão",
    worksheetSubheading: "Crie listas de exercícios com gabarito passo a passo prontas para imprimir ou PDF",
    refreshProblemsBtn: "Gerar Novos Exercícios",
    printWorksheetBtn: "Imprimir Lista / PDF",
    difficultyLabel: "Dificuldade:",
    diffBasic: "Básica (Inteiros)",
    diffIntermediate: "Intermediária (a > 1)",
    diffAdvanced: "Avançada (Radicais)",
    questionCountLabel: "Quantidade:",
    showAnswersBtn: "Mostrar Respostas",
    hideAnswersBtn: "Ocultar Respostas",
    worksheetPaperTitle: "Lista de Exercícios: Equações do 2º Grau e Completar Quadrados",
    studentName: "Nome: ___________",
    studentClass: "Turma: ___________",
    studentScore: "Nota: ___________",
    studentDate: "Data: ___________",
    problemPrompt: "Resolva a seguinte equação quadrática detalhando todos os passos:",
    referenceAnswer: "Gabarito Detalhado:",

    footerTitle: "Fórmulas de Vieta / Girard e Calculadora Quadrática",
    footerDesc: "Ferramenta educacional gratuita para resolver equações do segundo grau e relações de Vieta.",
    footerFast: "Otimizado para o Google · Cálculo Rápido no Navegador",
    modalTitle: "Manual de Fórmulas: Vieta e Completar Quadrados",
    modalClose: "Entendido",
  },

  zh: {
    appName: "韦达定理根与系数计算器",
    appTitle: "韦达定理根与系数计算器 - 一元二次方程配方法拆解与两根反求方程",
    appSubtitle: "配方法五步全解 · 韦达逆定理秒算 · 典型对称代数式化简 · 练习卷一键生成",
    metaDescription: "专业免费的一元二次方程韦达定理与根与系数在线计算器。提供配方法五步详细拆解、公式法求解步骤、已知两根反求最简整系数方程、经典对称代数式秒算及抛物线图像。",
    metaKeywords: "韦达定理计算器, 根与系数关系在线, 配方法拆解过程, 一元二次方程计算器, 已知两根求方程, 韦达定理步骤, 二次方程配方法, 韦达逆定理, 一元二次方程打印练习卷",

    heroTags: ["免费在线数学工具", "配方法五步拆解", "韦达定理根与系数", "一元二次方程求解"],
    heroStat1Title: "配方法五步全解",
    heroStat1Sub: "标准答题规范",
    heroStat2Title: "已知两根求方程",
    heroStat2Sub: "韦达逆定理秒算",
    heroStat3Title: "练习卷一键导出",
    heroStat3Sub: "附完整步骤与答案",

    navSolver: "方程求解与拆解",
    navRoots: "已知两根求方程",
    navWorksheet: "练习题单打印",
    navGuide: "知识指南与FAQ",
    navDrills: "典型例题精析",
    handbookBtn: "核心方法手册",

    solverHeading: "一元二次方程各项系数精调与实时解析",
    solverSubheading: "输入标准式 ax² + bx + c = 0 中的系数（支持整数、小数或如 3/4 的分数）",
    resetBtn: "重置参数",
    coeffA: "二次项系数 a",
    coeffB: "一次项系数 b",
    coeffC: "常数项 c",
    aNonZeroError: "二次项系数 a 不能为 0",
    presetsLabel: "经典方程速选：",
    recentHistory: "最近计算：",
    naturalInputTitle: "智能自由方程直接输入（支持未化简式、括号与等号两侧混合项）",
    naturalInputHelp: "支持如 2x^2 + 5x = 3 或 x(x - 3) = 10",
    naturalInputPlaceholder: "在此直接粘贴或输入任意方程，例如：3x^2 = 5x + 2 或 (x - 2)^2 = 9",
    naturalParseBtn: "一键智能识别化简",
    naturalParseSuccess: "智能识别成功！已自动移项化简为：",
    naturalParseError: "未能识别有效一元二次方程，请检查格式（如 2x^2 + 5x = 3 或 x(x-2)=8）",

    targetEquation: "当前目标方程",
    twoDistinctReal: "两个不相等实数根",
    twoEqualReal: "两个相等实根 (重根)",
    noRealRoots: "无实数根 (共轭虚根)",
    discriminantLabel: "根的判别式 Δ",
    discriminantFormula: "b² - 4ac",
    sumRootsLabel: "两根之和 (韦达定理)",
    prodRootsLabel: "两根之积 (韦达定理)",
    exactRootsLabel: "方程精确解",
    numValue: "数值:",

    stepsHeading: "详细解题步骤全解",
    stepsSubheading: "标准规范答题全过程拆解",
    tabCompleting: "配方法拆解",
    tabVieta: "韦达定理推导",
    tabFormula: "公式法过程",
    tabFactoring: "十字相乘检验",
    copyReportBtn: "复制解题全过程文本",
    reportCopied: "已复制解题文本报告！",
    completingMnemonic: "配方法五步口诀：1. 移项移常数；2. 二次系数化为1；3. 两边加上半平方；4. 左边平方右边并；5. 直接开方出两解。",

    parabolaCardTitle: "函数图像与坐标点分布",
    parabolaVertex: "顶点",
    parabolaRoots: "方程实根",
    parabolaYIntercept: "y轴截距",
    parabolaGeometryTitle: "二次函数几何特征对照",
    parabolaOpening: "抛物线开口方向",
    parabolaOpensUp: "开口向上 (a > 0，有极小值)",
    parabolaOpensDown: "开口向下 (a < 0，有极大值)",
    axisOfSymmetry: "对称轴方程",
    vertexCoords: "顶点坐标",
    yInterceptPoint: "与 y 轴交点",

    geomTitle: "配方法几何拼图交互演示",
    geomSubtitle: "古代波斯代数几何本质：把二次项与一次项拼补为完美正方形",
    geomToggleCompleted: "展示拼合完成大正方形",
    geomToggleMissing: "展示未配方前缺角形状",
    geomExplanationTitle: "拼图原理解析：",
    geomExplanationBody: "左边二次项为 x²（蓝色大正方形），一次项为 (b/a)x，我们将其平分为两块长方形（各为 (b/2a)x）分别贴在正方形右侧和下侧。",
    geomWhyAddTitle: "为什么必须加上 (b/2a)²？",
    geomWhyAddBody: "观察右下角，恰好缺少一块边长为 b/2a 的小正方形。补全后，整个组合体就变成了一个边长为 (x + b/2a) 的完美大正方形！",

    symmetricSectionTitle: "典型对称代数式化简与展开推导",
    symmetricSectionSub: "核心代数变形方法：将未知代数式转化为两根之和 (x₁+x₂) 与两根之积 x₁x₂ 的形式",
    transformFormula: "变形恒等式：",
    substitutionText: "数值代入：",
    calcResultText: "计算结果:",

    paramEvaluatorTitle: "参数化对称代数式动态求值器",
    paramEvaluatorSub: "代数进阶必备：支持自定义参数 k 动态联动求值与展开公式",
    paramKLabel: "参数 k =",

    rootsHeading: "已知两根求一元二次方程",
    rootsSubheading: "二次方程系数快速核对 · 秒算最简整系数方程与逆定理全步骤",
    tabRationalRoots: "有理数/分数根",
    tabRadicalRoots: "共轭根式根 (m ± √n)",
    root1Label: "第一根 x₁",
    root2Label: "第二根 x₂",
    quickRootsLabel: "经典两根速选：",
    radicalM: "有理部分 m",
    radicalN: "根号内数值 n (≥ 0)",
    radicalNotice: "针对共轭二次无理数两根 x = m ± √n，输入 m 和 n 即可瞬间求出对应的有理系数方程！",
    quickRadicalsLabel: "常见共轭根速填：",
    resultStandardEq: "所求最简整系数一元二次方程",
    copyEquationBtn: "复制方程",
    copyDerivationBtn: "复制推导文本报告",
    derivationCopied: "已复制推导报告！",
    monicStandardEq: "首项系数为 1 的首一标准式",
    detailedDerivationTitle: "详细推导与反向验算过程",
    detailedDerivationSub: "标准推导与演算规范格式",

    worksheetHeading: "一元二次方程练习题单生成器",
    worksheetSubheading: "一键生成练习卷 · 配套标准答案与配方法五步解析 · 支持直接打印/导出PDF",
    refreshProblemsBtn: "换一批新题",
    printWorksheetBtn: "打印练习卷 / PDF",
    difficultyLabel: "题型难度：",
    diffBasic: "基础巩固 (整系数)",
    diffIntermediate: "能力提升 (二次项系数>1)",
    diffAdvanced: "难点进阶 (含无理根)",
    questionCountLabel: "题量：",
    showAnswersBtn: "显示答案与解析",
    hideAnswersBtn: "隐藏答案与解析",
    worksheetPaperTitle: "一元二次方程与配方法强化练习卷",
    studentName: "姓名：___________",
    studentClass: "班级：___________",
    studentScore: "得分：___________",
    studentDate: "日期：___________",
    problemPrompt: "解下列一元二次方程（要求写出配方法或公式法求解步骤）：",
    referenceAnswer: "【参考答案】：",

    footerTitle: "韦达定理根与系数计算器",
    footerDesc: "免费一元二次方程在线解题与验算工具，支持配方法拆解全流程、公式法、因式分解及对称代数式秒算。",
    footerFast: "Google 搜索优化版 · 极速计算无需等待",
    modalTitle: "韦达定理与配方法核心方法速查手册",
    modalClose: "我知道了",
  },
};
