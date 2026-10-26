import React, { useState } from 'react';
import {
  X,
  MapPin,
  Star,
  Clock,
  Ticket,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Check,
  ExternalLink,
  Compass,
} from 'lucide-react';
import { Place, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface PlaceDetailModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onViewOnMap: (place: Place) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  isOpen,
  onClose,
  currentLang,
  isSaved,
  onToggleSave,
  onViewOnMap,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !place) return null;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.uz;
  const descriptionText =
    place.description[currentLang] || place.description.uz || place.description.en;

  const handleToggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        window.speechSynthesis.cancel();
        const textToSpeak = `${place.name}. ${descriptionText}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        
        // try to match lang
        if (currentLang === 'uz' || currentLang === 'uz_cyr') utterance.lang = 'uz-UZ';
        else if (currentLang === 'ru') utterance.lang = 'ru-RU';
        else if (currentLang === 'tr') utterance.lang = 'tr-TR';
        else if (currentLang === 'zh') utterance.lang = 'zh-CN';
        else if (currentLang === 'ar') utterance.lang = 'ar-SA';
        else utterance.lang = 'en-US';

        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);

        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
      setTimeout(() => setIsPlayingAudio(false), 5000);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${place.name} — Xovos Turizm sayyohlik qo'llanmasi: https://ais-dev-p3ef64k5brjfjdhnc7dcrg-843513161155.asia-southeast1.run.app`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const images = place.gallery && place.gallery.length > 0 ? place.gallery : [place.imageUrl];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="place-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in"
    >
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Image Preview & Actions */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-950 overflow-hidden">
          <img
            src={images[activeImageIndex]}
            alt={place.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

          {/* Close & Action buttons */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-stone-950 shadow-md">
              {place.zoneName}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(place.id)}
                className={`p-2 rounded-full backdrop-blur-md transition ${
                  isSaved
                    ? 'bg-amber-500 text-stone-950 shadow-lg'
                    : 'bg-stone-900/70 text-stone-200 hover:bg-stone-800'
                }`}
                aria-label="Saqlash"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-stone-900/70 backdrop-blur-md text-stone-200 hover:bg-stone-800 transition"
                aria-label="Ulashish"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  if (isPlayingAudio && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                  onClose();
                }}
                className="p-2 rounded-full bg-stone-900/80 backdrop-blur-md text-stone-300 hover:text-stone-100 hover:bg-stone-800 transition"
                aria-label="Yopish"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Place Title on Image */}
          <div className="absolute bottom-3 left-4 right-4">
            <h2 id="place-detail-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {place.name}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-stone-300">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                {place.rating} ({place.reviewsCount} {t.reviews})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-stone-300 truncate">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {place.address}
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Thumbnails if multiple */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-stone-950/70 border-b border-stone-800 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                  activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Audio Guide Player */}
          {place.audioGuideAvailable && (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleAudio}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-md ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-stone-950 animate-pulse'
                      : 'bg-stone-800 text-amber-400 hover:bg-stone-700'
                  }`}
                  aria-label={isPlayingAudio ? 'Audioni to‘xtatish' : 'Audioni tinglash'}
                >
                  {isPlayingAudio ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div>
                  <div className="text-sm font-semibold text-amber-300">
                    {isPlayingAudio ? t.audioGuidePlaying : t.audioGuide}
                  </div>
                  <div className="text-xs text-stone-400">
                    O'zbek va xalqaro tillarda ovozli ma'lumot
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-400/80">Ovozli gid</span>
            </div>
          )}

          {/* Historical Era & Practical Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {place.historicalEra && (
              <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block font-medium">Tarixiy davr:</span>
                  <span className="text-stone-200 font-semibold">{place.historicalEra}</span>
                </div>
              </div>
            )}
            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-400 block font-medium">{t.openHours}</span>
                <span className="text-stone-200 font-semibold">{place.openHours}</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-start gap-2.5">
              <Ticket className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-400 block font-medium">{t.entryFee}</span>
                <span className="text-stone-200 font-semibold">{place.entryFee}</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-400 block font-medium">Koordinatalar:</span>
                <span className="text-stone-200 font-mono">
                  {place.coordinates[0].toFixed(4)}, {place.coordinates[1].toFixed(4)}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-2">
              Tarix va Tavsif
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed sm:text-base">
              {descriptionText}
            </p>
          </div>

          {/* Key Highlights */}
          {place.highlights && place.highlights.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-2">
                Asosiy Xususiyatlar
              </h3>
              <ul className="space-y-1.5">
                {place.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-950/80 border-t border-stone-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (isPlayingAudio && 'speechSynthesis' in window) window.speechSynthesis.cancel();
              onViewOnMap(place);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition active:scale-95 shadow-md shadow-amber-950/40"
          >
            <Compass className="w-4 h-4" />
            <span>{t.viewOnMap}</span>
          </button>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${place.coordinates[0]},${place.coordinates[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-medium transition active:scale-95"
          >
            <span>{t.getDirections}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailModal;

