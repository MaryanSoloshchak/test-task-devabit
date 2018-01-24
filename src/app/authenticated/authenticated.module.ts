import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedComponent } from './authenticated.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthHeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {AuthenticatedRouting} from './authenticated.routing';
import { HomeComponent } from './home/home.component';
import { ProfileBarComponent } from './profile/components/profile-bar/profile-bar.component';
import { TwitComponent } from './components/twit/twit.component';
import {PostService} from '../../services/post/post.service';
import {UserService} from '../../services/user/user.service';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import {FormsModule} from '@angular/forms';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentComponent } from './components/comment/comment.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './components/user/user.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, AuthenticatedRouting, FormsModule
  ],
  declarations: [AuthenticatedComponent, ProfileComponent, AuthHeaderComponent, HomeComponent, ProfileBarComponent, TwitComponent, AddNewPostComponent, AddCommentComponent, CommentComponent, SearchComponent, UserComponent, FollowersComponent, FollowingComponent],
  providers: [PostService, UserService]
})
export class AuthenticatedModule { }
