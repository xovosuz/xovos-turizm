import React, { useState } from 'react';
import {
  Building2,
  Star,
  MapPin,
  Check,
  Calendar,
  Compass,
  Phone,
  Mail,
  ShieldCheck,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Hotel, ZoneId, LanguageCode } from '../types';
import { HOTELS } from '../data/hotels';
import { formatCurrency } from '../utils/booking';
import { TRANSLATIONS } from '../data/translations';

interface HotelsViewProps {
  currentLang: LanguageCode;
  currency: 'UZS' | 'USD';
  onBookHotel: (hotel: Hotel) => void;
  onViewOnMap: (coordinates: [number, number], name: string) => void;
}

export const HotelsView: React.FC<HotelsViewProps> = ({
  currentLang,
  currency,
  onBookHotel,
  onViewOnMap,
}) => {
  const [selectedZone, setSelectedZone] = useState<ZoneId | 'all'>('all');
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;

  const zones: { id: ZoneId | 'all'; label: string }[] = [
    { id: 'all', label: t.allZones },
    { id: 'xovos_tuman', label: t.zoneXovos },
    { id: 'yangiyer_shahar', label: t.zoneYangiyer },
    { id: 'xovosobod_mfy', label: t.zoneXovosobod },
    { id: 'korvonsaroy_mfy', label: t.zoneKorvonsaroy },
  ];

  const filteredHotels = HOTELS.filter(
    (h) => selectedZone === 'all' || h.zone === selectedZone
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Rasmiy va Sertifikatlangan Joylashtirish</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight">
            {t.hotelsTitle}
          </h1>
          <p className="text-stone-400 text-sm mt-1 max-w-2xl">
            {t.hotelsSubtitle}
          </p>
        </div>

        {/* Zone Selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <label htmlFor="hotels-zone-select" className="text-xs text-stone-400 font-medium">
            {t.zoneFilter}
          </label>
          <select
            id="hotels-zone-select"
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

      {/* Info Banner */}
      <div className="p-4 rounded-2xl bg-stone-900/80 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs text-stone-300">
            <span className="font-bold text-white block">Tezkor va xavfsiz bron:</span>
            To'lov mehmonxonaga kelganda amalga oshiriladi. Bekor qilish bepul. Xovos temir yo'l vokzalidan kutib olish transferi mavjud!
          </div>
        </div>
      </div>

      {/* Hotel Cards List */}
      <div className="space-y-6">
        {filteredHotels.map((hotel) => {
          const localizedDesc =
            hotel.description[currentLang as 'uz' | 'en' | 'ru'] ||
            hotel.description.uz ||
            hotel.description.en;

          return (
            <div
              key={hotel.id}
              className="bg-stone-900 rounded-2xl border border-stone-800 hover:border-amber-500/40 shadow-xl overflow-hidden transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Hotel Photo */}
              <div className="lg:col-span-5 relative h-60 lg:h-auto min-h-[240px] bg-stone-950 overflow-hidden">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {hotel.zoneName}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white bg-stone-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <div className="flex items-center text-amber-400">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-1 font-bold">{hotel.rating}</span>
                  <span className="text-stone-400">({hotel.reviewsCount} {t.reviews})</span>
                </div>
              </div>

              {/* Hotel Details & Rooms */}
              <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-stone-100">
                      {hotel.name}
                    </h2>
                    <div className="text-left sm:text-right">
                      <div className="text-lg sm:text-xl font-black text-amber-400">
                        {currency === 'USD'
                          ? formatCurrency(hotel.startingPriceUSD, 'USD')
                          : formatCurrency(hotel.startingPriceUZS, 'UZS')}
                        <span className="text-xs font-normal text-stone-400 ml-1">
                          {t.perNight} dan
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{hotel.address}</span>
                  </p>

                  <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
                    {localizedDesc}
                  </p>

                  {/* Amenities List */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                    {hotel.amenities.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 text-xs text-stone-300 bg-stone-800/60 px-2 py-1 rounded-lg"
                      >
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Section */}
                <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <a
                      href={`tel:${hotel.phone}`}
                      className="flex items-center gap-1 hover:text-stone-200 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{hotel.phone}</span>
                    </a>
                    <button
                      onClick={() => onViewOnMap(hotel.coordinates, hotel.name)}
                      className="flex items-center gap-1 hover:text-amber-400 transition"
                      aria-label="Xaritada ko'rish"
                    >
                      <Compass className="w-3.5 h-3.5 text-blue-400" />
                      <span>{t.viewOnMap}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onBookHotel(hotel)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition active:scale-95 shadow-md shadow-amber-950/40"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.bookRoom}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotelsView;

