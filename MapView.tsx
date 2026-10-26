import React, { useState, useEffect, useRef } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import {
  Navigation,
  RotateCcw,
  Layers,
  MapPin,
  Sparkles,
  Building2,
  ExternalLink,
  Satellite,
  Compass,
} from 'lucide-react';
import { Place, Hotel, ZoneId, LanguageCode } from '../types';
import { PLACES } from '../data/places';
import { HOTELS } from '../data/hotels';
import { GEO_ZONES, SILK_ROAD_TOUR_ROUTE } from '../data/geoZones';
import { TRANSLATIONS } from '../data/translations';

// Google Maps API Key provided via environment variable (VITE_GOOGLE_MAPS_API_KEY)
const GOOGLE_MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

interface MapViewProps {
  currentLang: LanguageCode;
  selectedPlaceForCenter?: Place | null;
  onSelectPlace: (place: Place) => void;
  onBookHotel: (hotel: Hotel) => void;
}

// Helper component to manage Google Maps Polygons (Territories) and Polylines (Silk Road route)
const MapOverlays: React.FC<{
  activeZone: ZoneId | 'all';
  showRoute: boolean;
}> = ({ activeZone, showRoute }) => {
  const map = useMap();
  const polygonsRef = useRef<google.maps.Polygon[]>([]);
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map) return;

    // Clear previous polygons
    polygonsRef.current.forEach((p) => p.setMap(null));
    polygonsRef.current = [];

    // Draw 4 Territorial Boundaries
    Object.values(GEO_ZONES).forEach((zone) => {
      const isHighlighted = activeZone === 'all' || activeZone === zone.id;
      const paths = zone.coordinates.map(([lat, lng]) => ({ lat, lng }));

      const polygon = new google.maps.Polygon({
        paths,
        strokeColor: zone.color,
        strokeOpacity: isHighlighted ? 0.9 : 0.4,
        strokeWeight: isHighlighted ? 3 : 1.5,
        fillColor: zone.fillColor,
        fillOpacity: isHighlighted ? 0.2 : 0.05,
        clickable: true,
      });

      polygon.setMap(map);
      polygonsRef.current.push(polygon);
    });

    // Draw Silk Road Route Polyline
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    if (showRoute) {
      const routePath = SILK_ROAD_TOUR_ROUTE.map(([lat, lng]) => ({ lat, lng }));
      const polyline = new google.maps.Polyline({
        path: routePath,
        geodesic: true,
        strokeColor: '#D97706',
        strokeOpacity: 0.85,
        strokeWeight: 4,
      });
      polyline.setMap(map);
      polylineRef.current = polyline;
    }

    return () => {
      polygonsRef.current.forEach((p) => p.setMap(null));
      polygonsRef.current = [];
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
    };
  }, [map, activeZone, showRoute]);

  return null;
};

// Helper component to handle center changes smoothly
const MapController: React.FC<{
  targetCoords: { lat: number; lng: number } | null;
  targetZoom?: number;
}> = ({ targetCoords, targetZoom }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !targetCoords) return;
    map.panTo(targetCoords);
    if (targetZoom) {
      map.setZoom(targetZoom);
    }
  }, [map, targetCoords, targetZoom]);

  return null;
};

export const MapView: React.FC<MapViewProps> = ({
  currentLang,
  selectedPlaceForCenter,
  onSelectPlace,
  onBookHotel,
}) => {
  const [activeZone, setActiveZone] = useState<ZoneId | 'all'>('all');
  const [showRoute, setShowRoute] = useState(true);
  const [showHotels, setShowHotels] = useState(true);
  const [showPlaces, setShowPlaces] = useState(true);
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');

  const [activeItem, setActiveItem] = useState<{
    type: 'place' | 'hotel';
    data: Place | Hotel;
  } | null>(null);

  const [flyTarget, setFlyTarget] = useState<{
    coords: { lat: number; lng: number };
    zoom: number;
  } | null>(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;

  // React to external place selection
  useEffect(() => {
    if (selectedPlaceForCenter) {
      setFlyTarget({
        coords: {
          lat: selectedPlaceForCenter.coordinates[0],
          lng: selectedPlaceForCenter.coordinates[1],
        },
        zoom: 15,
      });
      setActiveItem({ type: 'place', data: selectedPlaceForCenter });
    }
  }, [selectedPlaceForCenter]);

  const handleZoneSelect = (zoneId: ZoneId | 'all') => {
    setActiveZone(zoneId);
    if (zoneId === 'all') {
      setFlyTarget({
        coords: { lat: 40.228, lng: 68.835 },
        zoom: 12,
      });
    } else {
      const zone = GEO_ZONES[zoneId];
      if (zone) {
        setFlyTarget({
          coords: { lat: zone.center[0], lng: zone.center[1] },
          zoom: zone.zoom,
        });
      }
    }
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolokatsiya qurilmangizda qo'llab-quvvatlanmaydi");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFlyTarget({
          coords: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          zoom: 14,
        });
      },
      () => {
        alert("Joylashuvingizni aniqlashga ruxsat berilmadi.");
      }
    );
  };

  const zonesList: { id: ZoneId | 'all'; name: string; color: string }[] = [
    { id: 'all', name: t.allZones, color: '#D97706' },
    { id: 'xovos_tuman', name: 'Xovos tumani', color: '#D97706' },
    { id: 'yangiyer_shahar', name: 'Yangiyer shahri', color: '#0284C7' },
    { id: 'xovosobod_mfy', name: 'Xovosobod MFY', color: '#059669' },
    { id: 'korvonsaroy_mfy', name: 'Korvonsaroy MFY', color: '#DC2626' },
  ];

  // Map language mapping
  const mapLanguageCode =
    currentLang === 'uz_cyr'
      ? 'ru'
      : currentLang === 'fa'
      ? 'fa'
      : currentLang === 'ar'
      ? 'ar'
      : currentLang === 'zh'
      ? 'zh'
      : currentLang === 'tr'
      ? 'tr'
      : currentLang === 'en'
      ? 'en'
      : 'uz';

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] min-h-[500px] bg-stone-900 overflow-hidden">
      <APIProvider
        apiKey={GOOGLE_MAPS_API_KEY}
        language={mapLanguageCode}
        region="UZ"
      >
        <Map
          mapId="DEMO_MAP_ID"
          defaultCenter={{ lat: 40.228, lng: 68.835 }}
          defaultZoom={12}
          mapTypeId={mapTypeId}
          style={{ width: '100%', height: '100%' }}
          gestureHandling="greedy"
          disableDefaultUI={false}
          zoomControl={true}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
        >
          {/* Overlays (Territory polygons and route) */}
          <MapOverlays activeZone={activeZone} showRoute={showRoute} />

          {/* Smooth Camera Controller */}
          {flyTarget && (
            <MapController
              targetCoords={flyTarget.coords}
              targetZoom={flyTarget.zoom}
            />
          )}

          {/* Places Markers with exact names and locations */}
          {showPlaces &&
            PLACES.map((place) => {
              if (activeZone !== 'all' && place.zone !== activeZone) return null;

              const isFeatured = place.featured;
              const borderColor =
                place.category === 'mosque'
                  ? '#10B981' // emerald
                  : place.id === 'xovos-tepalik'
                  ? '#F59E0B' // amber
                  : place.category === 'nature'
                  ? '#14B8A6' // teal
                  : place.category === 'food'
                  ? '#F97316' // orange
                  : '#8B5CF6'; // purple

              const displayName =
                currentLang === 'en'
                  ? place.nameEn
                  : currentLang === 'ru'
                  ? place.nameRu
                  : currentLang === 'uz_cyr'
                  ? place.nameUzCyr
                  : place.name;

              return (
                <AdvancedMarker
                  key={place.id}
                  position={{
                    lat: place.coordinates[0],
                    lng: place.coordinates[1],
                  }}
                  title={`${displayName} - ${place.zoneName}`}
                  onClick={() => setActiveItem({ type: 'place', data: place })}
                >
                  <div className="flex flex-col items-center cursor-pointer group select-none transition-transform duration-200 hover:scale-105 -translate-y-full">
                    <div
                      style={{
                        backgroundColor: 'rgba(28, 25, 23, 0.95)',
                        borderColor: borderColor,
                        borderWidth: isFeatured ? '2px' : '1.5px',
                      }}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl shadow-xl backdrop-blur-md max-w-[210px]"
                    >
                      <div
                        style={{ backgroundColor: borderColor }}
                        className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                      />
                      <div className="flex flex-col text-left overflow-hidden">
                        <span className="font-bold text-[11px] leading-tight text-stone-100 truncate">
                          {displayName}
                        </span>
                        <span className="text-[9.5px] text-stone-400 font-medium leading-tight truncate">
                          📍 {place.zoneName}
                        </span>
                      </div>
                    </div>
                    {/* Pin pointer anchor */}
                    <div
                      style={{ borderTopColor: borderColor }}
                      className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] -mt-[1px]"
                    />
                    <div
                      style={{ backgroundColor: borderColor }}
                      className="w-2 h-2 rounded-full ring-2 ring-stone-950 shadow-md -mt-0.5"
                    />
                  </div>
                </AdvancedMarker>
              );
            })}

          {/* Hotel Markers with exact names and locations */}
          {showHotels &&
            HOTELS.map((hotel) => {
              if (activeZone !== 'all' && hotel.zone !== activeZone) return null;

              return (
                <AdvancedMarker
                  key={hotel.id}
                  position={{
                    lat: hotel.coordinates[0],
                    lng: hotel.coordinates[1],
                  }}
                  title={`${hotel.name} - ${hotel.zoneName}`}
                  onClick={() => setActiveItem({ type: 'hotel', data: hotel })}
                >
                  <div className="flex flex-col items-center cursor-pointer group select-none transition-transform duration-200 hover:scale-105 -translate-y-full">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-stone-900/95 border-2 border-blue-500 shadow-xl backdrop-blur-md max-w-[210px]">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-blue-400 animate-pulse" />
                      <div className="flex flex-col text-left overflow-hidden">
                        <span className="font-bold text-[11px] leading-tight text-blue-300 truncate">
                          {hotel.name}
                        </span>
                        <span className="text-[9.5px] text-stone-300 font-medium leading-tight truncate">
                          🏨 {hotel.zoneName}
                        </span>
                      </div>
                    </div>
                    {/* Pin pointer anchor */}
                    <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-blue-500 -mt-[1px]" />
                    <div className="w-2 h-2 rounded-full bg-blue-400 ring-2 ring-stone-950 shadow-md -mt-0.5" />
                  </div>
                </AdvancedMarker>
              );
            })}

          {/* Info Window for Clicked Place or Hotel */}
          {activeItem && (
            <InfoWindow
              position={{
                lat: activeItem.data.coordinates[0],
                lng: activeItem.data.coordinates[1],
              }}
              onCloseClick={() => setActiveItem(null)}
              headerContent={
                <div className="font-bold text-xs text-stone-900 pr-2">
                  {activeItem.type === 'hotel' ? '🏨 ' : '📍 '}
                  {activeItem.data.name}
                </div>
              }
            >
              <div className="text-xs text-stone-800 space-y-2 p-1 max-w-[220px]">
                <div className="text-[11px] text-stone-500 font-medium">
                  {activeItem.data.zoneName}
                </div>

                {activeItem.type === 'place' ? (
                  <>
                    <p className="text-stone-700 line-clamp-2 text-[11px]">
                      {(activeItem.data as Place).description[currentLang] ||
                        (activeItem.data as Place).description.uz}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-stone-600 font-semibold pt-1">
                      <span>⭐ {(activeItem.data as Place).rating}</span>
                      <span>{(activeItem.data as Place).openHours}</span>
                    </div>
                    <button
                      onClick={() => onSelectPlace(activeItem.data as Place)}
                      className="w-full mt-1.5 py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition"
                    >
                      Batafsil ma'lumot
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-emerald-700 font-bold text-xs">
                      {(activeItem.data as Hotel).startingPriceUZS.toLocaleString(
                        'uz-UZ'
                      )}{' '}
                      so'm / kecha dan
                    </div>
                    <button
                      onClick={() => onBookHotel(activeItem.data as Hotel)}
                      className="w-full mt-1.5 py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
                    >
                      Xona band qilish
                    </button>
                  </>
                )}
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

      {/* Top Territory Filter Pills */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto z-10 flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {zonesList.map((z) => {
          const isActive = activeZone === z.id;
          return (
            <button
              key={z.id}
              onClick={() => handleZoneSelect(z.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-md transition active:scale-95 flex items-center gap-1.5 backdrop-blur-md ${
                isActive
                  ? 'bg-stone-950 text-white ring-2'
                  : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800'
              }`}
              style={{
                borderColor: z.color,
                boxShadow: isActive ? `0 0 0 2px ${z.color}` : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: z.color }}
              />
              <span>{z.name}</span>
            </button>
          );
        })}
      </div>

      {/* Floating Left Controls: GPS + Reset + Satellite/Roadmap Toggle */}
      <div className="absolute bottom-6 left-3 z-10 flex flex-col gap-2">
        <button
          onClick={handleLocateMe}
          className="p-2.5 rounded-xl bg-stone-900/95 text-stone-200 hover:text-white border border-stone-700/80 shadow-lg backdrop-blur-md transition active:scale-95 flex items-center gap-2 text-xs font-semibold"
          title="Mening joylashuvim"
        >
          <Navigation className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Mening lokatsiyam</span>
        </button>

        <button
          onClick={() => handleZoneSelect('all')}
          className="p-2.5 rounded-xl bg-stone-900/95 text-stone-200 hover:text-white border border-stone-700/80 shadow-lg backdrop-blur-md transition active:scale-95 flex items-center gap-2 text-xs font-semibold"
          title="Markazga qaytish"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Markazga qaytish</span>
        </button>

        {/* Satellite Imagery Toggle Button */}
        <button
          onClick={() =>
            setMapTypeId((prev) => (prev === 'roadmap' ? 'satellite' : 'roadmap'))
          }
          className="p-2.5 rounded-xl bg-stone-900/95 text-stone-200 hover:text-white border border-stone-700/80 shadow-lg backdrop-blur-md transition active:scale-95 flex items-center gap-2 text-xs font-semibold"
          title="Sun'iy yo'ldosh xaritasi"
        >
          <Satellite className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">
            {mapTypeId === 'roadmap' ? "Sun'iy yo'ldosh" : 'Xarita'}
          </span>
        </button>
      </div>

      {/* Layer Toggles Floating Right */}
      <div className="absolute bottom-6 right-3 z-10 flex flex-col gap-2">
        <div className="bg-stone-900/95 border border-stone-700/80 rounded-xl p-2.5 shadow-xl backdrop-blur-md space-y-1.5 text-xs text-stone-200">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPlaces}
              onChange={(e) => setShowPlaces(e.target.checked)}
              className="w-3.5 h-3.5 accent-amber-500 rounded"
            />
            <span className="flex items-center gap-1 font-medium">
              <span>🏛️</span>
              <span>Diqqatga sazovor</span>
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showHotels}
              onChange={(e) => setShowHotels(e.target.checked)}
              className="w-3.5 h-3.5 accent-blue-500 rounded"
            />
            <span className="flex items-center gap-1 font-medium">
              <span>🏨</span>
              <span>Mehmonxonalar</span>
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showRoute}
              onChange={(e) => setShowRoute(e.target.checked)}
              className="w-3.5 h-3.5 accent-amber-500 rounded"
            />
            <span className="flex items-center gap-1 font-medium text-amber-400">
              <span>〰️</span>
              <span>Ipak yo'li yo'nalishi</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MapView;

