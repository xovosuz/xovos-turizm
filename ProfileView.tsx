import React, { useState } from 'react';
import {
  User,
  Calendar,
  Bookmark,
  DollarSign,
  Globe,
  Phone,
  ShieldAlert,
  Train,
  CheckCircle2,
  Trash2,
  ArrowRight,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Booking, Place, LanguageCode } from '../types';
import { PLACES } from '../data/places';
import { formatCurrency } from '../utils/booking';
import { TRANSLATIONS } from '../data/translations';

interface ProfileViewProps {
  currentLang: LanguageCode;
  currency: 'UZS' | 'USD';
  onToggleCurrency: () => void;
  onOpenLangModal: () => void;
  bookings: Booking[];
  savedPlaceIds: string[];
  onCancelBooking: (id: string) => void;
  onSelectPlace: (place: Place) => void;
  onNavigatePlaces: () => void;
  onNavigateHotels: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentLang,
  currency,
  onToggleCurrency,
  onOpenLangModal,
  bookings,
  savedPlaceIds,
  onCancelBooking,
  onSelectPlace,
  onNavigatePlaces,
  onNavigateHotels,
}) => {
  const [activeSection, setActiveSection] = useState<'bookings' | 'saved' | 'guide'>('bookings');
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;

  const savedPlaces = PLACES.filter((p) => savedPlaceIds.includes(p.id));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      {/* Profile Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border border-stone-800 shadow-xl flex flex-col sm:flex-row items-center gap-5">
        <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 flex items-center justify-center font-bold text-2xl shadow-lg shadow-amber-950/40 shrink-0">
          <User className="w-9 h-9" />
        </div>
        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-xl font-bold text-stone-100">Sayyoh / Xalqaro Mehmon</h1>
            <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Faol Profil
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Xovos Turizm portali orqali qulay sayohat qiling va bronlaringizni boshqaring.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4 text-xs">
            <button
              onClick={onOpenLangModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.language} almashtirish</span>
            </button>
            <button
              onClick={onToggleCurrency}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Valyuta: {currency}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-800 gap-4">
        <button
          onClick={() => setActiveSection('bookings')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition relative ${
            activeSection === 'bookings'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          {t.myBookings} ({bookings.length})
        </button>
        <button
          onClick={() => setActiveSection('saved')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition relative ${
            activeSection === 'saved'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          {t.savedPlaces} ({savedPlaces.length})
        </button>
        <button
          onClick={() => setActiveSection('guide')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition relative ${
            activeSection === 'guide'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          {t.travelTipsTitle}
        </button>
      </div>

      {/* Tab: Bookings */}
      {activeSection === 'bookings' && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="py-12 text-center bg-stone-900/40 rounded-2xl border border-stone-800 p-6">
              <Calendar className="w-12 h-12 text-stone-600 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-stone-200">{t.noBookings}</h3>
              <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                Xovos va Yangiyerdagi qulay mehmonxonalarni ko'ring va bir zumda xona band qiling.
              </p>
              <button
                onClick={onNavigateHotels}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition"
              >
                {t.navHotels}
              </button>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                      Vaucher kodi: {booking.id}
                    </span>
                    <h3 className="text-base font-bold text-white">{booking.hotelName}</h3>
                    <p className="text-xs text-stone-400">{booking.roomName}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Tasdiqlangan
                    </span>
                    <div className="text-xs text-stone-400 mt-1">
                      {booking.nights} kecha • {booking.guests} kishi
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block">{t.checkIn}:</span>
                    <span className="text-stone-200 font-semibold">{booking.checkIn}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">{t.checkOut}:</span>
                    <span className="text-stone-200 font-semibold">{booking.checkOut}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">{t.fullName}:</span>
                    <span className="text-stone-200 font-medium">{booking.guestName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Jami summa:</span>
                    <span className="text-emerald-400 font-bold">
                      {currency === 'USD'
                        ? formatCurrency(booking.totalPriceUSD, 'USD')
                        : formatCurrency(booking.totalPriceUZS, 'UZS')}
                    </span>
                  </div>
                </div>

                {booking.specialRequests && booking.specialRequests.length > 0 && (
                  <div className="text-[11px] text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
                    🚕 {booking.specialRequests.join(', ')}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    Bron vaqti: {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Bronni bekor qilish</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Saved Places */}
      {activeSection === 'saved' && (
        <div className="space-y-4">
          {savedPlaces.length === 0 ? (
            <div className="py-12 text-center bg-stone-900/40 rounded-2xl border border-stone-800 p-6">
              <Bookmark className="w-12 h-12 text-stone-600 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-stone-200">{t.noSavedPlaces}</h3>
              <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                Chiroyli joylar bo'limidan o'zingizga yoqqan maskanlarni belgilab qo'ying.
              </p>
              <button
                onClick={onNavigatePlaces}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition"
              >
                {t.explorePlaces}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedPlaces.map((place) => (
                <div
                  key={place.id}
                  onClick={() => onSelectPlace(place)}
                  className="p-4 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition cursor-pointer flex gap-3 group"
                >
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-amber-400 font-semibold block">
                      {place.zoneName}
                    </span>
                    <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 truncate">
                      {place.name}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                      ⭐ {place.rating} • {place.openHours}
                    </p>
                    <span className="text-[11px] text-amber-400/90 font-medium inline-flex items-center gap-1 mt-2">
                      Batafsil <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Guide & Emergency */}
      {activeSection === 'guide' && (
        <div className="space-y-4 text-xs sm:text-sm">
          {/* How to get there */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Train className="w-5 h-5" />
              <span>Xovosga qanday yetib borish mumkin?</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Xovos tumani O'zbekistonning eng qulay transport markazlaridan biridir.
              Toshkentdan 'Afrosiyob' yoki tezyurar yo'lovchi poyezdlarida bor-yo'g'i 1.5 soatda Xovos
              yoki Yangiyer temir yo'l vokzaliga yetib kelish mumkin.
              Shuningdek, M-34 xalqaro trassasi orqali avtomobilda to'g'ridan-to'g'ri qulay yo'l mavjud.
            </p>
          </div>

          {/* Emergency contacts */}
          <div className="p-5 rounded-2xl bg-stone-900 border border-amber-500/30 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <ShieldAlert className="w-5 h-5" />
              <span>{t.emergencyContacts}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-300">
              <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60">
                <span className="font-semibold text-white block">Turizm politsiyasi:</span>
                <span className="text-amber-400 font-mono">1173 (24/7 Bepul)</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60">
                <span className="font-semibold text-white block">Tez tibbiy yordam:</span>
                <span className="text-emerald-400 font-mono">103</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60">
                <span className="font-semibold text-white block">Xovos temir yo'l vokzali:</span>
                <span className="text-stone-200 font-mono">+998 (67) 345-21-21</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60">
                <span className="font-semibold text-white block">Sirdaryo viloyat Turizm boshqarmasi:</span>
                <span className="text-stone-200 font-mono">+998 (67) 225-10-10</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;

