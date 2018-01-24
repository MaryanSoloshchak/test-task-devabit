import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../models/user';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  private users: Array<User>;
  private currentUserId;
  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe( res => {
      this.currentUserId = res.id;
       this.userService.getFollowersOfUserById(res.id).subscribe( result => {
         this.users = result;
       });
    });
  }

}
