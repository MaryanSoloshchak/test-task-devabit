import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../../helpers/password-validator';
import {AuthService} from '../../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }
  private createForm() {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required],
      email: ['', Validators.required ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword')});
  }
  public signUp() {
    const signUpModel = this.signUpForm.value;
    const model = new User();
    model.firstName = signUpModel.firstName;
    model.lastName = signUpModel.lastName;
    model.email = signUpModel.email;
    model.password = signUpModel.password;
    this.auth.register(model).subscribe( res => {
      this.auth.login(res).subscribe( result => {
        this.auth.setCurrentUser(result.id);
        this.router.navigateByUrl('/authenticated');
      });
    });
  }
  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
}
