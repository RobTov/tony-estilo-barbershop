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
      url: '1.jpg',
      alt: 'Classic fade haircut',
    },
    {
      url: '2.jpeg',
      alt: 'Beard styling',
    },
    {
      url: '3.jpeg',
      alt: 'Precision cut',
    },
    {
      url: '4.jpeg',
      alt: 'Modern hairstyle',
    },
    {
      url: '5.jpeg',
      alt: 'Clean shave',
    },
    {
      url: '6.jpeg',
      alt: 'Textured haircut',
    },
    {
      url: '7.jpeg',
      alt: 'Barber styling',
    },
    {
      url: '8.jpeg',
      alt: 'Sharp line up',
    },
    {
      url: '9.jpeg',
      alt: 'Signature cut',
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
