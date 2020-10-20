import { parseSelectorToR3Selector } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'ui-admin-bar',
  templateUrl: './admin-bar.component.html',
  styleUrls: ['./admin-bar.component.scss']
})
export class AdminBarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logoutUser() {
    this.auth.logoutUser().then(() => {
      if (this.router.url.includes('/admin')) {
        this.router.navigate(['/']);
      } else {
        return null; // nieko nedaryti
      }
    });
  }

}
