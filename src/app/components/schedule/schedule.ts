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
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class ScheduleComponent implements OnInit {
  protected i18n = inject(I18nService);

  @ViewChildren('scheduleSection') scheduleSections!: QueryList<ElementRef>;

  protected label = computed(() => this.i18n.t('schedule.label'));
  protected title = computed(() => this.i18n.t('schedule.title'));
  protected note = computed(() => this.i18n.t('schedule.note'));

  get currentDayIndex(): number {
    const dayIndex = new Date().getDay();
    return (dayIndex + 6) % 7;
  }

  getSchedule() {
    return [
      { day: this.i18n.t('schedule.monday'), hours: '9:00 AM - 9:00 PM', closed: false },
      { day: this.i18n.t('schedule.tuesday'), hours: '9:00 AM - 9:00 PM', closed: false },
      { day: this.i18n.t('schedule.wednesday'), hours: '9:00 AM - 9:00 PM', closed: false },
      { day: this.i18n.t('schedule.thursday'), hours: '9:00 AM - 9:00 PM', closed: false },
      { day: this.i18n.t('schedule.friday'), hours: '9:00 AM - 9:00 PM', closed: false },
      { day: this.i18n.t('schedule.saturday'), hours: '9:00 AM - 9:00 PM', closed: false },
      { day: this.i18n.t('schedule.sunday'), hours: '9:00 AM - 9:00 PM', closed: false },
    ];
  }

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
      this.scheduleSections.forEach((el) => observer.observe(el.nativeElement));
    }, 100);
  }
}
