/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { EquationSolverView } from "./components/EquationSolverView";
import { RootsToEquationView } from "./components/RootsToEquationView";
import { WorksheetGenerator } from "./components/WorksheetGenerator";
import { SeoKnowledgeGuide } from "./components/SeoKnowledgeGuide";
import { ExamDrillsView } from "./components/ExamDrillsView";
import { VietaCheatSheet } from "./components/VietaCheatSheet";
import { useTranslation, LanguageSwitcher } from "./i18n/LanguageContext";
import { BookOpen } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"solver" | "roots" | "worksheet" | "guide" | "drills">("solver");
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const navItems = [
    { id: "solver" as const, label: t.navSolver },
    { id: "roots" as const, label: t.navRoots },
    { id: "drills" as const, label: t.navDrills },
    { id: "worksheet" as const, label: t.navWorksheet },
    { id: "guide" as const, label: t.navGuide },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 text-[15px] md:text-[16px]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-serif font-bold text-lg shadow-2xs">
              V
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("solver")}
              className="text-base sm:text-lg font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors whitespace-nowrap text-left"
            >
              {t.appName}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === item.id
                    ? "text-blue-700 bg-blue-50/80 font-semibold"
                    : "hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Language Switcher & Handbook Modal */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setIsCheatSheetOpen(true)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">{t.handbookBtn}</span>
              <span className="sm:hidden">手册</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center gap-1 border-t border-slate-100 bg-slate-50/80 px-3 py-1.5 text-xs font-medium overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === item.id
                  ? "bg-white text-blue-700 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Clean Context Header (Hidden during print) */}
      <section className="bg-white border-b border-slate-200 py-5 sm:py-6 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-1.5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {t.appTitle}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
              {t.appSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 print:p-0 print:m-0">
        {activeTab === "solver" && <EquationSolverView />}
        {activeTab === "roots" && <RootsToEquationView />}
        {activeTab === "drills" && <ExamDrillsView />}
        {activeTab === "worksheet" && <WorksheetGenerator />}
        {activeTab === "guide" && <SeoKnowledgeGuide />}
      </main>

      {/* Clean Footer (Hidden during print) */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">{t.appName}</span>
              <span aria-hidden="true">·</span>
              <span>{t.footerTitle}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className="hover:text-slate-800 transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setIsCheatSheetOpen(true)}
                className="hover:text-slate-800 transition-colors cursor-pointer"
              >
                {t.handbookBtn}
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
            <p>
              支持 中文、English、Español、Français、Português 多语言与标准 LaTeX 导出。
            </p>
            <p className="font-medium text-slate-500">
              精确分数运算 · 零误差配方拆解
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Cheat Sheet */}
      <VietaCheatSheet
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />
    </div>
  );
}
