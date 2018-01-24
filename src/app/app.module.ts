import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticatedModule} from './authenticated/authenticated.module';
import {CanActivateService} from '../services/auth/canActivate';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRouting, ReactiveFormsModule, HttpClientModule, AuthenticatedModule
  ],
  providers: [AuthService, CanActivateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
