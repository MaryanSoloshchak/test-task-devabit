import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanActivateService} from '../services/auth/canActivate';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', loadChildren: 'app/welcome/welcome.module#WelcomeModule'},
  { path: 'authenticated', loadChildren: 'app/authenticated/authenticated.module#AuthenticatedModule', canActivate: [CanActivateService]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting { }
