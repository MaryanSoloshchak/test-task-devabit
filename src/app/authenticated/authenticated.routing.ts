import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticatedComponent } from './authenticated.component';
import { HomeComponent } from './home/home.component';
import {SearchComponent} from './search/search.component';
import {FollowersComponent} from './followers/followers.component';
import {FollowingComponent} from './following/following.component';


const routes: Routes = [
  { path: '', component: AuthenticatedComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'followers', component: FollowersComponent },
      { path: 'following', component: FollowingComponent }
    ]
  }
];

export const AuthenticatedRouting: ModuleWithProviders = RouterModule.forChild(routes);
