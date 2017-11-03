import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { LobbyComponent } from './lobby.component';
import { extract } from '../core/i18n.service';

const routes: Routes = Route.withShell([
  { path: 'lobby', component: LobbyComponent, data: { title: extract('Lobby') } },
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LobbyRoutingModule { }

export const routedComponents = [LobbyComponent];
