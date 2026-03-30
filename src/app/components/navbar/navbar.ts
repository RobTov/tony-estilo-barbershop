import { Component, HostListener, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  protected i18n = inject(I18nService);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  protected lang = this.i18n.currentLang;

  protected navLinks = computed(() => [
    { label: this.i18n.t('nav.home'), href: '#hero' },
    { label: this.i18n.t('nav.about'), href: '#about' },
    { label: this.i18n.t('nav.services'), href: '#gallery' },
    { label: this.i18n.t('nav.hours'), href: '#schedule' },
    { label: this.i18n.t('nav.contact'), href: '#contact' },
  ]);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((v: boolean) => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  scrollToSection(href: string) {
    this.closeMobileMenu();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setLanguage(lang: 'en' | 'es') {
    this.i18n.setLanguage(lang);
  }

  get currentLang() {
    return this.i18n.currentLang();
  }
}
