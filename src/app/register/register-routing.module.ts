import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { extract } from '../core/i18n.service';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, data: { title: extract('Register') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RegisterRoutingModule { }

export const routedComponents = [RegisterComponent];
