import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {AuthService} from '../../../../services/auth/auth.service';
import {UserService} from '../../../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input('model') model: User;
  private isFollowing = false;
  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe( (res: User) => {
      this.isFollowing = res.following.includes(this.model.id);
    });
  }
  public followClick() {
    let model: User;
    this.auth.getCurrentUser().subscribe( (res: User) => {
      model = res;
      if (!this.isFollowing) {
        model.following.push(this.model.id);
      } else {
        model.following.splice(model.following.findIndex(x => x === this.model.id), 1);
      }
      this.userService.followUser(model).subscribe( (result: User) => {
        this.isFollowing = result.following.includes(this.model.id);
      });
    });
  }
}
