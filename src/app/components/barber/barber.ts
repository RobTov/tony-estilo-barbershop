import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barber',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barber.html',
  styleUrl: './barber.css'
})
export class BarberComponent implements OnInit {
  @ViewChildren('barberSection') barberSections!: QueryList<ElementRef>;

  ngOnInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    setTimeout(() => {
      this.barberSections.forEach(el => observer.observe(el.nativeElement));
    }, 100);
  }
}
