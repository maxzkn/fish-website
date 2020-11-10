import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HamburgerService } from 'src/app/services/hamburger.service';
import { ImageService } from '../../services/image.service'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  images: Array<Object> = [];
  slideIndex: number = 0;
  event: KeyboardEvent;
  // newImagesArray: Array<Object> = []; // rodoma po 4 slide
  // idx: number = 0;
  // isCarouselActive: boolean = false;

  constructor(private imageService: ImageService,
    private hamburger: HamburgerService) { }

  ngOnInit(): void {
    this.loadImages();
  }

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }

  loadImages(): void {
    this.imageService.getAllImages().subscribe(images => this.images = images);

    // if (this.images.length > 4) {
    //   this.newImagesArray = this.images.slice(0, 4);
    // }
  }

  openModal(): void {
    document.getElementById('hideContainer').style.display = "none";
    document.getElementsByTagName('header')[0].style.display = "none";
    document.getElementsByTagName('footer')[0].style.display = "none";
    document.getElementById('myModal').style.display = "block";
  }

  closeModal(): void {
    document.getElementById('hideContainer').style.display = "block";
    document.getElementsByTagName('header')[0].style.display = "block";
    document.getElementsByTagName('footer')[0].style.display = "block";
    document.getElementById('myModal').style.display = "none";
  }

  plusSlide(n): void {
    this.showSlide(this.slideIndex += n, this.event = undefined);
  }

  currentSlide(n, event: KeyboardEvent): void {
    console.log(event.type);
    this.showSlide(this.slideIndex = n, this.event = event);
  }

  showSlide(slideIndex, event);

  showSlide(n, event): void {
    let i;
    let modalImagesMain = document.getElementsByClassName('modal-image-main') as HTMLCollectionOf<HTMLElement>;
    let modalImagesArray = document.getElementsByClassName('modal-images') as HTMLCollectionOf<HTMLElement>;

    // let carousel = n => {
    //   // jeigu pasirinktas slide yra paskutinis naujam masyve
    //   if (n === modalImagesArray.length - 1) {
    //     // jeigu pasirinktas slide nera paskutinis
    //     if (modalImagesArray[n].id != this.images[this.images.length-1]['id']) {
    //       this.idx = this.idx + 1; // inkrementuoti iki tol kol nepasibaigs slide main masyve
    //     }
    //       // kiekvienas [i] slide naujam masyve yra keičiamas [i+1] sekančiu slide iš viso slide masyvo
    //       for (i = 0; i < modalImagesArray.length; i++) {
    //         this.newImagesArray[i] = this.images[i + this.idx];
    //       }
    //     this.isCarouselActive = true;
    //   }
    // }

    // carousel(n); // šaukiama funkcija

    // // jeigu pasirinktas slide yra pats pirmas, bet jis nera lygus pačio pirmo slide id
    // if (this.isCarouselActive && this.slideIndex == 0 && !(modalImagesArray[this.slideIndex].id === this.images[0]['id'])) {
    //   if (this.idx > 0) {
    //     this.idx = this.idx - 1;
    //     // kiekvienas [i] slide naujam masyve yra keičiamas [i-1] slide iš viso slide masyvo
    //     for (i = 0; i < modalImagesArray.length; i++) {
    //       this.newImagesArray[i] = this.images[i + this.idx];
    //     }
    //   }
    // }

    // if (n > modalImagesArray.length - 1) {
    //   this.slideIndex = modalImagesArray.length - 1;
    //   carousel(this.slideIndex);
    // }

    if (n > modalImagesArray.length - 1) this.slideIndex = 0;
    if (n < 0) this.slideIndex = modalImagesArray.length - 1;

    for (i = 0; i < modalImagesMain.length; i++) {
      modalImagesMain[i].style.display = "none";
    }
    for (i = 0; i < modalImagesArray.length; i++) {
      modalImagesArray[i].className = modalImagesArray[i].className.replace(' active', '');
    }

    // jeigu nuimti ? tai bus klaida "cannot read property key of undefined", nes
    // plusSlide funkcijoje padaviau parametra event = undefined
    if (event?.key === 'ArrowRight' || event?.key === 'ArrowLeft') {

      if (event?.key === 'ArrowRight' && modalImagesArray[this.slideIndex].id === modalImagesArray[modalImagesArray.length - 1].id) {
        this.slideIndex = -1;
      }

      if (event?.key === 'ArrowRight') {
        this.slideIndex = this.slideIndex + 1;
      }

      if (event?.key === 'ArrowLeft') {
        if (modalImagesArray[this.slideIndex].id === modalImagesArray[0].id) {
          this.slideIndex = modalImagesArray.length - 1;
        } else {
          this.slideIndex = this.slideIndex - 1;
        }
      }
    }

    modalImagesArray[this.slideIndex].focus();
    modalImagesMain[this.slideIndex].style.display = 'block';
    modalImagesArray[this.slideIndex].className += " active";
  }
}
