import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ids: Array<String> = ['Apie-mane', 'Paslaugos', 'Kontaktai'];
  hamburgerHidden: boolean = true;
  activeRouterLinks: boolean = false;
  activeNonRouterLinks: boolean = true;
  routerUrlLink: boolean = false;
  user;

  constructor(private router: Router, private aR: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(){
    this.auth.user$.subscribe(user=> this.user = user);
  }

  activateRouterLinks() {
    this.activeRouterLinks = true;
    this.activeNonRouterLinks = false;
    this.hamburgerHidden = true;
  }
  
  //inicijuojame po click
  activateNonRouterLinks() {
    this.activeRouterLinks = false;
    this.activeNonRouterLinks = true;
    this.hamburgerHidden = true;
    
    this.aR.fragment.subscribe(param => {
      setTimeout(()=>{
        if(param){
          document.querySelector(`#${param}`).scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
          });
        }
        // uzdejau irgi cia timeout nes kitaip buvo problemos kur aprasiau home.component.ts
      }, 100);
    });
    
  }

  showHamburgerMenu() {
    this.hamburgerHidden = !this.hamburgerHidden;
  }

  isRouterUrlLink() {
    return this.routerUrlLink = this.router.url.includes('login');
  }

  marginStyle(): Object {
    if (window.screen.width >= 500 &&
        window.screen.width <= 570 &&
        this.hamburgerHidden === false) {
          return {'margin-top.px': '155'};
        }
    else if (window.screen.width >= 570 &&
             window.screen.width <= 860 &&
             this.hamburgerHidden === false) {
               return {'margin-top.px': '195'};
             }
    else if (window.screen.width >= 320 &&
             window.screen.width <= 500 &&
             this.hamburgerHidden === false) {
               return {'margin-top.px': '260'};
             }
    return {};
  }

  
  isAdmin(){
    return this.auth.isAdmin(this.user);
  }
}
