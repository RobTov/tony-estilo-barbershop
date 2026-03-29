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
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements OnInit {
  protected i18n = inject(I18nService);

  @ViewChildren('aboutContent, aboutImage') aboutSections!: QueryList<ElementRef>;

  protected label = computed(() => this.i18n.t('about.label'));
  protected title = computed(() => this.i18n.t('about.title'));
  protected text1 = computed(() => this.i18n.t('about.text1'));
  protected text2 = computed(() => this.i18n.t('about.text2'));
  protected years = computed(() => this.i18n.t('about.years'));
  protected clients = computed(() => this.i18n.t('about.clients'));
  protected passion = computed(() => this.i18n.t('about.passion'));

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
      this.aboutSections.forEach((el) => observer.observe(el.nativeElement));
    }, 100);
  }
}
