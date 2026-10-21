import React from "react";
import { MathView } from "./MathView";
import { BookOpen, HelpCircle, CheckCircle2, Award, Zap } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";

export const SeoKnowledgeGuide: React.FC = () => {
  const { lang } = useTranslation();

  const content = {
    en: {
      tagline: ["Algebra Methods Guide", "Academic Tutorial", "Search Engine Optimized Guide"],
      art1Title: "Comprehensive Guide to Solving Quadratic Equations: Completing the Square vs Formula vs Factoring",
      art1P1: "The quadratic equation ax² + bx + c = 0 (a ≠ 0) is the cornerstone of elementary algebra. Depending on the problem structure, three main solving methods are used worldwide:",
      methods: [
        {
          title: "Completing the Square",
          desc: "The most rigorous deductive foundation. By turning quadratic polynomials into perfect squares, the universal quadratic formula itself is derived directly from this method.",
        },
        {
          title: "The Quadratic Formula",
          desc: "The universal algebraic tool. Evaluate discriminant Δ = b² - 4ac and substitute into x = (-b ± √Δ) / 2a to solve any quadratic equation.",
        },
        {
          title: "Factoring & Cross-Multiplication",
          desc: "The fastest calculation technique. When Δ is a perfect square and roots are rational, cross-multiplying factors the equation in seconds.",
        },
      ],
      art2Title: "5-Step Completing the Square Method & Geometric Proof",
      art2P1: "Why do we add the square of half the linear coefficient (b/2a)²? In 9th-century Baghdad, mathematician Al-Khwarizmi proved this using geometric dissection:",
      geomLabel: "Geometric Area Perspective:",
      geomP: "Consider a square of area x² and two rectangles of area (b/2a)x along the bottom and right edges. The total area is x² + (b/a)x. To complete this figure into a large full square, exactly one small corner square of side b/2a is missing:",
      geomWhy: "Adding (b/2a)² to both sides preserves balance while turning the left side into a neat square of side (x + b/2a).",
      step1: "Step 1 (Isolate Constant): Move constant term to the right: ax² + bx = -c",
      step2: "Step 2 (Normalize): Divide both sides by leading coefficient a: x² + (b/a)x = -c/a",
      step3: "Step 3 (Complete Square): Add (b/2a)² to both sides: x² + (b/a)x + (b/2a)² = -c/a + b²/(4a²)",
      step4: "Step 4 (Binomial Square): Factor left side into perfect square: (x + b/2a)² = (b² - 4ac)/(4a²)",
      step5: "Step 5 (Square Root): Take square roots on both sides to solve for x: x = (-b ± √Δ) / 2a",
      art3Title: "Vieta's Formulas & The Converse Theorem (Roots to Equation)",
      art3P1: "Formulated by French mathematician François Viète in the 16th century, Vieta's formulas establish an elegant bridge between polynomial coefficients and their roots without solving:",
      vietaDirect: "Direct Vieta Theorem: Equation → Roots",
      vietaDirectDesc: "Given ax² + bx + c = 0, obtain sum and product of roots instantly:",
      vietaConverse: "Converse Vieta Theorem: Known Roots → Equation",
      vietaConverseDesc: "Given two roots x₁ and x₂, the monic quadratic equation is:",
      faqTitle: "Frequently Asked Questions (FAQ)",
      faqs: [
        {
          q: "When can Vieta's formulas be applied?",
          a: "Vieta's formulas apply to any quadratic equation provided that: 1) the leading coefficient a ≠ 0; 2) roots exist. If working in the real numbers, the discriminant Δ = b² - 4ac must be non-negative (Δ ≥ 0).",
        },
        {
          q: "How to find a quadratic equation with integer coefficients from fractional roots?",
          a: "Calculate the sum S = x₁ + x₂ and product P = x₁ · x₂. Write the monic equation x² - Sx + P = 0, then multiply all terms by the least common multiple (LCM) of the denominators to obtain standard integer coefficients ax² + bx + c = 0.",
        },
        {
          q: "What does the discriminant Δ = b² - 4ac indicate about the roots?",
          a: "If Δ > 0, the equation has two distinct real roots (parabola crosses x-axis twice). If Δ = 0, there are two equal real roots (parabola is tangent to x-axis). If Δ < 0, there are no real roots (two complex conjugate roots).",
        },
        {
          q: "Is completing the square better than using the quadratic formula?",
          a: "The quadratic formula is faster for raw numerical computation. However, completing the square is essential for finding the vertex of a parabola, converting to vertex form y = a(x - h)² + k, and proving algebraic inequalities.",
        },
      ],
    },
    es: {
      tagline: ["Guía de Métodos Algebraicos", "Tutorial Académico", "Optimizado para Google"],
      art1Title: "Guía Completa para Resolver Ecuaciones Cuadráticas: Completar Cuadrados vs Fórmula vs Factorización",
      art1P1: "La ecuación cuadrática ax² + bx + c = 0 (a ≠ 0) es el eje central del álgebra escolar. En la práctica existen tres métodos principales:",
      methods: [
        {
          title: "Completar el Cuadrado",
          desc: "La base deductiva más rigurosa. Transforma el trinomio en un cuadrado perfecto; de este método se deduce la fórmula general.",
        },
        {
          title: "Fórmula Cuadrática General",
          desc: "La herramienta universal. Permite calcular directamente las soluciones mediante x = (-b ± √Δ) / 2a a partir de Δ = b² - 4ac.",
        },
        {
          title: "Factorización por Aspa Simple",
          desc: "El método más veloz. Cuando el discriminante es un cuadrado perfecto y las raíces son racionales, factoriza en segundos.",
        },
      ],
      art2Title: "Método de Completar el Cuadrado en 5 Pasos y Demostración Geométrica",
      art2P1: "¿Por qué se suma la mitad del coeficiente lineal al cuadrado (b/2a)²? En el siglo IX, el matemático Al-Juarismi lo demostró geométricamente:",
      geomLabel: "Perspectiva del Área Geométrica:",
      geomP: "Considera un cuadrado de área x² y dos rectángulos de área (b/2a)x. El área total es x² + (b/a)x. Para completar la figura en un cuadrado mayor, falta exactamente la esquina inferior derecha de lado b/2a:",
      geomWhy: "Sumar (b/2a)² en ambos miembros equilibra la igualdad y completa el binomio al cuadrado (x + b/2a)².",
      step1: "Paso 1 (Aislar constante): Mover el término c a la derecha: ax² + bx = -c",
      step2: "Paso 2 (Normalizar a = 1): Dividir entre a: x² + (b/a)x = -c/a",
      step3: "Paso 3 (Completar cuadrado): Sumar (b/2a)² en ambos lados: x² + (b/a)x + (b/2a)² = -c/a + b²/(4a²)",
      step4: "Paso 4 (Factorizar): Expresar como cuadrado perfecto: (x + b/2a)² = (b² - 4ac)/(4a²)",
      step5: "Paso 5 (Raíz cuadrada): Extraer raíz cuadrada a ambos lados: x = (-b ± √Δ) / 2a",
      art3Title: "Teorema de Vieta y su Recíproco (De Raíces a la Ecuación)",
      art3P1: "Formulado por François Viète en el siglo XVI, el teorema relaciona directamente los coeficientes y las raíces sin resolver la ecuación:",
      vietaDirect: "Teorema Directo de Vieta: Ecuación → Raíces",
      vietaDirectDesc: "Dada la ecuación ax² + bx + c = 0, se obtiene inmediatamente:",
      vietaConverse: "Teorema Recíproco de Vieta: Raíces → Ecuación",
      vietaConverseDesc: "Dadas dos raíces x₁ y x₂, la ecuación mónica irreducible es:",
      faqTitle: "Preguntas Frecuentes (FAQ)",
      faqs: [
        {
          q: "¿Cuándo se puede aplicar el teorema de Vieta?",
          a: "Se puede aplicar siempre que el coeficiente cuadrático a ≠ 0 y existan raíces. Para asegurar raíces reales en ℝ, el discriminante Δ = b² - 4ac debe ser mayor o igual a 0.",
        },
        {
          q: "¿Cómo hallar la ecuación de coeficientes enteros si las raíces son fracciones?",
          a: "Calcula la suma S = x₁ + x₂ y el producto P = x₁ · x₂. Escribe la ecuación mónica x² - Sx + P = 0 y multiplica por el mínimo común múltiplo (mcm) de los denominadores.",
        },
        {
          q: "¿Qué indica el discriminante Δ = b² - 4ac sobre las soluciones?",
          a: "Si Δ > 0, hay dos raíces reales distintas (corta al eje x en dos puntos). Si Δ = 0, hay una raíz real doble (la parábola es tangente). Si Δ < 0, no hay raíces reales.",
        },
        {
          q: "¿Qué método es más conveniente: completar cuadrados o la fórmula general?",
          a: "La fórmula general es más directa para cálculos numéricos. Completar el cuadrado es imprescindible para hallar el vértice de la parábola y escribir la forma canónica y = a(x - h)² + k.",
        },
      ],
    },
    fr: {
      tagline: ["Guide d'Algèbre", "Tutoriel Pédagogique", "Optimisé pour Google"],
      art1Title: "Résolution des Équations du Second Degré : Complétion du Carré, Formule et Factorisation",
      art1P1: "L'équation ax² + bx + c = 0 (a ≠ 0) est au cœur de l'algèbre. Trois grandes méthodes se complètent :",
      methods: [
        {
          title: "Complétion du Carré",
          desc: "La démarche déductive par excellence. Elle permet de trouver la forme canonique et d'établir la formule générale.",
        },
        {
          title: "Formule Quadratique",
          desc: "La formule universelle par le discriminant Δ = b² - 4ac donnant x = (-b ± √Δ) / 2a.",
        },
        {
          title: "Factorisation Directe",
          desc: "La méthode la plus rapide lorsque le discriminant est un carré parfait et les racines rationnelles.",
        },
      ],
      art2Title: "La Complétion du Carré en 5 Étapes & Interprétation Géométrique",
      art2P1: "Pourquoi ajouter le carré de la moitié du coefficient linéaire (b/2a)² ? Al-Khwarizmi l'a illustré par découpage géométrique :",
      geomLabel: "Approche par les Aires Géométriques :",
      geomP: "Un carré d'aire x² flanqué de deux rectangles d'aire (b/2a)x donne une aire x² + (b/a)x. Pour compléter la figure en un grand carré, il manque un coin d'aire (b/2a)² :",
      geomWhy: "Ajouter cette aire aux deux membres permet de factoriser en un carré parfait (x + b/2a)².",
      step1: "Étape 1 (Isoler la constante) : ax² + bx = -c",
      step2: "Étape 2 (Diviser par a) : x² + (b/a)x = -c/a",
      step3: "Étape 3 (Compléter le carré) : x² + (b/a)x + (b/2a)² = -c/a + b²/(4a²)",
      step4: "Étape 4 (Forme canonique) : (x + b/2a)² = (b² - 4ac)/(4a²)",
      step5: "Étape 5 (Racines) : x = (-b ± √Δ) / 2a",
      art3Title: "Relations de Viète & Réciproque (Retrouver l'Équation)",
      art3P1: "Établies par François Viète, ces relations relient somme et produit des racines aux coefficients sans résoudre :",
      vietaDirect: "Théorème Direct de Viète",
      vietaDirectDesc: "Pour l'équation ax² + bx + c = 0 :",
      vietaConverse: "Théorème Réciproque",
      vietaConverseDesc: "Pour deux racines données x₁ et x₂ :",
      faqTitle: "Foire Aux Questions (FAQ)",
      faqs: [
        {
          q: "Quand peut-on utiliser les relations de Viète ?",
          a: "Dès que l'équation est bien du second degré (a ≠ 0) et qu'elle admet des racines réelles (Δ ≥ 0).",
        },
        {
          q: "Comment obtenir des coefficients entiers à partir de racines rationnelles ?",
          a: "Calculez S = x₁ + x₂ et P = x₁x₂, écrivez x² - Sx + P = 0, puis multipliez par le PPCM des dénominateurs.",
        },
        {
          q: "Que signifie le signe du discriminant Δ = b² - 4ac ?",
          a: "Si Δ > 0, deux racines réelles distinctes. Si Δ = 0, une racine réelle double. Si Δ < 0, aucune racine réelle.",
        },
        {
          q: "Quelle différence entre forme canonique et formule quadratique ?",
          a: "La forme canonique issue de la complétion du carré donne directement les coordonnées du sommet de la parabole.",
        },
      ],
    },
    pt: {
      tagline: ["Guia de Álgebra", "Tutorial Passo a Passo", "Otimizado para o Google"],
      art1Title: "Guia Completo de Resolução de Equações do 2º Grau: Completar Quadrados, Bhaskara e Fatoração",
      art1P1: "A equação ax² + bx + c = 0 (a ≠ 0) é a base da álgebra no ensino fundamental e médio:",
      methods: [
        {
          title: "Completar Quadrados",
          desc: "O método algébrico mais rigoroso, do qual se origina a fórmula resolutiva de Bhaskara.",
        },
        {
          title: "Fórmula de Bhaskara",
          desc: "A fórmula geral mais utilizada: x = (-b ± √Δ) / 2a a partir de Δ = b² - 4ac.",
        },
        {
          title: "Fatoração e Produto Notável",
          desc: "A técnica mais rápida quando o discriminante é quadrado perfeito e as raízes são racionais.",
        },
      ],
      art2Title: "Regra dos 5 Passos para Completar Quadrados & Interpretação Geométrica",
      art2P1: "Por que somar a metade do coeficiente linear ao quadrado (b/2a)²? Al-Khwarizmi demonstrou geometricamente:",
      geomLabel: "Visão Geométrica das Áreas:",
      geomP: "Um quadrado de área x² somado a dois retângulos de área (b/2a)x totaliza x² + (b/a)x. Para fechar um quadrado perfeito, falta o canto inferior direito de lado b/2a:",
      geomWhy: "Adicionar (b/2a)² em ambos os lados fecha a figura em um grande quadrado de lado (x + b/2a).",
      step1: "Passo 1 (Isolar a constante): ax² + bx = -c",
      step2: "Passo 2 (Normalizar a = 1): x² + (b/a)x = -c/a",
      step3: "Passo 3 (Somar o quadrado da metade): x² + (b/a)x + (b/2a)² = -c/a + b²/(4a²)",
      step4: "Passo 4 (Fatorar em quadrado perfeito): (x + b/2a)² = (b² - 4ac)/(4a²)",
      step5: "Passo 5 (Extrair a raiz quadrada): x = (-b ± √Δ) / 2a",
      art3Title: "Relações de Girard / Vieta & Forma Inversa",
      art3P1: "As relações de Girard relacionam diretamente a soma e o produto das raízes aos coeficientes:",
      vietaDirect: "Relações Diretas de Girard / Vieta",
      vietaDirectDesc: "Dada a equação ax² + bx + c = 0:",
      vietaConverse: "Relação Inversa: Das Raízes para a Equação",
      vietaConverseDesc: "Dadas duas raízes x₁ e x₂:",
      faqTitle: "Perguntas Frequentes (FAQ)",
      faqs: [
        {
          q: "Quando as relações de Girard podem ser aplicadas?",
          a: "Sempre que a ≠ 0 e as raízes existirem. Para raízes reais em ℝ, deve-se verificar Δ = b² - 4ac ≥ 0.",
        },
        {
          q: "Como encontrar a equação com coeficientes inteiros para raízes fracionárias?",
          a: "Calcule a soma S = x₁ + x₂ e o produto P = x₁x₂. Escreva x² - Sx + P = 0 e multiplique pelo MMC dos denominadores.",
        },
        {
          q: "Qual o significado do discriminante Δ = b² - 4ac?",
          a: "Se Δ > 0, duas raízes reais distintas. Se Δ = 0, raiz dupla (parábola tangencia o eixo x). Se Δ < 0, sem raízes reais.",
        },
        {
          q: "Por que aprender a completar quadrados se existe a fórmula de Bhaskara?",
          a: "Completar quadrados permite encontrar o vértice da parábola e converter para a forma canônica y = a(x - h)² + k.",
        },
      ],
    },
    zh: {
      tagline: ["代数方法权威指南", "标准教学解析", "Google 搜索优化规范"],
      art1Title: "一元二次方程解法全景：公式法、配方法与因式分解深度对比",
      art1P1: "一元二次方程是初等代数的核心枢纽，标准形式为 ax² + bx + c = 0 (a ≠ 0)。在数学求解实践中，通常有三大主流方法：",
      methods: [
        {
          title: "配方法 (Completing the Square)",
          desc: "代数逻辑最严密的推导基石。通过恒等变形将二次三项式转化为完全平方式，求根公式正是由配方法完整推导而来的。",
        },
        {
          title: "公式法 (Quadratic Formula)",
          desc: "万能通用的通用法则。只要计算判别式 Δ = b² - 4ac ≥ 0，代入 x = (-b ± √Δ) / 2a 即可直出任意解。",
        },
        {
          title: "十字相乘因式分解",
          desc: "速度最快的速算技巧。当判别式为完全平方数且两根为有理数时，通过拆分常数项与二次项系数，10秒内即可分解出两根。",
        },
      ],
      art2Title: "配方法五步拆解法图文详解与几何拼图本质",
      art2P1: "为什么配方法要加上一次项系数一半的平方？古代波斯数学家花拉子米通过几何拼图解释了这一过程：",
      geomLabel: "几何面积视角：",
      geomP: "假设有一个面积为 x² 的正方形，加上两个长为 x、宽为 b/(2a) 的长方形，总面积为 x² + (b/a)x。要将其补齐为一个完整的大正方形，右下角恰好缺少一个小正方形，其面积正是边长的平方：",
      geomWhy: "这就是为什么必须在方程两边同时加上 (b/2a)²，保证天平两端等价守恒。",
      step1: "第 1 步 (移项)：将常数项移到方程右边：ax² + bx = -c",
      step2: "第 2 步 (化为1)：两边同除以二次项系数 a：x² + (b/a)x = -c/a",
      step3: "第 3 步 (配方)：两边同时加上一次项系数一半的平方：x² + (b/a)x + (b/2a)² = -c/a + b²/(4a²)",
      step4: "第 4 步 (变形)：写成完全平方式：(x + b/2a)² = (b² - 4ac)/(4a²)",
      step5: "第 5 步 (开方)：两边直接开平方，得出两个解：x = (-b ± √Δ) / 2a",
      art3Title: "韦达定理的代数本质与逆定理（已知两根反求方程）",
      art3P1: "16世纪法国数学家弗朗索瓦·韦达（François Viète）在《论方程的识别与订正》中系统建立了根与系数的关系。韦达定理不仅能省去解方程的繁琐步骤，更搭建了代数与几何、和与积之间的桥梁。",
      vietaDirect: "韦达正定理：方程 → 根的关系",
      vietaDirectDesc: "已知方程 ax² + bx + c = 0，无需解出具体根，可直接获取：",
      vietaConverse: "韦达逆定理：已知根 → 反求方程",
      vietaConverseDesc: "若两个数为 x₁、x₂，则以它们为根的一元二次方程为：",
      faqTitle: "常见问题解答 (FAQ)",
      faqs: [
        {
          q: "什么时候可以使用韦达定理？",
          a: "必须同时满足两个前提条件：① 方程必须是一元二次方程，即二次项系数 a ≠ 0；② 方程必须存在实数根，必须先验证判别式 Δ = b² - 4ac ≥ 0。",
        },
        {
          q: "两根为分数时，如何求最简整系数方程？",
          a: "首先求出两根之和 S 与两根之积 P，写出首一标准式 x² - Sx + P = 0。然后两边同时乘以分母的最小公倍数，即可化为最简整系数方程。",
        },
        {
          q: "一元二次方程有无实数根如何快速判断？",
          a: "计算判别式 Δ = b² - 4ac。若 Δ > 0，有两个不相等实根；若 Δ = 0，有两个相等实根；若 Δ < 0，无实根（在复数范围内有两个共轭虚根）。",
        },
        {
          q: "配方法与公式法哪个更好？",
          a: "公式法在数值计算时最直接；配方法则在求抛物线顶点坐标、最值以及代数式恒等变形中具有不可替代的作用。",
        },
      ],
    },
  }[lang] || {
    tagline: ["Algebra Methods Guide", "Academic Tutorial", "Search Engine Optimized Guide"],
    art1Title: "Comprehensive Guide to Solving Quadratic Equations: Completing the Square vs Formula vs Factoring",
    art1P1: "The quadratic equation ax² + bx + c = 0 (a ≠ 0) is the cornerstone of elementary algebra. Depending on the problem structure, three main solving methods are used worldwide:",
    methods: [
      {
        title: "Completing the Square",
        desc: "The most rigorous deductive foundation. By turning quadratic polynomials into perfect squares, the universal quadratic formula itself is derived directly from this method.",
      },
      {
        title: "The Quadratic Formula",
        desc: "The universal algebraic tool. Evaluate discriminant Δ = b² - 4ac and substitute into x = (-b ± √Δ) / 2a to solve any quadratic equation.",
      },
      {
        title: "Factoring & Cross-Multiplication",
        desc: "The fastest calculation technique. When Δ is a perfect square and roots are rational, cross-multiplying factors the equation in seconds.",
      },
    ],
    art2Title: "5-Step Completing the Square Method & Geometric Proof",
    art2P1: "Why do we add the square of half the linear coefficient (b/2a)²? In 9th-century Baghdad, mathematician Al-Khwarizmi proved this using geometric dissection:",
    geomLabel: "Geometric Area Perspective:",
    geomP: "Consider a square of area x² and two rectangles of area (b/2a)x along the bottom and right edges. The total area is x² + (b/a)x. To complete this figure into a large full square, exactly one small corner square of side b/2a is missing:",
    geomWhy: "Adding (b/2a)² to both sides preserves balance while turning the left side into a neat square of side (x + b/2a).",
    step1: "Step 1 (Isolate Constant): Move constant term to the right: ax² + bx = -c",
    step2: "Step 2 (Normalize): Divide both sides by leading coefficient a: x² + (b/a)x = -c/a",
    step3: "Step 3 (Complete Square): Add (b/2a)² to both sides: x² + (b/a)x + (b/2a)² = -c/a + b²/(4a²)",
    step4: "Step 4 (Binomial Square): Factor left side into perfect square: (x + b/2a)² = (b² - 4ac)/(4a²)",
    step5: "Step 5 (Square Root): Take square roots on both sides to solve for x: x = (-b ± √Δ) / 2a",
    art3Title: "Vieta's Formulas & The Converse Theorem (Roots to Equation)",
    art3P1: "Formulated by French mathematician François Viète in the 16th century, Vieta's formulas establish an elegant bridge between polynomial coefficients and their roots without solving:",
    vietaDirect: "Direct Vieta Theorem: Equation → Roots",
    vietaDirectDesc: "Given ax² + bx + c = 0, obtain sum and product of roots instantly:",
    vietaConverse: "Converse Vieta Theorem: Known Roots → Equation",
    vietaConverseDesc: "Given two roots x₁ and x₂, the monic quadratic equation is:",
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqs: [
      {
        q: "When can Vieta's formulas be applied?",
        a: "Vieta's formulas apply to any quadratic equation provided that: 1) the leading coefficient a ≠ 0; 2) roots exist. If working in the real numbers, the discriminant Δ = b² - 4ac must be non-negative (Δ ≥ 0).",
      },
      {
        q: "How to find a quadratic equation with integer coefficients from fractional roots?",
        a: "Calculate the sum S = x₁ + x₂ and product P = x₁ · x₂. Write the monic equation x² - Sx + P = 0, then multiply all terms by the least common multiple (LCM) of the denominators to obtain standard integer coefficients ax² + bx + c = 0.",
      },
      {
        q: "What does the discriminant Δ = b² - 4ac indicate about the roots?",
        a: "If Δ > 0, the equation has two distinct real roots (parabola crosses x-axis twice). If Δ = 0, there are two equal real roots (parabola is tangent to x-axis). If Δ < 0, there are no real roots (two complex conjugate roots).",
      },
      {
        q: "Is completing the square better than using the quadratic formula?",
        a: "The quadratic formula is faster for raw numerical computation. However, completing the square is essential for finding the vertex of a parabola, converting to vertex form y = a(x - h)² + k, and proving algebraic inequalities.",
      },
    ],
  };

  return (
    <div className="space-y-10">
      {/* Article 1: Guide Overview */}
      <article className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-2 font-medium">
          <span>{content.tagline[0]}</span>
          <span aria-hidden="true">·</span>
          <span>{content.tagline[1]}</span>
          <span aria-hidden="true">·</span>
          <span>{content.tagline[2]}</span>
        </div>
        <h2 className="text-xl md:text-3xl font-bold text-slate-900 tracking-tight mb-4">
          {content.art1Title}
        </h2>
        <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4">
          <p>{content.art1P1}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {content.methods.map((m, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm md:text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{m.title}</span>
                </h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* Article 2: Geometric & Algebraic meaning of Completing the Square */}
      <article className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-3">
          {content.art2Title}
        </h2>
        <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4">
          <p>{content.art2P1}</p>
          <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <div className="font-semibold text-slate-800 text-sm">{content.geomLabel}</div>
            <p className="text-xs md:text-sm text-slate-600">
              {content.geomP}
            </p>
            <div className="p-3 bg-white rounded border border-slate-200/80 text-center font-serif text-sm md:text-base overflow-x-auto">
              <MathView math="x^2 + 2 \cdot \left(\frac{b}{2a}\right)x + \left(\frac{b}{2a}\right)^2 = \left(x + \frac{b}{2a}\right)^2" />
            </div>
            <p className="text-xs md:text-sm text-slate-500">
              {content.geomWhy}
            </p>
          </div>

          {/* 5-step detailed recap */}
          <div className="space-y-2.5 pt-2 text-xs md:text-sm">
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-slate-900 shrink-0">{content.step1}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-slate-900 shrink-0">{content.step2}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-slate-900 shrink-0">{content.step3}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-slate-900 shrink-0">{content.step4}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-bold text-slate-900 shrink-0">{content.step5}</span>
            </div>
          </div>
        </div>
      </article>

      {/* Article 3: Vieta's Theorem Deduction & Reverse Theorem */}
      <article className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-3">
          {content.art3Title}
        </h2>
        <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4">
          <p>{content.art3P1}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm md:text-base">{content.vietaDirect}</h3>
              <p className="text-xs md:text-sm text-slate-500">
                {content.vietaDirectDesc}
              </p>
              <div className="bg-white p-3 rounded border border-slate-200 text-center font-serif text-sm md:text-base">
                <MathView math="x_1 + x_2 = -\frac{b}{a}, \quad x_1 x_2 = \frac{c}{a}" />
              </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm md:text-base">{content.vietaConverse}</h3>
              <p className="text-xs md:text-sm text-slate-500">
                {content.vietaConverseDesc}
              </p>
              <div className="bg-white p-3 rounded border border-slate-200 text-center font-serif text-sm md:text-base">
                <MathView math="x^2 - (x_1 + x_2)x + x_1 x_2 = 0" />
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Article 4: Google SERP FAQ Section */}
      <article className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {content.faqTitle}
          </h2>
        </div>

        <div className="divide-y divide-slate-100 text-sm md:text-base">
          {content.faqs.map((f, i) => (
            <div key={i} className="py-4 space-y-1.5">
              <h3 className="font-bold text-slate-900 text-sm md:text-base">
                {f.q}
              </h3>
              <p className="text-slate-600 leading-relaxed text-xs md:text-sm">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};
