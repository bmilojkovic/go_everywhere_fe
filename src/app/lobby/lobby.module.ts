import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { LobbyRoutingModule } from './lobby-routing.module';
import { LobbyComponent } from './lobby.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        CoreModule,
        SharedModule,
        NgbModule,
        LobbyRoutingModule
    ],
    exports: [],
    declarations: [LobbyComponent],
    providers: [],
})
export class LobbyModule { }
