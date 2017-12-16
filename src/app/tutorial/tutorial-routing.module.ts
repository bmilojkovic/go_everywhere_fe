import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import {TutorialComponent} from './tutorial.component';
import {IntroductionComponent} from './introduction/introduction.component';
import {ExampleComponent} from './example/example.component';

const routes: Routes = Route.withShell([
  { path: 'tutorial', component: TutorialComponent, data: { title: extract('Tutorial') }, children: [
    {path: '', component: IntroductionComponent, pathMatch: 'full', outlet: 'tutorialOutlet'},
    {path: 'introduction', component: IntroductionComponent, outlet: 'tutorialOutlet'},
    {path: 'example', component: ExampleComponent, outlet: 'tutorialOutlet'}
  ] },
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialRoutingModule { }

export const routedComponents = [TutorialComponent];
