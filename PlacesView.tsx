import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Compass,
  Bookmark,
  Volume2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Place, PlaceCategory, ZoneId, LanguageCode } from '../types';
import { PLACES } from '../data/places';
import { filterPlaces } from '../utils/booking';
import { TRANSLATIONS } from '../data/translations';

interface PlacesViewProps {
  currentLang: LanguageCode;
  savedPlaceIds: string[];
  onToggleSave: (id: string) => void;
  onOpenDetail: (place: Place) => void;
  onViewOnMap: (place: Place) => void;
}

export const PlacesView: React.FC<PlacesViewProps> = ({
  currentLang,
  savedPlaceIds,
  onToggleSave,
  onOpenDetail,
  onViewOnMap,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory>('all');
  const [selectedZone, setSelectedZone] = useState<ZoneId | 'all'>('all');

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;

  const categories: { id: PlaceCategory; label: string; icon: string }[] = [
    { id: 'all', label: t.tabAll, icon: '✨' },
    { id: 'historical', label: t.tabHistorical, icon: '⛰️' },
    { id: 'mosque', label: t.tabMosque, icon: '🕌' },
    { id: 'nature', label: t.tabNature, icon: '🌳' },
    { id: 'cultural', label: t.tabCultural, icon: '🏛️' },
    { id: 'food', label: t.tabFood, icon: '🍈' },
  ];

  const zones: { id: ZoneId | 'all'; label: string }[] = [
    { id: 'all', label: t.allZones },
    { id: 'xovos_tuman', label: t.zoneXovos },
    { id: 'yangiyer_shahar', label: t.zoneYangiyer },
    { id: 'xovosobod_mfy', label: t.zoneXovosobod },
    { id: 'korvonsaroy_mfy', label: t.zoneKorvonsaroy },
  ];

  const filtered = filterPlaces(PLACES, searchTerm, selectedCategory, selectedZone);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sirdaryo Sayyohlik Xazinasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight">
            {t.navPlaces}
          </h1>
          <p className="text-stone-400 text-sm mt-1 max-w-2xl">
            Qadimiy Xovos tepaligi, mahobatli masjidlar, Ipak yo'li karvonsaroy maskanlari va xushmanzara tabiat go'shalari
          </p>
        </div>

        {/* Territory Filter Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <label htmlFor="places-zone-select" className="text-xs text-stone-400 font-medium">
            {t.zoneFilter}
          </label>
          <select
            id="places-zone-select"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value as ZoneId | 'all')}
            className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs font-semibold text-stone-200 focus:outline-none focus:border-amber-500 shadow-sm"
          >
            {zones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full bg-stone-900/90 border border-stone-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 shadow-inner"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200 bg-stone-800 px-2 py-0.5 rounded-md"
          >
            Tozalash
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition active:scale-95 ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-950/40'
                  : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Places */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-stone-900/40 rounded-2xl border border-stone-800/80 p-8">
          <div className="w-16 h-16 rounded-full bg-stone-800 text-stone-500 mx-auto flex items-center justify-center mb-3">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-stone-200">Hech qanday joy topilmadi</h3>
          <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
            Qidiruv so'zini o'zgartirib ko'ring yoki boshqa hudud filtrini tanlang.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedZone('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition"
          >
            Filtrni tozalash
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((place) => {
            const isSaved = savedPlaceIds.includes(place.id);
            const localizedDesc =
              place.description[currentLang] || place.description.uz || place.description.en;

            return (
              <div
                key={place.id}
                className="group bg-stone-900 rounded-2xl border border-stone-800 hover:border-amber-500/50 shadow-lg hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image & Badges */}
                <div className="relative h-52 w-full overflow-hidden bg-stone-950">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/20" />

                  {/* Zone Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 shadow">
                      {place.zoneName}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleSave(place.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                      isSaved
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-950/70 text-stone-300 hover:bg-stone-900 hover:text-white'
                    }`}
                    aria-label="Saqlash"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 bg-stone-950/70 backdrop-blur-md px-2 py-0.5 rounded-md font-semibold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {place.rating} ({place.reviewsCount})
                    </span>
                    <span className="bg-stone-950/70 backdrop-blur-md px-2 py-0.5 rounded-md text-stone-300">
                      {place.openHours}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {place.name}
                    </h3>

                    <p className="text-stone-400 text-xs sm:text-sm line-clamp-2 mt-2 leading-relaxed">
                      {localizedDesc}
                    </p>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {place.highlights.slice(0, 2).map((h, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700/60"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onViewOnMap(place)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 hover:text-amber-400 transition"
                      aria-label="Xaritada ko'rish"
                    >
                      <Compass className="w-4 h-4 text-amber-400" />
                      <span>{t.viewOnMap}</span>
                    </button>

                    <button
                      onClick={() => onOpenDetail(place)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 font-semibold text-xs transition-all active:scale-95"
                    >
                      <span>{t.readMore}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlacesView;

