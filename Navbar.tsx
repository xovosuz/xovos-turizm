import React from 'react';
import { Globe, DollarSign, Sun, Compass, Sparkles } from 'lucide-react';
import { LanguageCode } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  currency: 'UZS' | 'USD';
  onToggleCurrency: () => void;
  onOpenLangModal: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  currency,
  onToggleCurrency,
  onOpenLangModal,
  onNavigateHome,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-amber-900/30 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 group text-left transition"
          aria-label="Xovos Turizm Bosh sahifa"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-950/40 text-stone-950 group-hover:scale-105 transition-transform duration-300">
            <Compass className="w-6 h-6 text-stone-950 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-amber-400 group-hover:text-amber-300 transition-colors">
                {t.appName}
              </span>
              <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-semibold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                Sirdaryo
              </span>
            </div>
            <p className="text-xs text-stone-400 hidden md:block line-clamp-1">
              Xovos • Yangiyer • Xovosobod • Korvonsaroy
            </p>
          </div>
        </button>

        {/* Right action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Weather Widget */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-800/80 border border-stone-700/60 text-xs text-amber-300">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Xovos: +26°C Quyoshli</span>
          </div>

          {/* Currency Toggle */}
          <button
            onClick={onToggleCurrency}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800/90 hover:bg-stone-700/90 border border-stone-700 text-xs font-medium text-stone-200 transition active:scale-95"
            title="Valyutani o'zgartirish (UZS / USD)"
            aria-label="Valyutani o'zgartirish"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currency}</span>
          </button>

          {/* Language Selector Trigger */}
          <button
            onClick={onOpenLangModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600/30 to-amber-700/30 hover:from-amber-600/40 hover:to-amber-700/40 border border-amber-500/40 text-xs font-semibold text-amber-200 transition active:scale-95 shadow-sm"
            aria-label="Tilni tanlash (10+ til)"
          >
            <span className="text-sm">{currentLangObj.flag}</span>
            <span className="hidden sm:inline">{currentLangObj.nativeName}</span>
            <Globe className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

