import { Injectable, signal, computed } from '@angular/core';
import { en } from '../i18n/en';
import { es } from '../i18n/es';

export type Language = 'en' | 'es';

const STORAGE_KEY = 'tony-estilo-language';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private translations = { en, es };

  currentLang = signal<Language>(this.getInitialLanguage());

  private getInitialLanguage(): Language {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && (stored === 'en' || stored === 'es')) {
      return stored;
    }

    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (browserLang) {
      const lang = browserLang.toLowerCase();
      if (lang.startsWith('es')) {
        return 'es';
      }
    }

    return 'en';
  }

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  t(path: string): string {
    const keys = path.split('.');
    let result: any = this.translations[this.currentLang()];

    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return path;
      }
    }

    return typeof result === 'string' ? result : path;
  }
}
