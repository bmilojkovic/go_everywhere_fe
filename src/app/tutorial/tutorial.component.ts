import { Component, OnInit } from '@angular/core';
import {LoaderService} from './loader.service';
import {LevelService} from './level.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  constructor(private loaderService: LoaderService, private levelService: LevelService) { }

  ngOnInit() {
    this.loaderService.getPageContent();
    this.levelService.getJSON();
  }

}
