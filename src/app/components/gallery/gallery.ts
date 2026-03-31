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
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class GalleryComponent implements OnInit {
  protected i18n = inject(I18nService);

  @ViewChildren('galleryItem') galleryItems!: QueryList<ElementRef>;

  protected label = computed(() => this.i18n.t('gallery.label'));
  protected title = computed(() => this.i18n.t('gallery.title'));

  images = [
    {
      url: 'img1.jpeg',
      alt: 'Classic fade haircut',
    },
    {
      url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&h=400&fit=crop',
      alt: 'Beard styling',
    },
    {
      url: 'img2.jpeg',
      alt: 'Precision cut',
    },
    {
      url: 'img3.jpeg',
      alt: 'Modern hairstyle',
    },
    {
      url: 'img4.jpg',
      alt: 'Clean shave',
    },
    {
      url: 'img5.jpg',
      alt: 'Textured haircut',
    },
  ];

  ngOnInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 },
    );

    setTimeout(() => {
      this.galleryItems.forEach((el, index) => {
        el.nativeElement.style.transitionDelay = `${index * 100}ms`;
        observer.observe(el.nativeElement);
      });
    }, 100);
  }
}
