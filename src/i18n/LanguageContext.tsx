import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, TranslationData, TRANSLATIONS } from "./translations";
import { Globe, X } from "lucide-react";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: TRANSLATIONS.en,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved && (saved === "en" || saved === "es" || saved === "fr" || saved === "pt" || saved === "zh")) {
        return saved as Language;
      }
      // Smart browser language auto-detection
      const navLang = (navigator.language || (navigator as any).userLanguage || "").toLowerCase();
      if (navLang.startsWith("es")) return "es";
      if (navLang.startsWith("fr")) return "fr";
      if (navLang.startsWith("pt")) return "pt";
      if (navLang.startsWith("zh")) return "zh";
    } catch {
      // ignore
    }
    return "en"; // Default fallback
  });

  const [autoNotice, setAutoNotice] = useState<{ text: string; langCode: Language } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (!saved) {
        const navLang = (navigator.language || "").toLowerCase();
        let detected: Language = "en";
        let label = "English";
        if (navLang.startsWith("es")) { detected = "es"; label = "Español"; }
        else if (navLang.startsWith("fr")) { detected = "fr"; label = "Français"; }
        else if (navLang.startsWith("pt")) { detected = "pt"; label = "Português"; }
        else if (navLang.startsWith("zh")) { detected = "zh"; label = "中文"; }

        if (detected !== "en") {
          setAutoNotice({
            text: `🌐 Smart Detection: Automatically switched to ${label} matching your browser settings.`,
            langCode: detected,
          });
          setTimeout(() => setAutoNotice(null), 6000);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    setAutoNotice(null);
    try {
      localStorage.setItem("app_lang", newLang);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

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
      {autoNotice && (
        <aside aria-label="Smart language detection notification" className="bg-blue-900 text-white px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between shadow-md relative z-50 print:hidden">
          <div className="max-w-7xl mx-auto flex items-center gap-2 px-2">
            <Globe className="w-4 h-4 text-blue-300 shrink-0" />
            <span>{autoNotice.text}</span>
          </div>
          <button
            onClick={() => setAutoNotice(null)}
            className="p-1 hover:bg-blue-800 rounded text-blue-200 hover:text-white transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { lang, setLang } = useTranslation();

  const options: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "pt", label: "Português", flag: "🇵🇹" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
  ];

  return (
    <div className={`relative inline-flex items-center gap-1 bg-slate-100 rounded-lg p-1 ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLang(opt.code)}
          className={`px-2.5 py-1 text-xs md:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1 ${
            lang === opt.code
              ? "bg-white text-slate-900 shadow-2xs font-semibold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <span>{opt.flag}</span>
          <span className="hidden sm:inline">{opt.label}</span>
          <span className="sm:hidden">{opt.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};
