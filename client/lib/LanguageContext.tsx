import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Language,
  languages,
  defaultLanguage,
  getTranslation,
  Translations,
} from "./translations";

interface LanguageContextType {
  currentLanguage: Language;
  t: Translations;
  changeLanguage: (lang: Language) => void;
  languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract language from URL
  const getLanguageFromPath = (pathname: string): Language => {
    const langCode = pathname.split("/")[1] as Language;
    return (
      languages.find((lang) => lang.code === langCode)?.code || defaultLanguage
    );
  };

  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Try to get from localStorage first, then from URL
    const saved = localStorage.getItem("quickhire-language") as Language;
    const urlLang = getLanguageFromPath(location.pathname);

    if (saved && languages.find((lang) => lang.code === saved)) {
      return saved;
    }
    return urlLang;
  });

  const t = getTranslation(currentLanguage);

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem("quickhire-language", lang);

    // Update URL to reflect new language
    const currentPath = location.pathname;
    const currentLang = getLanguageFromPath(currentPath);

    // Replace current language in path or add language prefix
    let newPath;
    if (currentPath.startsWith(`/${currentLang}`)) {
      newPath = currentPath.replace(`/${currentLang}`, `/${lang}`);
    } else if (currentPath === "/") {
      newPath = `/${lang}`;
    } else {
      newPath = `/${lang}${currentPath}`;
    }

    // Only navigate if the new path is different
    if (newPath !== currentPath) {
      navigate(newPath + location.search, { replace: true });
    }
  };

  // Sync language when URL changes
  useEffect(() => {
    const urlLang = getLanguageFromPath(location.pathname);
    if (urlLang !== currentLanguage) {
      setCurrentLanguage(urlLang);
      localStorage.setItem("quickhire-language", urlLang);
    }
  }, [location.pathname, currentLanguage]);

  // Redirect to language-prefixed URL if needed
  useEffect(() => {
    const currentLang = getLanguageFromPath(location.pathname);

    // If we're on root path or path doesn't start with language, redirect
    if (
      location.pathname === "/" ||
      !location.pathname.startsWith(`/${currentLang}`)
    ) {
      const newPath =
        location.pathname === "/"
          ? `/${currentLanguage}`
          : `/${currentLanguage}${location.pathname}`;
      navigate(newPath + location.search, { replace: true });
    }
  }, [location.pathname, currentLanguage, navigate]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        t,
        changeLanguage,
        languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function useTranslation() {
  const { t } = useLanguage();
  return t;
}
