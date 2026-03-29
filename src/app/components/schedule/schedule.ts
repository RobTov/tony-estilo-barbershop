import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class ScheduleComponent implements OnInit {
  @ViewChildren('scheduleSection') scheduleSections!: QueryList<ElementRef>;

  schedule = [
    { day: 'Monday', hours: '9:00 - 19:00' },
    { day: 'Tuesday', hours: '9:00 - 19:00' },
    { day: 'Wednesday', hours: '9:00 - 19:00' },
    { day: 'Thursday', hours: '9:00 - 20:00' },
    { day: 'Friday', hours: '9:00 - 20:00' },
    { day: 'Saturday', hours: '10:00 - 17:00' },
    { day: 'Sunday', hours: 'Closed', closed: true },
  ];

  currentDayIndex = new Date().getDay();

  ngOnInit() {
    this.currentDayIndex = (this.currentDayIndex + 6) % 7;

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
