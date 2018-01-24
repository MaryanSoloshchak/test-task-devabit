import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../models/post';
import {PostService} from '../../../../services/post/post.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {Comment} from '../../../models/comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  public newCommentModel = '';
  @Input('post') post: Post;
  constructor(private postService: PostService, private auth: AuthService) { }

  ngOnInit() {
  }
  public addNewComment() {
    if (this.newCommentModel.length > 0) {
      this.auth.getCurrentUser().subscribe( res => {
        this.post.comments.push(new Comment(this.newCommentModel, res.id));
        console.log(this.post);
        this.postService.addComment(this.post).subscribe( result => {
          this.newCommentModel = '';
        });
      });
    }
  }
}
