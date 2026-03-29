import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent implements OnInit {
  @ViewChildren('galleryItem') galleryItems!: QueryList<ElementRef>;

  images = [
    {
      url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&h=600&fit=crop',
      alt: 'Classic fade haircut'
    },
    {
      url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&h=400&fit=crop',
      alt: 'Beard styling'
    },
    {
      url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=600&fit=crop',
      alt: 'Precision cut'
    },
    {
      url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&h=400&fit=crop',
      alt: 'Modern hairstyle'
    },
    {
      url: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&h=600&fit=crop',
      alt: 'Clean shave'
    },
    {
      url: 'https://images.unsplash.com/photo-1593702288056-7927b442d0fa?w=500&h=400&fit=crop',
      alt: 'Textured haircut'
    }
  ];

  ngOnInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      this.galleryItems.forEach((el, index) => {
        el.nativeElement.style.transitionDelay = `${index * 100}ms`;
        observer.observe(el.nativeElement);
      });
    }, 100);
  }
}
