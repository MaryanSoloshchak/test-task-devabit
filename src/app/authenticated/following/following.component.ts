import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../../services/auth/auth.service';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  private users: Array<User>;
  private currentUserId;
  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe( res => {
      this.currentUserId = res.id;
      this.userService.getArrayOfUsersByIds(res.following).subscribe( result => {
        this.users = result;
      });
    });
  }

}
