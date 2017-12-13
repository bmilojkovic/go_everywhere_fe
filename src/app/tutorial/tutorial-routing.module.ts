import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import {TutorialComponent} from './tutorial.component';

const routes: Routes = Route.withShell([
  { path: 'tutorial', component: TutorialComponent, data: { title: extract('Tutorial') } },
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialRoutingModule { }

export const routedComponents = [TutorialComponent];
