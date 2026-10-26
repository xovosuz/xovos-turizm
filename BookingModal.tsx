import React, { useState } from 'react';
import {
  X,
  Calendar,
  Users,
  CheckCircle2,
  Building2,
  DollarSign,
  Phone,
  User,
  Mail,
  ShieldCheck,
  FileText,
  MapPin,
} from 'lucide-react';
import { Hotel, HotelRoom, Booking, LanguageCode } from '../types';
import {
  calculateNights,
  calculateTotalPrice,
  formatCurrency,
  generateBookingId,
  validateBookingForm,
} from '../utils/booking';
import { TRANSLATIONS } from '../data/translations';

interface BookingModalProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  currency: 'UZS' | 'USD';
  currentLang: LanguageCode;
  onConfirmBooking: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  hotel,
  isOpen,
  onClose,
  currency,
  currentLang,
  onConfirmBooking,
}) => {
  if (!isOpen || !hotel) return null;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;

  // Initial dates: tomorrow and +2 days
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkoutDate = new Date(today);
  checkoutDate.setDate(checkoutDate.getDate() + 3);

  const defaultCheckIn = tomorrow.toISOString().split('T')[0];
  const defaultCheckOut = checkoutDate.toISOString().split('T')[0];

  const [selectedRoom, setSelectedRoom] = useState<HotelRoom>(
    hotel.rooms && hotel.rooms.length > 0
      ? hotel.rooms[0]
      : {
          id: 'default',
          name: 'Standart Qulay Xona',
          capacity: 2,
          pricePerNightUZS: hotel.startingPriceUZS,
          pricePerNightUSD: hotel.startingPriceUSD,
          bedType: '1 katta karavot',
          amenities: ['Wi-Fi', 'Konditsioner', 'Nonushta'],
        }
  );

  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('+998 ');
  const [guestEmail, setGuestEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [needTransfer, setNeedTransfer] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const nights = calculateNights(checkIn, checkOut);
  const { totalUZS, totalUSD } = calculateTotalPrice(
    selectedRoom.pricePerNightUZS,
    selectedRoom.pricePerNightUSD,
    nights
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm({
      guestName,
      guestPhone,
      checkIn,
      checkOut,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const newBooking: Booking = {
      id: generateBookingId(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
      guestEmail: guestEmail.trim(),
      checkIn,
      checkOut,
      nights,
      guests,
      totalPriceUZS: totalUZS,
      totalPriceUSD: totalUSD,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      notes: notes.trim(),
      specialRequests: needTransfer
        ? ["Xovos temir yo'l vokzalidan kutib olish transferi kiritildi"]
        : [],
    };

    onConfirmBooking(newBooking);
    setConfirmedBooking(newBooking);
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in"
    >
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 id="booking-modal-title" className="text-base sm:text-lg font-bold text-stone-100">
                {confirmedBooking ? t.bookingSuccess : t.bookRoom}
              </h2>
              <p className="text-xs text-stone-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-400" />
                {hotel.name} • {hotel.zoneName}
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {confirmedBooking ? (
            /* Confirmation Voucher Screen */
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t.bookingSuccess}</h3>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  {t.savedToProfile}
                </p>
              </div>

              {/* Voucher Card */}
              <div className="p-4 rounded-xl bg-stone-950 border border-amber-500/40 text-left space-y-3 font-sans">
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-xs text-stone-400">{t.voucherCode}:</span>
                  <span className="text-base font-mono font-bold text-amber-400 tracking-wider">
                    {confirmedBooking.id}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-400 block">Mehmonxona:</span>
                    <span className="text-stone-200 font-semibold">{confirmedBooking.hotelName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Xona:</span>
                    <span className="text-stone-200 font-semibold">{confirmedBooking.roomName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">{t.checkIn}:</span>
                    <span className="text-stone-200 font-medium">{confirmedBooking.checkIn}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">{t.checkOut}:</span>
                    <span className="text-stone-200 font-medium">{confirmedBooking.checkOut} ({confirmedBooking.nights} kecha)</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">{t.fullName}:</span>
                    <span className="text-stone-200 font-medium">{confirmedBooking.guestName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">{t.phoneNumber}:</span>
                    <span className="text-stone-200 font-medium">{confirmedBooking.guestPhone}</span>
                  </div>
                </div>
                <div className="border-t border-stone-800 pt-2 flex items-center justify-between text-sm">
                  <span className="text-stone-400">Jami to'lov:</span>
                  <span className="text-base font-bold text-emerald-400">
                    {currency === 'USD'
                      ? formatCurrency(confirmedBooking.totalPriceUSD, 'USD')
                      : formatCurrency(confirmedBooking.totalPriceUZS, 'UZS')}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-800/60 text-xs text-stone-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>To'lov mehmonxonaga yetib kelganda amalga oshiriladi (Naqd, Humo, Uzcard, Visa/Mastercard).</span>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition"
              >
                {t.close}
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Room Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  {t.roomType}
                </label>
                <div className="space-y-2">
                  {hotel.rooms.map((room) => {
                    const isSelected = selectedRoom.id === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500/60 text-white'
                            : 'bg-stone-800/60 border-stone-700/60 hover:bg-stone-800 text-stone-300'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-semibold">{room.name}</div>
                          <div className="text-xs text-stone-400">
                            {room.bedType} • {room.capacity} kishi sig'imi
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-amber-400">
                            {currency === 'USD'
                              ? formatCurrency(room.pricePerNightUSD, 'USD')
                              : formatCurrency(room.pricePerNightUZS, 'UZS')}
                          </div>
                          <div className="text-[11px] text-stone-400">{t.perNight}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    {t.checkIn}
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (errors.checkIn) setErrors({ ...errors, checkIn: '' });
                    }}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                  {errors.checkIn && (
                    <span className="text-[11px] text-rose-400">{errors.checkIn}</span>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    {t.checkOut}
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                      if (errors.checkOut) setErrors({ ...errors, checkOut: '' });
                    }}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                  {errors.checkOut && (
                    <span className="text-[11px] text-rose-400">{errors.checkOut}</span>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    {t.guests}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value={1}>1 kishi</option>
                    <option value={2}>2 kishi</option>
                    <option value={3}>3 kishi</option>
                    <option value={4}>4 kishi</option>
                    <option value={5}>5+ kishi</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-3 pt-2 border-t border-stone-800">
                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    {t.fullName} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Masalan: Sardor Rahimov / John Smith"
                      value={guestName}
                      onChange={(e) => {
                        setGuestName(e.target.value);
                        if (errors.guestName) setErrors({ ...errors, guestName: '' });
                      }}
                      className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  {errors.guestName && (
                    <span className="text-[11px] text-rose-400">{errors.guestName}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      {t.phoneNumber} *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+998 90 123 45 67"
                        value={guestPhone}
                        onChange={(e) => {
                          setGuestPhone(e.target.value);
                          if (errors.guestPhone) setErrors({ ...errors, guestPhone: '' });
                        }}
                        className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    {errors.guestPhone && (
                      <span className="text-[11px] text-rose-400">{errors.guestPhone}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 font-medium mb-1">
                      {t.emailAddress}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="tourist@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Free Transfer Option */}
                <label className="flex items-center gap-2 p-3 rounded-xl bg-stone-800/40 border border-stone-800 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={needTransfer}
                    onChange={(e) => setNeedTransfer(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span className="text-xs text-stone-300">
                    Xovos temir yo'l vokzalidan kutib olish bepul transferi kerak
                  </span>
                </label>

                {/* Special Notes */}
                <div>
                  <label className="block text-xs text-stone-300 font-medium mb-1">
                    {t.specialNotes}
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Masalan, kechki kelish yoki bolalar karavoti..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl p-2.5 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Price Summary & Submit */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-400">
                    Jami narx ({nights} kecha):
                  </div>
                  <div className="text-lg font-bold text-amber-400">
                    {currency === 'USD'
                      ? formatCurrency(totalUSD, 'USD')
                      : formatCurrency(totalUZS, 'UZS')}
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition active:scale-95 shadow-lg shadow-amber-950/40"
                >
                  {t.confirmBooking}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

