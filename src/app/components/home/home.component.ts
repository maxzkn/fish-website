import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HamburgerService } from 'src/app/services/hamburger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ids: Array<String> = ['Apie-mane', 'Paslaugos', 'Kontaktai'];
  constructor(private aR: ActivatedRoute,
    private hamburger: HamburgerService) { }

  ngOnInit(): void {
  }

  applyMargin() {
    return this.hamburger.marginStyleHome();
  }

  //inicijuoja po puslapio visu elementu uzkrovimo...
  ngAfterViewInit() {
    this.aR.fragment.subscribe(param => {
      // jeigu nuimti timeout tai skrolina ne ten po psl perkrovimo
      if (param !== null && param !== undefined) {
        setTimeout(() => {
          if (param !== null) {
            document.querySelector(`#${param}`).scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          }
          // jeigu uzdeti laika, tai skrolina su uzdelsimu pirma karta
        }, 100);
      }
    });
  }
}
