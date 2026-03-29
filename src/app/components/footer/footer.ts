import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  protected i18n = inject(I18nService);

  currentYear = new Date().getFullYear();
  protected tagline = computed(() => this.i18n.t('footer.tagline'));
  protected rights = computed(() => this.i18n.t('footer.rights'));

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
