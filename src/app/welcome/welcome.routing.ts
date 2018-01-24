import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {WelcomeComponent} from './welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent }
];

export const WelcomeRouting: ModuleWithProviders = RouterModule.forChild(routes);
