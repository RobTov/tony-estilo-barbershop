import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  protected i18n = inject(I18nService);

  protected location = computed(() => this.i18n.t('hero.location'));
  protected tagline = computed(() => this.i18n.t('hero.tagline'));
  protected bookAppointment = computed(() => this.i18n.t('hero.bookAppointment'));
  protected callNow = computed(() => this.i18n.t('hero.callNow'));

  scrollToContact() {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
