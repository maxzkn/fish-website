import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HamburgerService } from './services/hamburger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ids: Array<String> = ['Apie-mane', 'Paslaugos', 'Kontaktai'];
  hamburgerHidden: boolean = true;
  user;
  sideNavOpened: boolean = false;

  constructor(private aR: ActivatedRoute,
              private auth: AuthService,
              private hamburger: HamburgerService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
  }

  hideHamburgerMenu() {
    this.hamburger.toggleHamburgerMenu();
    this.hamburgerHidden = this.hamburger.hamburgerHidden;

    //jeigu cia nuimti tai antra karta jei paspausti tai neskrolins
    this.aR.fragment.subscribe(param => {
      console.log(param);
      if (param !== null && param !== undefined) {
        setTimeout(() => {
          document.querySelector(`#${param}`).scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
          });
        }, 100);
        // uzdejau irgi cia timeout nes kitaip lagina skrolas
      }
    });
  }

  showHamburgerMenu() {
    this.hamburger.toggleHamburgerMenu();
    this.hamburgerHidden = this.hamburger.hamburgerHidden;
  }

  isAdmin(){
    return this.auth.isAdmin(this.user);
  }
}
