import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { Language, TranslationData, TRANSLATIONS } from "./translations";
import { Globe, ChevronDown, Check } from "lucide-react";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "zh",
  setLang: () => {},
  t: TRANSLATIONS.zh,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved && (saved === "en" || saved === "es" || saved === "fr" || saved === "pt" || saved === "zh")) {
        return saved as Language;
      }
      // Smart browser language auto-detection without intrusive notifications
      const navLang = (navigator.language || (navigator as any).userLanguage || "").toLowerCase();
      if (navLang.startsWith("zh")) return "zh";
      if (navLang.startsWith("es")) return "es";
      if (navLang.startsWith("fr")) return "fr";
      if (navLang.startsWith("pt")) return "pt";
      if (navLang.startsWith("en")) return "en";
    } catch {
      // ignore
    }
    return "zh"; // Default to Chinese as primary
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("app_lang", newLang);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.zh;

  // Sync document title, meta tags, and OpenGraph dynamically
  useEffect(() => {
    try {
      document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
      document.title = t.appTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", t.metaDescription);
      }
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", t.metaKeywords);
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", t.appTitle);
      }
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute("content", t.metaDescription);
      }
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) {
        twTitle.setAttribute("content", t.appTitle);
      }
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) {
        twDesc.setAttribute("content", t.metaDescription);
      }
    } catch (e) {
      console.warn("Failed to update document meta", e);
    }
  }, [lang, t]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { lang, setLang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { code: Language; label: string; nativeName: string }[] = [
    { code: "zh", label: "Chinese", nativeName: "简体中文" },
    { code: "en", label: "English", nativeName: "English" },
    { code: "es", label: "Spanish", nativeName: "Español" },
    { code: "fr", label: "French", nativeName: "Français" },
    { code: "pt", label: "Portuguese", nativeName: "Português" },
  ];

  const currentOption = options.find((opt) => opt.code === lang) || options[0];

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200/80 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 cursor-pointer shadow-2xs"
      >
        <Globe className="w-4 h-4 text-slate-500 shrink-0" />
        <span className="font-medium">{currentOption.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white border border-slate-200 shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            选择语言 / Language
          </div>
          <div className="py-1">
            {options.map((opt) => {
              const isSelected = lang === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    setLang(opt.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-slate-50 text-blue-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{opt.nativeName}</span>
                    <span className="text-[10px] text-slate-400">{opt.label}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
