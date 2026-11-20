"use client";
import { createContext, useContext, useEffect, useState } from "react";
export type Language = "vi" | "en";
const LanguageContext = createContext<{ lang: Language; setLang: (lang: Language) => void }>({ lang: "vi", setLang: () => {} });
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("vi");
  useEffect(() => { const saved = localStorage.getItem("dmw-language"); if (saved === "vi" || saved === "en") setLang(saved); }, []);
  useEffect(() => { document.documentElement.lang = lang; localStorage.setItem("dmw-language", lang); }, [lang]);
  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
