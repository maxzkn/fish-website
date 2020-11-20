import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HamburgerService } from 'src/app/services/hamburger.service';
import { ImageService } from 'src/app/services/image.service';
import { FileTypeValidatorService } from '../../../services/file-type-validator.service';

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  styleUrls: ['./admin-images.component.scss']
})
export class AdminImagesComponent implements OnInit {

  selectedFile: File = null;
  selectedFileSrc: string = '';
  photos: Array<Object> = [];
  uploadProgress: Observable<number>;

  constructor(private imageService: ImageService,
              private hamburger: HamburgerService,
              private typeValidator: FileTypeValidatorService) { }

  ngOnInit(): void {
    this.showPictures();
  }

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }

  displayDiv(event: any) {
    if (event.type === 'mouseover') {
      // document.getElementById('deleteBtn').className.replace(' displayDiv', '');
      event.target.className = event.target.className.replace(' displayDiv', '');
    }
    if (event.type === 'mouseout') {
      // document.getElementById('deleteBtn').classList.add('displayDiv');
      event.target.className += ' displayDiv';
    }
  }

  selectPicture(event) {
    const validateFile = this.typeValidator.validateFile(event.target.files[0]);
    if (validateFile) {
      this.selectedFile = event.target.files[0];
      this.imageService.uploadPicture(this.selectedFile);
      this.uploadProgress = this.imageService.uploadProgress;
    } else {
      window.alert('Only image files are allowed!');
    }
  }

  // async hi(number: number) {
  //   console.log(number);
  //   if (number === 100) {
  //     await setTimeout(() => {
  //       document.getElementById('upload').style.display = 'none';
  //     }, 1000);
  //     // this.uploadProgress = null;
  //   }
  // }

  showPictures() {
    this.imageService.getAllImages().subscribe(photos => {
      console.log('component showPictures() func:', photos);
      this.photos = photos;
      // atnaujins images tik kai upload bus 100% vis tiek
      if (document.getElementById('progressBar')) {
        console.log(document.getElementById('progressBar').getAttribute('aria-valuenow'));
        setTimeout(() => {
          document.getElementById('upload').style.display = 'none';
        }, 1000);
      }
    });
  }

  deletePicture(image: Object) {
    console.log('components deletePicture()', image);
    this.imageService.deleteImageFromDatabase(image['name'], image['id']);
  }
}
