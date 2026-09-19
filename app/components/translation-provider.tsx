"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { textTranslations, translations } from "../translations";

type Language = keyof typeof translations;

const TranslationContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (keyOrText: string) => string;
} | null>(null);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const savedLanguage = window.localStorage.getItem(
      "health-hub-language",
    ) as Language | null;
    return savedLanguage && savedLanguage in translations
      ? savedLanguage
      : "en";
  });

  useEffect(() => {
    window.localStorage.setItem("health-hub-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (keyOrText: string) => {
        const dictionary = textTranslations as Record<
          string,
          Record<string, string>
        >;
const namedTranslation = (translations[language] as Record<string, string>)[keyOrText];
        if (namedTranslation) return namedTranslation;

        if (language === "ar") {
          const arabicText = dictionary.ar[keyOrText];
          if (arabicText) return arabicText;

          const arabicSource = Object.entries(dictionary.en).find(
            ([, englishText]) => englishText === keyOrText,
          )?.[0];
          return arabicSource || keyOrText;
        }

        return dictionary.en[keyOrText] || keyOrText;
      },
    }),
    [language],
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslate() {
  const context = useContext(TranslationContext);
  if (!context)
    throw new Error("useTranslate must be used inside TranslationProvider");
  return context;
}
