import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  protected i18n = inject(I18nService);

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  private readonly onVisibilityChange = () => {
    if (!document.hidden) {
      this.playVideo();
    }
  };

  ngAfterViewInit() {
    this.playVideo();
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  ngOnDestroy() {
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }

  private playVideo() {
    const video = this.bgVideo?.nativeElement;
    if (video && video.paused) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn('Autoplay failed:', err);
      });
    }
  }

  scrollToSection(href: string) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
