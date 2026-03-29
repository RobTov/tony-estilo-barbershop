import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent implements OnInit {
  @ViewChildren('contactSection') contactSections!: QueryList<ElementRef>;

  phone = '+34 612 345 678';
  address = 'Mayor Street 42, Madrid Center';
  instagram = '@tonyestilobarbershop';

  formData = {
    name: '',
    phone: '',
    service: '',
    message: '',
  };

  services = [
    'Classic Cut',
    'Modern Cut',
    'Beard Trim',
    'Traditional Shave',
    'Full Package',
    'Other',
  ];

  isSubmitted = false;

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
      this.contactSections.forEach((el) => observer.observe(el.nativeElement));
    }, 100);
  }

  onSubmit() {
    if (this.formData.name && this.formData.phone) {
      this.isSubmitted = true;
      setTimeout(() => {
        this.isSubmitted = false;
        this.formData = { name: '', phone: '', service: '', message: '' };
      }, 3000);
    }
  }

  openGoogleMaps() {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.address + ', Madrid')}`,
      '_blank',
    );
  }

  openInstagram() {
    window.open('https://instagram.com/tonyestilobarbershop', '_blank');
  }
}
