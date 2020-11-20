import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HamburgerService {

  constructor() { }

  hamburgerHidden: boolean = true;

  public toggleHamburgerMenu() {
    this.hamburgerHidden = !this.hamburgerHidden;
  }

  public marginStyleHome(): Object {
    if (window.innerWidth >= 500 &&
      window.innerWidth <= 570 &&
      this.hamburgerHidden === false) {
      return { 'margin-top.px': '180' };
    }
    else if (window.innerWidth >= 570 &&
      window.innerWidth <= 860 &&
      this.hamburgerHidden === false) {
      return { 'margin-top.px': '195' };
    }
    else if (window.innerWidth >= 320 &&
      window.innerWidth <= 500 &&
      this.hamburgerHidden === false) {
      return { 'margin-top.px': '260' };
    }
    return {};
  }

  public marginStyleOther(): Object {
    if (window.innerWidth >= 500 &&
      window.innerWidth <= 570 &&
      this.hamburgerHidden === false) {
      return { 'margin-top.px': '135' };
    }
    else if (window.innerWidth >= 570 &&
      window.innerWidth <= 860 &&
      this.hamburgerHidden === false) {
      return { 'margin-top.px': '190' };
    }
    else if (window.innerWidth >= 320 &&
      window.innerWidth <= 500 &&
      this.hamburgerHidden === false) {
      return { 'margin-top.px': '250' };
    }
    return {};
  }
}
