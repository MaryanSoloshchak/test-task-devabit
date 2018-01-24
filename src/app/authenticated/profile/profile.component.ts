import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../models/user';
import {Post} from '../../models/post';
import {PostService} from '../../../services/post/post.service';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User = new User();
  public twits: Array<Post>;
  private isCurrentUser = false;
  constructor(private auth: AuthService, private postService: PostService, private activatedRoute: ActivatedRoute,
              private userService: UserService) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.isCurrentUser = this.auth.isCurrentUser(+params['id']);
      this.userService.getUserById(+params['id']).subscribe( (res: User) => {
        this.user = res;
      });
      this.postService.getPostsOfUserWithId(+params['id']).subscribe( (res: Array<Post>) => {
        this.twits = res;
        this.twits.sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          } else if (a.date > b.date) {
            return -1;
          } else if (a.date === b.date) {
            return 0;
          }
        });
      });
    });
  }

}
