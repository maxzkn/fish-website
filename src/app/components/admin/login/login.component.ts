import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../validators/custom-validators'

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
  // email: string;
  // password: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, 
                                          Validators.email])],
      'password': [null, Validators.compose([Validators.required,
                                           Validators.minLength(this.minPswLength),
                                           Validators.maxLength(this.maxPswLength),
                                           CustomValidators.passwordValidator(/\d/, {'hasNumber': true}),
                                           CustomValidators.passwordValidator(/[A-Z]/, {'hasCapital': true}),
                                           CustomValidators.passwordValidator(/[a-z]/, {'hasLower': true}),
                                           CustomValidators.passwordValidator(/[*.!@#$%^&(){}\:;<>,.?~_+-=|\][]+/, {'hasSpecial': true})])]
    });
  }

  onSubmit(form: FormGroup) {
    window.alert('email: ' + form.value.email +
                 '\npassword: ' + form.value.password);
  }

  // onSubmit(form: any) {
  //   this.email = form.email;
  //   this.password = form.password;

  //   window.alert('email: ' + this.email +
  //                ' password: ' + this.password);
  // }
}
