import {
  Component,
  computed,
  inject,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-barber',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barber.html',
  styleUrl: './barber.css',
})
export class BarberComponent implements OnInit {
  protected i18n = inject(I18nService);

  @ViewChildren('barberSection') barberSections!: QueryList<ElementRef>;

  protected label = computed(() => this.i18n.t('barber.label'));
  protected title = computed(() => this.i18n.t('barber.title'));
  protected quote = computed(() => this.i18n.t('barber.quote'));
  protected text1 = computed(() => this.i18n.t('barber.text1'));
  protected text2 = computed(() => this.i18n.t('barber.text2'));
  protected certification = computed(() => this.i18n.t('barber.certification'));
  protected specialization = computed(() => this.i18n.t('barber.specialization'));

  ngOnInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 },
    );

    setTimeout(() => {
      this.barberSections.forEach((el) => observer.observe(el.nativeElement));
    }, 100);
  }
}
