import { Component, HostListener, signal, computed, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements AfterViewInit {
  protected i18n = inject(I18nService);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  activeSection = signal('hero');

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
    this.updateActiveSection();
  }

  ngAfterViewInit() {
    this.updateActiveSection();
  }

  private updateActiveSection() {
    const sections = ['hero', 'about', 'gallery', 'schedule', 'contact'];
    const offset = 100;

    for (const section of sections) {
      const element = document.getElementById(section) || document.querySelector(`#${section}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom > offset) {
          this.activeSection.set(section);
          break;
        }
      }
    }
  }

  isActive(href: string): boolean {
    const sectionId = href.replace('#', '');
    return this.activeSection() === sectionId;
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
