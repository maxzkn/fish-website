import { Component, OnInit } from '@angular/core';
import { HamburgerService } from 'src/app/services/hamburger.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private hamburger: HamburgerService) { }

  ngOnInit(): void {
  }

  applyMargin() {
    return this.hamburger.marginStyleHome();
  }
}
