import React, { useState, useEffect } from 'react';
import { ActiveTab, LanguageCode, Place, Hotel, Booking, ZoneId } from './types';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { PlacesView } from './components/PlacesView';
import { MapView } from './components/MapView';
import { HotelsView } from './components/HotelsView';
import { ProfileView } from './components/ProfileView';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { BookingModal } from './components/BookingModal';
import { LanguageModal } from './components/LanguageModal';
import { PLACES } from './data/places';
import { HOTELS } from './data/hotels';

const STORAGE_KEYS = {
  LANG: 'xovos_turizm_lang',
  CURRENCY: 'xovos_turizm_currency',
  SAVED_PLACES: 'xovos_turizm_saved_places',
  BOOKINGS: 'xovos_turizm_bookings',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('uz');
  const [currency, setCurrency] = useState<'UZS' | 'USD'>('UZS');
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>(['xovos-tepalik', 'xovosobod-jome-masjid']);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Modals state
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedPlaceForMap, setSelectedPlaceForMap] = useState<Place | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEYS.LANG) as LanguageCode | null;
      if (savedLang) setCurrentLang(savedLang);

      const savedCurr = localStorage.getItem(STORAGE_KEYS.CURRENCY) as 'UZS' | 'USD' | null;
      if (savedCurr) setCurrency(savedCurr);

      const savedPlaces = localStorage.getItem(STORAGE_KEYS.SAVED_PLACES);
      if (savedPlaces) setSavedPlaceIds(JSON.parse(savedPlaces));

      const savedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      } else {
        // Sample default confirmed booking for quick inspection
        const sampleBooking: Booking = {
          id: 'XVS-DEMO-001',
          hotelId: 'xovos-grand-hotel',
          hotelName: 'Xovos Grand Hotel & Suites',
          roomId: 'xgh-std',
          roomName: 'Standart Qulay Xona',
          guestName: 'Sayyoh Mexmon',
          guestPhone: '+998 90 123 45 67',
          guestEmail: 'tourist@xovos-turizm.uz',
          checkIn: '2026-10-25',
          checkOut: '2026-10-27',
          nights: 2,
          guests: 2,
          totalPriceUZS: 640000,
          totalPriceUSD: 50,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          specialRequests: ["Xovos vokzalidan bepul kutib olish xizmati"],
        };
        setBookings([sampleBooking]);
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleSelectLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
    } catch {}
  };

  const handleToggleCurrency = () => {
    const nextCurr = currency === 'UZS' ? 'USD' : 'UZS';
    setCurrency(nextCurr);
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, nextCurr);
    } catch {}
  };

  const handleToggleSavePlace = (placeId: string) => {
    setSavedPlaceIds((prev) => {
      const next = prev.includes(placeId)
        ? prev.filter((id) => id !== placeId)
        : [...prev, placeId];
      try {
        localStorage.setItem(STORAGE_KEYS.SAVED_PLACES, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => {
      const next = [newBooking, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => {
      const next = prev.filter((b) => b.id !== bookingId);
      try {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleViewPlaceOnMap = (place: Place) => {
    setSelectedPlaceForMap(place);
    setActiveTab('map');
  };

  const handleViewHotelOnMap = (coords: [number, number], name: string) => {
    const fakePlace: Place = {
      id: 'hotel-view',
      name: name,
      nameUzCyr: name,
      nameEn: name,
      nameRu: name,
      category: 'cultural',
      zone: 'xovos_tuman',
      zoneName: 'Xovos / Yangiyer',
      address: '',
      coordinates: coords,
      rating: 5,
      reviewsCount: 1,
      featured: false,
      imageUrl: '',
      gallery: [],
      description: {
        uz: '',
        uz_cyr: '',
        en: '',
        ru: '',
        tr: '',
        ar: '',
        zh: '',
        de: '',
        fr: '',
        es: '',
        fa: '',
        ja: '',
        ko: '',
      },
      highlights: [],
      openHours: '24/7',
      entryFee: 'Bepul',
    };
    setSelectedPlaceForMap(fakePlace);
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        onOpenLangModal={() => setIsLangModalOpen(true)}
        onNavigateHome={() => setActiveTab('home')}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomeView
            currentLang={currentLang}
            onNavigatePlaces={() => setActiveTab('places')}
            onNavigateMap={(zoneId) => {
              setActiveTab('map');
            }}
            onNavigateHotels={() => setActiveTab('hotels')}
            onSelectPlace={(place) => setSelectedPlace(place)}
            onBookHotel={(hotel) => setSelectedHotel(hotel)}
          />
        )}

        {activeTab === 'places' && (
          <PlacesView
            currentLang={currentLang}
            savedPlaceIds={savedPlaceIds}
            onToggleSave={handleToggleSavePlace}
            onOpenDetail={(place) => setSelectedPlace(place)}
            onViewOnMap={handleViewPlaceOnMap}
          />
        )}

        {activeTab === 'map' && (
          <MapView
            currentLang={currentLang}
            selectedPlaceForCenter={selectedPlaceForMap}
            onSelectPlace={(place) => setSelectedPlace(place)}
            onBookHotel={(hotel) => setSelectedHotel(hotel)}
          />
        )}

        {activeTab === 'hotels' && (
          <HotelsView
            currentLang={currentLang}
            currency={currency}
            onBookHotel={(hotel) => setSelectedHotel(hotel)}
            onViewOnMap={handleViewHotelOnMap}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            currentLang={currentLang}
            currency={currency}
            onToggleCurrency={handleToggleCurrency}
            onOpenLangModal={() => setIsLangModalOpen(true)}
            bookings={bookings}
            savedPlaceIds={savedPlaceIds}
            onCancelBooking={handleCancelBooking}
            onSelectPlace={(place) => setSelectedPlace(place)}
            onNavigatePlaces={() => setActiveTab('places')}
            onNavigateHotels={() => setActiveTab('hotels')}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentLang={currentLang}
        bookingsCount={bookings.length}
        savedCount={savedPlaceIds.length}
      />

      {/* Modals */}
      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
      />

      <PlaceDetailModal
        place={selectedPlace}
        isOpen={Boolean(selectedPlace)}
        onClose={() => setSelectedPlace(null)}
        currentLang={currentLang}
        isSaved={selectedPlace ? savedPlaceIds.includes(selectedPlace.id) : false}
        onToggleSave={handleToggleSavePlace}
        onViewOnMap={handleViewPlaceOnMap}
      />

      <BookingModal
        hotel={selectedHotel}
        isOpen={Boolean(selectedHotel)}
        onClose={() => setSelectedHotel(null)}
        currency={currency}
        currentLang={currentLang}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
}
