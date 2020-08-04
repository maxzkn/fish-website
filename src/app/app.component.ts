import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fish-website';
  showPhotosSection: boolean = false;
  showArticlesSection: boolean = false;
  ids: Array<String> = ['Apie mane', 'Paslaugos', 'Kontaktai'];
  isHidden: boolean = true;

  showPhotos() {
    this.showPhotosSection = true;
    this.showArticlesSection = false;
  }

  showArticles() {
    this.showArticlesSection = true;
    this.showPhotosSection = false;
  }

  hideRouterSections() {
    this.showPhotosSection = false;
    this.showArticlesSection = false;
  }

  showHamburgerMenu() {
    this.isHidden = !this.isHidden;
  }
}
