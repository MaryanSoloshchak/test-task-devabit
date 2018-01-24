import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../models/post';
import {User} from '../../../models/user';
import {UserService} from '../../../../services/user/user.service';
import {PostService} from '../../../../services/post/post.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {Comment} from '../../../models/comment';

@Component({
  selector: 'app-twit',
  templateUrl: './twit.component.html',
  styleUrls: ['./twit.component.css']
})
export class TwitComponent implements OnInit {
  @Input('post') post: Post;
  private isCurrentUser = false;
  private isLike = false;
  private showComments = false;
  private currentUserId;
  public userData: User = new User();
  constructor(private auth: AuthService, private userService: UserService, private postService: PostService) {}

  ngOnInit() {
    this.isCurrentUser = this.auth.isCurrentUser(this.post.userId);
    this.auth.getCurrentUser().subscribe( res => {
      this.isLike = this.post.likes.includes(res.id);
      this.currentUserId = res.id;
    })
    this.userService.getUserById(this.post.userId).subscribe( (res: User) => {
      this.userData = res;
    });
  }
  public removePost() {
    this.postService.removePost(this.post.id).subscribe( res => {
      delete this.post;
    });
  }
  public likePost() {
    this.auth.getCurrentUser().subscribe( res => {
       if (this.post.likes.includes(res.id)) {
         this.post.likes.splice(this.post.likes.indexOf(res.id), 1);
       } else {
         this.post.likes.push(res.id);
       }
       this.postService.likePost(this.post).subscribe((result: Post) => {
         this.isLike = result.likes.includes(res.id);
       });
    });
  }
  public changeShowComments() {
    this.showComments = !this.showComments;
  }
  public removeComment(comment: Comment) {
    this.post.comments.splice(this.post.comments.indexOf(comment), 1);
    this.postService.removeComment(this.post).subscribe(() => {
      // need to subscribe because JSON server will not work
    });
  }
  public canRemoveComment(comment: Comment) {
    return this.currentUserId === comment.userId;
  }
}
