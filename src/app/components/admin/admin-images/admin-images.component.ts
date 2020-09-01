import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
  styleUrls: ['./admin-images.component.scss']
})
export class AdminImagesComponent implements OnInit {

  selectedFile: File = null;
  pics: Array<Object> = [];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.showPictures();
  }
  
  selectPicture(event) {
    this.selectedFile = event.target.files[0];
    console.log(event.target.files[0]);
    this.imageService.uploadPicture(this.selectedFile);
  }

  showPictures() {
    this.imageService.getAllImages().subscribe(pics => this.pics = pics);
  }
}
