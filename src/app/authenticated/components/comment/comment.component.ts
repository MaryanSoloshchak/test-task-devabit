import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../../models/comment';
import {User} from '../../../models/user';
import {UserService} from '../../../../services/user/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('model') model: Comment;
  public user: User = new User();
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserById(this.model.userId).subscribe( (res: User) => {
      this.user = res;
    });
  }

}
