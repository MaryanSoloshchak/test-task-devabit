import { Component, OnInit } from '@angular/core';
import {Post} from '../../../models/post';
import {AuthService} from '../../../../services/auth/auth.service';
import {PostService} from '../../../../services/post/post.service';

@Component({
  selector: 'app-add-new-post',
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.css']
})
export class AddNewPostComponent implements OnInit {
  public newPostModel: Post;
  constructor(private auth: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.newPostModel = new Post();
    this.auth.getCurrentUser().subscribe( res => {
      this.newPostModel.userId = res.id;
    });
  }
  public addNewPost() {
    if (this.newPostModel.content.length > 0) {
      this.newPostModel.date = new Date();
      this.postService.addNewPost(this.newPostModel).subscribe(res => {
        window.location.reload();
      });
    }

  }
}
