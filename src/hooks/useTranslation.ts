import { useLanguageStore } from '../store/languageStore';
import { translations } from '../translations';

export function useTranslation() {
  const { language } = useLanguageStore();
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return { t };
}