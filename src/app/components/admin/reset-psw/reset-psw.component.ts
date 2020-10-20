import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HamburgerService } from 'src/app/services/hamburger.service';

@Component({
  selector: 'app-reset-psw',
  templateUrl: './reset-psw.component.html',
  styleUrls: ['./reset-psw.component.scss']
})
export class ResetPswComponent implements OnInit {
  resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private hamburger: HamburgerService) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required,
      Validators.email])],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.auth.resetPassword(form.value.email);
    }
  }

  applyMargin() {
    return this.hamburger.marginStyleOther();
  }
}
