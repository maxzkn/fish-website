import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'ui-admin-bar',
  templateUrl: './admin-bar.component.html',
  styleUrls: ['./admin-bar.component.scss']
})
export class AdminBarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {}

  logoutUser() {
    this.auth.logoutUser();
  }
}
