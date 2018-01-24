import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../../services/post/post.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private twits: Array<Post>;
  constructor(private postService: PostService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe(res => {
      this.postService.getPostsForHome(res).subscribe(posts => {
        this.twits = posts;
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
