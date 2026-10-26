import { ZoneId } from '../types';

export interface GeoZone {
  id: ZoneId;
  name: string;
  nameUzCyr: string;
  nameEn: string;
  nameRu: string;
  color: string;
  fillColor: string;
  center: [number, number];
  zoom: number;
  description: string;
  highlightsCount: number;
  coordinates: [number, number][]; // Polygon points [lat, lng]
}

export const GEO_ZONES: Record<ZoneId, GeoZone> = {
  xovos_tuman: {
    id: 'xovos_tuman',
    name: 'Xovos tumani',
    nameUzCyr: 'Ховос тумани',
    nameEn: 'Khavas District',
    nameRu: 'Хавасский район',
    color: '#D97706', // warm amber
    fillColor: '#FBBF24',
    center: [40.215, 68.835],
    zoom: 12,
    description: "Sirdaryo viloyatining qadimiy Buyuk Ipak yo'li chorrahasi, mashhur temir yo'l markazi va Xovos tepaligi joylashgan tuman.",
    highlightsCount: 5,
    coordinates: [
      [40.245, 68.805],
      [40.245, 68.880],
      [40.180, 68.880],
      [40.180, 68.805],
      [40.245, 68.805]
    ]
  },
  yangiyer_shahar: {
    id: 'yangiyer_shahar',
    name: 'Yangiyer shahri',
    nameUzCyr: 'Янгиер шаҳри',
    nameEn: 'Yangiyer City',
    nameRu: 'Город Янгиер',
    color: '#0284C7', // sky blue
    fillColor: '#38BDF8',
    center: [40.2675, 68.8180],
    zoom: 13,
    description: "Mirzacho'lni o'zlashtirish davrida bunyod etilgan zamonaviy sanoat va madaniyat shahri, Yusuf Ota masjidi va go'zal bog'lar maskani.",
    highlightsCount: 3,
    coordinates: [
      [40.285, 68.795],
      [40.285, 68.845],
      [40.248, 68.845],
      [40.248, 68.795],
      [40.285, 68.795]
    ]
  },
  xovosobod_mfy: {
    id: 'xovosobod_mfy',
    name: 'Xovosobod mahallasi',
    nameUzCyr: 'Ховобод маҳалласи',
    nameEn: 'Khavasobod Quarter',
    nameRu: 'Махалля Хавасобод',
    color: '#059669', // emerald
    fillColor: '#34D399',
    center: [40.200, 68.826],
    zoom: 14,
    description: "Xovos tumanining aholi gavjum, mehmondo'st mahallalaridan biri, shinam jome masjid va milliy hunarmandchilik uylari maskani.",
    highlightsCount: 2,
    coordinates: [
      [40.208, 68.818],
      [40.208, 68.836],
      [40.190, 68.836],
      [40.190, 68.818],
      [40.208, 68.818]
    ]
  },
  korvonsaroy_mfy: {
    id: 'korvonsaroy_mfy',
    name: 'Korvonsaroy mahallasi',
    nameUzCyr: 'Корвонсарой маҳалласи',
    nameEn: 'Caravanserai Quarter',
    nameRu: 'Махалля Корвонсарой',
    color: '#DC2626', // terracotta crimson
    fillColor: '#F87171',
    center: [40.230, 68.855],
    zoom: 14,
    description: "Buyuk Ipak yo'li karvonlari to'xtagan tarixiy manzilgoh, sardoba qoldiqlari va mashhur poliz mahsulotlari markazi.",
    highlightsCount: 3,
    coordinates: [
      [40.240, 68.845],
      [40.240, 68.868],
      [40.220, 68.868],
      [40.220, 68.845],
      [40.240, 68.845]
    ]
  }
};

// Route coordinates connecting Yangiyer - Korvonsaroy - Xovos markazi - Vokzal - Sa'du Sayyid - Bibi Ocha - Tepalik - Xovosobod
export const SILK_ROAD_TOUR_ROUTE: [number, number][] = [
  [40.2675, 68.8180], // Yangiyer markazi (Park va Silk Road Hotel)
  [40.2520, 68.8250], // Yangiyer-Xovos trassasi
  [40.2315, 68.8575], // Korvonsaroy MFY tranzit
  [40.2285, 68.8520], // Umar ibn Xattob jome masjidi (Korvonsaroy)
  [40.2185, 68.8390], // Muhammad Bobur jome masjidi (Xovos markazi)
  [40.2140, 68.8370], // Xovos Grand Hotel
  [40.2109, 68.8361], // Xovos tuman temir yo'l vokzali
  [40.2045, 68.8310], // Sa'du Sayyid ziyoratgohi va masjidi
  [40.2030, 68.8295], // Bibi Ocha maqbarasi
  [40.2015, 68.8285], // Qadimiy Xovos Tepaligi
  [40.1985, 68.8235]  // Xovosobod Jome Masjidi
];
