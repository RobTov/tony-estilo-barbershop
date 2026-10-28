import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  protected i18n = inject(I18nService);

  protected slides = [
    { url: '/img2.jpeg', alt: 'Barber giving a precision lineup at Tony Estilo Barbershop' },
    { url: '/new-files/10.jpeg', alt: 'Barber styling a client at Tony Estilo Barbershop' },
    { url: '/img5.jpeg', alt: 'Close-up of a sharp fade haircut' },
    { url: '/new-files/11.jpeg', alt: 'Tony Estilo Barbershop storefront' },
  ];

  protected activeSlide = signal(0);

  private readonly slideIntervalMs = 5000;
  private slideTimer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.slideTimer = setInterval(() => {
      this.activeSlide.update((i) => (i + 1) % this.slides.length);
    }, this.slideIntervalMs);
  }

  ngOnDestroy() {
    clearInterval(this.slideTimer);
  }

  goToSlide(index: number) {
    this.activeSlide.set(index);
  }

  scrollToSection(href: string) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
