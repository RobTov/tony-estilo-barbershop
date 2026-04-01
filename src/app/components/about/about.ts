import {
  Component,
  computed,
  inject,
  OnInit,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewChild,
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
export class AboutComponent implements OnInit, AfterViewInit {
  protected i18n = inject(I18nService);

  @ViewChildren('aboutContent, aboutImage') aboutSections!: QueryList<ElementRef>;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  protected isVideoPlaying = false;

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

  ngAfterViewInit() {
    setTimeout(() => {
      this.playVideo();
    }, 500);
  }

  playVideo() {
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      video.muted = true;
      video
        .play()
        .then(() => {
          this.isVideoPlaying = true;
        })
        .catch((err) => {
          console.warn('Autoplay failed:', err);
        });
    }
  }

  toggleVideo() {
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      if (video.paused) {
        video.play().then(() => {
          this.isVideoPlaying = true;
        });
      } else {
        video.pause();
        this.isVideoPlaying = false;
      }
    }
  }

  onVideoError(event: Event) {
    const video = event.target as HTMLVideoElement;
    console.error('Video error:', video.error);
  }
}
