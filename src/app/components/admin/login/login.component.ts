import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../validators/custom-validators'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HamburgerService } from 'src/app/services/hamburger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  minPswLength: number = 8;
  maxPswLength: number = 16;
  allowedSpecial: string = "*.!@#$%^&(){}\:;<>,.?~_+-=|\]["
  _hidePassword: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private hamburger: HamburgerService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required,
      Validators.email])],
      'password': [null, Validators.compose([Validators.required,
      Validators.minLength(this.minPswLength),
      Validators.maxLength(this.maxPswLength),
      CustomValidators.passwordValidator(/\d/, { 'hasNumber': true }),
      CustomValidators.passwordValidator(/[A-Z]/, { 'hasCapital': true }),
      CustomValidators.passwordValidator(/[a-z]/, { 'hasLower': true }),
      CustomValidators.passwordValidator(/[*.!@#$%^&(){}\:;<>,.?~_+-=|\][]+/, { 'hasSpecial': true })])]
    });
  }

  onSubmit(form: FormGroup) {
    // window.alert('email: ' + form.value.email +
    //              '\npassword: ' + form.value.password);
    if (form.valid) {
      this.auth.loginViaEmail(form.value.email, form.value.password).then(() => {
        this.router.navigate(['/admin']);
      })
    }
  }

  resetPassword() {
    this.router.navigate(['/resetpsw']);
  }

  hidePassword() {
    this._hidePassword = !this._hidePassword;
  }
}
