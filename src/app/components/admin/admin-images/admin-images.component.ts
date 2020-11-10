import { Component, OnInit } from '@angular/core';
import { HamburgerService } from 'src/app/services/hamburger.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  styleUrls: ['./admin-images.component.scss']
})
export class AdminImagesComponent implements OnInit {

  selectedFile: File = null;
  selectedFileSrc: string = '';
  photos: Array<Object> = [];
  uploadProgress;

  constructor(private imageService: ImageService,
    private hamburger: HamburgerService) { }

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
    this.selectedFile = event.target.files[0];
    console.log(event.target.files[0]);
    this.imageService.uploadPicture(this.selectedFile);
    this.uploadProgress = this.imageService.uploadProgress;
  }

  showPictures() {
    this.imageService.getAllImages().subscribe(photos => {
      console.log('component showPictures() func:', photos);
      this.photos = photos;
    });
  }

  deletePicture(image: Object) {
    console.log('components deletePicture()', image);
    this.imageService.deleteImageFromDatabase(image['name'], image['id']);
  }
}
