import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from '../loader.service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  content;
  title;
  subtitle;
  subtitle2;
  p1;
  p2;
  li1;
  li2;
  li3;
  nextLesson;
  nextStage;

  constructor(private route: ActivatedRoute, private loaderService: LoaderService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.update(this.route.snapshot.params['level']);
    });
  }

  update(stage: any) {
    if (stage === undefined ) {
      stage = 'introduction';
    }
    this.content = this.loaderService.pageContent[stage];
    this.title = this.content['Title'];
    this.p1 = this.content['p1'];
    this.subtitle = this.content['Subtitle'];
    this.subtitle2 = this.content['Subtitle2'];
    this.p2 = this.content['p2'];
    this.li1 = this.content['li1'];
    this.li2 = this.content['li2'];
    this.li3 = this.content['li3'];
    this.nextLesson = this.content['NextLesson'];
    this.nextStage = this.content['NextStage'];
  }

  next() {
    this.router.navigate(['/tutorial', {outlets: {'tutorialOutlet': [this.nextLesson, {level: this.nextStage}]}}]);
  }

}
