import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {AuthService} from '../../../../../services/auth/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Post} from '../../../../models/post';
import {UserService} from '../../../../../services/user/user.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.css']
})
export class ProfileBarComponent implements OnInit {
  @Input('user') user: User;
  private isCurrentUser = false;
  private isFollowing = false;
  private countOfFollowers = 0;
  constructor(private auth: AuthService, private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.isCurrentUser = this.auth.isCurrentUser(+params['id']);
      this.auth.getCurrentUser().subscribe( (res: User) => {
        this.isFollowing = res.following.includes(this.user.id);
      });
    });
    this.updateCountOfFollowers();
  }
  public followClick() {
    let model: User;
    this.auth.getCurrentUser().subscribe( (res: User) => {
      model = res;
      if (!this.isFollowing) {
        model.following.push(this.user.id);
      } else {
        model.following.splice(model.following.findIndex(x => x === this.user.id), 1);
      }
      this.userService.followUser(model).subscribe( (result: User) => {
        this.isFollowing = result.following.includes(this.user.id);
      });
    });
  }
  private updateCountOfFollowers() {
    this.userService.getAllUsers().subscribe( (res: Array<User>) => {
      this.countOfFollowers = res.filter(value => {
        if (value.following) {
          return value.following.includes(this.user.id);
        }
      }).length;
    });
  }
}
