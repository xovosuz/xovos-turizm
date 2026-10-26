import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNights,
  calculateTotalPrice,
  formatCurrency,
  generateBookingId,
  validateBookingForm,
  filterPlaces,
} from './booking';
import { Place } from '../types';

test('calculateNights calculates correct number of nights between two dates', () => {
  assert.equal(calculateNights('2026-10-25', '2026-10-28'), 3);
  assert.equal(calculateNights('2026-10-25', '2026-10-26'), 1);
  assert.equal(calculateNights('2026-10-25', '2026-10-25'), 1); // minimum 1 night
});

test('calculateTotalPrice computes proper UZS and USD totals with options', () => {
  const result = calculateTotalPrice(250000, 20, 2, 50000);
  assert.equal(result.totalUZS, 550000);
  assert.equal(result.totalUSD, 44); // 20*2 + round(50000/12800 = 3.9 -> 4)
});

test('formatCurrency outputs localized currency strings', () => {
  assert.match(formatCurrency(250000, 'UZS'), /250[,\s.]000/);
  assert.equal(formatCurrency(25, 'USD'), '$25');
});

test('generateBookingId generates valid ID prefixed with XVS', () => {
  const id = generateBookingId();
  assert.match(id, /^XVS-[A-Z0-9]+-[A-Z0-9]+$/);
});

test('validateBookingForm flags empty or invalid inputs', () => {
  const invalid = validateBookingForm({
    guestName: '',
    guestPhone: '',
    checkIn: '2026-10-25',
    checkOut: '2026-10-24', // invalid date range
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.guestName);
  assert.ok(invalid.errors.guestPhone);
  assert.ok(invalid.errors.checkOut);

  const valid = validateBookingForm({
    guestName: 'Alisher Navoiy',
    guestPhone: '+998901234567',
    checkIn: '2026-10-25',
    checkOut: '2026-10-28',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('filterPlaces filters places by category and search keyword', () => {
  const samplePlaces: Place[] = [
    {
      id: 'tepalik',
      name: 'Xovos Tepaligi',
      nameUzCyr: 'Ховос Тепалиги',
      nameEn: 'Khavas Ancient Hill',
      nameRu: 'Холм Древнего Хаваса',
      category: 'historical',
      zone: 'xovos_tuman',
      zoneName: 'Xovos tumani',
      address: 'Eski Xovos hududi',
      coordinates: [40.245, 68.995],
      rating: 4.9,
      reviewsCount: 142,
      featured: true,
      imageUrl: '',
      gallery: [],
      description: {
        uz: 'Xovos tepaligi qadimiy Ipak yo\'li yodgorligi',
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
      highlights: ['Arxeologiya', 'Buyuk Ipak yo‘li'],
      openHours: '08:00 - 20:00',
      entryFee: 'Bepul',
    },
    {
      id: 'masjid',
      name: 'Hazrati Ali Jome Masjidi',
      nameUzCyr: 'Ҳазрати Али Масжиди',
      nameEn: 'Hazrati Ali Mosque',
      nameRu: 'Мечеть Хазрати Али',
      category: 'mosque',
      zone: 'xovosobod_mfy',
      zoneName: 'Xovosobod MFY',
      address: 'Xovosobod markazi',
      coordinates: [40.231, 68.981],
      rating: 4.8,
      reviewsCount: 98,
      featured: true,
      imageUrl: '',
      gallery: [],
      description: {
        uz: 'Chiroyli gumbazli jome masjid',
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
      highlights: ['Ziyorat', 'Islom meʼmorchiligi'],
      openHours: '04:00 - 22:00',
      entryFee: 'Bepul',
    },
  ];

  const filteredByCat = filterPlaces(samplePlaces, '', 'mosque', 'all');
  assert.equal(filteredByCat.length, 1);
  assert.equal(filteredByCat[0].id, 'masjid');

  const filteredBySearch = filterPlaces(samplePlaces, 'Tepal', 'all', 'all');
  assert.equal(filteredBySearch.length, 1);
  assert.equal(filteredBySearch[0].id, 'tepalik');
});
