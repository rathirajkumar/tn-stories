import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { Check, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/destinations';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  scriptSample: string;
  description: string;
}

export const LanguageSelectionPage: React.FC = () => {
  const { language, setLanguage } = useApp();
  const [selected, setSelected] = useState<Language>(language || 'en');
  const navigate = useNavigate();

  const languageOptions: LanguageOption[] = [
    {
      code: 'ta',
      name: 'Tamil',
      nativeName: 'தமிழ்',
      scriptSample: 'யாதும் ஊரே யாவரும் கேளிர்',
      description: 'Experience Tamil Nadu in its classical mother tongue with local terms, festivals, and cultural idioms.',
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      scriptSample: 'Discover Tamil Nadu Beyond the Ordinary',
      description: 'Comprehensive international navigation with detailed historical notes and travel directions.',
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      scriptSample: 'तमिलनाडु की गौरवशाली विरासत को जानें',
      description: 'प्रमुख पर्यटन स्थलों, मंदिरों और यात्रा योजनाओं के लिए हिंदी भाषा का सहज अनुभव।',
    },
  ];

  const handleContinue = () => {
    setLanguage(selected);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src={HERO_IMAGE}
          alt="Tamil Nadu background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter blur-xs"
        />
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto my-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Multi-Lingual Experience</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
            Select Your Preferred Language
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            You can always modify this anytime in your Profile & App Settings
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {languageOptions.map((opt) => {
            const isSelected = selected === opt.code;
            return (
              <div
                key={opt.code}
                onClick={() => setSelected(opt.code)}
                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-teal-700 bg-white shadow-md'
                    : 'border-slate-200/90 bg-white/80 hover:bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-slate-900 font-display">
                      {opt.nativeName}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-teal-700 text-white' : 'border border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
                    {opt.name}
                  </p>

                  <p className="text-xs italic text-slate-500 mb-3 bg-stone-50 p-2 rounded-lg border border-stone-200/60 font-serif">
                    &ldquo;{opt.scriptSample}&rdquo;
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {opt.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span
                    className={`text-[11px] font-semibold ${
                      isSelected ? 'text-teal-800' : 'text-slate-400'
                    }`}
                  >
                    {isSelected ? 'Selected Language' : 'Click to Select'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="w-full sm:w-auto min-w-[260px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:shadow-lg"
          >
            <span>Continue to TN Stories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <footer className="relative z-10 text-center text-xs text-slate-400 mt-6">
        <span>TN Stories · Preserving Tamil Cultural Heritage</span>
      </footer>
    </div>
  );
};
