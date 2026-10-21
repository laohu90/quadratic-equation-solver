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
import { BookOpen, Globe } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"solver" | "roots" | "worksheet" | "guide" | "drills">("solver");
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);
  const { t, lang } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 text-[15px] md:text-[16px]">
      {/* Top Bar strictly conforming to Top Bar Contract:
          Zone 1: Single text element wordmark
          Zone 2: 5 clean single-line nav links
          Zone 3: Language Switcher & 1 primary action button
      */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-serif font-bold text-xl shadow-2xs">
              V
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("solver");
              }}
              className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap"
            >
              {t.appName}
            </a>
          </div>

          {/* Zone 2: 5 clean single-line nav links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm md:text-[15px] font-medium text-slate-600">
            <button
              onClick={() => setActiveTab("solver")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-1 ${
                activeTab === "solver" ? "text-slate-950 font-bold border-b-2 border-slate-900" : ""
              }`}
            >
              {t.navSolver}
            </button>
            <button
              onClick={() => setActiveTab("roots")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-1 ${
                activeTab === "roots" ? "text-slate-950 font-bold border-b-2 border-slate-900" : ""
              }`}
            >
              {t.navRoots}
            </button>
            <button
              onClick={() => setActiveTab("worksheet")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-1 ${
                activeTab === "worksheet" ? "text-slate-950 font-bold border-b-2 border-slate-900" : ""
              }`}
            >
              {t.navWorksheet}
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-1 ${
                activeTab === "guide" ? "text-slate-950 font-bold border-b-2 border-slate-900" : ""
              }`}
            >
              {t.navGuide}
            </button>
            <button
              onClick={() => setActiveTab("drills")}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-1 ${
                activeTab === "drills" ? "text-slate-950 font-bold border-b-2 border-slate-900" : ""
              }`}
            >
              {t.navDrills}
            </button>
          </nav>

          {/* Zone 3: Language Selector & Primary Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher className="hidden sm:inline-flex" />

            <button
              onClick={() => setIsCheatSheetOpen(true)}
              className="px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.handbookBtn}</span>
            </button>
          </div>
        </div>

        {/* Mobile Subheader: Language Switcher on mobile */}
        <div className="sm:hidden flex items-center justify-center border-t border-slate-100 bg-slate-50/80 px-2 py-1.5 overflow-x-auto">
          <LanguageSwitcher />
        </div>

        {/* Mobile Nav strip */}
        <div className="xl:hidden flex items-center justify-start gap-1 border-t border-slate-100 bg-slate-50 px-3 py-2 text-xs sm:text-sm font-medium overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("solver")}
            className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${activeTab === "solver" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-600"}`}
          >
            {t.navSolver}
          </button>
          <button
            onClick={() => setActiveTab("roots")}
            className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${activeTab === "roots" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-600"}`}
          >
            {t.navRoots}
          </button>
          <button
            onClick={() => setActiveTab("worksheet")}
            className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${activeTab === "worksheet" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-600"}`}
          >
            {t.navWorksheet}
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${activeTab === "guide" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-600"}`}
          >
            {t.navGuide}
          </button>
          <button
            onClick={() => setActiveTab("drills")}
            className={`px-3 py-1.5 rounded whitespace-nowrap shrink-0 ${activeTab === "drills" ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-600"}`}
          >
            {t.navDrills}
          </button>
        </div>
      </header>

      {/* Hero context banner (Hidden during print) */}
      <section className="bg-white border-b border-slate-200 py-6 md:py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium flex-wrap">
                {t.heroTags.map((tag, idx) => (
                  <React.Fragment key={idx}>
                    <span>{tag}</span>
                    {idx < t.heroTags.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900" style={{ textWrap: "balance" }}>
                {t.appTitle}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {t.appSubtitle}
              </p>
            </div>

            {/* Feature quick indicators (clean text, no pills) */}
            <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 shrink-0">
              <div className="text-right">
                <span className="block font-semibold text-slate-800">{t.heroStat1Title}</span>
                <span className="text-xs text-slate-400">{t.heroStat1Sub}</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-right">
                <span className="block font-semibold text-slate-800">{t.heroStat2Title}</span>
                <span className="text-xs text-slate-400">{t.heroStat2Sub}</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-right">
                <span className="block font-semibold text-slate-800">{t.heroStat3Title}</span>
                <span className="text-xs text-slate-400">{t.heroStat3Sub}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0">
        {activeTab === "solver" && <EquationSolverView />}
        {activeTab === "roots" && <RootsToEquationView />}
        {activeTab === "worksheet" && <WorksheetGenerator />}
        {activeTab === "guide" && <SeoKnowledgeGuide />}
        {activeTab === "drills" && <ExamDrillsView />}
      </main>

      {/* Footer conforming to anti-slop guidelines (Hidden during print) */}
      <footer className="bg-white border-t border-slate-200 py-8 text-xs sm:text-sm text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">{t.footerTitle}</span>
              <span aria-hidden="true">·</span>
              <span>{t.footerDesc}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab("solver")}
                className="hover:text-slate-800 transition-colors"
              >
                {t.navSolver}
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setActiveTab("roots")}
                className="hover:text-slate-800 transition-colors"
              >
                {t.navRoots}
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setActiveTab("worksheet")}
                className="hover:text-slate-800 transition-colors"
              >
                {t.navWorksheet}
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setActiveTab("guide")}
                className="hover:text-slate-800 transition-colors"
              >
                {t.navGuide}
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setIsCheatSheetOpen(true)}
                className="hover:text-slate-800 transition-colors"
              >
                {t.handbookBtn}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <p>
              Available in English, Español, Français, Português, and 中文.
            </p>
            <p className="whitespace-nowrap font-medium text-slate-500">
              {t.footerFast}
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
