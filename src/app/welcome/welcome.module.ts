import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRouting } from './welcome.routing';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, WelcomeRouting, RouterModule, ReactiveFormsModule, FormsModule
  ],
  declarations: [WelcomeComponent, SignInComponent, SignUpComponent, HeaderComponent]
})
export class WelcomeModule { }
