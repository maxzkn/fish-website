import { Component, OnInit } from '@angular/core';
import { HamburgerService } from 'src/app/services/hamburger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private hamburger: HamburgerService) { }

  ngOnInit(): void {
  }

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }
}
