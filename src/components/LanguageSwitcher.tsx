import React, { useState, useRef, useEffect } from 'react';
import { useLanguageStore } from '../store/languageStore';
import { ChevronDown } from 'lucide-react';

const languages = [
  { 
    code: 'en', 
    flag: '🇺🇸',
    alt: 'USA Flag',
    name: 'English'
  },
  { 
    code: 'pt', 
    flag: '🇧🇷',
    alt: 'Brazil Flag',
    name: 'Português'
  },
  { 
    code: 'es', 
    flag: '🇪🇸',
    alt: 'Spain Flag',
    name: 'Español'
  },
] as const;

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <span className="text-xl" role="img" aria-label={currentLanguage?.alt}>
          {currentLanguage?.flag}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2 text-sm ${
                  language === lang.code
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl mr-2" role="img" aria-label={lang.alt}>
                  {lang.flag}
                </span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}