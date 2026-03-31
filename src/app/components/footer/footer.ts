import { Component, inject } from '@angular/core';
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openInstagram() {
    window.open('https://www.instagram.com/tonystilobarbershop/', '_blank', 'noopener,noreferrer');
  }

  openFacebook() {
    window.open(
      'https://www.facebook.com/people/Tony-Estilo-Barbershop/100086045269938/',
      '_blank',
      'noopener,noreferrer',
    );
  }
}
