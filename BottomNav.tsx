import React from 'react';
import { Home, Sparkles, MapPin, Building2, User } from 'lucide-react';
import { ActiveTab, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  currentLang: LanguageCode;
  bookingsCount: number;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  currentLang,
  bookingsCount,
  savedCount,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;

  const navItems = [
    {
      id: 'home' as ActiveTab,
      label: t.navHome,
      icon: Home,
      badge: null,
    },
    {
      id: 'places' as ActiveTab,
      label: t.navPlaces,
      icon: Sparkles,
      badge: savedCount > 0 ? savedCount : null,
    },
    {
      id: 'map' as ActiveTab,
      label: t.navMap,
      icon: MapPin,
      badge: null,
    },
    {
      id: 'hotels' as ActiveTab,
      label: t.navHotels,
      icon: Building2,
      badge: bookingsCount > 0 ? bookingsCount : null,
    },
    {
      id: 'profile' as ActiveTab,
      label: t.navProfile,
      icon: User,
      badge: null,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-lg border-t border-amber-900/40 text-stone-300 shadow-2xl safe-area-bottom"
      aria-label="Asosiy pastki navigatsiya menyusi"
    >
      <div className="max-w-xl mx-auto px-2 sm:px-4 flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 transition-all duration-200 select-none group ${
                isActive
                  ? 'text-amber-400 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-xl transition-all ${
                    isActive ? 'bg-amber-500/20 scale-110' : 'group-hover:bg-stone-800'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'stroke-[2.5] text-amber-400' : 'stroke-[1.8]'
                    }`}
                  />
                </div>
                {item.badge !== null && (
                  <span className="absolute -top-1 -right-2 bg-emerald-500 text-stone-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full ring-2 ring-stone-900">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight text-center leading-tight line-clamp-1 max-w-[80px] sm:max-w-none">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-amber-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

