import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../validators/custom-validators'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  minPswLength: number = 8;
  maxPswLength: number = 16;
  minUsrLength: number = 3;
  maxUsrLength: number = 10;
  allowedSpecial: string = "*.!@#$%^&(){}\:;<>,.?~_+-=|\]["

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'username': [null, Validators.compose([Validators.required,
                                             Validators.minLength(this.minUsrLength),
                                             Validators.maxLength(this.maxUsrLength)])],
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
    // window.alert('email: ' + form.value.email + 'password: ' + form.value.password);
    if (form.valid) {
      this.auth.signupViaEmail(form.value).then(() => {
        this.router.navigate['/admin'];
      })
    }
  }
}
