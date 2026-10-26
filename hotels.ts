import { Hotel } from '../types';

export const HOTELS: Hotel[] = [
  {
    id: 'xovos-grand-hotel',
    name: 'Xovos Grand Hotel & Suites',
    zone: 'xovos_tuman',
    zoneName: 'Xovos tumani markazi',
    address: "Mustaqillik shoh ko'chasi 14, Xovos shaharchasi (Vokzal yaqinida)",
    coordinates: [40.2140, 68.8370],
    stars: 4,
    rating: 4.8,
    reviewsCount: 146,
    startingPriceUZS: 320000,
    startingPriceUSD: 25,
    phone: '+998 (67) 345-18-90',
    email: 'booking@xovosgrandhotel.uz',
    // Realistic modern hotel facade and suite room
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Tezkor Wi-Fi (bepul)',
      'Halol nonushta (shved stoli)',
      'Vokzaldan bepul transfer',
      '24/7 Qabulxona va xavfsizlik',
      'Zamonaviy konditsioner',
      'Xususiy avtoturargoh'
    ],
    description: {
      uz: "Xovos tumanining eng zamonaviy mehmonxonalaridan biri. Temir yo'l vokzaliga va markaziy xiyobonga yaqin joylashgan. Mehmonlar uchun qulay toza xonalar, boy nonushta va yuqori darajadagi mehmondo'stlik taqdim etiladi.",
      en: "One of the most modern hotels in Khavas district, situated close to the railway hub. Offers comfortable rooms, hearty halal breakfast, 24/7 service, and free station transfer.",
      ru: "Современная гостиница в центре Хаваса рядом с железнодорожным вокзалом. Комфортабельные номера, вкусный завтрак и радушный приём.",
    },
    rooms: [
      {
        id: 'xgh-std',
        name: 'Standart Bir Kishinga / Ikki Kishinga',
        capacity: 2,
        pricePerNightUZS: 320000,
        pricePerNightUSD: 25,
        bedType: '1 katta karavot yoki 2 ta alohida karavot',
        amenities: ['Wi-Fi', 'Konditsioner', 'Smart TV', 'Dush & Fartuk', 'Choynak']
      },
      {
        id: 'xgh-dlx',
        name: 'Deluxe Lyuks Xona',
        capacity: 2,
        pricePerNightUZS: 480000,
        pricePerNightUSD: 38,
        bedType: 'King-size karavot + Yumshoq divan',
        amenities: ['Wi-Fi', 'Konditsioner', 'Minibar', 'Balkon manzarasi', 'Vanna']
      },
      {
        id: 'xgh-fam',
        name: 'Oilaviy Keng Suite',
        capacity: 4,
        pricePerNightUZS: 650000,
        pricePerNightUSD: 52,
        bedType: '1 King + 2 ta alohida karavot',
        amenities: ['2 ta xona', 'Wi-Fi', 'Oshxona burchagi', '2 ta Smart TV', 'Kir yuvish']
      }
    ]
  },
  {
    id: 'yangiyer-silk-road',
    name: 'Yangiyer Silk Road Hotel & Spa',
    zone: 'yangiyer_shahar',
    zoneName: 'Yangiyer shahri markazi',
    address: "Istiqlol ko'chasi 55, Yangiyer shahri (Park ro'parasi)",
    coordinates: [40.2675, 68.8180],
    stars: 4,
    rating: 4.85,
    reviewsCount: 220,
    startingPriceUZS: 380000,
    startingPriceUSD: 30,
    phone: '+998 (67) 342-45-77',
    email: 'info@yangiyersilkroad.uz',
    // Modern city hotel with spa and restaurant
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Basseyn va sauna',
      'Sharqona va Yevropa restorani',
      'Tezkor Wi-Fi',
      'Fitnes zali',
      '24/7 Xona xizmati',
      'Sayyohlar uchun ekskursiya xizmati'
    ],
    description: {
      uz: "Yangiyer shahrining markazida joylashgan to'rt yulduzli qulay mehmonxona. Shahar bog'i va favvoralarga piyoda 3 daqiqalik yo'l. Sayyohlar uchun basseyn, sauna va milliy taomlar restorani xizmat ko'rsatadi.",
      en: "A premier hotel in the heart of Yangiyer city, just across from the Central Fountain Park. Features indoor pool, wellness sauna, international restaurant, and guided tours.",
      ru: "Первоклассный отель в центре Янгиера напротив городского парка. К услугам гостей бассейн, спа, ресторан восточной кухни и трансфер.",
    },
    rooms: [
      {
        id: 'ysr-std',
        name: 'Klassik Standart Xona',
        capacity: 2,
        pricePerNightUZS: 380000,
        pricePerNightUSD: 30,
        bedType: 'Double yoki Twin karavot',
        amenities: ['Wi-Fi', 'Konditsioner', 'Nonushta', 'Konditsioner']
      },
      {
        id: 'ysr-lux',
        name: 'Panorama Park View Suite',
        capacity: 3,
        pricePerNightUZS: 560000,
        pricePerNightUSD: 44,
        bedType: 'King-size + divan',
        amenities: ['Parkka qaragan manzara', 'Basseyn kiritilgan', 'Konditsioner', 'Minibar']
      }
    ]
  },
  {
    id: 'xovosobod-eco-guesthouse',
    name: 'Xovosobod Milliy Eko Mehmon Uyi',
    zone: 'xovosobod_mfy',
    zoneName: 'Xovosobod mahallasi',
    address: "Guliston ko'chasi 22, Xovosobod mahallasi",
    coordinates: [40.1990, 68.8220],
    stars: 3,
    rating: 4.9,
    reviewsCount: 89,
    startingPriceUZS: 190000,
    startingPriceUSD: 15,
    phone: '+998 (90) 505-33-44',
    email: 'xovosobod.homestay@gmail.com',
    // Authentic traditional Uzbek family courtyard & tapchan
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Haqiqiy o\'zbek xonadoni va mevali bog\'',
      'Tandir non va yangi qaymoqli nonushta',
      'So\'ri (tapchan) va milliy choyxona',
      'Bepul Wi-Fi',
      'Hovlida milliy palov pishirish mahorati darsi'
    ],
    description: {
      uz: "O'zbek mehmondo'stligini chin dildan his qilishni istagan xorijiy sayyohlar uchun ideal maskan. Xovosobod mahallasida joylashgan mazkur oilaviy mehmon uyida shirin anor va uzum bog'i, milliy so'ri va samimiy oilaviy muhit sizni kutmoqda.",
      en: "An authentic family-run guesthouse in Khavasobod quarter. Immerse yourself in genuine Uzbek hospitality, taste fresh bread right out of the clay tandir oven, and relax under shaded tapchan tea beds.",
      ru: "Аутентичный семейный гостевой дом в махалле Хавасобод с плодовым садом, топчанами и мастер-классом по приготовлению плова.",
    },
    rooms: [
      {
        id: 'xeg-room1',
        name: 'Milliy Naqshli Xona',
        capacity: 2,
        pricePerNightUZS: 190000,
        pricePerNightUSD: 15,
        bedType: '2 ta milliy karavot yoki to\'shak',
        amenities: ['Nonushta', 'Wi-Fi', 'Konditsioner', 'Bog\' manzarasi']
      },
      {
        id: 'xeg-fam',
        name: 'Oilaviy Katta Xona',
        capacity: 4,
        pricePerNightUZS: 320000,
        pricePerNightUSD: 25,
        bedType: '4 kishilik keng xona',
        amenities: ['Nonushta', 'Wi-Fi', 'Konditsioner', 'Xususiy dush']
      }
    ]
  },
  {
    id: 'korvonsaroy-transit-hotel',
    name: 'Karvonsaroy Silk Road Transit Hotel',
    zone: 'korvonsaroy_mfy',
    zoneName: 'Korvonsaroy mahallasi',
    address: "Toshkent-Samarqand xalqaro trassasi bo'yi, Korvonsaroy MFY",
    coordinates: [40.2315, 68.8575],
    stars: 3,
    rating: 4.7,
    reviewsCount: 160,
    startingPriceUZS: 240000,
    startingPriceUSD: 19,
    phone: '+998 (91) 621-77-88',
    email: 'transit@karvonsaroyhotel.uz',
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Katta yuk va yengil avtomobillar turargohi',
      '24/7 Ishlovchi choyxona va oshxona',
      'Tezkor ro\'yxatga olish',
      'Konditsioner va dush har bir xonada',
      'Wi-Fi va valyuta ayirboshlash ma\'lumot burchagi'
    ],
    description: {
      uz: "Ipak yo'li trassasi yoqasida, qadimiy karvonlar to'xtagan Korvonsaroy mahallasida joylashgan qulay tranzit mehmonxona. Toshkent va Samarqand o'rtasida harakatlanayotgan avtosayyohlar va guruhlar uchun eng qulay to'xtash joyi.",
      en: "Conveniently situated along the historic M-34 corridor in Caravanserai quarter. Perfect stopover for road travelers journeying between Tashkent and Samarkand, with secure parking and 24/7 dining.",
      ru: "Удобный транзитный отель на трассе М-34 в махалле Корвонсарой. Отличный вариант для автопутешественников между Ташкентом и Самаркандом.",
    },
    rooms: [
      {
        id: 'kst-twin',
        name: 'Tranzit Qulay Xona (Twin/Double)',
        capacity: 2,
        pricePerNightUZS: 240000,
        pricePerNightUSD: 19,
        bedType: '2 ta bir kishilik karavot',
        amenities: ['Konditsioner', 'Xususiy dush', 'Wi-Fi', 'TV']
      },
      {
        id: 'kst-triple',
        name: 'Uch Kishilik Tranzit Xona',
        capacity: 3,
        pricePerNightUZS: 330000,
        pricePerNightUSD: 26,
        bedType: '3 ta alohida qulay karavot',
        amenities: ['Konditsioner', 'Xususiy dush', 'Wi-Fi', 'Nonushta']
      }
    ]
  }
];
