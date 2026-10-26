import { Booking, Place, Hotel } from '../types';

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();
  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

export function calculateTotalPrice(
  pricePerNightUZS: number,
  pricePerNightUSD: number,
  nights: number,
  extraServices: number = 0
): { totalUZS: number; totalUSD: number } {
  const safeNights = Math.max(1, nights);
  const totalUZS = pricePerNightUZS * safeNights + extraServices;
  const totalUSD = pricePerNightUSD * safeNights + Math.round(extraServices / 12800);
  return { totalUZS, totalUSD };
}

export function formatCurrency(amount: number, currency: 'UZS' | 'USD'): string {
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US')}`;
  }
  return `${amount.toLocaleString('uz-UZ')} so'm`;
}

export function generateBookingId(): string {
  const prefix = 'XVS';
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function validateBookingForm(data: {
  guestName: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.guestName.trim()) {
    errors.guestName = 'Ism va familiyangizni kiriting';
  } else if (data.guestName.trim().length < 3) {
    errors.guestName = 'Ism kamida 3 ta harfdan iborat bo\'lishi kerak';
  }

  if (!data.guestPhone.trim()) {
    errors.guestPhone = 'Telefon raqamni kiriting';
  } else if (data.guestPhone.replace(/\D/g, '').length < 7) {
    errors.guestPhone = 'Yaroqli telefon raqamini kiriting';
  }

  if (!data.checkIn) {
    errors.checkIn = 'Kelish sanasini tanlang';
  }
  if (!data.checkOut) {
    errors.checkOut = 'Ketish sanasini tanlang';
  }

  if (data.checkIn && data.checkOut) {
    const start = new Date(data.checkIn).getTime();
    const end = new Date(data.checkOut).getTime();
    if (end <= start) {
      errors.checkOut = 'Ketish sanasi kelish sanasidan keyin bo\'lishi shart';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterPlaces(
  places: Place[],
  searchTerm: string,
  category: string,
  zone: string
): Place[] {
  return places.filter((place) => {
    const matchesCategory = category === 'all' || place.category === category;
    const matchesZone = zone === 'all' || place.zone === zone;
    
    if (!searchTerm.trim()) {
      return matchesCategory && matchesZone;
    }

    const term = searchTerm.toLowerCase();
    const matchesSearch =
      place.name.toLowerCase().includes(term) ||
      place.nameEn.toLowerCase().includes(term) ||
      place.nameRu.toLowerCase().includes(term) ||
      place.zoneName.toLowerCase().includes(term) ||
      place.address.toLowerCase().includes(term) ||
      place.highlights.some((h) => h.toLowerCase().includes(term));

    return matchesCategory && matchesZone && matchesSearch;
  });
}
