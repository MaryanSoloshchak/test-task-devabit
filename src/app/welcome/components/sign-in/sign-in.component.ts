import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.createForm();
  }
  ngOnInit() {
  }
  createForm() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }
  login() {
    this.auth.login(this.signInForm.value).subscribe(res => {
      if (res) {
        this.auth.setCurrentUser(res.id);
        this.router.navigateByUrl('/authenticated');
      } else {
        alert('Sorry. Couldn\'t find your account'); // Sorry for using alert instead of Error messages :)
      }
    });
  }
}
