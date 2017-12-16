import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from '../loader.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

  content: any[];
  title;
  text;
  subtitle;
  nextLesson;
  nextStage;
  imageObjects: any[];

  constructor(private route: ActivatedRoute, private loaderService: LoaderService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.update(this.route.snapshot.params['level']);
    });
    this.update(this.route.snapshot.params['level']);
  }

  update(stage: any) {
    this.content = this.loaderService.pageContent[stage];
    this.title = this.content['Title'];
    this.text = this.content['Text'];
    this.subtitle = this.content['Subtitle'];
    this.nextLesson = this.content['NextLesson'];
    this.nextStage = this.content['NextStage'];
    this.imageObjects = [];
    for (const x in this.content) {
      if (Number.isInteger(Number(x))) {
        this.imageObjects.push({'url': this.content[x]['ImageUrl'],
          'description': this.content[x]['ImageDescription'] });
      }
    }
  }

  next() {
    this.router.navigate(['/tutorial', {outlets: {'tutorialOutlet': [this.nextLesson, {level: this.nextStage}]}}]);
  }

}
