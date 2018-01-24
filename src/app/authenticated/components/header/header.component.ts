import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  public currentUserId: number;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.getCurrentUser().subscribe( res => {
      this.currentUserId = res.id;
    });
  }

  ngOnInit() {
  }
  public logOutUser() {
    this.auth.logOut();
    this.router.navigateByUrl('welcome');
  }

}
