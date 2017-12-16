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
  declarations: [TutorialComponent, ContentComponent, IntroductionComponent, ExampleComponent],
  providers: [LoaderService]
})
export class TutorialModule { }
