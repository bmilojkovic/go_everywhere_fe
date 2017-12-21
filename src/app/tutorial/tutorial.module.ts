import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TutorialComponent} from './tutorial.component';
import {TutorialRoutingModule} from './tutorial-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {TranslateModule} from '@ngx-translate/core';
import {ContentComponent} from './content/content.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {IntroductionComponent} from './introduction/introduction.component';
import {LoaderService} from './loader.service';
import {ExampleComponent} from './example/example.component';
import {ReplayComponent} from './replay/replay.component';
import {CaptureComponent} from './capture/capture.component';
import {LevelService} from './level.service';
import {DestroyComponent} from './capture/destroy.component';
import {DefendingComponent} from './defending/defending.component';

const appRoutes: Routes = [
  {path: '', component: IntroductionComponent, pathMatch: 'full'},
];



@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    NgbModule,
    TutorialRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  exports: [],
  declarations: [TutorialComponent, ContentComponent, IntroductionComponent,
    ExampleComponent, ReplayComponent, CaptureComponent, DestroyComponent, DefendingComponent],
  providers: [LoaderService, LevelService]
})
export class TutorialModule { }
