import React from 'react';
import {
  Compass,
  MapPin,
  Sparkles,
  Building2,
  Star,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Calendar,
  Volume2,
} from 'lucide-react';
import { Place, Hotel, LanguageCode, ZoneId } from '../types';
import { PLACES } from '../data/places';
import { HOTELS } from '../data/hotels';
import { GEO_ZONES } from '../data/geoZones';
import { TRANSLATIONS } from '../data/translations';

interface HomeViewProps {
  currentLang: LanguageCode;
  onNavigatePlaces: () => void;
  onNavigateMap: (zoneId?: ZoneId) => void;
  onNavigateHotels: () => void;
  onSelectPlace: (place: Place) => void;
  onBookHotel: (hotel: Hotel) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLang,
  onNavigatePlaces,
  onNavigateMap,
  onNavigateHotels,
  onSelectPlace,
  onBookHotel,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;

  const xovosTepalik = PLACES.find((p) => p.id === 'xovos-tepalik') || PLACES[0];
  const mosques = PLACES.filter((p) => p.category === 'mosque');
  const featuredPlaces = PLACES.filter((p) => p.featured);

  return (
    <div className="space-y-10 pb-24">
      {/* Hero Banner */}
      <section className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 px-4 py-12">
        {/* Ambient Silk Road background artwork */}
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80"
            alt="Xovos Manzarasi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/80" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-5 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.tagline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onNavigateMap()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition active:scale-95 shadow-xl shadow-amber-950/50"
            >
              <Compass className="w-4 h-4" />
              <span>{t.navMap}</span>
            </button>

            <button
              onClick={onNavigatePlaces}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-100 font-semibold text-sm border border-stone-700 backdrop-blur-md transition active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.navPlaces}</span>
            </button>

            <button
              onClick={onNavigateHotels}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition active:scale-95"
            >
              <Building2 className="w-4 h-4" />
              <span>{t.navHotels}</span>
            </button>
          </div>

          {/* Scope Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-400">
            <span className="font-medium text-stone-300">Qamrov hududlari:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-800/80 text-amber-300 border border-amber-500/20">
              Xovos tumani
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-800/80 text-blue-300 border border-blue-500/20">
              Yangiyer shahri
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-800/80 text-emerald-300 border border-emerald-500/20">
              Xovosobod MFY
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-800/80 text-red-300 border border-red-500/20">
              Korvonsaroy MFY
            </span>
          </div>
        </div>
      </section>

      {/* Spotlight: QADIMIY XOVOS TEPALIGI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/50 border border-amber-500/30 overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                <span>⛰️ {t.featuredSpot}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {t.xovosTepalikTitle}
              </h2>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {xovosTepalik.description[currentLang] || xovosTepalik.description.uz}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60">
                  <span className="text-stone-400 block font-medium">Tarixiy ahamiyati:</span>
                  <span className="text-stone-100 font-bold">Buyuk Ipak yo'li mudofaa qo'rg'oni</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60">
                  <span className="text-stone-400 block font-medium">Kirish & Tashrif:</span>
                  <span className="text-stone-100 font-bold">Har kuni ochiq • Bepul</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => onSelectPlace(xovosTepalik)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition active:scale-95 shadow-lg shadow-amber-950/40"
                >
                  {t.readMore}
                </button>
                <button
                  onClick={() => onNavigateMap('xovos_tuman')}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-semibold transition"
                >
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>{t.viewOnMap}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-xl border border-stone-800">
              <img
                src={xovosTepalik.imageUrl}
                alt="Qadimiy Xovos Tepaligi"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                <span className="font-mono text-amber-400 block text-[11px]">
                  40.2185° N, 69.0552° E
                </span>
                <span className="font-semibold">Eski Xovos hududi arxeologik qazilma maydoni</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Territorial Explorer Cards (Xovos tumani, Yangiyer shahri, Xovosobod, Korvonsaroy) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-100 tracking-tight">
            Hududiy Bo'linma va Sayyohlik Maskalari
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Har bir hudud o'ziga xos boy tarix, masjidlar va mehmondo'st maskanlarga ega
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(GEO_ZONES).map((zone) => (
            <div
              key={zone.id}
              onClick={() => onNavigateMap(zone.id)}
              className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-850 transition cursor-pointer flex flex-col justify-between group shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: zone.color }}
                  />
                  <span className="text-[11px] font-semibold text-stone-400">
                    {zone.highlightsCount} ta ob'ekt
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {zone.name}
                </h3>
                <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                  {zone.description}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>Xaritada ochish</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mosques Section Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-100 tracking-tight">
              Muqaddas Qadamjolar va Masjidlar
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Xovos va Yangiyerning ko'rkam jome masjidlari hamda ziyoratgohlari
            </p>
          </div>
          <button
            onClick={onNavigatePlaces}
            className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>Barchasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mosques.map((mosque) => (
            <div
              key={mosque.id}
              onClick={() => onSelectPlace(mosque)}
              className="group bg-stone-900 rounded-2xl border border-stone-800 hover:border-emerald-500/40 overflow-hidden cursor-pointer shadow-lg transition"
            >
              <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                <img
                  src={mosque.imageUrl}
                  alt={mosque.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/90 text-stone-950">
                  {mosque.zoneName}
                </span>
                <span className="absolute bottom-3 right-3 text-xs text-stone-300 bg-stone-900/80 px-2 py-0.5 rounded-md">
                  {mosque.openHours}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {mosque.name}
                </h3>
                <p className="text-xs text-stone-400 line-clamp-2">
                  {mosque.description[currentLang] || mosque.description.uz}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-amber-400 font-medium">
                  <span>Batafsil ko'rish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotel Reservation Invitation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-blue-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              🏨 Qulay va Tezkor Band Qilish
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Xovos va Yangiyerda Mehmonxona Band Qilmoqchimisiz?
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
              Xovos Grand Hotel, Yangiyer Silk Road, Xovosobod Eko mehmon uylari — o'zingizga ma'qul xonani tanlang va bepul transfer xizmatidan foydalaning.
            </p>
          </div>
          <button
            onClick={onNavigateHotels}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm whitespace-nowrap shadow-lg shadow-blue-950/50 transition active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Xona Band Qilish</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeView;

