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
import { SafeResourceUrlPipe } from '../../pipes/safe-resource-url.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SafeResourceUrlPipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent implements OnInit {
  protected i18n = inject(I18nService);

  @ViewChildren('contactSection') contactSections!: QueryList<ElementRef>;

  phone = '+18178180927';
  address = '3415 S Collins St Suite 109, Arlington, TX 76014';
  email = 'estilotony39@gmail.com';
  facebookUrl = 'https://www.facebook.com/people/Tony-Estilo-Barbershop/100086045269938/';
  instagramUrl = 'https://www.instagram.com/tonystilobarbershop/';
  mapsUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.123456789!2d-97.1234567!3d32.7654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ2JzAwLjAiTiA5N8KwMDcnMjQuNCJX!5e0!3m2!1sen!2sus!4v1234567890';

  locations = [
    {
      address: '2418 S Collins St, Arlington, TX 76014',
      mapsUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.1!2d-97.08!3d32.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQyJzAwLjAiTiA5N8KwMDQnNTguMCJX!5e0!3m2!1sen!2sus!4v1',
    },
    {
      address: '3415 S Collins St Ste 109, Arlington, TX 76014',
      mapsUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.2!2d-97.08!3d32.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQyJzAwLjAiTiA5N8KwMDQnNTguMCJX!5e0!3m2!1sen!2sus!4v2',
    },
    {
      address: '816 E Abram St Ste 102, Arlington, TX 76010',
      mapsUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.3!2d-97.07!3d32.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQzJzUwLjAiTiA5N8KwMDQnMjQuMCJX!5e0!3m2!1sen!2sus!4v3',
    },
    {
      address: '613 E Abram St, Arlington, TX 76010',
      mapsUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.4!2d-97.07!3d32.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQzJzUwLjAiTiA5N8KwMDQnMjQuMCJX!5e0!3m2!1sen!2sus!4v4',
    },
  ];

  currentSlide = 0;

  protected label = computed(() => this.i18n.t('contact.label'));
  protected title = computed(() => this.i18n.t('contact.title'));
  protected infoTitle = computed(() => this.i18n.t('contact.infoTitle'));
  protected phoneLabel = computed(() => this.i18n.t('contact.phone'));
  protected addressLabel = computed(() => this.i18n.t('contact.address'));
  protected emailLabel = computed(() => this.i18n.t('contact.email'));
  protected instagramLabel = computed(() => this.i18n.t('contact.instagram'));
  protected facebookLabel = computed(() => this.i18n.t('contact.facebook'));
  protected locationNote = computed(() => this.i18n.t('contact.locationNote'));
  protected openInMapsLabel = computed(() => this.i18n.t('contact.openInMaps'));

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

  openWhatsApp() {
    window.open(`https://wa.me/${this.phone.replace(/\D/g, '')}`, '_blank', 'noopener,noreferrer');
  }

  openGoogleMaps() {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.address)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  openInstagram() {
    window.open(this.instagramUrl, '_blank', 'noopener,noreferrer');
  }

  openFacebook() {
    window.open(this.facebookUrl, '_blank', 'noopener,noreferrer');
  }

  sendEmail() {
    window.location.href = `mailto:${this.email}`;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.locations.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = this.currentSlide === this.locations.length - 1 ? 0 : this.currentSlide + 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  openMap() {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.locations[this.currentSlide].address)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }
}
